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

## Database Design
### CustomUser
#### Attributes
- business_name
- phone_number

### Category
#### Attributes
- name

### Product
#### Attributes
- name
- category
- description
- stock_quantity
- threshold
- created_by
- image
- created_at
- updated_at

### InventoryLog
#### Attributes
- Product
- user
- quantity
- created_at

### Order
#### Attributes
- user
- customer_name
- customer_phone_number
- total_price
- created_at
- updated_at

### OrderItem
#### Attributes
- Order
- Product
- Quantity



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










# **Inventory Management System for Small Businesses**

## **Overview**
This is a full-stack **Inventory Management System** designed for small businesses. It helps businesses efficiently track inventory, manage orders, and analyze data with an intuitive user interface.

## **Features**
- **User Authentication** (JWT-based login & registration)
- **Dashboard** with inventory summaries & pending orders
- **Products Management** (Add, View, Edit, Delete, Search)
- **Orders Management** (Create, View, Update Status, Delete, Search)
- **Inventory Logs** (Track all inventory changes)
- **Graphical Insights** using charts
- **Image Upload** for products

---

## **Design Decisions**
- **Backend:** Django REST Framework (DRF) for APIs, with JWT authentication.
- **Frontend:** ReactJS with Material UI for a modern user interface.
- **Database:** SQLite.
- **Security:** Uses JWT tokens for authentication and CORS policies for API access.

---

## **Project Structure**

```bash
Inventory-management/
├── inventory_management/
│   ├── inventory/        # Core business logic & models
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   ├── inventory_management/
│   │   ├── settings.py       # Django project settings
│   │   ├── urls.py           # API Routing
│   └── requirements.txt         # Requirements File
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── components/   # React Components
│   │   │   ├── Dashboard.js
│   │   │   ├── Graphs.js
│   │   │   ├── InventoryLog.js
│   │   │   ├── Login.js
│   │   │   ├── Navbar.js   # Navigation Bar
│   │   │   ├── Orders.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── Products.js
│   │   │   ├── Profile.js
│   │   │   ├── Register.js
│   │   ├── App.js        # Main React App
│   │   ├── index.js      # React Entry Point
│   ├── package.json
└── README.md            # Project Documentation
```

---

## **Project Setup**

### **Backend Setup**
```bash
# Clone the repository
git clone https://github.com/zoyamariam2001/Inventory_Management_System.git
cd Inventory_Management_System/Inventory-management/inventory_management

# Create Virtual Environment & Install Dependencies
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

# Apply Migrations & Run Server
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8198
```

### **Frontend Setup**
```bash
cd Inventory_Management_System/frontend

# Install dependencies
npm install

# Start React development server
npm start
```

---

## **API Documentation**

### **Authentication**
| Method | Endpoint | Description |
|--------|----------------------|--------------------------------|
| POST | `/api/register/` | Register a new user |
| POST | `/api/token/` | Get access token |

### **Products API**
| Method | Endpoint | Description |
|--------|----------------------|--------------------------------|
| GET | `/api/get/user_product/` | Fetch products created by user |
| GET | `api/get/product/<id>` | Get Product by ID |
| POST | `/api/add_product/` | Add a new product |
| PATCH | `/api/update_product/<id>/` | Update product details |
| DELETE | `/api/delete_product/<id>/` | Delete a product |

### **Orders API**
| Method | Endpoint | Description |
|--------|----------------------|--------------------------------|
| POST | `/api/place_order/` | Place a new order |
| GET | `/api/get/orders/` | Fetch user's orders |
| GET | `/api/get/orders/<id>` | Fetch order by ID |
| PATCH | `/api/order_status/<id>/` | Update order status |
| DELETE | `/api/delete/orders/<id>/` | Delete an order |

### **Inventory Log API**
| Method | Endpoint | Description |
|--------|----------------------|--------------------------------|
| POST | `/api/inventory/create` | Create a new log entry |
| GET | `/api/get/orders/` | Fetch user's orders |
| GET | `/api/inventory/get/<id>` | Fetch log entry by ID |
| PATCH | `/api/inventory/update/<id>/` | Edit log entry |
| DELETE | `/api/inventory/delete/<id>` | Delete a log entry |

### **User Details API**
| Method | Endpoint | Description |
|--------|----------------------|--------------------------------|
| GET | `/api/profile/` | Get details of user |
| PATCH | `/api/change_password/` | Change password of user |

---

## **Tech Stack**

### **Frontend:**
- **ReactJS** (Material UI for design)
- **Axios** for API calls
- **Recharts** for data visualization

### **Backend:**
- **Django REST Framework** (DRF)
- **SQLite**
- **JWT Authentication** (SimpleJWT)

---

## **Contributors**
- **Zoya Patel** - Developer
- **Shruti Kumari** - Developer

---

## **Division of Tasks**
- **Zoya Patel** - 
- **Shruti Kumari** - 

---