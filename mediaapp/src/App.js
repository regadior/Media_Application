import './App.css';
import { Routes, Route } from 'react-router-dom';
import NotFound from './screens/notfound/NotFound'
import Inicio from './screens/inicio/Inicio';
function App() {
  return (
    <>
    <Routes>        
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
