// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Products from './components/Products';
// import InventoryLog from './components/InventoryLog';
// import Orders from './components/Orders';
// import Profile from './components/Profile';
// import Navbar from './components/Navbar';
// import Graphs from './components/Graphs';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/inventory-log" element={<InventoryLog />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/graphs" element={<Graphs />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;









import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import InventoryLog from './components/InventoryLog';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Graphs from './components/Graphs';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} />}
        />
        <Route
          path="/products"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={Products} />}
        />
        <Route
          path="/inventory-log"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={InventoryLog} />}
        />
        <Route
          path="/orders"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={Orders} />}
        />
        <Route
          path="/graphs"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={Graphs} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={Profile} />}
        />
      </Routes>
    </Router>
  );
}

export default App;