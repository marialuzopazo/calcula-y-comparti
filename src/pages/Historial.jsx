import { useState } from 'react'
import { Encabezado } from '../components/Encabezado'
import { Tarjeta } from '../components/Tarjeta'
import { Boton } from '../components/Boton'
import { obtenerCalculos, borrarHistorial } from '../utils/almacenamiento'
import { formatearMoneda, formatearFecha } from '../utils/formato'
import estilos from './Historial.module.css'

const etiquetasPorTipo = {
  hora: { texto: 'Por hora', clase: estilos.etiquetaHora },
  proyecto: { texto: 'Por proyecto', clase: estilos.etiquetaProyecto },
  producto: { texto: 'Por producto', clase: estilos.etiquetaProducto },
}

export function Historial() {
  const [historial, setHistorial] = useState(obtenerCalculos)

  function handleBorrar() {
    borrarHistorial()
    setHistorial([])
  }

  return (
    <div className="pantalla">
      <Encabezado titulo="Historial" subtitulo="Tus últimos cálculos guardados en este dispositivo" />

      {historial.length === 0 ? (
        <p className={estilos.vacio}>Todavía no hiciste ningún cálculo.</p>
      ) : (
        <>
          <ul className={estilos.lista}>
            {historial.map((calculo) => {
              const etiqueta = etiquetasPorTipo[calculo.tipoServicio]
              return (
                <li key={calculo.id}>
                  <Tarjeta>
                    <div className={estilos.item}>
                      <div>
                        <span className={`${estilos.etiquetaTipo} ${etiqueta.clase}`}>
                          {etiqueta.texto}
                        </span>
                        <p className={estilos.fecha}>{formatearFecha(calculo.fecha)}</p>
                      </div>
                      <span className={estilos.monto}>{formatearMoneda(calculo.montoFinal)}</span>
                    </div>
                  </Tarjeta>
                </li>
              )
            })}
          </ul>
          <Boton variante="secundario" className={estilos.botonBorrar} onClick={handleBorrar}>
            Borrar historial
          </Boton>
        </>
      )}
    </div>
  )
}
