import React, { useState, useEffect } from 'react';
import '../../css/Comments/Comments.css';
import Comments from './Comments';
import { useComenContext } from '../comencontex'; 
import { useAuth } from '../AuthContext';

const Container_comments = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const comenContext = useComenContext(); 
  const authContext = useAuth(); 

  useEffect(() => {
    setIsLoading(true);

    const fetchComments = async () => {
      try {
       
        const codigo_producto = comenContext.selectedProductId;

        if (!codigo_producto) {
          console.error('El código del producto no es válido');
          return;
        }

       
        const response = await fetch(`http://localhost:3060/coments/${codigo_producto}`);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los comentarios');
        }

        const data = await response.json();
        console.log('Comentarios obtenidos:', data);

        const promises = data.map((comment) => {
          const codigo_cliente = comment.codigo_cliente;
          return fetch(`http://localhost:3060/cliente/${codigo_cliente}`)
            .then((response) => response.json())
            .then((userData) => {
              console.log(`Nombre de usuario para el cliente ${codigo_cliente}:`, userData.nombre_usuario);
              return {
                ...comment,
                clientName: userData.nombre_usuario || 'Nombre no encontrado',
              };
            })
            .catch((error) => {
              console.error(`Error al obtener el nombre de usuario para el comentario ${comment.id}:`, error);
              return comment;
            });
        });

     
        const commentsWithNames = await Promise.all(promises);

        console.log('Comentarios con nombres de usuario:', commentsWithNames);
        setCommentsData(commentsWithNames);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error('Error al cargar comentarios:', error);
      }
    };

    fetchComments();
  }, [comenContext.selectedProductId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = () => {
   
    if (!authContext.isLoggedIn) {
      console.error('El usuario no está autenticado');
      return;
    }

    const codigo_cliente = authContext.user.id_cliente; 
    const codigo_producto = comenContext.selectedProductId; 

    
    if (!codigo_producto) {
      console.error('El código del producto no es válido');
      return;
    }

    
    fetch('http://localhost:3060/comentarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        codigo_cliente,
        codigo_producto,
        texto: newComment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Comentario enviado exitosamente:', data);

        
        const commentWithUserName = {
          codigo_cliente,
          clientName: authContext.user.nombre_usuario || 'Nombre no encontrado',
          fecha_creacion: new Date().toISOString(),
          texto: newComment,
        };

        setCommentsData([...commentsData, commentWithUserName]);
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error al enviar el comentario:', error);
      });
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
      {isLoading ? (
        <p>Cargando comentarios...</p>
      ) : error ? (
        <p>Error al cargar comentarios: {error.message}</p>
      ) : (
        <>
          {commentsData.map((comment, index) => (
            <Comments
              key={index}
              name={comment.clientName}
              time={formatDateTime(comment.fecha_creacion)}
              content={comment.texto}
            />
          ))}
          {authContext.isLoggedIn && ( 
            <form className='for_coment' onSubmit={(e) => {
              e.preventDefault();
              submitComment();
            }}>
              <input
                className='coments'
                type="text"
                placeholder="Escribe tu comentario"
                value={newComment}
                onChange={handleCommentChange}
              />
              <button className='coments_buton' type="submit">
                <span class="material-symbols-outlined">send</span>
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Container_comments;
