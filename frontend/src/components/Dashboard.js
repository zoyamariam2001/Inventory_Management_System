import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import Navbar from './Navbar';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [lowStockDialogOpen, setLowStockDialogOpen] = useState(false);
  const [outOfStockDialogOpen, setOutOfStockDialogOpen] = useState(false);
  
  const [pendingOrders, setPendingOrders] = useState([]);
  const [pendingOrdersDialogOpen, setPendingOrdersDialogOpen] = useState(false);

  // Fetch dashboard and alert data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        // Fetch dashboard data
        const dashboardResponse = await axios.get(
          'http://127.0.0.1:8198/api/inventory/dashboard',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Fetch alert data
        const alertResponse = await axios.get(
          'http://127.0.0.1:8198/api/inventory/alert',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDashboardData(dashboardResponse.data);
        setLowStockProducts(alertResponse.data.low_stock_products);
        setOutOfStockProducts(alertResponse.data.out_of_stock_products);
        setPendingOrders(alertResponse.data.pending_orders)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Failed to load dashboard data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Box sx={{ p: 3, mt: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          <center> <span style={{color:'#BF40BF'}}>Dash</span>board</center>
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', pt:5, color:'black' }}>
            {/* <center>Actions Required</center> */}
            <center> <span style={{color:'#BF40BF'}}>Summary </span>Statistics</center><br></br>
            </Typography>

        <Grid container spacing={3}>
          {/* Low Stock Products */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Low Stock Products
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {lowStockProducts.length}
              </Typography>
              <IconButton onClick={() => setLowStockDialogOpen(true)}>
                <VisibilityIcon />
              </IconButton>
            </Paper>
          </Grid> */}

          {/* Out of Stock Products */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Out of Stock Products
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {outOfStockProducts.length}
              </Typography>
              <IconButton onClick={() => setOutOfStockDialogOpen(true)}>
                <VisibilityIcon />
              </IconButton>
            </Paper>
          </Grid> */}

          {/* Total Products */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'black' }}>
                Total Products
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'#BF40BF' }}>
                {dashboardData.total_products}
              </Typography>
            </Paper>
          </Grid>

          {/* Total Stock Quantity */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'black' }}>
                Total Stock Quantity
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'#BF40BF' }}>
                {dashboardData.total_stock_quantity}
              </Typography>
            </Paper>
          </Grid>

          {/* Total Inventory Logs */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'black' }}>
                Total Inventory Logs
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'#BF40BF' }}>
                {dashboardData.total_inventory_logs}
              </Typography>
            </Paper>
          </Grid>

          {/* Total Income */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'black' }}>
                Total Income
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'#BF40BF' }}>
                ₹{dashboardData.total_profit.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>

          {/* Total Orders */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'black' }}>
                Total Orders
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'#BF40BF' }}>
                {dashboardData.total_orders}
              </Typography>
            </Paper>
          </Grid>

          {/* Total Stock Value */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'black' }}>
                Total Stock Value
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'#BF40BF' }}>
                ₹{dashboardData.total_stock_value.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ fontWeight: 'bold', pt:5, color:'black' }}>
            {/* <center>Actions Required</center> */}
            <center> <span style={{color:'#BF40BF'}}>Actions </span>Required</center>
            </Typography>

        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'flex-start', // Align content to the top
    paddingTop: '50px', // Add top padding
    width: '100%', // Ensure it takes full width
  }}>
    {/* <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Alerts</Typography> */}


          <Grid container spacing={3}>
          {/* Low Stock Products */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor:'#CB9DF0' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'white' }}>
                Low Stock Products
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'white' }}>
                {lowStockProducts.length}
              </Typography>
              <IconButton onClick={() => setLowStockDialogOpen(true)} color="secondary">
                <VisibilityIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor:'#8D77AB' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'white' }}>
                Out of Stock Products
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'white' }}>
                {outOfStockProducts.length}
              </Typography>
              <IconButton onClick={() => setOutOfStockDialogOpen(true)} color="secondary">
                <VisibilityIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} color={'red'}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor:'#B784B7' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color:'white' }}>
                Pending Orders
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, color:'white' }}>
                {pendingOrders.length}
              </Typography>
              <IconButton onClick={() => setPendingOrdersDialogOpen(true)} color="secondary">
                <VisibilityIcon />
              </IconButton>
            </Paper>
          </Grid>
          
          
          
          </Grid>

          
         </Box>

        {/* Dialog for Low Stock Products */}
        <Dialog open={lowStockDialogOpen} onClose={() => setLowStockDialogOpen(false)}>
          <strong><DialogTitle>Low Stock Products</DialogTitle></strong>
          <DialogContent>
            <List>
              {lowStockProducts.map((product) => (
                <ListItem key={product.id}>
                  <ListItemText primary={product.name} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* Dialog for Out of Stock Products */}
        <Dialog open={outOfStockDialogOpen} onClose={() => setOutOfStockDialogOpen(false)}>
          <DialogTitle>Out of Stock Products</DialogTitle>
          <DialogContent>
            <List>
              {outOfStockProducts.map((product) => (
                <ListItem key={product.id}>
                  <ListItemText primary={product.name} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        <Dialog open={pendingOrdersDialogOpen} onClose={() => setPendingOrdersDialogOpen(false)}>
          <DialogTitle>Pending Orders</DialogTitle>
          <DialogContent>
            <List>
              {pendingOrders.map((order) => (
                <ListItem key={order.id}>
                  <ListItemText primary={order.customer_name} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Dashboard;