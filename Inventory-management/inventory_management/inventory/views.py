# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated

# class ProtectedView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         return Response({"message": "This is a protected view for authenticated users only."})
# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Sum, F, Q, Count
from .models import Product, Category, Order,  InventoryLog, OrderItem
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer
from django.db.models.functions import TruncDate, TruncMonth
from .serializers import ProductSerializer, CategorySerializer, UserSerializer, OrderSerializer, InventoryLogSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product(request):
    """
    Add a new product. If the category does not exist, it will be created.
    """
    category_name = request.data.get('category')
    if not category_name:
        return Response({"error": "Category name is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if category exists; if not, create it
    category, created = Category.objects.get_or_create(name=category_name)

    product_data = {
        'name': request.data.get('name'),
        'category': category.id,
        'description': request.data.get('description',''),
        'price': request.data.get('price'),
        'stock_quantity': request.data.get('inventory_count'),
        'threshold': request.data.get('threshold'),
        'created_by': request.user.id,
        #'image': request.FILES.get('picture'),  # Handle image upload
    }

    if request.FILES.get('picture'):
        product_data['image']= request.FILES.get('picture')    

    #product_data['created_by']=request.user.id
    serializer = ProductSerializer(data=product_data, context={'request': request})
    if serializer.is_valid():
        # serializer.save()
        product = serializer.save()  # Save the new product

        # Log the initial inventory count in InventoryLog
        InventoryLog.objects.create(
            product=product,
            user=request.user,
            quantity=product.stock_quantity,  # Positive value for addition
            action="Initial Inventory Added"
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_product(request, product_id):
    """
    Partially update an existing product.
    Allows updating inventory count, editing fields, and partial updates.
    """
    try:
        # Fetch the product created by the authenticated user
        product = Product.objects.get(id=product_id, created_by=request.user)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if `stock_quantity` is being updated (inventory addition)
    if 'stock_quantity' in request.data:
        # try:
        #     # Increment inventory
        #     new_quantity = int(request.data['stock_quantity'])
        #     product.stock_quantity = new_quantity
        #     product.save()  # Save updated inventory
        #     serializer = ProductSerializer(product, context={'request': request})
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # except ValueError:
        #     return Response({"error": "Invalid quantity value."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            new_quantity = int(request.data['stock_quantity'])
            if new_quantity > product.stock_quantity:  # Ensure it's an addition
                added_quantity = new_quantity - product.stock_quantity
                product.stock_quantity = new_quantity
                product.save()

                # Log the inventory addition in InventoryLog
                InventoryLog.objects.create(
                    product=product,
                    user=request.user,
                    quantity=added_quantity,  # Positive value for addition
                    action="Inventory Updated"
                )

                serializer = ProductSerializer(product, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "New inventory count must be greater than current count."}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "Invalid quantity value."}, status=status.HTTP_400_BAD_REQUEST)

    
    # For other fields, use the serializer to validate and update
    serializer = ProductSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()  # Save changes to the product
        # updated_product= ProductSerializer(product)
        # return Response(updated_product.data, status=status.HTTP_200_OK)
        return Response({"message":"Product Updated Successfully."}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, product_id):
    """
    Delete a product by its ID.
    """
    try:
        product = Product.objects.get(id=product_id,created_by=request.user)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response({"message": "Product deleted successfully."}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_all_products(request):
    """
    Get a list of all products.
    """
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_all_categories(request):
    """
    Get a list of all categories.
    """
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_products(request):
    """
    Get the list of products created by the logged-in user.
    """
    try:
        # Get products created by the authenticated user (filter by created_by)
        products = Product.objects.filter(created_by=request.user)

        # Serialize the products data
        serializer = ProductSerializer(products, many=True, context={'request':request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error':str(e), status:500})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_product_by_id(request, pk):
    """
    Retrieve a product entry by ID.
    """
    try:
        # Fetch the product by ID
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the product data
    serializer = ProductSerializer(product)

    return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def place_order(request):
#     if request.method == 'POST':
#         # Deserialize the request data to validate and create the order
#         serializer = OrderSerializer(data=request.data)
        
#         if serializer.is_valid():
#             product_name = request.data.get('product_name')
#             quantity = serializer.validated_data['quantity']
            
#             # Fetch the product by name
#             try:
#                 product = Product.objects.get(name=product_name)
#             except Product.DoesNotExist:
#                 return Response(
#                     {"detail": f"Product '{product_name}' does not exist."},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#             # Check if the ordered quantity exceeds the available stock
#             if product.stock_quantity < quantity:
#                 return Response(
#                     {"detail": f"Ordered quantity exceeds the available stock of {product.stock_quantity}."},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )

#             # Calculate total price
#             total_price = product.price * quantity

#             # Create the order
#             order = Order.objects.create(
#                 product=product,
#                 user=request.user,
#                 customer_name=request.data.get('customer_name'),
#                 customer_address=request.data.get('customer_address'),
#                 customer_phone_number=request.data.get('customer_phone_number'),
#                 quantity=quantity,
#                 total_price=total_price,
#             )

           

#             # Return the response with the full order details
#             return Response({
#                 "message": "Order placed successfully!",
#                 "order_id": order.id,
#                 "product_name": order.product.name,
#                 "quantity": order.quantity,
#                 "total_price": order.total_price,
#                 "status": order.status,
#                 "customer_name": order.customer_name,
#                 "customer_address": order.customer_address,
#                 "customer_phone_number": order.customer_phone_number,
#                 "created_at": order.created_at,
#                 "updated_at": order.updated_at,
#                 "user_username": order.user.username,  # Added user username field to response
#             }, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    data = request.data
    items = data.get('items', [])
    total_price = 0

    # Calculate total price and validate products
    for item in items:
        try:
            product = Product.objects.get(id=item['productId'])
            if item['quantity'] > product.stock_quantity:
                return Response(
                    {"error": f"Not enough stock for {product.name}. Available: {product.stock_quantity}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            total_price += product.price * item['quantity']
        except Product.DoesNotExist:
            return Response({"error": f"Product with ID {item['productId']} not found."}, status=status.HTTP_404_NOT_FOUND)

    # Create order
    order = Order.objects.create(
        user=user,
        customer_name=data.get('customerName'),
        customer_phone_number=data.get('customerPhone'),
        total_price=total_price,
    )

    # Add products to order
    for item in items:
        product = Product.objects.get(id=item['productId'])
        OrderItem.objects.create(order=order, product=product, quantity=item['quantity'])
        # Deduct stock
        # product.stock_quantity -= item['quantity']
        product.save()

    return Response({"message": "Order placed successfully!"}, status=status.HTTP_201_CREATED)




# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_order_status(request, order_id):
#     try:
#         # Retrieve the order
#         order = Order.objects.get(id=order_id)

#         # Check if the status is being updated to "DELIVERED"
#         if order.status == 'DELIVERED':
#             return Response(
#                 {"detail": "Order is already delivered."},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # Update the order status to "DELIVERED"
#         order.status = 'DELIVERED'
#         order.save()

#         # Update the product's stock quantity
#         product = order.product
#         product.stock_quantity -= order.quantity
#         product.save()

#         # Log the inventory change
#         InventoryLog.objects.create(
#             product=product,
#             user=request.user,
#             quantity=-(order.quantity),
#             action='remove'
#         )

#         return Response({
#             "message": "Order status updated to delivered!",
#             "order_id": order.id,
#             "status": order.status,
#             "product_name": product.name,
#             "quantity": order.quantity,
#             "total_price": order.total_price
#         }, status=status.HTTP_200_OK)

#     except Order.DoesNotExist:
#         return Response(
#             {"detail": "Order not found."},
#             status=status.HTTP_404_NOT_FOUND
#         )




# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_order_status(request, order_id):
#     try:
#         order = Order.objects.get(id=order_id)

#         new_status = request.data.get("status", "").upper()
#         if new_status not in ["PENDING", "DELIVERED"]:
#             return Response({"error": "Invalid status value."}, status=status.HTTP_400_BAD_REQUEST)

#         order.status = new_status
#         order.save()

#         return Response({
#             "message": f"Order status updated to {order.status}!",
#             "order_id": order.id,
#             "status": order.status,
#         }, status=status.HTTP_200_OK)

#     except Order.DoesNotExist:
#         return Response(
#             {"detail": "Order not found."},
#             status=status.HTTP_404_NOT_FOUND
#         )



@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):
    try:
        order = Order.objects.get(id=order_id)

        new_status = request.data.get("status", "").upper()
        if new_status not in ["PENDING", "DELIVERED"]:
            return Response({"error": "Invalid status value."}, status=status.HTTP_400_BAD_REQUEST)

        if order.status == "DELIVERED":
            return Response({"message": "Order is already delivered!"}, status=status.HTTP_400_BAD_REQUEST)

        # If the order is being marked as delivered, update inventory
        if new_status == "DELIVERED":
            for item in order.items.all():
                product = item.product
                product.stock_quantity -= item.quantity
                product.save()

                # Log the inventory reduction
                InventoryLog.objects.create(
                    product=product,
                    user=order.user,
                    quantity=-item.quantity,  # Negative value to indicate reduction
                    action="Order Delivered"
                )

        order.status = new_status
        order.save()

        return Response({
            "message": f"Order status updated to {order.status}!",
            "order_id": order.id,
            "status": order.status,
        }, status=status.HTTP_200_OK)

    except Order.DoesNotExist:
        return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)






# # Get all orders for a particular user
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_orders(request):
#     # Get all orders for the currently authenticated user
#     orders = Order.objects.filter(user=request.user)
#     serializer = OrderSerializer(orders, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user).prefetch_related('items__product')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)




# Get a specific order by ID
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, order_id):
    try:
        # Get the order by ID
        order = Order.objects.get(id=order_id, user=request.user)  # Only allow users to fetch their own orders
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    except Order.DoesNotExist:
        return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)


# Delete an order
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order(request, order_id):
    try:
        # Get the order by ID
        order = Order.objects.get(id=order_id, user=request.user)  # Only allow users to delete their own orders
        order.delete()
        return Response({"detail": "Order deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    except Order.DoesNotExist:
        return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def inventory_list(request):
    if request.method == 'GET':
        # Filter inventory logs by the logged-in user
        inventory_logs = InventoryLog.objects.filter(user=request.user)
        serializer = InventoryLogSerializer(inventory_logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @transaction.atomic  # Ensures atomicity for inventory update and log creation
# def create_inventory_log(request):
#     """
#     Create a new inventory log entry by product name and update product quantity.
#     """
#     data = request.data

#     # Fetch product by name
#     product_name = data.get('product_name')
#     if not product_name:
#         return Response({"error": "Product name is required"}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         product = Product.objects.get(name=product_name)
#     except Product.DoesNotExist:
#         return Response({"error": "Product with the given name does not exist"}, status=status.HTTP_404_NOT_FOUND)

#     # Prepare data for the serializer
#     data['product'] = product.id
#     data['user'] = request.user.id  # Associate the inventory log with the logged-in user

#     serializer = InventoryLogSerializer(data=data)
#     if serializer.is_valid():
#         # action = serializer.validated_data['action']
#         # quantity = serializer.validated_data['quantity']
#         action=data.get(action)
#         quantity=data.get('quantity')

#         # Update product's stock quantity
#         if action == 'add':
#             product.stock_quantity += quantity
#         elif action == 'remove':
#             if product.stock_quantity < quantity:
#                 return Response({"error": "Insufficient stock to remove"}, status=status.HTTP_400_BAD_REQUEST)
#             product.stock_quantity -= quantity

#         product.save()  # Save the updated stock quantity

#         # Save the inventory log
#         serializer.save()
#         return Response(
#             {"message": "Inventory log created and stock quantity updated successfully", "data": serializer.data},
#             status=status.HTTP_201_CREATED
#         )

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @transaction.atomic
# def create_inventory_log(request):
#     """
#     Create a new inventory log entry by product name and update product quantity.
#     """
#     data = request.data

#     # Fetch product by name
#     product_name = data.get('product_name')
#     if not product_name:
#         return Response({"error": "Product name is required"}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         product = Product.objects.get(name=product_name)
#     except Product.DoesNotExist:
#         return Response({"error": "Product with the given name does not exist"}, status=status.HTTP_404_NOT_FOUND)

#     # Ensure action and quantity are provided in the request
#     action = data.get('action')
#     quantity = data.get('quantity')

#     if not action:
#         return Response({"error": "Action is required"}, status=status.HTTP_400_BAD_REQUEST)

#     if quantity is None:  # Allow `0` as a valid quantity
#         return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

#     # Convert quantity to an integer
#     try:
#         quantity = int(quantity)
#     except ValueError:
#         return Response({"error": "Quantity must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

#     # Prepare data for the serializer
#     data['product'] = product.id
#     data['user'] = request.user.id  # Associate the inventory log with the logged-in user

#     serializer = InventoryLogSerializer(data=data)
#     if serializer.is_valid():
#         # Update product's stock quantity based on the action
#         if action == 'add':
#             product.stock_quantity += quantity
#         elif action == 'remove':
#             if product.stock_quantity < quantity:
#                 return Response({"error": "Insufficient stock to remove"}, status=status.HTTP_400_BAD_REQUEST)
#             product.stock_quantity -= quantity

#         product.save()  # Save the updated stock quantity

#         # Save the inventory log
#         serializer.save()
#         return Response(
#             {"message": "Inventory log created and stock quantity updated successfully", "data": serializer.data},
#             status=status.HTTP_201_CREATED
#         )

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @transaction.atomic
# def create_inventory_log(request):
#     """
#     Create an inventory log entry and adjust the product stock quantity accordingly.
#     """
#     data = request.data

#     # Validate product_name
#     product_name = data.get('product_name')
#     if not product_name:
#         return Response({"error": "Product name is required"}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         product = Product.objects.get(name=product_name)
#     except Product.DoesNotExist:
#         return Response({"error": "Product with the given name does not exist"}, status=status.HTTP_404_NOT_FOUND)

#     # Validate action
#     action = data.get('action')
#     if not action:
#         return Response({"error": "Action is required"}, status=status.HTTP_400_BAD_REQUEST)

#     # Validate quantity
#     quantity = data.get('quantity')
#     if quantity is None:
#         return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         quantity = int(quantity)
#     except ValueError:
#         return Response({"error": "Quantity must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

#     # Update product stock based on the action
#     if action.lower() == 'add':
#         product.stock_quantity += quantity
#     elif action.lower() == 'remove':
#         if product.stock_quantity < quantity:
#             return Response({"error": "Insufficient stock to remove"}, status=status.HTTP_400_BAD_REQUEST)
#         product.stock_quantity -= quantity
#     else:
#         return Response({"error": "Invalid action. Use 'add' or 'remove'."}, status=status.HTTP_400_BAD_REQUEST)

#     product.save()

#     # Prepare data for the serializer
#     log_data = {
#         "product": product.id,
#         "user": request.user.id,
#         "quantity": quantity,
#         "action": action
#     }

#     serializer = InventoryLogSerializer(data=log_data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(
#             {"message": "Inventory log created and stock quantity updated successfully", "data": serializer.data},
#             status=status.HTTP_201_CREATED
#         )

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def create_inventory_log(request):
    """
    Create an inventory log entry and adjust the product stock quantity accordingly.
    """
    data = request.data

    # Validate product_name
    product_name = data.get('product_name')
    if not product_name:
        return Response({"error": "Product name is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(name=product_name)
    except Product.DoesNotExist:
        return Response({"error": "Product with the given name does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Validate action
    action = data.get('action')
    if not action:
        return Response({"error": "Action is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Validate quantity
    quantity = data.get('quantity')
    if quantity is None:
        return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        quantity = int(quantity)
    except ValueError:
        return Response({"error": "Quantity must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

    print("Quantity value before creation:", quantity)

    # Update product stock based on the action
    if action.lower() == 'add':
        product.stock_quantity += quantity
    elif action.lower() == 'remove':
        if product.stock_quantity < quantity:
            return Response({"error": "Insufficient stock to remove"}, status=status.HTTP_400_BAD_REQUEST)
        product.stock_quantity -= quantity
    else:
        return Response({"error": "Invalid action. Use 'add' or 'remove'."}, status=status.HTTP_400_BAD_REQUEST)

    product.save()

    # Manually create the inventory log
    inventory_log = InventoryLog.objects.create(
        product=product,
        user=request.user,
        quantity=quantity,  # Pass quantity explicitly
        action=action
    )

    # Serialize the inventory log for the response
    serializer = InventoryLogSerializer(inventory_log)

    return Response(
        {"message": "Inventory log created and stock quantity updated successfully", "data": serializer.data},
        status=status.HTTP_201_CREATED
    )

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_inventory_log(request, pk):
    try:
        inventory_log = InventoryLog.objects.get(pk=pk, user=request.user)
        product = inventory_log.product
        
        # Reverse the stock adjustment
        if inventory_log.action.lower() == 'add':
            product.stock_quantity -= inventory_log.quantity
        elif inventory_log.action.lower() == 'remove':
            product.stock_quantity += inventory_log.quantity
        
        product.save()  # Save the updated stock quantity
        inventory_log.delete()  # Delete the log
        
        return Response({"message": "Inventory log deleted successfully and stock adjusted"}, status=status.HTTP_204_NO_CONTENT)
    except InventoryLog.DoesNotExist:
        return Response({"error": "Inventory log not found or not accessible"}, status=status.HTTP_404_NOT_FOUND)



# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def update_inventory_log(request, pk):
#     """
#     Update an inventory log entry by ID and adjust the product stock accordingly.
#     """
#     try:
#         # Retrieve the inventory log and product details
#         inventory_log = InventoryLog.objects.get(pk=pk, user=request.user)
#         product = inventory_log.product
#     except InventoryLog.DoesNotExist:
#         return Response({"error": "Inventory log not found or not accessible"}, status=status.HTTP_404_NOT_FOUND)

#     original_quantity = inventory_log.quantity
#     original_action = inventory_log.action

#     # Fetch updated data from the request body using 'get()'
#     updated_quantity = request.data.get('quantity', original_quantity)  # Default to original if not provided
#     updated_action = request.data.get('action', original_action)  # Default to original if not provided

#     original_quantity=int(original_quantity)
#     updated_quantity=int(updated_quantity)

#     # Reverse the previous adjustment (to undo it)
#     if original_action.lower() == 'add':
#         product.stock_quantity -= original_quantity  # Undo the 'add' action
#     elif original_action.lower() == 'remove':
#         product.stock_quantity += original_quantity  # Undo the 'remove' action

#     # Now apply the updated action and quantity
#     if updated_action.lower() == 'add':
#         product.stock_quantity += updated_quantity  # Apply the 'add' action
#     elif updated_action.lower() == 'remove':
#         # Ensure there's enough stock to remove
#         if product.stock_quantity < updated_quantity:
#             return Response({"error": "Insufficient stock to remove"}, status=status.HTTP_400_BAD_REQUEST)
#         product.stock_quantity -= updated_quantity  # Apply the 'remove' action

#     # Save the updated product stock
#     product.save()

#     # Now update the InventoryLog with the new values
#     # if updated_action.lower() == 'add':
#     #     updated_quantity= +abs(updated_quantity)
#     # elif updated_action.lower()=='remove':
#     #     updated_quantity= -abs(updated_quantity)
#     inventory_log.quantity = abs(updated_quantity) if updated_action == 'add' else -abs(updated_quantity)
#     inventory_log.action = updated_action
#     inventory_log.save()

#     return Response(
#         {"message": "Inventory log updated successfully and stock adjusted", "data": {
#             "product": inventory_log.product.name,
#             "quantity": updated_quantity,
#             "action": updated_action,
#             "stock_quantity": product.stock_quantity  # Show the updated stock quantity
#         }},
#         status=status.HTTP_200_OK
#     )

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_inventory_log(request, pk):
    """
    Update an inventory log entry by ID and adjust the product stock quantity accordingly.
    """
    try:
        inventory_log = InventoryLog.objects.get(pk=pk, user=request.user)
        product = inventory_log.product
    except InventoryLog.DoesNotExist:
        return Response({"error": "Inventory log not found or not accessible"}, status=status.HTTP_404_NOT_FOUND)

    # Original quantity and action before update
    original_quantity = inventory_log.quantity
    original_action = inventory_log.action.lower()

    # Deserialize and validate the data
    serializer = InventoryLogSerializer(inventory_log, data=request.data, partial=True)
    if serializer.is_valid():
        # Reverse the original stock adjustment
        if original_action == 'add':
            product.stock_quantity -= original_quantity
        elif original_action == 'remove':
            product.stock_quantity += abs(original_quantity)

        # New values from the request
        updated_action = request.data.get('action', original_action).lower()
        updated_quantity = abs(int(request.data.get('quantity', original_quantity)))

        # Adjust the stock based on the updated action
        if updated_action == 'add':
            product.stock_quantity += updated_quantity
            inventory_log.quantity = updated_quantity  # Positive quantity for "add"
        elif updated_action == 'remove':
            if product.stock_quantity < updated_quantity:
                return Response({"error": "Insufficient stock to remove"}, status=status.HTTP_400_BAD_REQUEST)
            product.stock_quantity -= updated_quantity
            #inventory_log.quantity = -updated_quantity  # Negative quantity for "remove"

        # Save the updated stock and inventory log
        product.save()
        inventory_log.action = updated_action
        inventory_log.quantity=updated_quantity
        # inventory_log.save()
        serializer.save(quantity=inventory_log.quantity)

        # Prepare response data
        response_data = InventoryLogSerializer(inventory_log).data
        return Response(
            {"message": "Inventory log updated successfully and stock adjusted", "data": response_data},
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def auto_create_inventory_by_product_id(request, product_id):
#     """
#     Automatically create an inventory log entry by product ID.
#     The quantity is taken from the product's stock, and the action is 'add'.
#     """
#     try:
#         # Fetch the product by ID
#         product = Product.objects.get(id=product_id)
#     except Product.DoesNotExist:
#         return Response({"error": "Product with the given ID does not exist"}, status=status.HTTP_404_NOT_FOUND)

#     # Automatically populate inventory log fields
#     data = {
#         'product': product.id,
#         'user': request.user.id,  # Associate the logged-in user
#         'quantity': product.stock_quantity,  # Use product's stock quantity
#         'action': 'add',  # Default action
#     }

#     serializer = InventoryLogSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(
#             {"message": "Inventory log created successfully", "data": serializer.data},
#             status=status.HTTP_201_CREATED
#         )
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def auto_create_inventory_by_product_id(request, product_id):
    """
    Automatically create an inventory log entry by product ID.
    The quantity is taken from the product's stock, and the action is 'add'.
    """
   
    try:
        # Fetch the product by ID
        product = Product.objects.get(id=product_id)

        # Automatically create an inventory log
        inventory_log = InventoryLog.objects.create(
            product=product,
            quantity=product.stock_quantity,  # Use the product's current stock
            action='add',  # Action is 'add'
            user=request.user  # Assume the user is authenticated
        )

        # Serialize the created inventory log
        serializer = InventoryLogSerializer(inventory_log)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_inventory_log_by_id(request, pk):
    """
    Retrieve an inventory log entry by ID.
    """
    try:
        # Fetch the inventory log by ID
        inventory_log = InventoryLog.objects.get(pk=pk, user=request.user)
    except InventoryLog.DoesNotExist:
        return Response({"error": "Inventory log not found or not accessible"}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the inventory log data
    serializer = InventoryLogSerializer(inventory_log)

    return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def inventory_dashboard(request):
#     """
#     Fetches the inventory dashboard data, including total stock value.
#     """
#     # Total number of products
#     total_products = Product.objects.count()

#     # Total stock quantity across all products
#     total_stock_quantity = Product.objects.aggregate(Sum('stock_quantity'))['stock_quantity__sum'] or 0

#     # Total number of inventory log entries
#     total_inventory_logs = InventoryLog.objects.count()

#     # Total profit from all orders (assuming total_price reflects total profit)
#     total_profit = Order.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0

#     # Total number of orders placed
#     total_orders = Order.objects.count()

#     # Calculate total stock value (stock_quantity * price for each product)
#     total_stock_value = Product.objects.aggregate(
#         total_value=Sum(F('stock_quantity') * F('price'))
#     )['total_value'] or 0

#     # Prepare the dashboard data
#     dashboard_data = {
#         "total_products": total_products,
#         "total_stock_quantity": total_stock_quantity,
#         "total_inventory_logs": total_inventory_logs,
#         "total_profit": total_profit,
#         "total_orders": total_orders,
#         "total_stock_value": total_stock_value,
#     }

#     return Response(dashboard_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def inventory_dashboard(request):
    """
    Fetches the inventory dashboard data for the logged-in user.
    """
    user = request.user  # Logged-in user

    # Filter products, orders, and inventory logs for the logged-in user
    user_products = Product.objects.filter(created_by=user)
    user_orders = Order.objects.filter(user=user)
    user_inventory_logs = InventoryLog.objects.filter(user=user)

    # Total number of products
    total_products = user_products.count()

    # Total stock quantity across all products for this user
    total_stock_quantity = user_products.aggregate(Sum('stock_quantity'))['stock_quantity__sum'] or 0

    # Total number of inventory log entries for this user
    total_inventory_logs = user_inventory_logs.count()

    # Total profit from all orders (assuming total_price reflects total profit) for this user
    total_profit = user_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0

    # Total number of orders placed by this user
    total_orders = user_orders.count()

    # Calculate total stock value (stock_quantity * price for each product) for this user
    total_stock_value = user_products.aggregate(
        total_value=Sum(F('stock_quantity') * F('price'))
    )['total_value'] or 0

    # Prepare the dashboard data
    dashboard_data = {
        "total_products": total_products,
        "total_stock_quantity": total_stock_quantity,
        "total_inventory_logs": total_inventory_logs,
        "total_profit": total_profit,
        "total_orders": total_orders,
        "total_stock_value": total_stock_value,
    }

    return Response(dashboard_data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])  # Ensures only authenticated users can access
# def alert_view(request):
#     # Fetch products with stock less than the threshold
#     low_stock_products = Product.objects.filter(stock_quantity__lt=F('threshold'))
    
#     # Fetch products that are out of stock
#     out_of_stock_products = Product.objects.filter(stock_quantity=0)
    
#     # Fetch pending orders (assuming you have a status field in your Order model)
#     pending_orders = Order.objects.filter(status='pending')

#     # Serialize data
#     low_stock_serializer = ProductSerializer(low_stock_products, many=True)
#     out_of_stock_serializer = ProductSerializer(out_of_stock_products, many=True)
#     pending_orders_serializer = OrderSerializer(pending_orders, many=True)

#     # Prepare the response
#     response_data = {
#         "low_stock_products": low_stock_serializer.data,
#         "out_of_stock_products": out_of_stock_serializer.data,
#         "pending_orders": pending_orders_serializer.data
#     }
    
#     return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensures only authenticated users can access
def alert_view(request):
    user = request.user
    # Fetch products with stock less than the threshold
    low_stock_products = Product.objects.filter(Q(created_by=user) & Q(stock_quantity__gt=0) & Q(stock_quantity__lt=F('threshold'))).exclude(stock_quantity=0)
    
    # Fetch products that are out of stock
    out_of_stock_products = Product.objects.filter(created_by=user, stock_quantity=0)
    
    # Fetch pending orders (assuming you have a status field in your Order model)
    pending_orders = Order.objects.filter(user=user,status='Pending')
    # low_stock_products=low_stock_products.exclude(id__in=out_of_stock_products.values('id'))

    # Serialize data
    low_stock_serializer = ProductSerializer(low_stock_products, many=True)
    out_of_stock_serializer = ProductSerializer(out_of_stock_products, many=True)
    pending_orders_serializer = OrderSerializer(pending_orders, many=True)

    # Prepare the response
    response_data = {
        "low_stock_products": low_stock_serializer.data,
        "out_of_stock_products": out_of_stock_serializer.data,
        "pending_orders": pending_orders_serializer.data
    }
    
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
def profile_view(request):
    user = request.user  # Get the authenticated user

    if request.method == 'GET':
        # Serialize user data
        serializer = UserSerializer(user)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
def change_password_view(request):
    user = request.user  # Get the authenticated user
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        old_password = serializer.validated_data['old_password']
        new_password = serializer.validated_data['new_password']

        # Check if the old password is correct
        if not user.check_password(old_password):
            return Response({"old_password": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password)
        user.save()

        # Update the session to prevent logout
        update_session_auth_hash(request, user)

        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_category_stock_data(request):
    try:
        # Aggregate stock quantity per category
        category_stock_data = Product.objects.values('category__name').annotate(total_stock=Sum('stock_quantity'))
        
        # Prepare the response
        categories = [data['category__name'] for data in category_stock_data]
        stock_quantities = [data['total_stock'] for data in category_stock_data]
        
        data = {
            "categories": categories,
            "stock_quantities": stock_quantities
        }
        
        return Response(data)
    except Exception as e:
        return Response({"error": "Failed to fetch category stock data."}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stock_trends(request):
    # Group by date (assuming there is a `updated_at` field in Product)
    stock_trend = (
        Product.objects
        .filter(created_by=request.user)
        .annotate(date=TruncDate('updated_at'))  # Truncate to just date
        .values('date')
        .annotate(total_stock=Sum('stock_quantity'))
        .order_by('date')
    )

    # Format response data
    data = [
        {"date": entry["date"].strftime("%Y-%m-%d"), "stock_quantity": entry["total_stock"]}
        for entry in stock_trend if entry["date"] is not None
    ]

    return Response(data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_trend_month(request):
    order_trend = (
        Order.objects
        .filter(user=request.user)
        .annotate(month=TruncMonth('created_at'))
        .values('month')
        .annotate(total_orders=Count('id'))
        .order_by('month')
    )
    data = [
        {"month": entry["month"].strftime("%B %Y"), "total_orders": entry["total_orders"]}
        for entry in order_trend if entry["month"] is not None
    ]
    return Response(data)