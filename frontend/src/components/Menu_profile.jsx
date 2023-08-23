import React from 'react'
import logoExample from '../assets/profile.jpg'
import { FiX, FiUser, FiSettings, FiShoppingBag, FiUserPlus, FiLogOut } from 'react-icons/fi';
export const Menu_profile = ({ is_active, onClose }) => {
    return (
        <>
            <div className={`menu_profile ${is_active ? "active" : ""}`}>
                <div className="profile-section">
                    <button className="close-button-profile" onClick={onClose}>
                        <FiX />
                    </button>
                    <img src={logoExample} alt="Perfil" className="profile-image" />
                    <h3>Nombre de Usuario</h3>
                </div>
                <ul className="options-list">
                    <li>
                        <FiUser />
                        <span>Perfil</span>
                    </li>
                    <li>
                        <FiSettings />
                        <span>Configuraciones</span>
                    </li>
                    <li>
                        <FiShoppingBag />
                        <span>Pedidos</span>
                    </li>
                    <li>
                        <FiUserPlus />
                        <span>Administrar</span>
                    </li>
                    <li>
                        <FiLogOut />
                        <span>Cerrar Sesión</span>
                    </li>
                </ul>
            </div>
        </>
    )
}
