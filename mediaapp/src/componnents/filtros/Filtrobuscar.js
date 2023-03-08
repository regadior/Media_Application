import React from 'react'
import lupa from '../icons/lupa.png'
import './Filtro.css'
function Filtrobuscar() {
  return (
    <div class="Filtrobuscar">
      <input type='text' placeholder='Buscar' className='Filtrobuscar_input'></input>
      <button type='submit' className='Filtrobuscar_boton'>
        <img src={lupa}></img>
      </button>
   </div>
  )
}

export default Filtrobuscar;