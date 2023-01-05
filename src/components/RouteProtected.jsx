import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../layout/Header'

const RouteProtected = ({setUpButton}) => {
  const nameTrainer = useSelector(state => state.nameTrainer)

  if(nameTrainer){
    return (
     <>
      <Header setUpButton={setUpButton} />
      <Outlet />
     </> 
    )
  }
  else{
    return <Navigate to="/" />
  }
}

export default RouteProtected