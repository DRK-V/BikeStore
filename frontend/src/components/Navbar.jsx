import "../css/nav.css";
import icon from "../assets/bici.png";
import carrito from "../assets/carrito.png";
import menuu from "../assets/menu.png";
import cerrar from "../assets/cerrar.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

import React from "react";
export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenuClick = () => {
    setMenu(!menu);
  };
  const { isLoggedIn } = useAuth();

  React.useEffect(() => {
    console.log(`Sesión activa: ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <>
      <div
        className={`menu_resp ${menu ? "activar-active" : "desactivar-off"}`}
      >
        <button className="menudes2" onClick={handleMenuClick}>
          <img src={cerrar} className="menu-hambu" alt="" />
        </button>
        <nav className="menu_res">
          <div className="info_res">
            <ul>
              <Link to="/filters">
                <li>Categorias</li>
              </Link>
              <Link to="/filters">
                <li>Ofertas</li>
              </Link>
              <Link to="#">
                <li>Populares</li>
              </Link>
              <Link
                to="/register"
                className={isLoggedIn === true ? "desactivar_opcion" : ""}
              >
                <li>Crea tu cuenta</li>
              </Link>
              <Link
                to="/Login"
                className={isLoggedIn === true ? "desactivar_opcion" : ""}
              >
                <li>Ingresar</li>
              </Link>
              <Link to="#">
                <li>Mis compras</li>
              </Link>
              <i></i>
            </ul>
          </div>
        </nav>
      </div>
      <nav className="nav1">
        <Link to="/" className="bike">
          <img src={icon} alt="" />
        </Link>
        <form action="">
          <input type="text" className="busque" />
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
            <Link to="/filters">
              <li>Categorias</li>
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
            <Link
              to="/register"
              className={isLoggedIn === true ? "desactivar_opcion" : ""}
            >
              <li>Crea tu cuenta</li>
            </Link>
            <Link
              to="/Login"
              className={isLoggedIn === true ? "desactivar_opcion" : ""}
            >
              <li>Ingresar</li>
            </Link>
            <Link to="#">
              <li>Mis compras</li>
            </Link>
            <i></i>
          </ul>
          <Link to="/Carrito_compras">
            <img src={carrito} alt="carrito" className="car" />
          </Link>
        </div>
      </nav>
    </>
  );
};
