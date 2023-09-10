import React, { useState, useEffect } from "react";
import { FiX, FiUser, FiSettings, FiShoppingBag, FiUserPlus, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import logoExample from "../assets/profile.jpg";

export const Menu_profile = ({
    is_link_active,
    is_active,
    onClose,
    activateMyUsu,
    activateMyConfig,
    activateMyOrder,
    activateManage
}) => {
    const { user, logout } = useAuth();
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        // Cargar la imagen del usuario si está disponible
        if (user && user.imagen_usuario) {
            setImageSrc(`../../public/${user.imagen_usuario}`);
        }
    }, [user]);

    let url_profile = is_link_active ? "#profile" : "/Usuario_usu";
    let rol = "";

    const handleLogout = () => {
        logout();
        onClose();
    };

    const handleImageUpload = async (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch(`http://localhost:3060/user/${user.id_cliente}/updateImage`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Current-Image-Path': user.imagen_usuario, // Ruta actual de la imagen
                    'New-Image-Path': `profile_images/user_${user.id_cliente}/${image.name}` // Nueva ruta deseada
                }
            });

            if (response.status === 200) {
                console.log('Imagen actualizada exitosamente');

                // Actualizar el estado para reflejar la nueva imagen
                setImageSrc(`../../public/profile_images/user_${user.id_cliente}/${image.name}`);
            } else {
                console.error('Error al actualizar la imagen');
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
        }
    };

    if (user && !user.rol_usuario) {
        rol = "usuario";
    } else if (user) {
        rol = user.rol_usuario;
    } else {
        rol = "usuario";
    }
    const imageClasses = imageSrc ? "profile-image" : "profile-image image-no-found";

    return (
        <div className={`menu_profile ${is_active ? "active" : ""}`}>
            <form className="profile-section">
                <button
                    type="button"
                    className={is_link_active ? "close-button-profile-desactive" : "close-button-profile"}
                    onClick={onClose}
                >
                    <FiX />
                </button>
                <label className="profile-image-label">
                    <input
                        type="file"
                        accept="image/*"
                        className="profile-image-input"
                        name="image" // Asegúrate de que el nombre sea "image"
                        onChange={handleImageUpload}
                    />
                    <img src={imageSrc || logoExample} alt="" className={imageClasses} />
                </label>
                <h3>{user ? user.nombre_usuario : "Nombre de Usuario"}</h3>
            </form>

            <ul className="options-list">
                <Link to={{ pathname: '/Usuario_usu', search: '?section=profile' }} onClick={activateMyUsu}>
                    <li>
                        <FiUser />
                        <span>Perfil</span>
                    </li>
                </Link>
                <Link to={{ pathname: '/Usuario_usu', search: '?section=settings' }}>
                    <li onClick={activateMyConfig}>
                        <FiSettings />
                        <span>Configuraciones</span>
                    </li>
                </Link>
                <Link to={{ pathname: '/Usuario_usu', search: '?section=orders' }}>
                    <li onClick={activateMyOrder}>
                        <FiShoppingBag />
                        <span>Pedidos</span>
                    </li>
                </Link>
                <Link to={{ pathname: '/Usuario_usu', search: '?section=manage' }} className={rol === "Administrador" ? '' : 'desactive_option'} onClick={activateManage}>
                    <li>
                        <FiUserPlus />
                        <span>Administrar</span>
                    </li>
                </Link>
                <li onClick={handleLogout}>
                    <FiLogOut />
                    <span>Cerrar Sesión</span>
                </li>
            </ul>
        </div>
    );
};
