

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Box, Typography, CircularProgress } from '@mui/material';

// const Graphs = () => {
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const token = localStorage.getItem('accessToken'); // Get token from localStorage
//         const response = await axios.get('http://127.0.0.1:8198/api/get/user_product', {
//           headers: { Authorization: `Bearer ${token}` }, // Add token in headers for authentication
//         });

//         const categoryStock = {};
//         response.data.forEach((product) => {
//           // Only considering products that have stock > 0
//           if (product.stock_quantity > 0) {
//             if (categoryStock[product.category]) {
//               categoryStock[product.category] += product.stock_quantity;
//             } else {
//               categoryStock[product.category] = product.stock_quantity;
//             }
//           }
//         });

//         // Transforming the aggregated data to be used in charts
//         const chartData = Object.keys(categoryStock).map((category) => ({
//           name: category,               // Category name
//           value: categoryStock[category], // Total stock quantity in that category
//         }));

//         setChartData(chartData); // Set the chart data
//       } catch (error) {
//         console.error('Failed to fetch product data:', error);
//       } finally {
//         setLoading(false); // Stop loading once the data is fetched
//       }
//     };

//     fetchProductData(); // Call the function to fetch product data on component mount
//   }, []);

//   // Display loading spinner while data is being fetched
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // If no chart data is available
//   if (!chartData) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <Typography variant="h6" color="error">
//           Failed to load chart data.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//         Category vs Stock Quantity (Pie Chart)
//       </Typography>

//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={chartData}
//             dataKey="value"
//             nameKey="name"
//             outerRadius={120}
//             fill="#8884d8"
//             label
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={getColor(index)} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </Box>
//   );
// };

// // Function to generate a color for each slice of the pie chart
// const getColor = (index) => {
//   const colors = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//   return colors[index % colors.length];
// };

// export default Graphs;
          
  

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar';

// function Graphs() {
//   const [logs, setLogs] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8198/inventory-log/')
//       .then((response) => setLogs(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
// <Navbar />

//       {/* Graphs Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Graphs
//         </Typography>

        
//       </Box>
//     </Box>
//   );
// }

// export default Graphs;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Grid,
  LineChart,
  Line
} from '@mui/material';
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, ScatterChart, Scatter } from 'recharts';

function Graphs() {
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryName, setCategoryName]= useState('');
  const [barData, setBarData]= useState(true);
  const[scatterData, setScatterData]= useState([]);
  const [stockTrendData, setStockTrendData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetching logs data
    // axios
    //   .get('http://127.0.0.1:8198/inventory-log/')
    //   .then((response) => setLogs(response.data))
    //   .catch((error) => console.error(error));

    // Fetching product data for the chart
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Get token from localStorage
        const response = await axios.get('http://127.0.0.1:8198/api/get/user_product/', {
          headers: { Authorization: `Bearer ${token}` }, // Add token in headers for authentication
        });
       

        const categoryStock = {};
        const productPriceData= [];
        
        // Loop through the products and sum the stock_quantity for each category
        // response.data.forEach((product) => {
        //   if (product.stock_quantity > 0) {
        //     if (categoryStock[product.category]) {
        //       categoryStock[product.category] += product.stock_quantity;
        //     } else {
        //       categoryStock[product.category] = product.stock_quantity;
        //     }
        //   }
        // });
        response.data.forEach((product) => {
          // Filter by category name if it's provided
          if (product.stock_quantity > 0 && (!categoryName || product.category_name === categoryName)) {
            if (categoryStock[product.category_name]) {
              categoryStock[product.category_name] += product.stock_quantity;
            } else {
              categoryStock[product.category_name] = product.stock_quantity;
            }
          }
          productPriceData.push({name:product.name,price:product.price});
        });

        // Transforming the aggregated data for Pie Chart
        const chartData = Object.keys(categoryStock).map((category) => ({
          name: category,               // Category name
          value: categoryStock[category], // Total stock quantity in that category
        }));

       

        setChartData(chartData); // Set the chart data
        setBarData(productPriceData);
        
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    const fetchStockTrendData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8198/api/get/trends', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStockTrendData(response.data);

      } catch (error) {
        console.error('Error fetching stock trend data:', error);
      } finally {
        setLoading(false);
      }
    };


    const fetchOrderTrend = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8198/api/get/order_trends', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching order trend data:', error);
      } finally {
        setLoading(false);
      }
    };

     // Fetch scatter data (Quantity vs Price)
     const fetchScatterData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8198/api/get/user_product/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const scatterData = response.data.map((product) => ({
          quantity: product.stock_quantity,
          price: product.price,
        }));
        setScatterData(scatterData);
      } catch (error) {
        console.error('Error fetching scatter data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData(); // Call the function to fetch product data
    fetchStockTrendData();
    fetchOrderTrend();
    fetchScatterData();
  }, []);

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Display loading spinner while data is being fetched
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If no chart data is available
  if (!chartData.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Failed to load chart data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, pt:3 , mt:2}}>
          <center><span style={{color:'#BF40BF'}}>Gra</span>phs</center>
        </Typography>

      {/* Graphs Content */}
      <Box sx={{ p: 3, mt: 2 , display:'flex', gap:10, justifyContent:'center'}}>
        

      

<Card sx={{ boxShadow: 10, borderRadius: 3, mb: 3, width:'40%'}}>
          <center><CardHeader title="Category vs Stock Quantity (Pie Chart)" /></center>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name" // Ensure nameKey is set to 'name', which contains category_name
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(index)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 10, borderRadius: 3 ,width:'40%'}}>
            <center><CardHeader title="Product vs Price (Bar Chart)" /></center>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', pt:0,gap:10 }}>
            <Card sx={{ boxShadow: 10, borderRadius: 3, width: '40%' , height:400}}>
          <center><strong><CardHeader title="Stock Trends Over Time (Area Chart)" /></strong></center>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={stockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="stock_quantity" stroke="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card sx={{ boxShadow: 10, borderRadius: 3, width: '40%' , height:400}}>
          <center><strong><CardHeader title="Order Trends Over Time (Area Chart)" /></strong></center>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone"  dataKey="total_orders" stroke="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0, gap: 10, position:'relative', top:-200}}>
        <Card sx={{ boxShadow: 10, borderRadius: 3, width: '40%', height: 400, pt:0 , mb:2}}>
          <center>
            <strong>
              <CardHeader title="Product Quantity vs Price (Scatter Plot)" />
            </strong>
          </center>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="quantity" name="Quantity" />
                <YAxis type="number" dataKey="price" name="Price" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Products" data={scatterData} fill="#FF5722" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
     
     </Box>
  );
}


// Function to generate a color for each slice of the pie chart
const getColor = (index) => {
  const colors = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return colors[index % colors.length];
};

export default Graphs;

          
  
