// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function InventoryLog() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/inventory-log/')
//       .then(response => setLogs(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Inventory Log</h2>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-200 p-2">Product ID</th>
//             <th className="border border-gray-200 p-2">Product Name</th>
//             <th className="border border-gray-200 p-2">Category</th>
//             <th className="border border-gray-200 p-2">Quantity</th>
//             <th className="border border-gray-200 p-2">Date & Time</th>
//             <th className="border border-gray-200 p-2">Remaining Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log, index) => (
//             <tr key={index}>
//               <td className="border border-gray-200 p-2">{log.product_id}</td>
//               <td className="border border-gray-200 p-2">{log.product_name}</td>
//               <td className="border border-gray-200 p-2">{log.product_category}</td>
//               <td
//                 className={`border border-gray-200 p-2 ${
//                   log.quantity < 0 ? 'text-red-500' : 'text-green-500'
//                 }`}
//               >
//                 {log.quantity}
//               </td>
//               <td className="border border-gray-200 p-2">{new Date(log.date_time).toLocaleString()}</td>
//               <td className="border border-gray-200 p-2">{log.remaining_quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default InventoryLog;



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

// function InventoryLog() {
//   const [logs, setLogs] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8098/inventory-log/')
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

//       {/* Inventory Log Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Inventory Log
//         </Typography>

//         {/* Inventory Log Table */}
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Product ID</TableCell>
//                   <TableCell>Product Name</TableCell>
//                   <TableCell>Category</TableCell>
//                   <TableCell>Quantity</TableCell>
//                   <TableCell>Date & Time</TableCell>
//                   <TableCell>Remaining Quantity</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {logs.map((log, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{log.product_id}</TableCell>
//                     <TableCell>{log.product_name}</TableCell>
//                     <TableCell>{log.product_category}</TableCell>
//                     <TableCell
//                       sx={{
//                         color: log.quantity < 0 ? 'red' : 'green',
//                         fontWeight: 'bold',
//                       }}
//                     >
//                       {log.quantity}
//                     </TableCell>
//                     <TableCell>
//                       {new Date(log.date_time).toLocaleString()}
//                     </TableCell>
//                     <TableCell>{log.remaining_quantity}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

// export default InventoryLog;

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
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   InputAdornment,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// function InventoryLog() {
//   const [logs, setLogs] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openViewDialog, setOpenViewDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [currentLog, setCurrentLog] = useState(null);
//   const [updatedQuantity, setUpdatedQuantity] = useState(null);
//   const [updatedAction, setUpdatedAction] = useState('');

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8198/api/inventory')
//       .then((response) => setLogs(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleViewClick = (log) => {
//     setCurrentLog(log);
//     setOpenViewDialog(true);
//   };

//   const handleCloseViewDialog = () => {
//     setOpenViewDialog(false);
//     setCurrentLog(null);
//   };

//   const handleUpdateClick = (log) => {
//     setCurrentLog(log);
//     setUpdatedQuantity(log.quantity);
//     setUpdatedAction(log.action);
//     setOpenUpdateDialog(true);
//   };

//   const handleCloseUpdateDialog = () => {
//     setOpenUpdateDialog(false);
//     setUpdatedQuantity(null);
//     setUpdatedAction('');
//     setCurrentLog(null);
//   };

//   const handleUpdateSubmit = () => {
//     axios
//       .patch(`http://127.0.0.1:8198/inventory-log/${currentLog.id}/`, {
//         quantity: updatedQuantity,
//         action: updatedAction,
//       })
//       .then((response) => {
//         setLogs((prevLogs) =>
//           prevLogs.map((log) =>
//             log.id === currentLog.id ? { ...log, ...response.data } : log
//           )
//         );
//         handleCloseUpdateDialog();
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleDeleteClick = (logId) => {
//     axios
//       .delete(`http://127.0.0.1:8198/inventory-log/${logId}/`)
//       .then(() => {
//         setLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
//       })
//       .catch((error) => console.error(error));
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

//       {/* Inventory Log Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Inventory Log
//         </Typography>

//         {/* Inventory Log Table */}
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Product ID</TableCell>
//                   <TableCell>Product Name</TableCell>
//                   <TableCell>Quantity</TableCell>
//                   <TableCell>Date & Time</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {logs.map((log) => (
//                   <TableRow key={log.id}>
//                     <TableCell>{log.product_id}</TableCell>
//                     <TableCell>{log.product_name}</TableCell>
//                     <TableCell
//                       sx={{
//                         color: log.quantity < 0 ? 'red' : 'green',
//                         fontWeight: 'bold',
//                       }}
//                     >
//                       {log.quantity}
//                     </TableCell>
//                     <TableCell>
//                       {new Date(log.date_time).toLocaleString()}
//                     </TableCell>
//                     <TableCell>
//                       {/* View Icon */}
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleViewClick(log)}
//                       >
//                         <VisibilityIcon />
//                       </IconButton>
//                       {/* Edit Icon */}
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleUpdateClick(log)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       {/* Delete Icon */}
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteClick(log.id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>

//       {/* View Dialog */}
//       <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
//         <DialogTitle>Inventory Log Details</DialogTitle>
//         <DialogContent>
//           {currentLog && (
//             <>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Product ID:</strong> {currentLog.product_id}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Product Name:</strong> {currentLog.product_name}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Quantity:</strong> {currentLog.quantity}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Date & Time:</strong>{' '}
//                 {new Date(currentLog.date_time).toLocaleString()}
//               </Typography>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseViewDialog} color="secondary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Dialog */}
//       <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
//         <DialogTitle>Update Inventory Log</DialogTitle>
//         <DialogContent>
//           {currentLog && (
//             <>
//               <TextField
//                 label="Quantity"
//                 type="number"
//                 value={updatedQuantity}
//                 onChange={(e) => setUpdatedQuantity(e.target.value)}
//                 fullWidth
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">Qty</InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//                 label="Action"
//                 value={updatedAction}
//                 onChange={(e) => setUpdatedAction(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseUpdateDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdateSubmit} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default InventoryLog;

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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';


function InventoryLog() {
  const [logs, setLogs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({ quantity: '', action: '' });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        const response = await axios.get('http://127.0.0.1:8198/api/inventory', {
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch inventory logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setDialogOpen(true);
  };

  const handleEditLog = (log) => {
    setSelectedLog(log);
    setUpdateData({ quantity: log.quantity, action: log.action });
    setDialogOpen(true);
  };

  const handleDeleteLog = async (logId) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://127.0.0.1:8198/api/inventory/delete/${logId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
      console.log(`Log with ID ${logId} deleted successfully`)
    } catch (error) {
      console.error('Failed to delete inventory log:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedLog(null);
  };

  const handleUpdateLog = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8198/api/inventory/update/${selectedLog.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLogs((prevLogs) =>
        prevLogs.map((log) => (log.id === selectedLog.id ? {...log, ...response.data.data} : log))
      );
      handleDialogClose();
    } catch (error) {
      console.error('Failed to update inventory log:', error);
    }
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
            <MenuItem component={Link} to="/login">
              Log out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar> */}

      <Navbar />

      {/* Inventory Log Content */}
      <Box sx={{ p: 3, mt: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          <center><span style={{color:'#BF40BF'}}>Inventory </span>Log</center>
        </Typography>

        {/* Inventory Log Table */}
        <Paper elevation={3} sx={{ borderRadius: 2, p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.product_name}</TableCell>
                    <TableCell
                      sx={{
                        color: log.quantity > 0 ? 'green' : 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {log.quantity >0 ? `+${log.quantity}`:log.quantity}
                    </TableCell>
                    <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      {/* <IconButton onClick={() => handleViewLog(log.id)}>
                        <VisibilityIcon />
                      </IconButton> */}
                      <IconButton onClick={() => handleEditLog(log)} color="secondary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteLog(log.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Dialog for Viewing/Editing Log */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{selectedLog ? 'Edit Inventory Log' : 'View Inventory Log'}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Product Name: {selectedLog?.product_name}
          </Typography>
          <TextField
            label="Quantity"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={updateData.quantity}
            onChange={(e) => setUpdateData({ ...updateData, quantity: e.target.value })}
          />
          <TextField
            label="Action"
            fullWidth
            variant="outlined"
            value={updateData.action}
            onChange={(e) => setUpdateData({ ...updateData, action: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateLog} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default InventoryLog;