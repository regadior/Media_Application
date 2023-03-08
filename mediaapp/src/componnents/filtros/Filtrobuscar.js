import React, { useEffect, useState } from 'react';
import axios from 'axios'
import lupa from '../icons/lupa.png';
import './Filtro.css';
const RAWG_API_KEY=proces.env.RAWG_API_KEY;
const RAWG_BASE_URL=proces.env.RAWG_BASE_URL;
function Filtrobuscar() {
    const [inputSearch, setinputSearch] = useState("");
    const [resultadoJuego, setresultadoJuego] = useState([]);
    const handleChange = (e) => {
        setinputSearch(e.target.value);
        console.log("Estas escribiendo", e.target.value);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        useEffect(() =>{
            axios.get()
        })
    }

    return (
        <div class="Filtrobuscar">
            <input type='text' placeholder='Buscar' className='Filtrobuscar_input' value={inputSearch} onChange={handleChange}></input>
            <button type='submit' className='Filtrobuscar_boton' onSubmit={onSubmit}>
                <img src={lupa}></img>
            </button>
        </div>
    )
}

export default Filtrobuscar;