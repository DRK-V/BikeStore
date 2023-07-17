import { useState } from 'react'
import './App.css'
import { Card_container } from './components/Card_container'
import { Footer } from './components/Footer'
import Carousel from './components/carousel'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Carousel></Carousel>
      <Card_container>

      </Card_container>
      <Footer/>
    </>
  )
}

export default App
