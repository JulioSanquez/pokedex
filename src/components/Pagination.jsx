import React from 'react'
import { paginationLogic } from '../helpers/paginationLogic'

const Pagination = ({currentPage, showPokemons, pokemonsPerPage, setCurrentPage }) => {

  const handleClickPage = newPage => setCurrentPage(newPage)
  const handlePrevPage = e => setCurrentPage( currentPage - 1 < 1 ? lastPage : currentPage - 1 )
  const handleNextPage = e => setCurrentPage( currentPage + 1 > lastPage ? 1 : currentPage + 1 )
  const handleFirstPage = e => setCurrentPage(1)
  const handleLastPage = e => setCurrentPage(lastPage)

    const {
      lastPage, 
      pagesInBlock, 
      actualBlock,
      lastBlock
    } = paginationLogic(currentPage, showPokemons, pokemonsPerPage)

  return (
    <ul className='pokedex__listPages'>
    {
      (currentPage > 1) && <>
        <li onClick={handlePrevPage}>{"<"}</li>
      </>
    }
    {
      (actualBlock > 1) && <li onClick={handleFirstPage}>{"..."}</li>
    }
    {
      pagesInBlock.map( pageInBlock => <li className={currentPage === pageInBlock ? "actualPage" : "" } onClick={ () => handleClickPage(pageInBlock) } key={pageInBlock}> {pageInBlock} </li> )
    }
    {
      (actualBlock <= lastBlock) && <li onClick={handleLastPage}>{"..."}</li>
    }
    {
      (currentPage < lastPage) && <li onClick={handleNextPage}>{">"}</li>
    }
  </ul>
  )
}

export default Pagination