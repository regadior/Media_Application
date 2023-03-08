import React, { useState } from 'react';
import axios from 'axios'
import lupa from '../icons/lupa.png';
import './Filtro.css';

function Filtrobuscar() {
    const RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY;
    const RAWG_BASE_URL = process.env.REACT_APP_RAWG_BASE_URL;
    const [inputSearch, setinputSearch] = useState("");
    const [resultadoJuego, setresultadoJuego] = useState([]);
    const handleChange = async (e) => {
        setinputSearch(e.target.value);
        e.preventDefault();
        axios.get(`${RAWG_BASE_URL}key=${RAWG_API_KEY}&search=${inputSearch}&ordering=rating`)
            .then(response => {
                setresultadoJuego(response.data.results)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='Filtrobuscar'>
            <input type='text' placeholder='Buscar' className='Filtrobuscar_input' value={inputSearch} onChange={handleChange}></input>

            {resultadoJuego.map(game => (
                <div key={game.id} className='contenido'>
                    <h3>{game.name}</h3>
                </div>
            ))}
        </div>
    )
}


export default Filtrobuscar;