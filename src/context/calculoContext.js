import { createContext } from 'react'

// Datos que se van completando a lo largo de las pantallas del flujo
// (tipo de servicio -> datos -> resultado).
export const datosIniciales = {
  tipoServicio: null, // 'hora' | 'proyecto' | 'producto'
  horas: '',
  costoPorHora: '',
  costoTotal: '',
  costoInsumos: '',
  unidadesPorReceta: '',
  costoEnvoltorio: '',
  aplicaCostosFijos: false,
  costosFijos: '',
  unidadesCostosFijos: '',
  gananciaDeseada: '',
  aplicaDescuento: false,
  porcentajeDescuento: '',
}

export const CalculoContext = createContext(null)
