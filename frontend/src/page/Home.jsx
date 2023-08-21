import { Card_container } from '../components/Card_container'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { Container_button_comprados } from '../components/Container_button_comprados'
import Carousel from '../components/carousel'

export const Home = () => {
    // const data = usefetch(routesApp.getProducts)
    // console.log(data)
    return (
        <>
            <Navbar></Navbar>
            <Carousel></Carousel>
            <Container_button_comprados />
            <Card_container>
            </Card_container>
            <Footer />
        </>
    )
}