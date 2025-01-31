from django.contrib import admin
from .models import Order, Product, Category, InventoryLog, CustomUser, OrderItem

# Register your models here.
admin.site.register(Order),
admin.site.register(Product),
admin.site.register(Category),
admin.site.register(InventoryLog)
admin.site.register(OrderItem)

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'phone_number', 'business_name']
