import React from 'react';
import logoExample from '../assets/profile.jpg';
import { Link } from 'react-router-dom';
import { FiX, FiUser, FiSettings, FiShoppingBag, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../components/AuthContext';

export const Menu_profile = ({ is_link_active, is_active, onClose, activateMyUsu, activateMyConfig, activateMyOrder }) => {
    const { user, logout } = useAuth();
    let url_profile = is_link_active ? '#profile' : '/Usuario_usu';

    const handleLogout = () => {
        logout();
        onClose();
    };

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
                    <Link to={url_profile} onClick={activateMyUsu}>
                        <li>
                            <FiUser />
                            <span>Perfil</span>
                        </li>
                    </Link>

                    <li onClick={activateMyConfig}>
                        <FiSettings />
                        <span>Configuraciones</span>
                    </li>
                    <li onClick={activateMyOrder}>
                        <FiShoppingBag />
                        <span>Pedidos</span>
                    </li>
                    <li>
                        <FiUserPlus />
                        <span>Administrar</span>
                    </li>
                    <li onClick={handleLogout}>
                        <FiLogOut />
                        <span>Cerrar Sesión</span>
                    </li>
                </ul>
            </div>
        </>
    );
};
