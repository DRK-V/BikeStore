import React, { useState, useEffect } from 'react';
import '../../css/Comments/Comments.css';
import Comments from './Comments';

const Container_comments = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    // Hacer una solicitud a la API para obtener los comentarios
    fetch('http://localhost:3060/coments')
      .then((response) => response.json())
      .then((data) => {
        // Obtener los comentarios
        setCommentsData(data);

        // Obtener el código de cliente único de los comentarios
        const uniqueClientCodes = Array.from(new Set(data.map((comment) => comment.codigo_cliente)));

        // Hacer una solicitud para obtener el nombre de usuario de cada código de cliente
        uniqueClientCodes.forEach((clientCode) => {
          fetch(`http://localhost:3060/cliente/${clientCode}`)
            .then((response) => response.json())
            .then((userData) => {
              // Actualizar los datos del cliente en los comentarios
              setCommentsData((prevData) =>
                prevData.map((comment) => {
                  if (comment.codigo_cliente === clientCode) {
                    return {
                      ...comment,
                      clientName: userData.nombre_usuario,
                    };
                  }
                  return comment;
                })
              );
            })
            .catch((error) => {
              console.error(`Error al obtener el nombre de usuario para el código de cliente ${clientCode}:`, error);
            });
        });
      })
      .catch((error) => {
        console.error('Error al obtener los comentarios:', error);
      });
  }, []); // El [] como segundo argumento significa que se ejecutará una vez al montar el componente
  const handleCommentChange = (e) => {
    // Actualizar el estado del nuevo comentario cuando se modifica el campo de entrada
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Enviar el nuevo comentario a la API o realizar cualquier acción necesaria

    // Después de enviar el comentario, puedes actualizar la lista de comentarios si es necesario.

    // Limpia el campo de entrada después de enviar el comentario
    setNewComment('');
  };
  return (
    <div className='Comments'>
      <h1 className="title_comments">Comentarios</h1>
      {commentsData.map((comment, index) => (
        <Comments
          key={index}
          name={comment.clientName}
          time={comment.fecha_creacion}
          content={comment.texto}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu comentario"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
    
  );
};

export default Container_comments;
