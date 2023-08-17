import '../css/carrito_compras.css'
const bicii =  "https://www.incolmotos-yamaha.com.co/bicicletas/images/civante.png"


export const Item_cart = () => {
  return (
    <div className="Cart_compras_carrito">
      <h2>Montaña</h2>
      <div className='info_bici_compra'>
        <img className='img_bicci' src={bicii} alt=""  />
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
          <button className='boton1'>buscar</button>
          <button className='boton1'>delete</button>
      </div>
      </div>



    </div>
  )
}
