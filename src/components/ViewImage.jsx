// src/components/ViewImage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewImage = () => {
  const location = useLocation(); // Para acceder a la URL de la query string
  const queryParams = new URLSearchParams(location.search); // Extraemos los parámetros de la URL
  const fileUrl = queryParams.get('url'); // Obtenemos el valor del parámetro 'url'

  return (
    <div>
      <h2>Vista de la Imagen</h2>
      {fileUrl ? (
        <img src={fileUrl} alt="Imagen subida" style={{ maxWidth: '100%' }} />
      ) : (
        <p>No se ha recibido la URL del archivo.</p>
      )}
    </div>
  );
};

export default ViewImage;
