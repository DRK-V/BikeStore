import React from 'react'
import '../css/similar_bike.css'
import { Card_container } from '../components/Card_container'
const Similar_container = () => {
    return (
        <div className='slider_similar_bike'>
            <h1>Productos similares</h1>
            <Card_container is_categories="similar">

            </Card_container>
        </div>
    )
}
export default Similar_container
