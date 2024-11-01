import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, fechaDeNacimiento, cedula, correo, celular, ciudad, contrasena: password })
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Registro exitoso. Puedes iniciar sesión.');
        navigate('/login');
      } else {
        setMessage('Error en el registro. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMessage('Error en el servidor. Intenta nuevamente más tarde.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <p>O inicia sesión si ya tienes una cuenta</p>
      <form className="register-form" onSubmit={handleRegister}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="date" placeholder="Fecha de Nacimiento" value={fechaDeNacimiento} onChange={(e) => setFechaDeNacimiento(e.target.value)} required />
        <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        <input type="tel" placeholder="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} required />
        <input type="text" placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p className="result-message">{message}</p>}
      <button className="btn-back" onClick={() => navigate('/login')}>Volver al Login</button>
    </div>
  );
};

export default Register;
