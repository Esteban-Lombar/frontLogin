import React, { useEffect, useState } from 'react';
import '../styles/adminView.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

const AdminView = () => {
  const [codigos, setCodigos] = useState([]);
  const [ganadores, setGanadores] = useState(0);
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    // Llamada a la API para obtener los códigos
    const fetchCodigos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/codigo'); // Cambia a la ruta correcta
        const data = await response.json();

        setCodigos(data); // Asegúrate de que 'data' sea un array de objetos

        // Contar cuántos códigos son ganadores
        const codigosGanadores = data.filter(codigo => [1, 5, 10, 20, 50].includes(codigo.numero));
        setGanadores(codigosGanadores.length);

        // Contar los códigos que no han ganado
        setIntentos(data.length - codigosGanadores.length);
      } catch (error) {
        console.error('Error al obtener los códigos:', error);
      }
    };

    fetchCodigos();
  }, []);

  return (
    <div className="admin-container">
      <h2>Vista de Administrador</h2>
      <p>Total de códigos ingresados: {codigos.length}</p>
      <p>Códigos ganadores: {ganadores}</p>
      <p>Códigos que deben seguir intentando: {intentos}</p>

      <div className="codigo-list">
        <h3>Detalles de los códigos:</h3>
        <ul>
          {codigos.map((codigo, index) => (
            <li key={index}>
              Código: {codigo.numero} - {([1, 5, 10, 20, 50].includes(codigo.numero) ? 'Ganador' : 'Intentar de nuevo')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminView;
