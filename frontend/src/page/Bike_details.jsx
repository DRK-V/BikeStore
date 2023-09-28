import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Bike_details.css";
import { useCart } from "../components/CartContext";
import { Navbar } from "../components/Navbar";
import Container_comments from "../components/Comments/Container_comments";
import Similar_container from "../components/Similar_container";
import { Footer } from "../components/Footer";
import icon_brand from "../assets/icons/bbike-red-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Bike_details = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { addItemToCart, setSelectedProductId } = useCart();
  const { id_producto } = useParams();
  const [cartMessage, setCartMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(null);
  const [stockExhausted, setStockExhausted] = useState(false);
  const [showStockExhaustedMessage, setShowStockExhaustedMessage] =
    useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (additionalProductDetails) {
      const productPrice = parseFloat(additionalProductDetails.product.precio);
      if (!isNaN(productPrice)) {
        const cartItem = {
          product: {
            id_producto: additionalProductDetails.product.id_producto,
            precio: productPrice,
            nombre: additionalProductDetails.product.nombre_producto,
            tipo: additionalProductDetails.product.tipo,
            stock: stock, // Agregar el valor de stock aquí
          },
          image: mainImageURL,
        };
        addItemToCart(cartItem);
        setSelectedProductId(id_producto);
        setCartMessage("Se ha agregado el producto al carrito.");

        // Set a timer to clear the cart message after 1 second
        setTimeout(() => {
          setCartMessage("");
        }, 1500); // 1000 milliseconds = 1 second
      } else {
        console.error("Precio no válido para el producto.");
      }
    }
  };

  const [productDetails, setProductDetails] = useState(null);
  const [additionalProductDetails, setAdditionalProductDetails] =
    useState(null);
  const [mainImageURL, setMainImageURL] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3060/product-details/${id_producto}`
        );
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id_producto]);

  useEffect(() => {
    const fetchAdditionalProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3060/products-with-images/${id_producto}`
        );
        const data = await response.json();
        setAdditionalProductDetails(data);
        if (data.images && data.images.length > 0) {
          // Establecer la imagen de portada como la imagen principal
          const imagenPortada = data.images.find(
            (image) => image.nombre_imagen === "imagen portada"
          );
          if (imagenPortada) {
            setMainImageURL(
              `http://localhost:3060/images/${imagenPortada.id_imagen}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching additional product details:", error);
      }
    };

    if (id_producto) {
      fetchAdditionalProductDetails();
    }
  }, [id_producto]);

  const handleSubImageClick = (subImageURL) => {
    setMainImageURL(subImageURL);
  };

  const handleBuyNow = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      // Si el usuario está autenticado, redirige a /payment
      if (additionalProductDetails) {
        const productPrice = parseFloat(
          additionalProductDetails.product.precio
        );
        if (!isNaN(productPrice)) {
          const totalPriceWithDiscount = productPrice + productPrice * 0.02;

          navigate("/payment", {
            state: {
              valorPagar: totalPriceWithDiscount,
              id_producto: id_producto,
              quantity: quantity,
              precio_producto: productPrice,
              nombre_producto: additionalProductDetails.product.nombre_producto,
            },
          });
        } else {
          console.error("Precio no válido para el producto.");
        }
      }
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);

        navigate("/register");
      }, 2000);
    }
  };

  useEffect(() => {
    // Realiza la solicitud para obtener el stock
    const fetchStock = async () => {
      try {
        const response = await fetch(
          `http://localhost:3060/stockPorCodigoProducto/${id_producto}`
        );
        const data = await response.json();

        // Accede al saldo en el primer objeto del array (si existe)
        const stockValue = data[0]?.saldo;

        setStock(stockValue);

        // Verifica si el stock está agotado y muestra el mensaje correspondiente
        if (stockValue === 0) {
          setStockExhausted(true);
          setShowStockExhaustedMessage(true);
        }

        console.log("Resultado de la solicitud de stock:", stockValue);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    if (id_producto) {
      fetchStock();
    }
  }, [id_producto]);

  return (
    <>
      <Navbar />
      <div className="container_view_details">
        {productDetails &&
          additionalProductDetails &&
          additionalProductDetails.product && (
            <>
              <div className="container_images">
                {additionalProductDetails.images.map((image) => (
                  <img
                    key={image.id_imagen}
                    className="sub_images"
                    src={`http://localhost:3060/images/${image.id_imagen}`}
                    alt={image.nombre_imagen}
                    onClick={() =>
                      handleSubImageClick(
                        `http://localhost:3060/images/${image.id_imagen}`
                      )
                    }
                  />
                ))}
              </div>
              <img
                className="main_image"
                src={mainImageURL}
                alt="Imagen Principal"
              />

              <form
                onSubmit={handleAddToCart}
                action="dialog"
                className="form_add_item_cart"
              >
                <label className="bike_name">
                  {additionalProductDetails.product.nombre_producto}
                </label>
                <label htmlFor="" className="price_text">
                  <p>Precio:</p> $
                  {additionalProductDetails.product.precio.toLocaleString(
                    "es-ES",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </label>

                <div className="container_color_details">
                  <label htmlFor="" className="color_text">
                    Color:
                    <strong>{additionalProductDetails?.product?.color}</strong>
                  </label>
                </div>
                <p
                  className="text_descripcion_details"
                  style={{ whiteSpace: "pre-line" }}
                >
                  Descripción:{" "}
                  {additionalProductDetails?.product?.descripcion_producto}
                </p>

                <label htmlFor="" className="text_bike_type">
                  Tipo de bicleta:{additionalProductDetails?.product?.tipo}
                </label>
                <div className="container_count">
                  <label htmlFor="">stock disponible:</label>
                  <p>{stock !== null ? stock : "Cargando..."}</p>
                </div>

                <button
                  className={`btn_buy_now ${stockExhausted ? "disabled" : ""}`}
                  onClick={(e) => handleBuyNow(e, id_producto, quantity)}
                  disabled={stockExhausted}
                >
                  <i></i>
                  Comprar Ahora
                </button>
                <button
                  className={`btn_add_item_cart ${
                    stockExhausted ? "disabled" : ""
                  }`}
                  type="submit"
                  disabled={stockExhausted}
                >
                  <i></i>
                  Agregar al carrito
                </button>
                {showStockExhaustedMessage && (
                  <div className="cart-message">Producto agotado</div>
                )}
                {showMessage && (
                  <div className="auth-message">
                    Debes registrarte o iniciar sesión antes de comprar.
                  </div>
                )}
                {showStockExhaustedMessage &&
                  setTimeout(() => setShowStockExhaustedMessage(false), 2000)}
              </form>
              {cartMessage && <div className="cart-message">{cartMessage}</div>}
              <div className="container_comments">
                <Container_comments />
              </div>
              <form className="assessment">
                <div className="brand">
                  <h1>Marca del producto</h1>
                  <img src={icon_brand} alt="" className="icon_bike_brand" />
                </div>
              </form>
              <Similar_container />
              <Footer />
            </>
          )}
      </div>
    </>
  );
};

export default Bike_details;
