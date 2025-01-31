// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Orders() {
//   const [view, setView] = useState("newOrder");
//   const [products, setProducts] = useState([]);
//   const [order, setOrder] = useState({ customerName: "", customerPhone: "", items: [], totalPrice: 0 });
//   const [previousOrders, setPreviousOrders] = useState([]);
  
//   useEffect(() => {
//     // Fetch available products
//     axios.get("http://localhost:8000/api/products/").then((res) => setProducts(res.data));
//     // Fetch previous orders
//     axios.get("http://localhost:8000/api/orders/").then((res) => setPreviousOrders(res.data));
//   }, []);

//   const calculateTotalPrice = () => {
//     const total = order.items.reduce((sum, item) => {
//       const product = products.find((p) => p.id === item.productId);
//       return sum + (product.price * item.quantity || 0);
//     }, 0);
//     setOrder({ ...order, totalPrice: total });
//   };

//   const handlePlaceOrder = () => {
//     axios
//       .post("http://localhost:8000/api/orders/", order)
//       .then(() => {
//         alert("Order placed successfully!");
//         setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 });
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleStatusChange = (id, status) => {
//     axios.patch(`http://localhost:8000/api/orders/${id}/`, { status }).then(() => {
//       const updatedOrders = previousOrders.map((o) => (o.id === id ? { ...o, status } : o));
//       setPreviousOrders(updatedOrders);
//     });
//   };

//   return (
//     <div className="p-4">
//       <div className="flex gap-4">
//         <button
//           className={`p-2 ${view === "newOrder" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           onClick={() => setView("newOrder")}
//         >
//           New Order
//         </button>
//         <button
//           className={`p-2 ${view === "previousOrders" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           onClick={() => setView("previousOrders")}
//         >
//           Previous Orders
//         </button>
//       </div>

//       {view === "newOrder" && (
//         <div className="mt-4">
//           <h2 className="text-xl font-bold">New Order</h2>
//           <input
//             type="text"
//             placeholder="Customer Name"
//             className="border p-2 w-full mt-2"
//             value={order.customerName}
//             onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Customer Phone Number"
//             className="border p-2 w-full mt-2"
//             value={order.customerPhone}
//             onChange={(e) => setOrder({ ...order, customerPhone: e.target.value })}
//           />
//           {products.map((product) => (
//             <div key={product.id} className="flex items-center mt-2">
//               <span className="w-1/3">{product.name} (${product.price})</span>
//               <input
//                 type="number"
//                 className="border p-2 w-1/3"
//                 placeholder="Quantity"
//                 onChange={(e) => {
//                   const items = order.items.filter((item) => item.productId !== product.id);
//                   if (e.target.value > 0) {
//                     items.push({ productId: product.id, quantity: +e.target.value });
//                   }
//                   setOrder({ ...order, items });
//                 }}
//                 onBlur={calculateTotalPrice}
//               />
//             </div>
//           ))}
//           <h3 className="mt-4 text-lg font-bold">Total Price: ${order.totalPrice}</h3>
//           <div className="mt-4">
//             <button className="bg-green-500 text-white p-2 mr-2" onClick={handlePlaceOrder}>
//               Place Order
//             </button>
//             <button
//               className="bg-red-500 text-white p-2"
//               onClick={() => setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 })}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {view === "previousOrders" && (
//         <div className="mt-4">
//           <h2 className="text-xl font-bold">Previous Orders</h2>
//           <table className="w-full border mt-2">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer Name</th>
//                 <th>Phone Number</th>
//                 <th>Products</th>
//                 <th>Total Price</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {previousOrders.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{order.customerName}</td>
//                   <td>{order.customerPhone}</td>
//                   <td>
//                     {order.items.map((item) => {
//                       const product = products.find((p) => p.id === item.productId);
//                       return `${product.name} (${item.quantity})`;
//                     }).join(", ")}
//                   </td>
//                   <td>${order.totalPrice}</td>
//                   <td>
//                     <select
//                       value={order.status}
//                       className={`p-2 ${order.status === "Order Approved" ? "bg-green-200" : "bg-orange-200"}`}
//                       onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                     >
//                       <option value="Order Pending">Order Pending</option>
//                       <option value="Order Approved">Order Approved</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;









// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   Box,
//   TextField,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem as MuiMenuItem,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from './Navbar';

// function Orders() {
//   const [view, setView] = useState("newOrder");
//   const [products, setProducts] = useState([]);
//   const [order, setOrder] = useState({ customerName: "", customerPhone: "", items: [], totalPrice: 0 });
//   const [previousOrders, setPreviousOrders] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     // Fetch available products
//     axios.get("http://localhost:8198/api/products/").then((res) => setProducts(res.data));
//     // Fetch previous orders
//     axios.get("http://localhost:8198/api/orders/").then((res) => setPreviousOrders(res.data));
//   }, []);

//   const calculateTotalPrice = () => {
//     const total = order.items.reduce((sum, item) => {
//       const product = products.find((p) => p.id === item.productId);
//       return sum + (product.price * item.quantity || 0);
//     }, 0);
//     setOrder({ ...order, totalPrice: total });
//   };

//   const handlePlaceOrder = () => {
//     axios
//       .post("http://localhost:8198/api/orders/", order)
//       .then(() => {
//         alert("Order placed successfully!");
//         setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 });
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleStatusChange = (id, status) => {
//     axios.patch(`http://localhost:8198/api/orders/${id}/`, { status }).then(() => {
//       const updatedOrders = previousOrders.map((o) => (o.id === id ? { ...o, status } : o));
//       setPreviousOrders(updatedOrders);
//     });
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* Navbar */}
//       {/* <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Inventory Management
//           </Typography>
//           <Button color="inherit" component={Link} to="/dashboard">
//             Dashboard
//           </Button>
//           <Button color="inherit" component={Link} to="/products">
//             Products
//           </Button>
//           <Button color="inherit" component={Link} to="/inventory-log">
//             Inventory Log
//           </Button>
//           <Button color="inherit" component={Link} to="/orders">
//             Orders
//           </Button>
//           <Button color="inherit" component={Link} to="/graphs">
//             Graphs
//           </Button>
//           <Button color="inherit" onClick={handleMenuClick}>
//             Profile
//           </Button>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem component={Link} to="/profile">
//               View Profile
//             </MenuItem>
//             <MenuItem component={Link} to="/login">
//               Log out
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar> */}

//       <Navbar />

//       {/* Content */}
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//             Orders
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
//           <Button
//             variant={view === "newOrder" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setView("newOrder")}
//           >
//             New Order
//           </Button>
//           <Button
//             variant={view === "previousOrders" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setView("previousOrders")}
//           >
//             Previous Orders
//           </Button>
//         </Box>

//         {view === "newOrder" && (
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" sx={{ mb: 3 }}>
//               New Order
//             </Typography>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Customer Name"
//                 fullWidth
//                 value={order.customerName}
//                 onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Customer Phone Number"
//                 fullWidth
//                 value={order.customerPhone}
//                 onChange={(e) => setOrder({ ...order, customerPhone: e.target.value })}
//               />
//             </Box>
//             {products.map((product) => (
//               <Box key={product.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Typography sx={{ flex: 1 }}>{product.name} (${product.price})</Typography>
//                 <TextField
//                   type="number"
//                   label="Quantity"
//                   sx={{ flex: 1 }}
//                   onChange={(e) => {
//                     const items = order.items.filter((item) => item.productId !== product.id);
//                     if (e.target.value > 0) {
//                       items.push({ productId: product.id, quantity: +e.target.value });
//                     }
//                     setOrder({ ...order, items });
//                   }}
//                   onBlur={calculateTotalPrice}
//                 />
//               </Box>
//             ))}
//             <Typography variant="h6" sx={{ mt: 3 }}>
//               Total Price: ${order.totalPrice}
//             </Typography>
//             <Box sx={{ mt: 3 }}>
//               <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handlePlaceOrder}>
//                 Place Order
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={() => setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 })}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           </Paper>
//         )}

//         {view === "previousOrders" && (
//           <TableContainer component={Paper}>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Previous Orders
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Order ID</TableCell>
//                   <TableCell>Customer Name</TableCell>
//                   <TableCell>Phone Number</TableCell>
//                   <TableCell>Products</TableCell>
//                   <TableCell>Total Price</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {previousOrders.map((order) => (
//                   <TableRow key={order.id}>
//                     <TableCell>{order.id}</TableCell>
//                     <TableCell>{order.customerName}</TableCell>
//                     <TableCell>{order.customerPhone}</TableCell>
//                     <TableCell>
//                       {order.items
//                         .map((item) => {
//                           const product = products.find((p) => p.id === item.productId);
//                           return `${product.name} (${item.quantity})`;
//                         })
//                         .join(", ")}
//                     </TableCell>
//                     <TableCell>${order.totalPrice}</TableCell>
//                     <TableCell>
//                       <Select
//                         value={order.status}
//                         onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                       >
//                         <MuiMenuItem value="Order Pending">Order Pending</MuiMenuItem>
//                         <MuiMenuItem value="Order Approved">Order Approved</MuiMenuItem>
//                       </Select>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default Orders;















// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import Navbar from "./Navbar";

// function Orders() {
//   const [view, setView] = useState("newOrder");
//   const [products, setProducts] = useState([]);
//   const [order, setOrder] = useState({
//     customerName: "",
//     customerPhone: "",
//     items: [],
//     totalPrice: 0,
//   });
//   const [previousOrders, setPreviousOrders] = useState([]);
//   const token = localStorage.getItem("accessToken");

//   useEffect(() => {
//     // Fetch available products
//     axios
//       .get("http://127.0.0.1:8198/api/get/user_product/", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));

//     // Fetch previous orders
//     axios
//       .get("http://127.0.0.1:8198/api/get/orders/", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setPreviousOrders(res.data))
//       .catch((err) => console.error("Error fetching orders:", err));
//   }, [token]);

//   const calculateTotalPrice = () => {
//     const total = order.items.reduce((sum, item) => {
//       const product = products.find((p) => p.id === item.productId);
//       return sum + (product.price * item.quantity || 0);
//     }, 0);
//     setOrder({ ...order, totalPrice: total });
//   };

//   const handlePlaceOrder = () => {
//     axios
//       .post(
//         "http://127.0.0.1:8198/api/place_order/",
//         order,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         alert("Order placed successfully!");
//         setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 });
//       })
//       .catch((err) => console.error("Error placing order:", err));
//   };

//   const handleAddToCart = (productId, quantity) => {
//     const existingItemIndex = order.items.findIndex((item) => item.productId === productId);
//     const updatedItems = [...order.items];

//     if (existingItemIndex !== -1) {
//       // Update quantity if product already exists in the cart
//       updatedItems[existingItemIndex].quantity = quantity;
//     } else {
//       // Add new product to the cart
//       updatedItems.push({ productId, quantity });
//     }

//     setOrder({ ...order, items: updatedItems });
//     calculateTotalPrice();
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Navbar />

//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
//           Orders
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
//           <Button
//             variant={view === "newOrder" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setView("newOrder")}
//           >
//             New Order
//           </Button>
//           <Button
//             variant={view === "previousOrders" ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setView("previousOrders")}
//           >
//             Previous Orders
//           </Button>
//         </Box>

//         {/* New Order Section */}
//         {view === "newOrder" && (
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" sx={{ mb: 3 }}>
//               New Order
//             </Typography>
//             {/* Customer Details */}
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Customer Name"
//                 fullWidth
//                 value={order.customerName}
//                 onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Customer Phone Number"
//                 fullWidth
//                 value={order.customerPhone}
//                 onChange={(e) => setOrder({ ...order, customerPhone: e.target.value })}
//               />
//             </Box>

//             {/* Product Selection */}
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Select Products
//             </Typography>
//             {products.map((product) => (
//               <Box key={product.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                 <Typography sx={{ flex: 1 }}>
//                   {product.name} (${product.price})
//                 </Typography>
//                 <TextField
//                   type="number"
//                   label="Quantity"
//                   sx={{ flex: 1 }}
//                   onChange={(e) => {
//                     const quantity = parseInt(e.target.value) || 0;
//                     handleAddToCart(product.id, quantity);
//                   }}
//                 />
//               </Box>
//             ))}

//             {/* Items in Cart */}
//             <Typography variant="h6" sx={{ mt: 3 }}>
//               Items in Cart
//             </Typography>
//             <TableContainer component={Paper} sx={{ mt: 2 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Product Name</TableCell>
//                     <TableCell>Quantity</TableCell>
//                     <TableCell>Unit Price</TableCell>
//                     <TableCell>Total Price</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {order.items.map((item) => {
//                     const product = products.find((p) => p.id === item.productId);
//                     return (
//                       <TableRow key={item.productId}>
//                         <TableCell>{product.name}</TableCell>
//                         <TableCell>{item.quantity}</TableCell>
//                         <TableCell>${product.price.toFixed(2)}</TableCell>
//                         <TableCell>${(product.price * item.quantity).toFixed(2)}</TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Total Price */}
//             <Typography variant="h6" sx={{ mt: 3 }}>
//               Total Price: ${order.totalPrice.toFixed(2)}
//             </Typography>

//             {/* Action Buttons */}
//             <Box sx={{ mt: 3 }}>
//               <Button
//                 variant="contained"
//                 color="success"
//                 sx={{ mr: 2 }}
//                 onClick={handlePlaceOrder}
//               >
//                 Place Order
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={() => setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 })}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           </Paper>
//         )}

//         {/* Previous Orders Section */}
//         {view === "previousOrders" && (
//           <TableContainer component={Paper}>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Previous Orders
//             </Typography>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Order ID</TableCell>
//                   <TableCell>Customer Name</TableCell>
//                   <TableCell>Phone Number</TableCell>
//                   <TableCell>Products</TableCell>
//                   <TableCell>Total Price</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {previousOrders.map((order) => (
//                   <TableRow key={order.id}>
//                     <TableCell>{order.id}</TableCell>
//                     <TableCell>{order.customerName}</TableCell>
//                     <TableCell>{order.customerPhone}</TableCell>
//                     <TableCell>
//                       {order.items
//                         .map((item) => {
//                           const product = products.find((p) => p.id === item.productId);
//                           return `${product.name} (${item.quantity})`;
//                         })
//                         .join(", ")}
//                     </TableCell>
//                     <TableCell>${order.totalPrice}</TableCell>
//                     <TableCell>{order.status}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default Orders;















import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import { Delete } from '@mui/icons-material';


function Orders() {
  const [view, setView] = useState("newOrder");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // Holds quantity values for "Select Products" section
  const [searchTerm, setSearchTerm]=useState("");
  const [isDeleteOrderDialogOpen, setIsDeleteOrderDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [order, setOrder] = useState({
    customerName: "",
    customerPhone: "",
    items: [],
    totalPrice: 0,
  });
  const [previousOrders, setPreviousOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch available products
    axios
      .get("http://127.0.0.1:8198/api/get/user_product/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Initialize filtered products
      })
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch previous orders
    fetchOrders();  }, [token]);

    useEffect(() => {
        setFilteredOrders(previousOrders); // Update filtered orders when orders change
      }, [previousOrders]);

  const fetchOrders = () => {
    axios
      .get("http://127.0.0.1:8198/api/get/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPreviousOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  };


  
  const handleStatusChange = (orderId, status) => {
    axios
      .patch(
        `http://127.0.0.1:8198/api/order_status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Order status updated successfully!");
        fetchOrders(); // Refresh orders after the update
      })
      .catch((err) => console.error("Error updating order status:", err));
  };

  const handleSearchOrders = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredOrders(previousOrders); // Reset if search is empty
      return;
    }
  
    const filtered = previousOrders.filter((order) =>
      order.customer_name.toLowerCase().includes(query)
    );
  
    setFilteredOrders(filtered);
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (Number(product.price) * item.quantity || 0);
    }, 0);
    setOrder((prev) => ({ ...prev, totalPrice: total }));
  };

//   const handlePlaceOrder = () => {
//     axios
//       .post(
//         "http://127.0.0.1:8198/api/place_order/",
//         order,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => {
//         alert("Order placed successfully!");
//         setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 });
//       })
//       .catch((err) => console.error("Error placing order:", err));
//   };

  const handlePlaceOrder = () => {
    // Validation before placing order
    if (!order.customerName || !order.customerPhone) {
        alert("Please fill out the customer name and phone number.");
        return;
      }
  
      if (order.items.length === 0) {
        alert("Please add at least one product with a positive quantity to the cart.");
        return;
      }
    const payload = {
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      items: order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
  
    axios
      .post("http://127.0.0.1:8198/api/place_order/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Order placed successfully!");
        resetOrder();
        fetchOrders();
      })
      .catch((err) => console.error("Error placing order:", err));
  };

  const handleCancelOrder = () => {
    resetOrder();
  };

  const resetOrder = () => {
    setOrder({ customerName: "", customerPhone: "", items: [], totalPrice: 0 });
    setQuantities({}); // Clear quantities in "Select Products"
    setSearchTerm("");
    setFilteredProducts(products);
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 0) return; // Prevent negative quantities

    const items = order.items.filter((item) => item.productId !== productId);

    if (quantity > 0) {
      items.push({ productId, quantity });
    }

    setOrder({ ...order, items });
    calculateTotalPrice();
  };
  
  const handleAddToCart = (productId, quantity) => {
    quantity = Math.max(0, quantity); // Ensure non-negative quantity

    const updatedItems = order.items.filter((item) => item.productId !== productId);

    if (quantity > 0) {
      updatedItems.push({ productId, quantity });
    }

    setOrder((prev) => ({ ...prev, items: updatedItems, totalPrice: calculateTotalPrice(updatedItems) }));
    setQuantities((prev) => ({ ...prev, [productId]: quantity })); // Update input fields
    calculateTotalPrice(updatedItems);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleDeleteOrderDialogOpen = (orderId) => {
    setSelectedOrderId(orderId);
    setIsDeleteOrderDialogOpen(true);
  };
  
  const handleDeleteOrder = () => {
    if (!selectedOrderId) return;
  
    axios
      .delete(`http://127.0.0.1:8198/api/delete/orders/${selectedOrderId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Order deleted successfully!");
        fetchOrders(); // Refresh orders list
        handleDeleteOrderDialogClose();
      })
      .catch((err) => console.error("Error deleting order:", err));
  };
  
  const handleDeleteOrderDialogClose = () => {
    setIsDeleteOrderDialogOpen(false);
    setSelectedOrderId(null);
  };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />

      <Box sx={{ p: 3 , mt:2}}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          <center><span style={{color:'#BF40BF'}}>Ord</span>ers</center>
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            variant={view === "newOrder" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setView("newOrder")}
          >
            New Order
          </Button>
          <Button
            variant={view === "previousOrders" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setView("previousOrders")}
          >
            Previous Orders
          </Button>
        </Box>

        {/* New Order Section */}
        {view === "newOrder" && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              New Order
            </Typography>
            {/* Customer Details */}
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Customer Name"
                fullWidth
                value={order.customerName}
                onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Customer Phone Number"
                fullWidth
                value={order.customerPhone}
                onChange={(e) => setOrder({ ...order, customerPhone: e.target.value })}
              />
            </Box>

            {/* Product Selection */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select Products
            </Typography>
            <TextField
              label="Search Products"
              fullWidth
              sx={{ mb: 2 }}
              value={searchTerm}
              onChange={handleSearch}
            />
            <Box
              sx={{
                maxHeight: 200,
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: 2,
                p: 2,
              }}
            >
              {filteredProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <Typography sx={{ flex: 1 }}>
                    {product.name} (${product.price})
                  </Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    sx={{ flex: 1 }}
                    inputProps={{ min: 0 }} // Prevent negative input
                    value={quantities[product.id] || ""}
                    onChange={(e) => {
                      const quantity = Math.max(0, parseInt(e.target.value) || 0);
                      handleAddToCart(product.id, quantity);
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Items in Cart */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Items in Cart
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    return (
                      <TableRow key={item.productId}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        {/* <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          ${(product.price * item.quantity).toFixed(2)}
                        </TableCell> */}
                        <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                        <TableCell>${(Number(product.price)*item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Total Price */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Total Price: ${order.totalPrice.toFixed(2)}
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                sx={{ mr: 2 }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelOrder}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        )}

        {/* Previous Orders Section */}
        {view === "previousOrders" && (
          <TableContainer component={Paper}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Previous Orders
            </Typography>
            {/* Search Bar */}
            <TextField
            label="Search by Customer Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={searchQuery}
            onChange={handleSearchOrders}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {filteredOrders.map((order) => (
    <TableRow key={order.id}>
      <TableCell>{order.id}</TableCell>
      <TableCell>{order.customer_name}</TableCell>
      <TableCell>{order.customer_phone_number}</TableCell>
      <TableCell>
        {order.items.map((item) => (
          <div key={item.product_name}>
            {item.product_name} ({item.quantity})
          </div>
        ))}
      </TableCell>
      <TableCell>${order.total_price}</TableCell>
      <TableCell>
      <Select
  value={order.status ? order.status.toUpperCase() : "PENDING"}
  onChange={(e) => handleStatusChange(order.id, e.target.value)}
  sx={{
    color: order.status && order.status.toUpperCase() === "PENDING" ? "orange" : "green",
  }}
>
  <MenuItem value="PENDING" sx={{ color: "orange" }}>Pending</MenuItem>
  <MenuItem value="DELIVERED" sx={{ color: "green" }}>Delivered</MenuItem>
</Select>
      </TableCell>
      <TableCell>
        <Button onClick={() => handleDeleteOrderDialogOpen(order.id)} color="secondary">
            <Delete />
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
            </Table>
          </TableContainer>
        )}
        <Dialog open={isDeleteOrderDialogOpen} onClose={handleDeleteOrderDialogClose}>
  <DialogTitle>Confirm Deletion</DialogTitle>
  <DialogContent>
    Are you sure you want to delete this order?
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDeleteOrder}>Yes</Button>
    <Button onClick={handleDeleteOrderDialogClose}>No</Button>
  </DialogActions>
</Dialog>
      </Box>
    </Box>
  );
}

export default Orders;
