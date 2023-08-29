import React, { useState } from 'react';
import { FiX, FiUser, FiSettings, FiShoppingBag, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export const Menu_profile = ({ is_link_active, is_active, onClose, activateMyUsu, activateMyConfig, activateMyOrder }) => {
    const { user, logout } = useAuth();
    let url_profile = is_link_active ? '#profile' : '/Usuario_usu';
    let rol = "";
    const [selectedImage, setSelectedImage] = useState(null);

    const handleLogout = () => {
        logout();
        onClose();
    };

    const handleImageUpload = async (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);

        try {
            const formData = new FormData();
            formData.append('image', image);

            const response = await fetch(`http://localhost:3060/api/user/${user.id_cliente}/updateImage`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Imagen actualizada exitosamente');
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

    const imageClasses = selectedImage || (user && user.imageSrc) ? "profile-image" : "profile-image image-no-found";

    return (
        <>
            <div className={`menu_profile ${is_active ? "active" : ""}`}>
                <div className="profile-section">
                    <button className={is_link_active ? "close-button-profile-desactive" : "close-button-profile"} onClick={onClose}>
                        <FiX />
                    </button>
                    <label className="profile-image-label">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="profile-image-input" />
                        <img src={selectedImage ? URL.createObjectURL(selectedImage) : (user ? user.imageSrc : logoExample)} alt="" className={imageClasses} />
                    </label>
                    <h3>{user ? user.nombre_usuario : "Nombre de Usuario"}</h3>
                </div>
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
                    <Link to={url_profile} className={rol === "Administrador" ? '' : 'desactive_option'}>
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
        </>
    );
};
