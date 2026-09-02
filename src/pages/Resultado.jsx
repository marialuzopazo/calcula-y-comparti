import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Encabezado } from '../components/Encabezado'
import { Tarjeta } from '../components/Tarjeta'
import { Boton } from '../components/Boton'
import { AlertaRentabilidad } from '../components/AlertaRentabilidad'
import { IconoCompartir } from '../components/Iconos'
import { useCalculo } from '../hooks/useCalculo'
import { useCalculoPresupuesto } from '../hooks/useCalculoPresupuesto'
import { formatearMoneda, formatearPorcentaje } from '../utils/formato'
import { guardarCalculo } from '../utils/almacenamiento'
import estilos from './Resultado.module.css'

export function Resultado() {
  const navegar = useNavigate()
  const { datos, reiniciarDatos } = useCalculo()
  const { resultado } = useCalculoPresupuesto()
  const [mensajeCompartir, setMensajeCompartir] = useState('')
  const yaGuardado = useRef(false)

  useEffect(() => {
    if (!datos.tipoServicio) {
      navegar('/tipo-servicio', { replace: true })
      return
    }
    if (!yaGuardado.current) {
      guardarCalculo({ tipoServicio: datos.tipoServicio, ...resultado })
      yaGuardado.current = true
    }
    // Solo se guarda una vez, al entrar a la pantalla con un resultado válido.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!datos.tipoServicio) return null

  const esPorUnidad = datos.tipoServicio === 'producto'
  const unidades = Number(datos.unidadesPorReceta) || 0
  const totalDelLote = resultado.montoFinal * unidades

  const textoCompartir = esPorUnidad
    ? `Presupuesto de Calculá y Compartí\nPrecio por unidad: ${formatearMoneda(
        resultado.montoFinal,
      )}\nGanancia neta por unidad: ${formatearMoneda(resultado.gananciaNeta)}`
    : `Presupuesto de Calculá y Compartí\nTotal a cobrar: ${formatearMoneda(
        resultado.montoFinal,
      )}\nGanancia neta: ${formatearMoneda(resultado.gananciaNeta)}`

  async function handleCompartir() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Mi presupuesto', text: textoCompartir })
      } catch {
        // El usuario cerró el diálogo de compartir; no hace falta avisar nada.
      }
      return
    }

    try {
      await navigator.clipboard.writeText(textoCompartir)
      setMensajeCompartir('Copiado al portapapeles ✓')
    } catch {
      setMensajeCompartir('No se pudo copiar el resultado.')
    }
  }

  function handleNuevoCalculo() {
    reiniciarDatos()
    navegar('/tipo-servicio')
  }

  return (
    <div className="pantalla">
      <Encabezado titulo="Tu presupuesto" mostrarAtras rutaAtras="/datos" />

      {resultado.rentabilidadBaja && (
        <AlertaRentabilidad margenGanancia={resultado.margenGanancia} />
      )}

      <Tarjeta variante="oscura">
        <p className={estilos.etiquetaMonto}>
          {esPorUnidad ? 'Precio de venta por unidad' : 'Monto total a cobrar'}
        </p>
        <h2 className={estilos.monto}>{formatearMoneda(resultado.montoFinal)}</h2>
        {datos.aplicaDescuento && (
          <p className={estilos.montoTachado}>
            Sin descuento: {formatearMoneda(resultado.montoSinDescuento)}
          </p>
        )}

        <span
          className={`${estilos.chipMargen} ${
            resultado.rentabilidadBaja ? estilos.chipMargenBajo : ''
          }`}
        >
          Margen de ganancia: {formatearPorcentaje(resultado.margenGanancia)}
        </span>

        <ul className={estilos.desglose}>
          <li className={estilos.filaDesglose}>
            <span className={estilos.etiquetaDesglose}>
              {esPorUnidad ? 'Costo por unidad' : 'Costo del trabajo'}
            </span>
            <span>{formatearMoneda(resultado.costoBase)}</span>
          </li>
          <li className={estilos.filaDesglose}>
            <span className={estilos.etiquetaDesglose}>
              {esPorUnidad ? 'Ganancia neta por unidad' : 'Ganancia neta'}
            </span>
            <span>{formatearMoneda(resultado.gananciaNeta)}</span>
          </li>
          <li className={`${estilos.filaDesglose} ${estilos.filaDesgloseTotal}`}>
            <span>{esPorUnidad ? 'Precio por unidad' : 'Total a cobrar'}</span>
            <span>{formatearMoneda(resultado.montoFinal)}</span>
          </li>
          {esPorUnidad && unidades > 0 && (
            <li className={estilos.filaDesglose}>
              <span className={estilos.etiquetaDesglose}>Total si vendés el lote ({unidades} un.)</span>
              <span>{formatearMoneda(totalDelLote)}</span>
            </li>
          )}
        </ul>
      </Tarjeta>

      <div className={estilos.acciones}>
        <Boton variante="teal" onClick={handleCompartir}>
          <IconoCompartir width={18} height={18} />
          Compartir resultado
        </Boton>
        {mensajeCompartir && <p role="status">{mensajeCompartir}</p>}
        <Boton variante="secundario" onClick={handleNuevoCalculo}>
          Hacer otro cálculo
        </Boton>
      </div>
    </div>
  )
}
