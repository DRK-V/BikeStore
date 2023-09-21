import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import carritoo from "../assets/bolsa-de-la-compra.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Presio_compra = () => {
  const { cartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const { isLoggedIn } = useAuth();
  const [showPagar, setShowPagar] = useState(false);
  const navigate = useNavigate();

  const updateTotalPrice = (addedPrice) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + addedPrice);
  };

  const calculateTotalPrice = () => {
    const newTotalPrice = cartItems.reduce((total, cartItem) => {
      const productPrice = parseFloat(cartItem.product.precio);
      const quantity = parseInt(cartItem.quantity);

      if (isNaN(productPrice) || isNaN(quantity)) {
        console.error("Producto con precio o cantidad no válidos:", cartItem);
        return total;
      }
      return total + productPrice * quantity;
    }, 0);

    if (isNaN(newTotalPrice)) {
      console.error("El nuevo precio total calculado es NaN");
    }

    setTotalPrice(newTotalPrice);

    const calculatedShippingCost = (newTotalPrice * 0.02).toFixed(2);
    setShippingCost(calculatedShippingCost);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const handleButtonClick = () => {
    if (totalPrice === 0) {
      // Si el precio total es 0, muestra el mensaje y evita la redirección
      setShowPagar(true);
    } else {
      // Crea un array para almacenar la información de todos los productos
      const productsToPay = cartItems.map((cartItem) => ({
        id_producto: cartItem.product.id_producto,
        cantidad: cartItem.quantity,
      }));
  
      // Redirige a la página de pago y pasa la información necesaria
      navigate("/payment", {
        state: {
          valorPagar: totalPrice + parseFloat(shippingCost),
          productos: productsToPay,
        },
      });
      console.log("Productos a pagar:", productsToPay);
    }
  };
  

  return (
    <div className="info_pc">
      <h2>Envío ${shippingCost}</h2>
      <h1>
        Costo Total ${(totalPrice + parseFloat(shippingCost)).toLocaleString()}
      </h1>
      {isLoggedIn ? (
        <Link
          to="/payment"
          state={{ valorPagar: totalPrice + parseFloat(shippingCost) }}
          className="pagar-1"
        >
          <button
            className={`pagar ${totalPrice === 0 ? "disabled" : ""}`}
            onClick={handleButtonClick}
            disabled={totalPrice === 0}
          >
            <img src={carritoo} alt="carrito" className="carro_pagar" />
            Continuar compra
          </button>
        </Link>
      ) : (
        <Link to="/login" className="pagar-1">
          <button
            className={`pagar ${totalPrice === 0 ? "disabled" : ""}`}
            onClick={handleButtonClick}
          >
            <img src={carritoo} alt="carrito" className="carro_pagar" />
            Continuar compra
          </button>
        </Link>
      )}
      {showPagar && (
        <div className="pagar-3">Debes añadir un producto para continuar.</div>
      )}
    </div>
  );
};

export default Presio_compra;
