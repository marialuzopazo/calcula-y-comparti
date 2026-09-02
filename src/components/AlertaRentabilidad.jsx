import { IconoAlerta } from './Iconos'
import estilos from './AlertaRentabilidad.module.css'

export function AlertaRentabilidad({ margenGanancia }) {
  const esNegativo = margenGanancia < 0

  return (
    <div className={estilos.alerta} role="alert">
      <IconoAlerta className={estilos.icono} />
      <div>
        <p className={estilos.titulo}>
          {esNegativo ? 'Este proyecto da pérdida' : 'Ganancia muy ajustada'}
        </p>
        <p className={estilos.texto}>
          {esNegativo
            ? 'El monto a cobrar no cubre tus costos. Revisá el descuento o la ganancia deseada.'
            : 'El margen de ganancia es menor al 15% recomendado. Considerá ajustar el descuento o el precio.'}
        </p>
      </div>
    </div>
  )
}
