from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import add_product, update_product, delete_product, list_all_products, list_all_categories,get_user_products,register_user, place_order, update_order_status, get_user_orders, get_order_by_id,delete_order, inventory_list, create_inventory_log, delete_inventory_log, update_inventory_log, auto_create_inventory_by_product_id, get_inventory_log_by_id, get_product_by_id, inventory_dashboard, alert_view, profile_view, change_password_view, get_category_stock_data, get_stock_trends, get_order_trend_month
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    #for login purpose
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/',register_user, name='register_user'),
    path('api/profile/',profile_view, name='profile_view'),
    path('api/change_password/',change_password_view, name='change_password_view'),
    # path('api/protected/', ProtectedView.as_view(),name='ProtectedView'),

    #for managing product
    path('api/add_product', add_product, name='add_product'),
    path('api/update_product/<int:product_id>', update_product, name='update_product'),
    path('api/delete_product/<int:product_id>', delete_product, name='delete_product'),
    #path('api/get/product', list_all_products, name='list_all_products'),
    #path('api/get/category', list_all_categories, name='list_all_categories'),
    path('api/get/user_product/', get_user_products, name='get_user_products'),
    path('api/get/product/<int:pk>', get_product_by_id, name='get_product_by_id'),

    #For managing order
    path('api/place_order/',place_order, name='place_order'),
    path('api/order_status/<int:order_id>',update_order_status, name='update_order_status'),
    path('api/get/orders/',get_user_orders, name='get_user_orders'),
    path('api/get/orders/<int:order_id>',get_order_by_id, name='get_order_by_id'),
    path('api/delete/orders/<int:order_id>/',delete_order, name='delete_order'),

    #For managing inventory
    path('api/inventory',inventory_list, name='inventory_list'),
    path('api/inventory/create',create_inventory_log, name='create_inventory_log'),
    path('api/inventory/delete/<int:pk>',delete_inventory_log, name='delete_inventory_log'),
    path('api/inventory/get/<int:pk>',get_inventory_log_by_id, name='get_inventory_log_by_id'),
    path('api/inventory/update/<int:pk>',update_inventory_log, name='update_inventory_log'),
    path('api/inventory/auto_create/<int:product_id>',auto_create_inventory_by_product_id, name='auto_create_inventory_by_product_id'),
   # path('api/get/user_category', list_all_categories, name='list_all_categories'),

   path('api/inventory/dashboard',inventory_dashboard, name='inventory_dashboard'),
   path('api/inventory/alert',alert_view, name='alert_view'),
   path('api/get/graph', get_category_stock_data, name='get_category_stock_data'),
   path('api/get/trends', get_stock_trends, name='get_stock_trends'),
   path('api/get/order_trends', get_order_trend_month, name='get_order_trend_month'),



]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
