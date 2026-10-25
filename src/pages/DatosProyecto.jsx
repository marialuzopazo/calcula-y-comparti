import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Encabezado } from '../components/Encabezado'
import { Boton } from '../components/Boton'
import { useCalculo } from '../hooks/useCalculo'
import { validarDatosProyecto } from '../utils/validacion'
import estilos from './DatosProyecto.module.css'

export function DatosProyecto() {
  const navegar = useNavigate()
  const { datos, actualizarDatos } = useCalculo()
  const [errores, setErrores] = useState({})

  // Si se entra a esta pantalla sin haber elegido el tipo de servicio,
  // se vuelve al paso anterior del flujo.
  useEffect(() => {
    if (!datos.tipoServicio) {
      navegar('/tipo-servicio', { replace: true })
    }
  }, [datos.tipoServicio, navegar])

  function handleContinuar(evento) {
    evento.preventDefault()
    const erroresEncontrados = validarDatosProyecto(datos)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length === 0) {
      navegar('/resultado')
    }
  }

  if (!datos.tipoServicio) return null

  return (
    <div className="pantalla">
      <Encabezado
        titulo="Contanos los números"
        subtitulo="Estos datos se usan para calcular cuánto cobrar"
        mostrarAtras
        rutaAtras="/tipo-servicio"
      />

      <form onSubmit={handleContinuar} noValidate>
        {datos.tipoServicio === 'hora' ? (
          <>
            <div className={estilos.campo}>
              <label className={estilos.etiqueta} htmlFor="horas">
                Horas estimadas
              </label>
              <input
                id="horas"
                type="number"
                min="0"
                step="0.5"
                inputMode="decimal"
                className={estilos.input}
                value={datos.horas}
                onChange={(evento) => actualizarDatos({ horas: evento.target.value })}
                aria-invalid={Boolean(errores.horas)}
                aria-describedby={errores.horas ? 'error-horas' : undefined}
              />
              {errores.horas && (
                <p id="error-horas" className={estilos.errorCampo}>
                  {errores.horas}
                </p>
              )}
            </div>

            <div className={estilos.campo}>
              <label className={estilos.etiqueta} htmlFor="costoPorHora">
                Costo por hora ($)
              </label>
              <input
                id="costoPorHora"
                type="number"
                min="0"
                inputMode="decimal"
                className={estilos.input}
                value={datos.costoPorHora}
                onChange={(evento) => actualizarDatos({ costoPorHora: evento.target.value })}
                aria-invalid={Boolean(errores.costoPorHora)}
                aria-describedby={errores.costoPorHora ? 'error-costoPorHora' : undefined}
              />
              {errores.costoPorHora && (
                <p id="error-costoPorHora" className={estilos.errorCampo}>
                  {errores.costoPorHora}
                </p>
              )}
            </div>
          </>
        ) : datos.tipoServicio === 'producto' ? (
          <>
            <div className={estilos.campo}>
              <label className={estilos.etiqueta} htmlFor="costoInsumos">
                Costo total de ingredientes o insumos ($)
              </label>
              <input
                id="costoInsumos"
                type="number"
                min="0"
                inputMode="decimal"
                className={estilos.input}
                value={datos.costoInsumos}
                onChange={(evento) => actualizarDatos({ costoInsumos: evento.target.value })}
                aria-invalid={Boolean(errores.costoInsumos)}
                aria-describedby={errores.costoInsumos ? 'error-costoInsumos' : undefined}
              />
              {errores.costoInsumos && (
                <p id="error-costoInsumos" className={estilos.errorCampo}>
                  {errores.costoInsumos}
                </p>
              )}
            </div>

            <div className={estilos.campo}>
              <label className={estilos.etiqueta} htmlFor="unidadesPorReceta">
                ¿Cuántas unidades salen de esa receta o compra?
              </label>
              <input
                id="unidadesPorReceta"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                className={estilos.input}
                value={datos.unidadesPorReceta}
                onChange={(evento) => actualizarDatos({ unidadesPorReceta: evento.target.value })}
                aria-invalid={Boolean(errores.unidadesPorReceta)}
                aria-describedby={errores.unidadesPorReceta ? 'error-unidadesPorReceta' : undefined}
              />
              {errores.unidadesPorReceta && (
                <p id="error-unidadesPorReceta" className={estilos.errorCampo}>
                  {errores.unidadesPorReceta}
                </p>
              )}
            </div>

            <div className={estilos.campo}>
              <label className={estilos.etiqueta} htmlFor="costoEnvoltorio">
                Costo de envoltorio o empaque por unidad ($)
              </label>
              <input
                id="costoEnvoltorio"
                type="number"
                min="0"
                inputMode="decimal"
                className={estilos.input}
                value={datos.costoEnvoltorio}
                onChange={(evento) => actualizarDatos({ costoEnvoltorio: evento.target.value })}
                aria-invalid={Boolean(errores.costoEnvoltorio)}
                aria-describedby={errores.costoEnvoltorio ? 'error-costoEnvoltorio' : undefined}
              />
              {errores.costoEnvoltorio && (
                <p id="error-costoEnvoltorio" className={estilos.errorCampo}>
                  {errores.costoEnvoltorio}
                </p>
              )}
            </div>

            <div className={estilos.tarjetaDescuento}>
              <div>
                <p className={estilos.textoDescuento}>¿Sumar costos fijos?</p>
                <p className={estilos.subtextoDescuento}>Luz, internet, traslados, etc.</p>
              </div>
              <span className={estilos.switch}>
                <input
                  type="checkbox"
                  id="aplicaCostosFijos"
                  checked={datos.aplicaCostosFijos}
                  onChange={(evento) => actualizarDatos({ aplicaCostosFijos: evento.target.checked })}
                />
                <label htmlFor="aplicaCostosFijos" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
                  Sumar costos fijos
                </label>
                <span className={estilos.switchDeslizador} aria-hidden="true" />
              </span>
            </div>

            {datos.aplicaCostosFijos && (
              <>
                <div className={estilos.campo}>
                  <label className={estilos.etiqueta} htmlFor="costosFijos">
                    Total de costos fijos del período ($)
                  </label>
                  <input
                    id="costosFijos"
                    type="number"
                    min="0"
                    inputMode="decimal"
                    className={estilos.input}
                    value={datos.costosFijos}
                    onChange={(evento) => actualizarDatos({ costosFijos: evento.target.value })}
                    aria-invalid={Boolean(errores.costosFijos)}
                    aria-describedby={errores.costosFijos ? 'error-costosFijos' : undefined}
                  />
                  {errores.costosFijos && (
                    <p id="error-costosFijos" className={estilos.errorCampo}>
                      {errores.costosFijos}
                    </p>
                  )}
                </div>

                <div className={estilos.campo}>
                  <label className={estilos.etiqueta} htmlFor="unidadesCostosFijos">
                    ¿Cuántas unidades producís en ese período?
                  </label>
                  <input
                    id="unidadesCostosFijos"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    className={estilos.input}
                    value={datos.unidadesCostosFijos}
                    onChange={(evento) => actualizarDatos({ unidadesCostosFijos: evento.target.value })}
                    aria-invalid={Boolean(errores.unidadesCostosFijos)}
                    aria-describedby={errores.unidadesCostosFijos ? 'error-unidadesCostosFijos' : undefined}
                  />
                  {errores.unidadesCostosFijos && (
                    <p id="error-unidadesCostosFijos" className={estilos.errorCampo}>
                      {errores.unidadesCostosFijos}
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className={estilos.campo}>
            <label className={estilos.etiqueta} htmlFor="costoTotal">
              Costo total del proyecto ($)
            </label>
            <input
              id="costoTotal"
              type="number"
              min="0"
              inputMode="decimal"
              className={estilos.input}
              value={datos.costoTotal}
              onChange={(evento) => actualizarDatos({ costoTotal: evento.target.value })}
              aria-invalid={Boolean(errores.costoTotal)}
              aria-describedby={errores.costoTotal ? 'error-costoTotal' : undefined}
            />
            {errores.costoTotal && (
              <p id="error-costoTotal" className={estilos.errorCampo}>
                {errores.costoTotal}
              </p>
            )}
          </div>
        )}

        <div className={estilos.campo}>
          <label className={estilos.etiqueta} htmlFor="gananciaDeseada">
            Ganancia deseada (%)
          </label>
          <input
            id="gananciaDeseada"
            type="number"
            min="0"
            inputMode="decimal"
            className={estilos.input}
            value={datos.gananciaDeseada}
            onChange={(evento) => actualizarDatos({ gananciaDeseada: evento.target.value })}
            aria-invalid={Boolean(errores.gananciaDeseada)}
            aria-describedby={errores.gananciaDeseada ? 'error-gananciaDeseada' : undefined}
          />
          {errores.gananciaDeseada && (
            <p id="error-gananciaDeseada" className={estilos.errorCampo}>
              {errores.gananciaDeseada}
            </p>
          )}
        </div>

        <div className={estilos.tarjetaDescuento}>
          <div>
            <p className={estilos.textoDescuento}>¿Aplica un descuento?</p>
            <p className={estilos.subtextoDescuento}>Por ejemplo, para un cliente recurrente</p>
          </div>
          <span className={estilos.switch}>
            <input
              type="checkbox"
              id="aplicaDescuento"
              checked={datos.aplicaDescuento}
              onChange={(evento) => actualizarDatos({ aplicaDescuento: evento.target.checked })}
            />
            <label htmlFor="aplicaDescuento" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
              Aplicar descuento
            </label>
            <span className={estilos.switchDeslizador} aria-hidden="true" />
          </span>
        </div>

        {datos.aplicaDescuento && (
          <div className={estilos.campo}>
            <label className={estilos.etiqueta} htmlFor="porcentajeDescuento">
              Porcentaje de descuento (%)
            </label>
            <input
              id="porcentajeDescuento"
              type="number"
              min="0"
              max="100"
              inputMode="decimal"
              className={estilos.input}
              value={datos.porcentajeDescuento}
              onChange={(evento) => actualizarDatos({ porcentajeDescuento: evento.target.value })}
              aria-invalid={Boolean(errores.porcentajeDescuento)}
              aria-describedby={errores.porcentajeDescuento ? 'error-porcentajeDescuento' : undefined}
            />
            {errores.porcentajeDescuento && (
              <p id="error-porcentajeDescuento" className={estilos.errorCampo}>
                {errores.porcentajeDescuento}
              </p>
            )}
          </div>
        )}

        <Boton tipo="submit">Calcular presupuesto</Boton>
      </form>
    </div>
  )
}
