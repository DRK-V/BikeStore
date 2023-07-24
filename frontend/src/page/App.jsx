import '../css/main.css'
import '../css/animation.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';
import Categories from './Categories';
import Bike_details from './Bike_details';
import {Login} from './Login';
 
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/filters" element={<Categories/>} />
          <Route path="/details" element={<Bike_details/>} />
          <Route path="/Login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
