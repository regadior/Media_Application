import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
function Login() {
    const [error, setError] = useState("");
    const [nick, setNick] = useState("");
    const [pass1, setPass1] = useState("");


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8000/api/login/', {

            });
            setError('');
        } catch (err) {
            if (err.response.status === 400) {
                setError('Faltan parámetros');
            } else if (err.response.status === 409) {
                setError('El usuario ya existe');
            } else {
                setError('Ocurrió un error al registrar al usuario');
            }
        }
    };

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit} className='Login_form' >
                <h2>Iniciar Sesión</h2>

                <div className='Login_box'>
                    <input type="text" id="Login_nickname" name="nickname" value={nick} onChange={e => setNick(e.target.value)} required></input>
                    <label>Nombre de usuario</label>
                </div>

                <div className='Login_box'>
                    <input type="password" id="Login_contraseña1" name="contraseña1" value={pass1} onChange={e => setPass1(e.target.value)} required></input>
                    <label>Contraseña</label>
                </div>

                <div className='Login_boton'>
                    <input type="submit" value="Registrarse"></input>
                </div>
            </form>
        </div>
    )
}

export default Login;