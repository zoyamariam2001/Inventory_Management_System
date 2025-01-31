// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     category: '',
//     description: '',
//     price: '',
//     inventory_count: '',
//     threshold: '',
//     picture: null,
//   });

//   useEffect(() => {
//     axios.get('/api/products/')
//       .then(response => setProducts(response.data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setNewProduct({ ...newProduct, picture: e.target.files[0] });
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(newProduct).forEach(key => {
//       formData.append(key, newProduct[key]);
//     });
//     axios.post('/api/products/', formData)
//       .then(() => {
//         alert('Product added successfully!');
//         setNewProduct({
//           name: '',
//           category: '',
//           description: '',
//           price: '',
//           inventory_count: '',
//           threshold: '',
//           picture: null,
//         });
//       })
//       .catch(error => console.error('Error adding product:', error));
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Products</h1>
//       <form className="bg-white shadow p-4 rounded mb-4" onSubmit={handleAddProduct}>
//         <h2 className="font-semibold">Add New Product</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" required />
//           <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} placeholder="Category" required />
//           <textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" required></textarea>
//           <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" required />
//           <input type="number" name="inventory_count" value={newProduct.inventory_count} onChange={handleInputChange} placeholder="Inventory Count" required />
//           <input type="number" name="threshold" value={newProduct.threshold} onChange={handleInputChange} placeholder="Threshold" required />
//           <input type="file" name="picture" onChange={handleFileChange} />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Add Product</button>
//       </form>

//       <table className="bg-white shadow p-4 rounded w-full">
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Inventory</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.category}</td>
//               <td><button>👁️</button></td>
//               <td>{product.price}</td>
//               <td>{product.inventory_count}</td>
//               <td>
//                 <button>➕</button>
//                 <button>✏️</button>
//                 <button>🗑️</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Products;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   TextField,
//   Box,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import { Link } from 'react-router-dom';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     category: '',
//     description: '',
//     price: '',
//     inventory_count: '',
//     threshold: '',
//     picture: null,
//   });
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     axios
//       .get('/api/products/')
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setNewProduct({ ...newProduct, picture: e.target.files[0] });
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(newProduct).forEach((key) => {
//       formData.append(key, newProduct[key]);
//     });
//     axios
//       .post('/api/products/', formData)
//       .then(() => {
//         alert('Product added successfully!');
//         setNewProduct({
//           name: '',
//           category: '',
//           description: '',
//           price: '',
//           inventory_count: '',
//           threshold: '',
//           picture: null,
//         });
//       })
//       .catch((error) => console.error('Error adding product:', error));
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

//       {/* Products Page Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Products
//         </Typography>

//         {/* Add New Product Form */}
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//             Add New Product
//           </Typography>
//           <form onSubmit={handleAddProduct}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Product Name"
//                   name="name"
//                   value={newProduct.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Category"
//                   name="category"
//                   value={newProduct.category}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Description"
//                   name="description"
//                   value={newProduct.description}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Price"
//                   name="price"
//                   value={newProduct.price}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Inventory Count"
//                   name="inventory_count"
//                   value={newProduct.inventory_count}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Threshold"
//                   name="threshold"
//                   value={newProduct.threshold}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" component="label">
//                   Upload Picture
//                   <input
//                     type="file"
//                     name="picture"
//                     onChange={handleFileChange}
//                     hidden
//                   />
//                 </Button>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   sx={{ mt: 2, backgroundColor: '#1976d2' }}
//                 >
//                   Add Product
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>

//         {/* Existing Products Table */}
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//             Existing Products
//           </Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Id</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Category</TableCell>
//                   <TableCell>Description</TableCell>
//                   <TableCell>Price</TableCell>
//                   {/* <TableCell>Inventory</TableCell> */}
//                   {/* <TableCell>Actions</TableCell> */}
//                   <TableCell>Items Present</TableCell>
//                   <TableCell>Add Items</TableCell>
//                   <TableCell>Edit Product</TableCell>
//                   <TableCell>Delete Product</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {products.map((product) => (
//                   <TableRow key={product.id}>
//                     <TableCell>{product.id}</TableCell>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>{product.category}</TableCell>
//                     <TableCell>
//                       <Button>👁️</Button>
//                     </TableCell>
//                     <TableCell>{product.price}</TableCell>
//                     <TableCell>{product.inventory_count}</TableCell>
//                     {/* <TableCell>
//                       <Button>➕</Button>
//                       <Button>✏️</Button>
//                       <Button>🗑️</Button>
//                     </TableCell> */}
//                     <TableCell>
//                       <Button>➕</Button>
//                     </TableCell>
//                     <TableCell>
//                       <Button>✏️</Button>
//                     </TableCell>
//                     <TableCell>
//                       <Button>🗑️</Button>
//                     </TableCell>
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

// export default Products;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   TextField,
//   Box,
//   Grid,
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


// function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     category: '',
//     description: '',
//     price: '',
//     inventory_count: '',
//     threshold: '',
//     picture: null,
//   });
//   const [view, setView] = useState('addProduct'); // state to toggle between "Add New Product" and "Existing Products"
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     axios
//       .get('/api/products/')
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setNewProduct({ ...newProduct, picture: e.target.files[0] });
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(newProduct).forEach((key) => {
//       formData.append(key, newProduct[key]);
//     });
//     axios
//       .post('/api/products/', formData)
//       .then(() => {
//         alert('Product added successfully!');
//         setNewProduct({
//           name: '',
//           category: '',
//           description: '',
//           price: '',
//           inventory_count: '',
//           threshold: '',
//           picture: null,
//         });
//       })
//       .catch((error) => console.error('Error adding product:', error));
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
//       {/* <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
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
//       </AppBar> */}

//       <Navbar />

//       {/* Products Page Content */}
//       <Box sx={{ p: 3, mt: 2 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
//           Products
//         </Typography>

//         {/* Buttons to toggle between "Add New Product" and "Existing Products" */}
//         <Box className="flex gap-4 mb-4">
//           <Button
//             variant="contained"
//             color={view === 'addProduct' ? 'primary' : 'default'}
//             onClick={() => setView('addProduct')}
//           >
//             Add New Product
//           </Button>
//           <Button
//             variant="contained"
//             color={view === 'existingProducts' ? 'primary' : 'default'}
//             onClick={() => setView('existingProducts')}
//           >
//             Existing Products
//           </Button>
//         </Box>

//         {/* Add New Product Form */}
//         {view === 'addProduct' && (
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//               Add New Product
//             </Typography>
//             <form onSubmit={handleAddProduct}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Product Name"
//                     name="name"
//                     value={newProduct.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Category"
//                     name="category"
//                     value={newProduct.category}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     multiline
//                     rows={3}
//                     label="Description"
//                     name="description"
//                     value={newProduct.description}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     fullWidth
//                     type="number"
//                     label="Price"
//                     name="price"
//                     value={newProduct.price}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     fullWidth
//                     type="number"
//                     label="Inventory Count"
//                     name="inventory_count"
//                     value={newProduct.inventory_count}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     fullWidth
//                     type="number"
//                     label="Threshold"
//                     name="threshold"
//                     value={newProduct.threshold}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button variant="contained" component="label">
//                     Upload Picture
//                     <input
//                       type="file"
//                       name="picture"
//                       onChange={handleFileChange}
//                       hidden
//                     />
//                   </Button>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     sx={{ mt: 2, backgroundColor: '#1976d2' }}
//                   >
//                     Add Product
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </Paper>
//         )}

//         {/* Existing Products Table */}
//         {view === 'existingProducts' && (
//           <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//               Existing Products
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Id</TableCell>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Category</TableCell>
//                     {/* <TableCell>Description</TableCell> */}
//                     <TableCell>Price</TableCell>
//                     <TableCell>Stock quantity</TableCell>
//                     <TableCell>View</TableCell>
//                     <TableCell>Add to inventory</TableCell>
//                     <TableCell>Edit Product</TableCell>
//                     <TableCell>Delete Product</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {products.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell>{product.id}</TableCell>
//                       <TableCell>{product.name}</TableCell>
//                       <TableCell>{product.category}</TableCell>
//                       {/* <TableCell>
//                         <Button>👁️</Button>
//                       </TableCell> */}
//                       <TableCell>{product.price}</TableCell>
//                       <TableCell>{product.stock_quantity}</TableCell>
//                       <TableCell>
//                         <Button>👁️</Button>
//                       </TableCell>
//                       <TableCell>
//                         <Button>➕</Button>
//                       </TableCell>
//                       <TableCell>
//                         <Button>✏️</Button>
//                       </TableCell>
//                       <TableCell>
//                         <Button>🗑️</Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default Products;















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Navbar from './Navbar';
import { Visibility, Add, Edit, Delete } from '@mui/icons-material';


function Products() {
  const [view, setView] = useState('addProduct'); // State for toggling sections
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    inventory_count: '',
    threshold: '',
    picture: null,
  });
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddInventoryDialogOpen, setIsAddInventoryDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inventoryToAdd, setInventoryToAdd] = useState(0);
  const [updatedProduct, setUpdatedProduct] = useState({});

  const [filteredProducts, setFilteredProducts] = useState([]); // Holds filtered products
  const [searchQuery, setSearchQuery] = useState(''); // Holds search input value

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    // Fetch products created by the logged-in user
    //const token = localStorage.getItem('accessToken');
    axios
      .get('http://127.0.0.1:8198/api/get/user_product/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {setProducts(response.data);
        setFilteredProducts(response.data); // Initially set filtered products to all products
  })
      .catch((error) => console.error('Error fetching products:', error));
  }, [token]);

    // Handle Search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        if (query.trim() === '') {
        setFilteredProducts(products); // Reset to all products if search is cleared
        return;}

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
        
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, picture: e.target.files[0] });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    const token = localStorage.getItem('accessToken');
    axios
      .post('http://127.0.0.1:8198/api/add_product', formData, {
        headers: { Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
         },
      })
      .then(() => {
        alert('Product added successfully!');
        setNewProduct({
          name: '',
          category: '',
          description: '',
          price: '',
          inventory_count: '',
          threshold: '',
          picture: null,
        });
        // Refresh products list
        axios
          .get('http://127.0.0.1:8198/api/get/user_product/', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => setProducts(response.data));
      })
      .catch((error) => {
        setError('Error adding product. Please try again.');
        console.error(error);
      });
  };

  // Dialog handlers
  const handleDialogOpen = (type, product) => {
    setSelectedProduct(product);
    if (type === 'details') setIsDetailsDialogOpen(true);
    if (type === 'addInventory') setIsAddInventoryDialogOpen(true);
    if (type === 'edit') {
      setUpdatedProduct(product);
      setIsEditDialogOpen(true);
    }
    if (type === 'delete') setIsDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDetailsDialogOpen(false);
    setIsAddInventoryDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
    setInventoryToAdd(0);
    setUpdatedProduct({});
  };

  // Add to inventory
  const handleAddInventory = () => {
    axios
      .patch(
        `http://127.0.0.1:8198/api/update_product/${selectedProduct.id}`,
        { stock_quantity: selectedProduct.stock_quantity + parseInt(inventoryToAdd) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert('Inventory updated successfully!');
        setProducts((prev) =>
          prev.map((product) =>
            product.id === selectedProduct.id
              ? { ...product, stock_quantity: product.stock_quantity + parseInt(inventoryToAdd) }
              : product
          )
        );
        handleDialogClose();
      })
      .catch((error) => console.error('Error updating inventory:', error));
  };

  // Edit product
  const handleEditProduct = () => {
    axios
      .patch(
        `http://127.0.0.1:8198/api/update_product/${updatedProduct.id}`,
        // updatedProduct,
        {
            name:updatedProduct.name,
            category: updatedProduct.category,
            description: updatedProduct.description,
            price: updatedProduct.price,
            threshold: updatedProduct.threshold,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        // console.log('demo-', updatedProduct);
        alert('Product updated successfully!');
        setProducts((prev) =>
          prev.map((product) =>
            product.id === updatedProduct.id ? { ...updatedProduct } : product
          )
        );
        handleDialogClose();
      })
      .catch((error) => setError('Error updating product. Please try again.'));
  };

  // Delete product
  const handleDeleteProduct = () => {
    axios
      .delete(`http://127.0.0.1:8198/api/delete_product/${selectedProduct.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Product deleted successfully!');
        setProducts((prev) => prev.filter((product) => product.id !== selectedProduct.id));
        handleDialogClose();
      })
      .catch((error) => console.error('Error deleting product:', error));
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        {/* Content */}
              <Box sx={{ p: 3 , mt:2}}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                   <center> <span style={{color:'#BF40BF'}}>Prod</span>ucts </center>
                </Typography>
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
    
        <Button
          variant={view === 'addProduct' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => setView('addProduct')}
          sx={{ mr: 2}}
        >
          Add New Product
        </Button>
        <Button
          variant={view === 'existingProducts' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => setView('existingProducts')}
          
        >
          Existing Products
        </Button>
    </Box>

      {/* Add New Product Section */}
      {view === 'addProduct' && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Product
          </Typography>
          <form onSubmit={handleAddProduct}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  name="name"
                  fullWidth
                  required
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Category"
                  name="category"
                  fullWidth
                  required
                  value={newProduct.category}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={3}
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  required
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Initial Inventory Count"
                  name="inventory_count"
                  type="number"
                  fullWidth
                  required
                  value={newProduct.inventory_count}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Minimum Threshold"
                  name="threshold"
                  type="number"
                  fullWidth
                  required
                  value={newProduct.threshold}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" component="label" sx={{backgroundColor:'#BF40BF'}}>
                  Upload Picture
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </Grid>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Grid item xs={12}>
                <Button variant="contained" color="success" type="submit" >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      {/* Existing Products Section */}
      {view === 'existingProducts' && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor:"white" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Existing Products
          </Typography>
          {/* Search Bar */}
          <TextField
              label="Search by Product Name"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              value={searchQuery}
              onChange={handleSearch}
            />
          <TableContainer>
            {/* <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Inventory Count</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>
                      <Button color="secondary">Edit</Button>
                      <Button color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
            {/* <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Inventory Count</TableCell>
                  <TableCell>Add To Inventory</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDialogOpen('details', product)}>
                        <Visibility />
                      </Button>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDialogOpen('addInventory', product)}>
                        <Add />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDialogOpen('edit', product)}>
                        <Edit />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDialogOpen('delete', product)}>
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Inventory Count</TableCell>
                <TableCell>Add To Inventory</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category_name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDialogOpen('details', product)} color="secondary">
                      <Visibility />
                    </Button>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock_quantity}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDialogOpen('addInventory', product)} color="secondary">
                      <Add />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDialogOpen('edit', product)} color="secondary">
                      <Edit />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDialogOpen('delete', product)} color="secondary">
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
          
        {/* Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Product Details</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <>
                <Typography>ID: {selectedProduct.id}</Typography>
                <Typography>Name: {selectedProduct.name}</Typography>
                <Typography>Category: {selectedProduct.category_name}</Typography>
                <Typography>Description: {selectedProduct.description}</Typography>
                <Typography>Price: ${selectedProduct.price}</Typography>
                <Typography>Threshold: {selectedProduct.threshold}</Typography>
                {selectedProduct.image_url && (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    style={{ maxWidth: '100%', marginTop: '10px' }}
                  />
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Add To Inventory Dialog */}
        <Dialog open={isAddInventoryDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add To Inventory</DialogTitle>
          <DialogContent>
            <TextField
              type="number"
              label="Quantity"
              fullWidth
              value={inventoryToAdd}
              onChange={(e) => setInventoryToAdd(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddInventory}>Submit</Button>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              label="Category"
              fullWidth
              value={updatedProduct.category_name}
              onChange={(e) =>
                setUpdatedProduct((prev) => ({ ...prev, category: e.target.value }))
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={updatedProduct.description}
              onChange={(e) =>
                setUpdatedProduct((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <TextField
              label="Threshold"
              type="number"
              fullWidth
              value={updatedProduct.threshold}
              onChange={(e) =>
                setUpdatedProduct((prev) => ({ ...prev, threshold: e.target.value }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditProduct}>Save</Button>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the product "{selectedProduct?.name}"?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteProduct}>Yes</Button>
            <Button onClick={handleDialogClose}>No</Button>
          </DialogActions>
        </Dialog>
        </Paper>
        
      )}
    </Box>
    </Box>
  );
}

export default Products;