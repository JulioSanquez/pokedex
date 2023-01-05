import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeProtected from './components/HomeProtected'
import RouteProtected from './components/RouteProtected'
import Footer from './layout/Footer'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import Pokemon from './pages/Pokemon'

function App() {
  const [upButton, setUpButton] = useState(false)

  const nameTrainer = useSelector( s => s.nameTrainer )

  useEffect(() => {
    localStorage.setItem("nameTrainer", nameTrainer)
  }, [nameTrainer])
  
  const handleScroll = e => {
    if(window.scrollY >= 300)  return setUpButton(true)
    
    setUpButton(false)
  }

  const handleUp = e => {
    setUpButton(false)
    window.scrollTo(0,0)
  }
  
  return (
    <div className="App" onWheel={ handleScroll }>
      <Routes>

        <Route element={<HomeProtected />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<RouteProtected setUpButton={setUpButton} />}>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<Pokemon />} />
        </Route>
        
        <Route path='*' element={ <h1>Not Found</h1> } />
      
      </Routes>
        <i onClick={handleUp} className={`bx bx-chevron-up-square App__btn ${upButton ? 'slideBtn' : ""}`}></i>
      <Footer />
    </div>
  )
}

export default App
