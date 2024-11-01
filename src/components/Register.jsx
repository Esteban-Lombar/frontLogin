import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Usuario ${username} registrado`);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <p>O inicia sesión si ya tienes una cuenta</p>
      <form className="register-form" onSubmit={handleSubmit}>
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
        <button type="submit">Registrarse</button>
      </form>
      <button className="btn-back" onClick={() => navigate('/')}>
        Volver al Login
      </button>
    </div>
  );
};

export default Register;
