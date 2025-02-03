import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Grid, Paper, Alert } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post('http://127.0.0.1:8198/api/token/', credentials); // JWT login endpoint
      const { access, refresh } = response.data;

      // Store tokens in localStorage (or sessionStorage)
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // alert('Logged in successfully!');
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    }
  };
  return (
    <Grid container component="main" sx={{ height: '80vh', justifyContent: 'center', alignItems: 'center' , pt:10, boxShadow:'10px 10px 10px rgba(0,0,0,0.4'}}>
      <Grid item xs={12} md={12} lg={6} component={Paper} elevation={6} square>
        <Grid container>
          {/* Left Section: Logo and Welcome Message */}
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              backgroundColor: '#BF40BF',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' , fontFamily: "monospace"}}>
              <center>Inventory Management System</center>
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
            <center>Welcome! Please login to continue.</center>
            </Typography>
          </Grid>

          {/* Right Section: Login Form */}
          <Grid item xs={12} sm={7}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom align="center">
               <strong> <span style={{color:'#BF40BF'}}>Log</span>in</strong>
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 , backgroundColor:'#BF40BF'}}>
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  variant="text"
                  fullWidth
                  sx={{ mt: 2, color: 'black' }}
                >
                  Don't have an account? Register.
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;