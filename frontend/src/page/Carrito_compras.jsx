import { Footer } from '../components/Footer'
import { Item_cart } from '../components/Item_cart'
import { Navbar } from '../components/Navbar'
import '../css/carrito_compras.css'

export const Carrito_compras = () => {
  return (
    <>
    <Navbar />
    <div className='car_comp'>
        <h1>Carrito de Compras</h1>
        <Item_cart/>
        
    </div>

    <Footer />
    </>
  )
}