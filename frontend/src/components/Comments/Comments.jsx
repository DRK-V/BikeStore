import React, { useState } from 'react';

const Comments = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(props.content);

  const handleDeleteComment = () => {
    setIsDeleting(true);
    console.log('ID del comentario a eliminar:', props.id);
    fetch(`http://localhost:3060/eliminar-comentario/${props.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Comentario eliminado con éxito');
        
        } else {
          console.error('Error al eliminar el comentario');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el comentario:', error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleEditComment = () => {
    if (props.id === undefined) {
      console.error('ID de comentario no definido');
      return;
    }

    console.log('Comentario a editar:', props.id);

    fetch(`http://localhost:3060/editar-comentario/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto: newContent }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Comentario editado con éxito');
          setIsEditing(false);
         
        } else {
          console.error('Error al editar el comentario');
        }
      })
      .catch((error) => {
        console.error('Error al editar el comentario:', error);
      });
  };

  return (
    <>
      <section className="section_comment_profile">
        <div className="container_icon_user">
          <i className="icon_user"></i>
        </div>
        <div className="text_container">
          <header>
            <h2 className="text_name">{props.name}</h2>
            <h3 className="text_time">{props.time}</h3>
          </header>

          
          {isEditing ? (
            <textarea
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              maxLength={255}
            />
          ) : (
            <p className="text_content">{props.content}</p>
          )}

          {isDeleting ? (
            <p>Eliminando...</p>
          ) : (
            <>
              {props.codigoCliente === props.idCliente && (
                <>
                  <div className="button_container">
                    {isEditing ? (
                      <button
                        className='buton_editar guardar'
                        onClick={handleEditComment}
                      >
                        
                      </button>
                    ) : (
                      <button
                        className='buton_editar'
                        onClick={() => setIsEditing(true)}
                      >
                      </button>
                    )}
                    <button
                      className='botun_borrar'
                      onClick={handleDeleteComment}
                    >
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Comments;
