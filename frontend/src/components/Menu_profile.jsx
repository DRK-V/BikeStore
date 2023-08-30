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
}) => {
    const { user, logout } = useAuth();
    const [imageBase64, setImageBase64] = useState(null);

    useEffect(() => {
        if (user && user.id_cliente) {
            fetch(`http://localhost:3060/user/${user.id_cliente}/imageprofile`)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64String = reader.result.split(',')[1];
                        setImageBase64(base64String);
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(error => {
                    console.error('Error al obtener la imagen:', error);
                });
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

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageData = e.target.result;
                const byteArray = new Uint8Array(imageData);

                try {
                    const response = await fetch(`http://localhost:3060/user/${user.id_cliente}/updateImage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/octet-stream',
                        },
                        body: byteArray,
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

            reader.readAsArrayBuffer(image);
        } catch (error) {
            console.error('Error al leer la imagen:', error);
        }
    };

    if (user && !user.rol_usuario) {
        rol = "usuario";
    } else if (user) {
        rol = user.rol_usuario;
    } else {
        rol = "usuario";
    }
    const imageClasses =
        imageBase64 ? "profile-image" : "profile-image image-no-found";

    return (
        <div className={`menu_profile ${is_active ? "active" : ""}`}>
            <div className="profile-section">
                <button
                    className={is_link_active ? "close-button-profile-desactive" : "close-button-profile"}
                    onClick={onClose}
                >
                    <FiX />
                </button>
                <label className="profile-image-label">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="profile-image-input"
                    />
                    <img
                        src={`data:image/jpeg;base64,${imageBase64}` || logoExample}
                        alt=""
                        className={imageClasses}
                    />
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
    );
};
