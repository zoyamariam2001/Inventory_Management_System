// import React, { useState } from 'react';

// function Profile() {
//   const [user, setUser] = useState({
//     username: 'johndoe',
//     email: 'johndoe@example.com',
//     phone: '123-456-7890',
//   });

//   const handleInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     alert('Profile updated successfully!');
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-1">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={user.username}
//             disabled
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={user.phone}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Profile;










// import React, { useState } from 'react';
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
// } from '@mui/material';
// import { Link } from 'react-router-dom';

// function Profile() {
//   const [user, setUser] = useState({
//     username: 'johndoe',
//     email: 'johndoe@example.com',
//     phone: '123-456-7890',
//     password: 'admin@123'
//   });

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Profile updated successfully!');
//   };

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
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
//           <Button color="inherit" onClick={handleProfileMenuClick}>
//             Profile
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleCloseMenu}
//           >
//             <MenuItem component={Link} to="/profile">
//               View Profile
//             </MenuItem>
//             <MenuItem component={Link} to="/login">
//               Log out
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Profile Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Profile
//         </Typography>

//         <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
//           <form onSubmit={handleSubmit}>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Username"
//                 name="username"
//                 value={user.username}
//                 variant="outlined"
//                 fullWidth
//                 disabled
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleInputChange}
//                 variant="outlined"
//                 fullWidth
//                 required
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Phone"
//                 name="phone"
//                 value={user.phone}
//                 onChange={handleInputChange}
//                 variant="outlined"
//                 fullWidth
//                 required
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Password"
//                 name="password"
//                 value={user.password}
//                 onChange={handleInputChange}
//                 variant="outlined"
//                 fullWidth
//                 required
//               />
//             </Box>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ borderRadius: 2 }}
//             >
//               Update Profile
//             </Button>
//           </form>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

// export default Profile;









// import React, { useState, useEffect } from 'react';
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
//   TextField,
//   Grid,
// } from '@mui/material';
// import { Link } from 'react-router-dom';

// function Profile() {
//   const [user, setUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     // Fetch user data from the backend
//     axios
//       .get('http://127.0.0.1:8198/api/profile/')
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => console.error('Error fetching user data:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put('http://127.0.0.1:8000/api/user-profile/', user)
//       .then(() => {
//         alert('Profile updated successfully!');
//       })
//       .catch((error) => console.error('Error updating profile:', error));
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
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
//           <Button color="inherit" onClick={handleProfileMenuClick}>
//             Profile
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleCloseMenu}
//           >
//             <MenuItem component={Link} to="/profile">
//               View Profile
//             </MenuItem>
//             <MenuItem component={Link} to="/login">
//               Log out
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Profile Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Profile
//         </Typography>
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               {/* Username Field */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Username"
//                   name="username"
//                   value={user.username}
//                   disabled
//                   fullWidth
//                 />
//               </Grid>

//               {/* Email Field */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>

//               {/* Password Field */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Password"
//                   name="password"
//                   type="password"
//                   value={user.password}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ mt: 3 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//               >
//                 Update Profile
//               </Button>
//             </Box>
//           </form>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

// export default Profile;

// import React, { useState, useEffect } from 'react';
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
//   TextField,
//   Grid,
// } from '@mui/material';
// import { Link } from 'react-router-dom';

// function Profile() {
//   const [user, setUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [passwordData, setPasswordData] = useState({
//     old_password: '',
//     new_password: '',
//   });
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     // Fetch user data
//     axios
//       .get('http://127.0.0.1:8000/api/profile/')
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => console.error('Error fetching user data:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handlePasswordChange = (e) => {
//     setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
//   };

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put('http://127.0.0.1:8198/api/profile/', user)
//       .then(() => {
//         alert('Profile updated successfully!');
//       })
//       .catch((error) => console.error('Error updating profile:', error));
//   };

//   const handleChangePassword = (e) => {
//     e.preventDefault();
//     axios
//       .post('http://127.0.0.1:8198/api/change_password/', passwordData)
//       .then(() => {
//         alert('Password changed successfully!');
//         setPasswordData({ old_password: '', new_password: '' }); // Reset form
//       })
//       .catch((error) => console.error('Error changing password:', error));
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Inventory Management
//           </Typography>
//           <Button color="inherit" component={Link} to="/dashboard">
//             Dashboard
//           </Button>
//           <Button color="inherit" component={Link} to="/profile">
//             Profile
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Profile Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Profile
//         </Typography>
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               {/* Username Field */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Username"
//                   name="username"
//                   value={user.username}
//                   disabled
//                   fullWidth
//                 />
//               </Grid>

//               {/* Email Field */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ mt: 3 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//               >
//                 Update Profile
//               </Button>
//             </Box>
//           </form>
//         </Paper>

//         <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 5 }}>
//           Change Password
//         </Typography>
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 3, mt: 2 }}>
//           <form onSubmit={handleChangePassword}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Old Password"
//                   name="old_password"
//                   type="password"
//                   value={passwordData.old_password}
//                   onChange={handlePasswordChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="New Password"
//                   name="new_password"
//                   type="password"
//                   value={passwordData.new_password}
//                   onChange={handlePasswordChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ mt: 3 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="secondary"
//                 fullWidth
//               >
//                 Change Password
//               </Button>
//             </Box>
//           </form>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

// export default Profile;

// import React, { useState, useEffect } from 'react';
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
//   Grid,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Divider,
//   TextField
// } from '@mui/material';
// import { Link } from 'react-router-dom';

// function Profile() {
//   const [user, setUser] = useState({ username: '', email: '' });
//   const [passwordData, setPasswordData] = useState({
//     old_password: '',
//     new_password: '',
//   });
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

//   useEffect(() => {
//     // Fetch user data
//     axios
//       .get('http://127.0.0.1:8198/api/profile/')
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => console.error('Error fetching user data:', error));
//   }, []);

//   const handlePasswordChange = (e) => {
//     setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
//   };

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleChangePassword = (e) => {
//     e.preventDefault();
//     axios
//       .post('http://127.0.0.1:8000/api/change-password/', passwordData)
//       .then(() => {
//         alert('Password changed successfully!');
//         setPasswordData({ old_password: '', new_password: '' });
//         setOpenPasswordDialog(false);
//       })
//       .catch((error) => console.error('Error changing password:', error));
//   };

//   const handleOpenPasswordDialog = () => {
//     setOpenPasswordDialog(true);
//   };

//   const handleClosePasswordDialog = () => {
//     setOpenPasswordDialog(false);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Inventory Management
//           </Typography>
//           <Button color="inherit" component={Link} to="/dashboard">
//             Dashboard
//           </Button>
//           <Button color="inherit" component={Link} to="/profile">
//             Profile
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Profile Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Profile
//         </Typography>
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
//           <Grid container spacing={2}>
//             {/* Username Display */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6">Username:</Typography>
//               <Typography variant="body1" color="textSecondary">
//                 {user.username}
//               </Typography>
//             </Grid>

//             {/* Email Display */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6">Email:</Typography>
//               <Typography variant="body1" color="textSecondary">
//                 {user.email}
//               </Typography>
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: 3 }} />
//           <Box sx={{ textAlign: 'center' }}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={handleOpenPasswordDialog}
//             >
//               Change Password
//             </Button>
//           </Box>
//         </Paper>
//       </Box>

//       {/* Change Password Dialog */}
//       <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
//         <DialogTitle>Change Password</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Enter your current password and the new password to update your
//             account.
//           </DialogContentText>
//           <TextField
//             margin="dense"
//             label="Old Password"
//             name="old_password"
//             type="password"
//             value={passwordData.old_password}
//             onChange={handlePasswordChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="New Password"
//             name="new_password"
//             type="password"
//             value={passwordData.new_password}
//             onChange={handlePasswordChange}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePasswordDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleChangePassword} color="secondary">
//             Change Password
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function Profile() {
  const [user, setUser] = useState({ username: '', email: '' });
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
  });
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

  //console.log(token);

  // Axios configuration with authorization
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    // Fetch user data
    axiosInstance
      .get('http://127.0.0.1:8198/api/profile/')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [axiosInstance]);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    axiosInstance
      .post('http://127.0.0.1:8198/api/change_password/', passwordData,
        {
          headers:{
            Authorization : `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert('Password changed successfully!');
        setPasswordData({ old_password: '', new_password: '' });
        setOpenPasswordDialog(false);
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        alert('Failed to change password. Please try again.');
      });
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      {/* <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
            <Button color="inherit" component={Link} to="/products">
                      Products
                    </Button>
                    <Button color="inherit" component={Link} to="/inventory-log">
                      Inventory Log
                    </Button>
                    <Button color="inherit" component={Link} to="/orders">
                      Orders
                    </Button>
          <Button color="inherit" component={Link} to="/profile" onClick={handleProfileMenuClick}>
            Profile
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem component={Link} to="/profile">
              View Profile
            </MenuItem>
            <MenuItem component={Link} to="/login">
              Log out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar> */}

      <Navbar />

    
     

      {/* Profile Content */}
       <Box sx={{p: 5, mt: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: -4, mt:-3}}>
          <center><span style={{color:'#BF40BF'}}>Prof</span>ile</center>
        </Typography>
        </Box>
        <Box sx={{pt:3,paddingRight:'700px',p: 2, mt: 2, width:'50%',alignItems:'center',position:'absolute',top:'300',left:'320px',placeItems:'center',height:'100vh'}}>
        <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
          <Grid container spacing={2}> 
            {/* Username Display */}


          <center> <img src="data:image/png;base64,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"></img></center>
            <Grid item xs={25} md={10}>
              <Typography variant="h6"><strong>Username : </strong>
              {/* <Typography variant="body1" color="textSecondary"> */}
              {user.username}
              </Typography> 
             </Grid> 

            {/* Email Display */}
            <Grid item xs={25} md={10}>
              <Typography variant="h6"><strong>Email: </strong>
              {/* <Typography variant="body1" color="textSecondary"> */}
                {user.email}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenPasswordDialog}
            >
              Change Password
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your current password and the new password to update your
            account.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Old Password"
            name="old_password"
            type="password"
            value={passwordData.old_password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="New Password"
            name="new_password"
            type="password"
            value={passwordData.new_password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            name="confirm_password"
            type="password"
            value={passwordData.confirm_password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="secondary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;