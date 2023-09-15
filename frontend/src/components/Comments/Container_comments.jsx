import React, { useState, useEffect } from "react";
import "../../css/Comments/Comments.css";
import Comments from "./Comments";
import { useComenContext } from "../comencontex";
import { useAuth } from "../AuthContext";

const Container_comments = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const comenContext = useComenContext();
  const authContext = useAuth();
  const [isCommentValid, setIsCommentValid] = useState(false);
  const [editedComment, setEditedComment] = useState(""); // Nuevo estado para el comentario editado
  const [editingCommentId, setEditingCommentId] = useState(null); // Nuevo estado para el ID del comentario que se está editando

  useEffect(() => {
    setIsLoading(true);

    const fetchComments = async () => {
      try {
        const codigo_producto = comenContext.selectedProductId;

        if (!codigo_producto) {
          console.error("El código del producto no es válido");
          return;
        }

        const response = await fetch(
          `http://localhost:3060/coments/${codigo_producto}`
        );
        if (!response.ok) {
          throw new Error("No se pudieron cargar los comentarios");
        }

        const data = await response.json();
        console.log("Comentarios obtenidos:", data);

        const promises = data.map((comment) => {
          const codigo_cliente = comment.codigo_cliente;
          return fetch(`http://localhost:3060/cliente/${codigo_cliente}`)
            .then((response) => response.json())
            .then((userData) => {
              console.log(
                `Nombre de usuario para el cliente ${codigo_cliente}:`,
                userData.nombre_usuario
              );
              return {
                ...comment,
                clientName: userData.nombre_usuario || "Nombre no encontrado",
              };
            })
            .catch((error) => {
              console.error(
                `Error al obtener el nombre de usuario para el comentario ${comment.id}:`,
                error
              );
              return comment;
            });
        });

        const commentsWithNames = await Promise.all(promises);

        console.log("Comentarios con nombres de usuario:", commentsWithNames);
        setCommentsData(commentsWithNames);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error("Error al cargar comentarios:", error);
      }
    };

    fetchComments();
  }, [comenContext.selectedProductId]);

  const handleCommentChange = (e) => {
    const comment = e.target.value;
    setNewComment(comment);

    if (comment.length >= 20) {
      setIsCommentValid(true);
    } else {
      setIsCommentValid(false);
    }
  };

  const submitComment = () => {
    if (!authContext.isLoggedIn) {
      console.error("El usuario no está autenticado");
      return;
    }

    const codigo_cliente = authContext.user.id_cliente;
    const codigo_producto = comenContext.selectedProductId;

    if (!codigo_producto) {
      console.error("El código del producto no es válido");
      return;
    }

    fetch("http://localhost:3060/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo_cliente,
        codigo_producto,
        texto: newComment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Comentario enviado exitosamente:", data);

        const commentWithUserName = {
          codigo_cliente,
          clientName: authContext.user.nombre_usuario || "Nombre no encontrado",
          fecha_creacion: new Date().toISOString(),
          texto: newComment,
        };

        setCommentsData([...commentsData, commentWithUserName]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error al enviar el comentario:", error);
      });
  };

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
    // Establece el texto editado al contenido actual del comentario
    const commentToEdit = commentsData.find((comment) => comment.id === commentId);
    setEditedComment(commentToEdit.texto);
    console.log("Editando comentario con ID:", commentId);
  };
  
  

  const submitEdit = () => {
    // Verifica si se está editando un comentario
    if (editingCommentId) {
      const editedCommentIndex = commentsData.findIndex(
        (comment) => comment.id === editingCommentId
      );

      if (editedCommentIndex !== -1) {
        const editedCommentData = {
          codigo_cliente: authContext.user.id_cliente,
          codigo_producto: comenContext.selectedProductId,
          texto: editedComment,
        };

        fetch(`http://localhost:3060/editar-comentario/${editingCommentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedCommentData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Comentario editado exitosamente:", data);

            // Actualiza el comentario editado en la lista de comentarios
            const updatedCommentsData = [...commentsData];
            updatedCommentsData[editedCommentIndex].texto = editedComment;
            setCommentsData(updatedCommentsData);

            // Limpia el texto editado y el ID de edición
            setEditedComment("");
            setEditingCommentId(null);
            console.log("Comentario editado con ID:", editingCommentId);
          })
          .catch((error) => {
            console.error("Error al editar el comentario:", error);
          });
      }
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="Comments">
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
    isEditable={comment.codigo_cliente === authContext.user.id_cliente}
    onEditClick={(commentId) => handleEditClick(commentId)}
    commentId={comment.id} // Pasa el ID del comentario
  />
))}

          {authContext.isLoggedIn && (
            <form
              className="for_coment"
              onSubmit={(e) => {
                e.preventDefault();
                if (editingCommentId === null) {
                  // Si no se está editando un comentario, envía uno nuevo
                  submitComment();
                } else {
                  // Si se está editando un comentario, envía la edición
                  submitEdit();
                }
              }}
            >
              {editingCommentId === null ? ( // Cambia el texto del botón según si se está editando o enviando un nuevo comentario
                <input
                  className="coments"
                  type="text"
                  placeholder="Escribe tu comentario"
                  value={newComment}
                  onChange={handleCommentChange}
                />
              ) : (
                <textarea
                  className="coments"
                  placeholder="Editar comentario..."
                  value={editedComment}
                  onChange={handleEditChange}
                />
              )}
              <button
                className="coments_buton"
                type="submit"
                disabled={
                  !isCommentValid || (editingCommentId !== null && editedComment === "")
                } // Deshabilita el botón si no es un comentario válido o el campo de edición está vacío
              >
                {editingCommentId === null ? "Enviar" : "Guardar"} {/* Cambia el texto del botón según si se está editando o enviando un nuevo comentario */}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Container_comments;
