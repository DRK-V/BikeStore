import React, { useState, useEffect } from 'react';
import logoExample from '../assets/profile.jpg';
import { Link } from 'react-router-dom';
import { FiX, FiUser, FiSettings, FiShoppingBag, FiUserPlus, FiLogOut } from 'react-icons/fi';

export const Menu_profile = ({ is_active, onClose, is_link_active }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Make an API request to fetch user's information here
    async function fetchUserData() {
      try {
        const response = await fetch('http://localhost:3060/api/cliente', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add any necessary authentication headers if required
        });

        console.log('API Response Status:', response.status);

        if (response.status === 200) {
          const userData = await response.json();
          console.log('Fetched User Data:', userData);
          setUserName(userData[0].nombre_usuario); // Assuming the user's name is provided in the response
        } else {
          console.log('API Request Failed');
          // Handle error
        }
      } catch (error) {
        console.error('Error Fetching User Data:', error);
        // Handle error
      }
    }

    fetchUserData();
  }, []);

  let url_profile = is_link_active ? '#profile' : '/Usuario_usu';
  
  return (
    <>
      <div className={`menu_profile ${is_active ? 'active' : ''}`}>
        <div className="profile-section">
          <button className={is_link_active ? 'close-button-profile-desactive' : 'close-button-profile'} onClick={onClose}>
            <FiX />
          </button>
          <img src={logoExample} alt="Perfil" className="profile-image" />
          <h3>{userName}</h3> {/* Display user's name here */}
        </div>
        <ul className="options-list">
          <Link to={url_profile}>
            <li>
              <FiUser />
              <span>Perfil</span>
            </li>
          </Link>
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
  );
};
