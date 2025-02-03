from rest_framework import serializers
from .models import Category, Product, InventoryLog, Order, CustomUser, OrderItem

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number', 'business_name', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            business_name=validated_data['business_name'],
            password=validated_data['password'],
        )
        return user


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()  # For serving full image URL
    #created_by_username=serializers.ReadOnlyField(source='created_by.username')
    category_name=serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_name', 'description', 'price',
            'stock_quantity', 'threshold', 'image', 'image_url', 'created_at', 'updated_at', 'created_by',
        ]

    def get_image_url(self, obj):
        if obj.image and 'request' in self.context:
            request = self.context['request']
            return request.build_absolute_uri(obj.image.url)  # Full image URL
        return None
    

# Inventory Log Serializer
class InventoryLogSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    user_username = serializers.ReadOnlyField(source='user.username')
    quantity=serializers.SerializerMethodField()

    def get_quantity(self,obj):
        if obj.action.lower() == 'add':
            return f'+{obj.quantity}'
        elif obj.action.lower() =='remove':
            return f"-{obj.quantity}"
        return obj.quantity
            
    class Meta:
        model = InventoryLog
        fields = [
            'id',
            'product',
            'product_name',
            'user',
            'user_username',
            'quantity',
            'action',
            'created_at'
        ]
    

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = ['product_name', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = [
            'id',
            'customer_name',
            'customer_phone_number',
            'total_price',
            'created_at',
            'updated_at',
            'status',
            'items',
        ]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"new_password": "New passwords do not match."})
        return data
        
  