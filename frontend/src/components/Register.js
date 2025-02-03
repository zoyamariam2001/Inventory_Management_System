import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    business_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8198/api/register/', formData)
      .then((response) => {
        alert('Registration successful!');
        navigate('/login');
      })
      .catch((err) => {
        setError('Registration failed. Please try again.');
        console.error(err);
      });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '400px' }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
         <strong> <span style={{color:'#BF40BF'}}>Reg</span>ister</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Business Name"
                name="business_name"
                fullWidth
                required
                value={formData.business_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                fullWidth
                required
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone_number"
                fullWidth
                required
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, backgroundColor:'#BF40BF' }}>
            Register
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="text"
            fullWidth
            sx={{ mt: 2, color: 'black' }}
          >
            Already have an account? Login.
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;