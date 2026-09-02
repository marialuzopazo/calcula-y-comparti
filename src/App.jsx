import { Routes, Route } from 'react-router-dom'
import { BarraNavegacion } from './components/BarraNavegacion'
import { Inicio } from './pages/Inicio'
import { TipoServicio } from './pages/TipoServicio'
import { DatosProyecto } from './pages/DatosProyecto'
import { Resultado } from './pages/Resultado'
import { Historial } from './pages/Historial'
import { Menu } from './pages/Menu'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tipo-servicio" element={<TipoServicio />} />
        <Route path="/datos" element={<DatosProyecto />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <BarraNavegacion />
    </>
  )
}

export default App
