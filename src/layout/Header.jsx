import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'
import "./styles/Header.css"

const Header = ({setUpButton}) => {
  const nameTrainer = useSelector( s => s.nameTrainer )
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogOut = e => {
    dispatch(setNameTrainerGlobal(""))
    localStorage.setItem("nameTrainer", nameTrainer )
  }

  const handleClick = e => {
    setUpButton(false)
    navigate('/#/pokedex')
  }

  return (
    <header className='header'>
      <nav className='header__nav'>
        <img onClick={handleClick} className='header__img' src="/images/pokedex.png" />
        <div className='header__black'></div>
        <div className='header__circle'>
          <div onClick={handleLogOut} className="header__circle-int">
            <i className='bx bx-log-out-circle'></i>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header