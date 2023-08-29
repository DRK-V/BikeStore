import React from 'react';
import logoExample from '../assets/profile.jpg';
import { Link } from 'react-router-dom';
import { FiX, FiUser, FiSettings, FiShoppingBag, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../components/AuthContext';

export const Menu_profile = ({ is_link_active, is_active, onClose, activateMyUsu, activateMyConfig, activateMyOrder }) => {
    const { user, logout } = useAuth();
    let url_profile = is_link_active ? '#profile' : '/Usuario_usu';
    let rol = "";
    const handleLogout = () => {
        logout();
        onClose();
    };

    if (user && !user.rol_usuario) {
        rol = "usuario";
    } else if (user) {
        rol = user.rol_usuario;
    } else {
        rol = "usuario"; // Tratarlo como "usuario" si user es null
    }
    return (
        <>
            <div className={`menu_profile ${is_active ? "active" : ""}`}>
                <div className="profile-section">
                    <button className={is_link_active ? "close-button-profile-desactive" : "close-button-profile"} onClick={onClose}>
                        <FiX />
                    </button>
                    <img src={logoExample} alt="Perfil" className="profile-image" />
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
