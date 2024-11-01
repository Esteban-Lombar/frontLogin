import React, { useState } from 'react';
import '../styles/login.css';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="login-container">
      <h2>Inicia sesión en tu cuenta</h2>
      <p>O regístrate si aún no tienes una cuenta</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo electrónico"
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
        <div className="remember-container">
          <label>
            <input type="checkbox" /> Recuérdame
          </label>
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>No tienes una cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
};

export default Login;
