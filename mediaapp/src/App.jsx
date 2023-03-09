import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './screens/notfound/NotFound'
import Inicio from './screens/inicio/Inicio';
import Login from './screens/session/login/Login';
import Register from './screens/session/register/Register';
function App() {
  return (
    <>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
