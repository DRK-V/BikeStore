import React, { useState, useEffect } from 'react';
import '../../css/Comments/Comments.css';
import Comments from './Comments';

const Container_comments = () => {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    // Hacer una solicitud a la API para obtener los comentarios
    fetch('http://localhost:3060/coments')
      .then((response) => response.json())
      .then((data) => {
        setCommentsData(data); // Establecer los datos de los comentarios en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los comentarios:', error);
      });
  }, []); // El [] como segundo argumento significa que se ejecutará una vez al montar el componente

  return (
    <div className='Comments'>
      <h1 className="title_comments">Comentarios</h1>
      {commentsData.map((comment, index) => (
        <Comments
          key={index}
          name={comment.clientName}
          time={comment.fecha_comentario}
          content={comment.texto}
        />
      ))}
    </div>
  );
};

export default Container_comments;
