

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Logged in successfully!'); // Replace with API call later
//     navigate('/dashboard'); // Placeholder for now
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//         <button type="button" onClick={() => navigate('/')}>Go to Register</button>
//       </form>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Logged in successfully!'); // Replace with API call later
//     navigate('/dashboard'); // Placeholder for now
//   };

//   return (
//     <Grid 
//       container 
//       component="main" 
//       sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           padding: 4,
//           maxWidth: 400,
//           width: '90%',
//           textAlign: 'center',
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <TextField
//             fullWidth
//             label="Username"
//             name="username"
//             variant="outlined"
//             margin="normal"
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             onChange={handleChange}
//             required
//           />
//           <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
//             <Button type="submit" variant="contained" color="primary">
//               Login
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => navigate('/')}
//             >
//               Go to Register Page
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { TextField, Button, Box, Typography, Grid, Paper, Alert } from '@mui/material';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState(null); // State to store error messages
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Reset error state

//     try {
//       const response = await axios.post('http://127.0.0.1:8198/api/token/', credentials); // JWT login endpoint
//       const { access, refresh } = response.data;

//       // Store tokens in localStorage (or sessionStorage)
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);

//       // alert('Logged in successfully!');
//       navigate('/dashboard'); // Redirect to the dashboard
//     } catch (err) {
//       setError('Invalid username or password. Please try again.');
//     }
//   };

//   return (
//     <Grid
//       container
//       component="main"
//       sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           padding: 4,
//           maxWidth: 400,
//           width: '90%',
//           textAlign: 'center',
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <TextField
//             fullWidth
//             label="Username"
//             name="username"
//             variant="outlined"
//             margin="normal"
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             onChange={handleChange}
//             required
//           />
//           {/* <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
//             <Button type="submit" variant="contained" color="primary">
//               Login
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => navigate('/register')}
//             >
//               Go to Register Page
//             </Button>
//           </Box> */}
//           {error && (
//                 <Typography color="error" sx={{ mt: 2 }}>
//                 {error}
//                 </Typography>
//             )}
//             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
//                 Login
//             </Button>
//             <Button
//                 onClick={() => navigate('/register')}
//                 variant="text"
//                 fullWidth
//                 sx={{ mt: 2, color: '#1976d2' }}
//             >
//                 Don't have an account? Register.
//             </Button>
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { TextField, Button, Box, Typography, Grid, Paper, Alert } from '@mui/material';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const response = await axios.post('http://127.0.0.1:8198/api/token/', credentials);
//       const { access, refresh } = response.data;

//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);

//       navigate('/dashboard');
//     } catch (err) {
//       setError('Invalid username or password. Please try again.');
//     }
//   };

//   return (
//     <Grid container component="main" sx={{ height: '80vh',justifyContent:'center', alignItems:'center' }}>
//       {/* Left Section with Logo and Welcome Message */}
//       <Grid
//         item
//         xs={false}
//         sm={4}
//         md={6}
//         sx={{
//           backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdrnUrTfRZ4kK_sOqY0EElqfOFm8fkINfUw&s")', // Replace this with your logo image
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           color: '#fff',
//           textAlign: 'center',
//           p: 3,
//         }}
//       >
//         <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
//           Inventory Management
//         </Typography>
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Welcome! Please sign in to continue your journey with us.
//         </Typography>
//       </Grid>

//       {/* Right Section with Login Form */}
//       <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
//         <Box
//           sx={{
//             my: 8,
//             mx: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Login
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Username"
//               name="username"
//               variant="outlined"
//               margin="normal"
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               variant="outlined"
//               margin="normal"
//               onChange={handleChange}
//               required
//             />
//             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
//               Login
//             </Button>
//             <Button
//               onClick={() => navigate('/register')}
//               variant="text"
//               fullWidth
//               sx={{ mt: 2, color: '#1976d2' }}
//             >
//               Don't have an account? Register.
//             </Button>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };
// export default Login;


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