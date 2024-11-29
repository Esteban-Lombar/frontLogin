import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserView from './components/UserView';
import AdminView from './components/AdminView';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Simular autenticación desde localStorage
  useEffect(() => {
    const authStatus = JSON.parse(localStorage.getItem('isAuthenticated'));
    const adminStatus = JSON.parse(localStorage.getItem('isAdmin'));

    if (authStatus) setIsAuthenticated(authStatus);
    if (adminStatus) setIsAdmin(adminStatus);
  }, []);

  // Guardar el estado en localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAuthenticated, isAdmin]);

  return (
    <Router>
      <Routes>
        {/* Ruta raíz redirige según autenticación */}
        <Route
          path="/"
          element={isAuthenticated ? (isAdmin ? <AdminView /> : <UserView />) : <Navigate to="/login" />}
        />
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
        {/* Ruta de registro */}
        <Route path="/register" element={<Register />} />
        {/* Ruta del usuario normal */}
        <Route path="/user" element={isAuthenticated && !isAdmin ? <UserView /> : <Navigate to="/login" />} />
        {/* Ruta del administrador */}
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminView /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
