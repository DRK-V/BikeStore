import { useState } from 'react'
import './App.css'
import './css/main.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Home } from './page/Home';
import { Register } from './page/Register';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
