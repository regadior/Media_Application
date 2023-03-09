import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
function Register() {
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apell, setApell] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");


  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/register/', {
        nombre,
        apell,
        nick,
        email,
        pass1,
        pass2,
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
    <div className='Register'>
      <form onSubmit={handleSubmit} className='Register_form' >
        <h2>Registrarse</h2>
        <div className='Register_box'>
          <input type="text" id="Register_nombre" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} required></input>
          <label>Nombre</label>

        </div>

        <div className='Register_box'>
          <input type="text" id="Register_apellido" name="apellido" value={apell} onChange={e => setApell(e.target.value)} required></input>
          <label>Apellidos</label>

        </div>

        <div className='Register_box'>
          <input type="text" id="Register_nickname" name="nickname" value={nick} onChange={e => setNick(e.target.value)} required></input>
          <label>Nombre de usuario</label>

        </div>

        <div className='Register_box'>
          <input type="text" id="Register_email" name="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
          <label>Email</label>

        </div>

        <div className='Register_box'>
          <input type="password" id="Register_contraseña1" name="contraseña1" value={pass1} onChange={e => setPass1(e.target.value)} required></input>
          <label>Contraseña</label>
        </div>

        <div className='Register_box'>
          <input type="password" id="Register_contraseña2" name="contraseña2" value={pass2} onChange={e => setPass2(e.target.value)} required></input>
          <label>Confirmar Contraseña</label>

        </div>
        <div className='Register_boton'>
        <input type="submit" value="Registrarse"></input>

        </div>
      </form>
    </div>
  )
}

export default Register;