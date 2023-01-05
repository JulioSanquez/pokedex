import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'
import "./styles/Header.css"

const Header = () => {
  const nameTrainer = useSelector( s => s.nameTrainer )
  const dispatch = useDispatch()

  const handleLogOut = e => {
    dispatch(setNameTrainerGlobal(""))
    localStorage.setItem("nameTrainer", nameTrainer )
  }

  return (
    <header className='header'>
        <img className='header__img' src="/images/pokedex.png" />
        <div className='header__black'></div>
        <div className='header__circle'>
          <div onClick={handleLogOut} className="header__circle-int">
            <i className='bx bx-log-out-circle'></i>
          </div>
        </div>
    </header>
  )
}

export default Header