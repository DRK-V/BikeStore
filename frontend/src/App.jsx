import { useState } from 'react'
import './App.css'
import './css/main.css'
import { Card_container } from './components/Card_container'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Container_button_comprados } from './components/Container_button_comprados'
import Carousel from './components/carousel'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <Container_button_comprados/>
      <Card_container>

      </Card_container>
      <Footer />
    </>
  )
}
export default App
