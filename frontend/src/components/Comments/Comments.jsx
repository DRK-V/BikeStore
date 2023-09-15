//comment
import React from 'react'
const Comments = (props) => {
  console.log("Renderizando el componente Comments");

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
            {props.isEditable && (
              <button
              className="edit_button"
              onClick={() => props.onEditClick(props.commentId)}
            >
              Editar
            </button>
            
            )}
          </header>
          <p className="text_content">{props.content}</p>
        </div>
      </section>
    </>
  );
};

export default Comments;
