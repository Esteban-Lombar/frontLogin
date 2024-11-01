import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserView from './components/UserView';
import AdminView from './components/AdminView';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Para simular acceso de admin

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? (isAdmin ? <AdminView /> : <UserView />) : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={isAuthenticated ? <UserView /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAdmin ? <AdminView /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
