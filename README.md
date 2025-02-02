# Inventory Mnagement System

The web based application that provide an efficient solution to manage products, stock , categories and orders providing insights into stock trends and order patterns. This system enhances operational efficiency and ensuress seamless inventory tracking for business


## Features
- Dashboard to provide overall summary
- Alerts for low stock products, out of stock products and pending orders
- View list of all Products, orders
- Add new Product
- Add new order with multiple items
- Tracks order status
- Inventory logs for tracking and maintaing detailed record of inventory related activities
- View details of user
- User can change password after logging in
- Charts to Analyze Stock trends and order trends

## Tech Stack

- **Frontend** : React.js, Material-UI
- **Backend**:Django Rest Framework(DRF)
- **Other_Tools**: AXIOS for API calls

## Prerequisites
- Node.js(v14 or higher)
- npm(Node package Manager)
- Python (v3.6 or higher)
- Django (v3.2 or higher)
- Django Rest FRamework

## steps to run  project
##### For running backend
1.clone the repository:
```
git clone "https://github.com/zoyamariam2001/Inventory_Management_System.git"
```

2.Move to directory
```
cd Inventory-management/inventory_management
```

3.Install Packages
```
python -m pip install -r requirements.txt
```

4.Make migrations
```
python manage.py makemigrations
```

4.Migrate
```
python manage.py migrate
```

3.Run the server in 8198 port
```
python manage.py runserver 8198
```
##### For Frontend
4.Move to directory
```
cd frontend
```
5.Install npm
```
npm i
```
6.Run npm
```
npm start
```
