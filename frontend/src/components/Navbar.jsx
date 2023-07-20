import "../css/nav.css";
import icon from "../assets/bici.png";
import carrito from "../assets/carrito.png"
export const Navbar = () => {
  return (
    <>
      <nav className="nav1">
        <img src={icon} alt="" className="bike"/>
        <form action="">
          <input type="text" className="busque" />
          <button className="buscar"></button>
        </form>
        <button className="descu">Cupones 20% de descuento</button>
      </nav>
      <nav className="nav2">
        <div className="left-side">
          <ul>
               <a href="/filters">
              <li>Categorias</li>
            </a>
            <a href="#">
              <li>Ofertas</li>
            </a>
            <a href="#">
              <li>Populares</li>
            </a>
          </ul>
        </div>
        <div className="right-side">
          <ul>
            <a href="/register">
              <li>Crea tu cuenta</li>
            </a>
            <a href="#">
              <li>Ingresar</li>
            </a>
            <a href="#">
              <li>Mis compras</li>
            </a>
            <i></i>
          </ul>
          <img src={carrito} alt="carrito" className="car"  />
        </div>
      </nav>
    </>
  );
};
