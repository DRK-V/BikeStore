//naubar
import "../css/nav.css";
import "../css/submenu_categories.css";
import '../css/menu_profile.css'
import icon from "../assets/bici.png";
import carrito from "../assets/carrito.png";
import menuu from "../assets/menu.png";
import cerrar from "../assets/cerrar.png";
import b1 from "../assets/icons/b1.png";
import b2 from "../assets/icons/b2.png";
import b3 from "../assets/icons/b3.png";
import b4 from "../assets/icons/b4.png";
import b5 from "../assets/icons/b5.png";
import b6 from "../assets/icons/b6.png";
import { useState } from "react";
import { useCart } from './CartContext';
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Menu_profile } from "./Menu_profile";
import React from "react";
import { AiOutlineUser } from 'react-icons/ai';


export const Navbar = ({
  onSearchClick,
  onFormSubmit,
  setSelectedCategory,
  selectedCategory, // Add selectedCategory prop
}) => {
  
  const { getCartItemCount } = useCart();
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [menu, setMenu] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleCategoryClick = (category) => {
     setSelectedCategory(category);// Resto del código para actualizar el estado con la categoría seleccionada
  };
  
  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };


  const handleMenuClick = () => {
    setMenu(!menu);
  };

  const handleCategoriasMouseEnter = () => {
    setSubmenuVisible(true);
  };

  const handleCategoriasMouseLeave = () => {
    setSubmenuVisible(false);
  };

  const handleSubmenuMouseEnter = () => {
    setSubmenuVisible(true);
  };

  const handleSubmenuMouseLeave = () => {
    setSubmenuVisible(false);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchInput.value;
    onFormSubmit(event); // Call the passed onFormSubmit function
    onSearchClick(searchQuery); // Trigger search
  };
  return (
    <>
      <div className={`menu_resp ${menu ? "activar-active" : "desactivar-off"}`}>
        <button className="menudes2" onClick={handleMenuClick}>
          <img src={cerrar} className="menu-hambu" alt="" />
        </button>
        <nav className="menu_res">
          <div className="info_res">
            <ul>
              <Link to="#">
                <li
                  onMouseEnter={handleCategoriasMouseEnter}
                  className={submenuVisible ? "active-menu-item" : ""}
                >
                  Categorias
                </li>
              </Link>
              <Link to="/filters">
                <li>Ofertas</li>
              </Link>
              <Link to="#">
                <li>Populares</li>
              </Link>
              <Link to="/register">
                <li className={isLoggedIn === true ? "desactivar_opcion" : ""}>
                  Crea tu cuenta
                </li>
              </Link>
              <Link to="/Login">
                <li className={isLoggedIn === true ? "desactivar_opcion" : ""}>
                  Ingresar
                </li>
              </Link>
              <Link to="#">
                <li>Mis compras</li>
              </Link>
              <li>
                <i></i>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <nav className="nav1">
        <Link to="/" className="bike">
          <img src={icon} alt="" />
        </Link>
        <form action="" onSubmit={handleFormSubmit}>
          <input type="text" className="busque" name="searchInput" />
          <button className="buscar"></button>
        </form>
        <button className="descu">Cupones 20% de descuento</button>
        <button className="menudes">
          <img
            src={menuu}
            className="menu-hambu"
            alt=""
            onClick={handleMenuClick}
          />
        </button>
        <img src={carrito} alt="carrito" className="car2" />
      </nav>
      <nav className="nav2">
        <div className="left-side">
          <ul>
            <Link to="#">
              <li
                onMouseEnter={handleCategoriasMouseEnter}
                className={submenuVisible ? "active-menu-item" : ""}
              >
                Categorias
              </li>
            </Link>
            <Link to="/filters">
              <li>Ofertas</li>
            </Link>
            <Link to="#">
              <li>Populares</li>
            </Link>
          </ul>
        </div>
        <div className="right-side">
          <ul>
            <Link to="/register">
              <li className={isLoggedIn === true ? "desactivar_opcion" : ""}>
                Crea tu cuenta
              </li>
            </Link>
            <Link to="/Login">
              <li className={isLoggedIn === true ? "desactivar_opcion" : ""}>
                Ingresar
              </li>
            </Link>
            <Link to="#">
              <li className={isLoggedIn === false ? "desactivar_opcion" : ""}>Mis compras</li>
            </Link>
            <i></i>
            <Link to="/Carrito_compras">
    <div className="cart-icon">
    <img src={carrito} alt="carrito" className="car" />
      <span className="cart-item-count">{getCartItemCount()}</span>
    </div>
  </Link>
            <Link to="#">
              <div
                className={`user-icon ${isLoggedIn === false ? "desactivar_opcion" : ""}`}
                onClick={toggleProfileMenu}
              >
                <li>
                  <AiOutlineUser />
                </li>
              </div>
            </Link>
          </ul>
        </div>
      </nav>
      {submenuVisible && (
        <div
          className={`menu-container ${submenuVisible ? "active-submenu" : ""}`}
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
        >
          <ul className="sub-menu">
          <li
              className="sub-menu-item"
              onClick={() => handleCategoryClick("Bicicleta de montaña")} // Add click handler for each category
            >
              <img src={b1} alt="Icono Bicicleta" />
              <span>Bicicleta de montaña</span>
            </li>
            <li className="sub-menu-item"
            onClick={() => handleCategoryClick("Bicicleta de gravel")}
            >
              <img src={b2} alt="Icono Bicicleta" />
              <span>Bicicleta de gravel</span>
            </li>
            <li className="sub-menu-item"
            onClick={() => handleCategoryClick("Bicicleta de carretera")}
            >
              <img src={b3} alt="Icono Bicicleta" />
              <span>Bicicleta de carretera</span>
            </li>
            <li className="sub-menu-item"
            onClick={() => handleCategoryClick("Bicicleta de ciudad")}
            >
              <img src={b4} alt="Icono Bicicleta" />
              <span>Bicicleta de ciudad</span>
            </li>
            
          </ul>
        </div>
      )}
      {/* aqui va el menu de perfil */}
      <div className={`menu_profile_container ${profileMenuVisible ? "active" : ""}`}>

      <Menu_profile
            is_link_active={false}
            onClose={toggleProfileMenu}
          />

      </div>
    </>
  );
};

