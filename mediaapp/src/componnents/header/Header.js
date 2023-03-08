import React from 'react'
import { Link } from 'react-router-dom'
import usuarionolog from '../icons/usuarionolog.png'
import './Header.css'
function Header() {
  let usuario = "a";
  return (

    <header>
      <div className='header2'>
        <div className='header_logo'>
          <Link className='header_Link' to='/inicio'>Mediasto</Link>
        </div>
        <ul className='header_nav'>
          <li><Link className='header_Link' to='/inicio'>Buscar</Link></li>
          <li><Link className='header_Link' to={`/${usuario}/listas`}>Mis listas</Link></li>
        </ul>
        <div className='header_perfil'>
          <Link className='header_Link' to={`/${usuario}`}><img src={usuarionolog} alt="User avatar" /></Link>
        </div>
      </div>
    </header>

  )
}

export default Header;