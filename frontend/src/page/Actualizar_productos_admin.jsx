import React from 'react'
import "../css/Actualizar_productos_admin.css"

export const Actualizar_productos_admin = () => {
    return (
        <>
            <div className='pa_one'>
                <div className='img_p'>

                </div>
                <div className='info_padre'>
                    <form action="" className='info_p'>
                        <div className='titulo_p'>
                        <h2>Actualizar</h2>
                        </div>
                        <div className='formu_p'>
                            <div className='p_1'>
                            <input className='p_2' type="text" />
                            <input className='p_2' type="text" />
                            <input className='p_2' type="text" />
                            </div>
                            <div className='p_1'>
                            <input className='p_2' type="text" />
                            <input className='p_2' type="text" />
                            </div>
                            <div className='p_1'>
                            <input className='p_3' type="text" />
                            </div>
                        </div>

                    </form>
                    <div className='boton_actualizar'>
                        <button className='actualizar_p'>Actualizar</button>
                    </div>
                </div>

            </div>

        </>
    )
}

