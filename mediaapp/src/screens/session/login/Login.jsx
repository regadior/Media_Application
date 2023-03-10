import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';//Para redirigir a una direccion sijn actualizar
import { Link } from 'react-router-dom'
import './Login.css';
function Login() {
    const navigate = useNavigate();
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [nick, setNick] = useState("");
    const [pass1, setPass1] = useState("");

    const validateForm = () => {
        setError1("");
        setError2("");
        let valid = true;
        //COMPROBAR QUE EL NOMBRE DE USUARIO TIENE DE 3 A 20 DIGITOS
        if (nick.length < 3 || nick.length > 20) {
            setError1("* El nombre de usuario debe tener entre 3 y 20 caracteres.");
            valid = false;
        }

        //COMPROBAR QUE LA CONTRASEÑA1 DE USUARIO TIENE DE 5 A 20 DIGITOS
        if (pass1.length < 5 || pass1.length > 20) {
            setError2("* La contraseña debe tener entre 5 y 20 caracteres.");
            valid = false;
        }

        return valid;
    }
    //FUNCION QUE ENVIA EL FORMULARIO AL HACER CLIC
    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const res = await axios.post('http://localhost:8000/api/login/', {//post al endpoint de login
                nick,
                pass1,
            });
            localStorage.setItem("session_token", res.data.session_token); //Se almacena el token de sesion en el localstorage
            navigate("/"); //Redirigir a /
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.error);
            } else {
                console.log('Error:', err.message);
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
                    <p className='Login_error_sesion'>{error1}</p>
                </div>

                <div className='Login_box'>
                    <input type="password" id="Login_contraseña1" name="contraseña1" value={pass1} onChange={e => setPass1(e.target.value)} required></input>
                    <label>Contraseña</label>
                    <p className='Login_error_sesion'>{error2}</p>
                </div>
                
                <div className='Login_boton'>
                    <input type="submit" value="Registrarse"></input>
                </div>
                <div className='Login_cuenta'>
                    Olvidaste la contraseña? <Link className='header_Link' to={`/register`}>Clica aqui.</Link>
                </div>
                <div className='Login_cuenta'>
                    No tienes cuenta? <Link className='header_Link' to={`/register`}>Crea una.</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;