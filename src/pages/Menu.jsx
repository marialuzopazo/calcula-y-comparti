import { Encabezado } from '../components/Encabezado'
import { Tarjeta } from '../components/Tarjeta'
import { IconoReloj, IconoAlerta, IconoMensaje } from '../components/Iconos'
import estilos from './Menu.module.css'

const itemsAyuda = [
  {
    Icono: IconoAlerta,
    color: 'var(--color-rojo)',
    titulo: 'Alerta de rentabilidad',
    texto: 'Te avisamos cuando tu ganancia queda por debajo del 15%, para que puedas revisar el precio.',
  },
  {
    Icono: IconoReloj,
    color: 'var(--color-teal)',
    titulo: 'Historial',
    texto: 'Tus últimos 20 cálculos quedan guardados en este dispositivo, no en un servidor.',
  },
]

export function Menu() {
  return (
    <div className="pantalla">
      <Encabezado titulo="Menú" subtitulo="Ayuda y acerca de la app" />

      {itemsAyuda.map((item) => (
        <Tarjeta key={item.titulo}>
          <div className={estilos.item}>
            <span className={estilos.icono} style={{ backgroundColor: item.color }}>
              <item.Icono width={20} height={20} />
            </span>
            <div>
              <p className={estilos.itemTitulo}>{item.titulo}</p>
              <p className={estilos.itemTexto}>{item.texto}</p>
            </div>
          </div>
        </Tarjeta>
      ))}

      <a
        className={estilos.enlace}
        href="https://www.instagram.com/estructura.deimpacto/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tarjeta>
          <div className={estilos.item}>
            <span className={estilos.icono} style={{ backgroundColor: 'var(--color-logo)' }}>
              <IconoMensaje width={20} height={20} />
            </span>
            <div>
              <p className={estilos.itemTitulo}>Sugerencias y reportes</p>
              <p className={estilos.itemTexto}>
                ¿Querés proponer un cambio o encontraste un error de cálculo? Escribinos por
                Instagram: @estructura.deimpacto
              </p>
            </div>
          </div>
        </Tarjeta>
      </a>

      <p className={estilos.pie}>
        Calculá y Compartí, plataforma simple y gratuita realizada por Estudio Estructura de
        Impacto
      </p>
    </div>
  )
}
