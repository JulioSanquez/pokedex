import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/PokemonCard.css"

const PokemonCard = ({pokemon}) => {
  const [dataPokemon, setDataPokemon] = useState()

  const navigate = useNavigate()

  const types = dataPokemon?.types.map( type => type.type.name).join(" / ")

  const handleClick = (e) => {
    navigate(`/pokedex/${dataPokemon?.id}`)
  }

  useEffect(() => {
    
    axios.get(pokemon.url)
      .then( ({data}) => setDataPokemon(data) )
      .catch( err => console.log(err) )  

  }, [])

  return (
    <article onClick={handleClick} className={`pokeCard border-${dataPokemon?.types[0].type.name}`}>
    <section className={`pokeCard__header bg-lg-${dataPokemon?.types[0].type.name}`}></section>
      <section className='pokeCard__content'>
        <img className='pokeCard__img' src={dataPokemon?.sprites.other["official-artwork"].front_default} alt="" />
        <h3 className='pokeCard__name'>{pokemon.name}</h3>
        <p className='pokeCard__types'>{types}</p>
        <p className='pokeCard__types-tutle'>Type</p>
        <hr />
        <section className='pokeCard__stats'>
          {
            dataPokemon?.stats.map( stat => (
              <div key={stat.stat.name} className='pokeCard__stat'>
                <p className='pokeCard__stat-name'>{stat.stat.name}</p>
                <p className='pokeCard__stat-value'>{stat.base_stat}</p>
              </div>
            ))
          }
        </section>
      </section>
    </article>
  )
}

export default PokemonCard