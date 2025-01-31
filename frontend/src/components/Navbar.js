// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="bg-blue-500 p-4 text-white flex justify-between">
//       <div className="flex space-x-4">
//         <Link to="/" className="hover:underline">Dashboard</Link>
//         <Link to="/products" className="hover:underline">Products</Link>
//         <Link to="/inventory-log" className="hover:underline">Inventory Log</Link>
//         <Link to="/orders" className="hover:underline">Orders</Link>
//         <Link to="/graphs" className="hover:underline">Graphs</Link>
//       </div>
//       <div className="relative">
//         <button className="hover:underline">Profile</button>
//         <div className="absolute bg-white text-black p-2 rounded shadow">
//           <Link to="/view-profile" className="block hover:bg-gray-200 p-1">View Profile</Link>
//           <button className="block w-full text-left hover:bg-gray-200 p-1" onClick={() => {
//             // Logout logic
//             window.location.href = '/login';
//           }}>Log Out</button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;









import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#BF40BF' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <strong>Inventory <span style={{color:'black'}}>Management</span> </strong>
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
        <Button color="inherit" component={Link} to="/graphs">
          Graphs
        </Button>
        <Button color="inherit" onClick={handleProfileMenuClick}>
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
          <MenuItem onClick={handleLogout}>
            Log out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;