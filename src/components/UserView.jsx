import React, { useState } from 'react';
import '../styles/userView.css';

const UserView = () => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleCheckCode = (e) => {
    e.preventDefault();
    // Lógica simple para determinar si el código es ganador
    const codigoNum = parseInt(codigo);
    if (codigoNum >= 0 && codigoNum <= 99) {
      if ([1, 5, 10, 20, 50].includes(codigoNum)) {
        setMensaje('¡Felicidades, has ganado!');
      } else {
        setMensaje('Lo siento, sigue intentando.');
      }
    } else {
      setMensaje('Por favor, ingresa un código válido entre 00 y 99.');
    }
    setCodigo('');
  };

  return (
    <div className="user-container">
      <h2>Bienvenido, Usuario</h2>
      <p>Ingresa tu código para verificar si has ganado</p>
      <form className="user-form" onSubmit={handleCheckCode}>
        <input
          type="number"
          placeholder="Ingresa un código (00 - 99)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <button type="submit">Verificar Código</button>
      </form>
      {mensaje && <p className="result-message">{mensaje}</p>}
    </div>
  );
};

export default UserView;
