import React from 'react'
import { Navbar } from '../components/Navbar'
import '../css/cart_shopping.css'
import { Footer } from '../components/Footer'

export const Payment = () => {
    return (
        <>
            <Navbar />
            <div className="cart_shopping_container">
                <h1>Formato de pago</h1>
                <form className='form_pse'></form>
                <form className='form_credit_card'>
                </form>
            </div>
            <Footer />  
        </>
    )
}
