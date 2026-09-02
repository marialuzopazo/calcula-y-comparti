import { useMemo } from 'react'
import { useCalculo } from './useCalculo'
import { calcularPresupuesto } from '../utils/calculos'

// Toma los datos cargados en el contexto y devuelve el resultado
// del presupuesto ya calculado, listo para mostrar en pantalla.
export function useCalculoPresupuesto() {
  const { datos } = useCalculo()

  const resultado = useMemo(() => {
    const datosNumericos = {
      ...datos,
      horas: Number(datos.horas) || 0,
      costoPorHora: Number(datos.costoPorHora) || 0,
      costoTotal: Number(datos.costoTotal) || 0,
      costoInsumos: Number(datos.costoInsumos) || 0,
      unidadesPorReceta: Number(datos.unidadesPorReceta) || 0,
      costoEnvoltorio: Number(datos.costoEnvoltorio) || 0,
      costosFijos: Number(datos.costosFijos) || 0,
      unidadesCostosFijos: Number(datos.unidadesCostosFijos) || 0,
      gananciaDeseada: Number(datos.gananciaDeseada) || 0,
      porcentajeDescuento: Number(datos.porcentajeDescuento) || 0,
    }
    return calcularPresupuesto(datosNumericos)
  }, [datos])

  return { datos, resultado }
}
