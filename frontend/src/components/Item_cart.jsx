import React from 'react';
import '../css/carrito_compras.css';

export const Item_cart = ({ cartItems, removeFromCart }) => {
  const getProductImage = (productId) => {
    // You should implement logic to fetch the actual image URL based on the product ID
    // For now, I'm using a placeholder image
    return "https://www.incolmotos-yamaha.com.co/bicicletas/images/civante.png";
  };

  console.log('cartItems:', cartItems);

  return (
    <div className="Cart_compras_carrito">
      {cartItems.map((productId) => {
        console.log('Rendering product with ID:', productId);

        return (
          <div key={productId}>
            <h2>Montaña</h2>
            <div className='info_bici_compra'>
              <img className='img_bicci' src={getProductImage(productId)} alt="" />
              <div className='descrip_produc'>
                <p>Cicla Civante - marco en fibra de vidrio</p>
                <p>$ 9.500.000.0  -20%</p><br />
                <b><p>$ 7.600.000.0</p></b>
              </div>
              <div className='botones_compra'>
                <div className='boton2'>
                  <button className='su_re'>+</button>
                  2
                  <button className='su_re'>-</button>
                </div>
                <button className='boton1'>Buscar</button>
                <button className='boton1' onClick={() => removeFromCart(productId)}>Eliminar</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


