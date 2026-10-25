import { useState } from 'react'
import { CalculoContext, datosIniciales } from './calculoContext'

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
