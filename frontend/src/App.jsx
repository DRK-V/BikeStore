import { useState } from 'react'
import './App.css'
import { Card_container } from './components/Card_container'
import { Footer } from './components/Footer'
import Carousel from './components/carousel'
import { Navbar } from "./components/Navbar"

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar/>
         <Carousel/>
         <Card_container/>
         <Footer/>
    </>
  )
}

export default App
