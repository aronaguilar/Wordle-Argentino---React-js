import { BrowserRouter as Router} from "react-router-dom"
import {Routes, Route} from "react-router-dom"

import './App.css'
import Home from './PAGINAS/Home';

function App() {
  return (

    <div id='app-contenedor-principal'>

      <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
      </Router>

    </div>
  )
}

export default App
