import { useState } from 'react'
import { CalculoContext, datosIniciales } from './calculoContext'

// Comparte los datos del cálculo entre las pantallas del flujo por
// contexto, para no tener que pasarlos a mano por cada ruta.
export function CalculoProvider({ children }) {
  const [datos, setDatos] = useState(datosIniciales)

  function actualizarDatos(camposNuevos) {
    setDatos((datosActuales) => ({ ...datosActuales, ...camposNuevos }))
  }

  function reiniciarDatos() {
    setDatos(datosIniciales)
  }

  return (
    <CalculoContext.Provider value={{ datos, actualizarDatos, reiniciarDatos }}>
      {children}
    </CalculoContext.Provider>
  )
}
