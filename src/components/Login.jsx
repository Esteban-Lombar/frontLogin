import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null); // Estado para manejar el archivo
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, contrasena: password }),
    });

    const data = await response.json();

    if (data.success) {
      setIsAuthenticated(true);
      setIsAdmin(data.isAdmin);

      if (data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      setMessage('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Por favor selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.fileUrl) {
        setMessage(`Archivo subido con éxito: ${data.fileUrl}`);
        
        // Redirige a la página donde se muestra la imagen
        navigate(`/view-image?url=${encodeURIComponent(data.fileUrl)}`);
      } else {
        setMessage('Error al subir el archivo.');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setMessage('Hubo un problema al subir el archivo.');
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

      {/* Sección de subida de archivos */}
      <div className="file-upload-container">
        <h3>Subir archivo</h3>
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleFileUpload}>
          Subir archivo
        </button>
      </div>

      {message && <p className="result-message">{message}</p>}
      <p>No tienes una cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
};

export default Login;
