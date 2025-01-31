
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://127.0.0.1:8098/register/', formData);
//       alert('Business registered successfully!');
//       navigate('/login');
//     } catch (error) {
//       alert('Error registering. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Business Name" onChange={handleChange} required />
//         <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Register</button>
//         <button type="button" onClick={() => navigate('/login')}>Go to Login Page</button>
//       </form>
//     </div>
//   );
// };

// export default Register;







/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8098/register/', formData);
      alert('Business registered successfully!');
      navigate('/login');
    } catch (error) {
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <Grid 
      container 
      component="main" 
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '90%',
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Business Name"
            name="name"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          />
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
            label="Email"
            name="email"
            type="email"
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
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/login')}
            >
              Go to Login Page
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Register;
*/









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