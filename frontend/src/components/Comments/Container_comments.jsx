import React, { useState, useEffect } from 'react';
import '../../css/Comments/Comments.css';
import Comments from './Comments';

const Container_comments = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    
    fetch('http://localhost:3060/coments')
      .then((response) => response.json())
      .then((data) => {
       
        setCommentsData(data);

      
        const uniqueClientCodes = Array.from(new Set(data.map((comment) => comment.codigo_cliente)));

        
        uniqueClientCodes.forEach((clientCode) => {
          fetch(`http://localhost:3060/cliente/${clientCode}`)
            .then((response) => response.json())
            .then((userData) => {
            
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
  }, []); 
  const handleCommentChange = (e) => {
 
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setNewComment('');
  };
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className='Comments'>
      <h1 className="title_comments">Comentarios</h1>
      {commentsData.map((comment, index) => (
        <Comments
          key={index}
          name={comment.clientName}
          time={formatDateTime(comment.fecha_creacion)}
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
