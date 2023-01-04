import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/Pokemon.css"

const Pokemon = () => {
  const [dataPokemon, setDataPokemon] = useState()

  const {id} = useParams()

  const getPrecentBarProgres = (statValue) => {
    const maxValue = 190
    return `${(statValue * 100) / maxValue}%`
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    axios.get(URL)
      .then( ({data}) => setDataPokemon(data) )
      .catch( err => console.log(err) )

  }, [])

  return (
    <main className='Pokemon'>
      <section className='pokemonId'>
        <section className={`pokemonId__header bg-lg-${dataPokemon?.types[0].type.name}`}></section>
        <img className='pokemonId__img' src={dataPokemon?.sprites.other["official-artwork"].front_default} alt="" />
        <h3 className='pokemonId__id'>#{dataPokemon?.id}</h3>
        <h2 className='pokemonId__name'>{dataPokemon?.name}</h2>
        <div className='pokemonId__features'>
          <section className='pokemonId__feature'>
            <p className='pokemonId__features-name'>Weight</p>
            <p className='pokemonId__features-value'>{dataPokemon?.weight}</p>
          </section>
          <div className='pokemonId__feature'>
            <p className='pokemonId__features-name'>Height</p>
            <p className='pokemonId__features-value'>{dataPokemon?.height}</p>
          </div>
        </div>
        <section className='pokemonId__info'>
          <div className='pokemonId__info-container'>
            <h4 className='pokemonId__info-title'>Types</h4>
            <div className='pokemonId__info-data'>
              {
                dataPokemon?.types.map( type => <p className={`pokemonId__info-value bg-${type.type.name}`} key={type.type.name}> {type.type.name} </p>  )
              }
            </div>
          </div>
          <div className='pokemonId__info-container'>
            <h4 className='pokemonId__info-title'>Abilities</h4>
            <div className='pokemonId__info-data'>
              {
                dataPokemon?.abilities.map( ability => <p className={`pokemonId__info-value`} key={ability.ability.url}> {ability.ability.name} </p> )
              }
            </div>
          </div>
        </section>
        <section className='pokemonId__stats'>
          <h3 className='pokemonId__stats-title'>Stats</h3>
          <div className='pokemonId__stats-container'>
            {/* Dinamicamente */}
            {
              dataPokemon?.stats.map( stat => (
                <div key={stat.stat.name} className='pokemonId__stat'>
                  <div className='pokemonId__stat-header'>
                    <p className='pokemonId__stat-name'>{stat.stat.name}</p>
                    <p className='pokemonId__stat-value'>{stat.base_stat}/190</p>
                  </div >
                  <div className='pokemonId__stat-bar'>
                    <div style={{width: getPrecentBarProgres(stat.base_stat)}} className="pokemonId__stat-barProgress"></div>
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </section>
    </main>
  )
}

export default Pokemon