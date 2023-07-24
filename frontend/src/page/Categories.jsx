import React from 'react'
import '../css/Categories/Categories.css'

import { Navbar } from '../components/Navbar'
import { Card_container } from '../components/Card_container'
import { Footer } from '../components/Footer'
const Categories = () => {
    return (
        <>
            <Navbar />
            <div className="container_categories">
                <div className="menu_categories">
                    <ul>
                        <h1>
                            Tipo
                        </h1>
                        <a href="#"><li>Bicicletas de carretera</li></a>
                        <a href="#"><li>Bicicletas de montaña</li></a>
                        <a href="#"><li>Bicicletas de gravel</li></a>
                        <a href="#"><li>Bicicletas de urbanas</li></a>
                        <a href="#"><li>Bicicletas de electricas</li></a>
                        <a href="#"><li>Bicicletas de infantiles</li></a>
                    </ul>
                    <ul>
                        <h1>
                            Color
                        </h1>
                        <a href="#"><li>Amarillo</li></a>
                        <a href="#"><li>azul </li></a>
                        <a href="#"><li>rojo </li></a>

                    </ul>
                </div>
                {/* aqui se debe poner las cards pero con 3 columnas */}
                <Card_container is_categories="true" />
            </div>
            <Footer />
        </>
    )
}

export default Categories
