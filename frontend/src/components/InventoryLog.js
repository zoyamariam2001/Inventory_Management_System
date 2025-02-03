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