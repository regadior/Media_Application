import React from 'react';
import Header from '../../componnents/header/Header'
import Filtrobuscar from '../../componnents/filtros/Filtrobuscar'
function Inicio() {
  return (
    <div>
        <Header/>
        <div className='inicio_filtros'>
            <Filtrobuscar />
        </div>
    </div>
  )
}

export default Inicio;