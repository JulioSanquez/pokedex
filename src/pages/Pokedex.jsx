import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListPokemons from '../components/ListPokemons'
import Pagination from '../components/Pagination'
import { paginationLogic } from '../helpers/paginationLogic'
import "./styles/Pokedex.css"

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [showPokemons, setShowPokemons] = useState([])
  const [types, setTypes] = useState([])
  const [namePokemon, setNamePokemon] = useState("")
  const [pokemonType, setPokemonType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState(localStorage.getItem("pokemonsPerPage") ?? 15)
  localStorage.setItem("pokemonsPerPage", pokemonsPerPage)
  
  const nameTrainer = useSelector( s => s.nameTrainer )

  const handleSubmit = e => {
    e.preventDefault()
    const name = e.target.namePokemon.value
    setNamePokemon(name)
    setCurrentPage(1)
  }

  const handleChangeSelect = e => {
    setCurrentPage(1)
    setPokemonType(e.target.value)
  }

  const handleChangeNumber = e => {
    if(!(e.target.value > 0)) return
    setCurrentPage(1)
      setPokemonsPerPage(e.target.value)
  }

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/"

    axios.get(URL)
      .then( ({data}) => {setTypes(data.results)} )
      .catch( err => console.log(err) )
  }, [])

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${ pokemonType ? `type/${pokemonType}` : "pokemon/?limit=1154"}`


    axios.get(URL)
      .then( ({data}) => {
        if(pokemonType){
          const newPokemons = data.pokemon.map( ({pokemon}) => pokemon )
          setPokemons(newPokemons)
        }else
          setPokemons(data.results)
      } )
      .catch( err => console.log(err) )
  }, [pokemonType])

  useEffect(() => {
    const newPokemons = pokemons.filter( pokemon => pokemon.name.includes(namePokemon) )

    setShowPokemons(newPokemons)
  }, [namePokemon, pokemons])
  
  

  const { pokemonsInPage } = paginationLogic(currentPage, showPokemons, pokemonsPerPage)

  return (
  <main>
      <h1>Pokedex</h1>
      <p> Welcome <span>{nameTrainer}</span>, here you can get a pokemon for your adventures, go up, walk away, go for the glory </p>
      <form className='pokedex__form' onSubmit={handleSubmit}>
        <div className='pokedex__form-search'>
          <input className='pokedex__form-input' type="search" id='namePokemon' />
          <button className='pokedex__form-btn' type='submit'> <i className='bx bx-search'></i> </button>
        </div>
        <div className="pokedex__perPage">
          <label className='pokedex__perPage-label' htmlFor="perPage">Por Pagina</label>
          <input className='pokedex__perPage-input' onChange={handleChangeNumber} id='perPage' type="number" value={pokemonsPerPage}/>
        </div>
        <select className='pokedex__select' onChange={handleChangeSelect}>
          <option value="">All Pokemons</option>
          {
            types.map( type => <option value={type.name} key={type.url}> {type.name} </option> )
          }
        </select>
      </form>

      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        showPokemons={showPokemons} 
        pokemonsPerPage={pokemonsPerPage} 
      />
      <ListPokemons pokemons={pokemonsInPage} />
      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        showPokemons={showPokemons} 
        pokemonsPerPage={pokemonsPerPage} 
      />
  </main>
  )
}

export default Pokedex