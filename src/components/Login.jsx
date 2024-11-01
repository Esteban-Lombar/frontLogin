import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, contrasena: password })
    });

    const data = await response.json();

    // Asegúrate de que la respuesta sea correcta
    if (data.success) {
      setIsAuthenticated(true);
      setIsAdmin(data.isAdmin);
      navigate('/user'); // Asegúrate de que esta ruta sea correcta
    } else {
      setMessage('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <h2>Inicia sesión en tu cuenta</h2>
      <p>O regístrate si aún no tienes una cuenta</p>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
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
      {message && <p className="result-message">{message}</p>}
      <p>No tienes una cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
};

export default Login;
