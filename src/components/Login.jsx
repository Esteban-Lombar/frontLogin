import React, { useState } from 'react';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para verificar usuario y contraseña
    // Por ejemplo, una llamada a una API.
    // Simulación de autenticación:
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (username === 'user' && password === 'user') {
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>No tienes una cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
};

export default Login;
