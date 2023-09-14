import React, { useState } from "react";
import { useComenContext } from "../comencontex";

const Comments = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(props.content);
  const [commentIdToEdit, setCommentIdToEdit] = useState(null);

  const comenContext = useComenContext(); // Obtén el contexto ComenContext

  const handleSaveClick = async () => {
    try {
      // Obtén el codigo_cliente desde el contexto
      const codigo_cliente = comenContext.user.id_cliente;

      // Obtén el id_comentario guardado en el estado local
      const commentId = commentIdToEdit;

      // Realiza la solicitud para editar el comentario usando commentId
      const editCommentUrl = `http://localhost:3060/editar-comentario/${commentId}`;

      // Resto del código para editar el comentario...
    } catch (error) {
      console.error("Error al editar el comentario:", error);
    }
  };
  const handleEditClick = (commentId) => {
    setIsEditing(true);
    // Guarda el id_comentario en el estado local
    setCommentIdToEdit(commentId);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(props.content);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
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
            <>
              <textarea
                className="text_content_edit"
                value={editedContent}
                onChange={handleContentChange}
              />
              <button className="save_button" onClick={handleSaveClick}>
                Guardar
              </button>
              <button className="cancel_button" onClick={handleCancelClick}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <p className="text_content">{props.content}</p>
              <button
                className="edit_button"
                onClick={() => handleEditClick(props.id_comentario)}
              >
                Editar
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Comments;
