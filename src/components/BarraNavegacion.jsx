import { NavLink } from 'react-router-dom'
import { useCalculo } from '../hooks/useCalculo'
import { IconoInicio, IconoMas, IconoHistorial, IconoMenu } from './Iconos'
import estilos from './BarraNavegacion.module.css'

const itemsNavegacion = [
  { ruta: '/', etiqueta: 'Inicio', Icono: IconoInicio },
  { ruta: '/tipo-servicio', etiqueta: 'Nuevo cálculo', Icono: IconoMas },
  { ruta: '/historial', etiqueta: 'Historial', Icono: IconoHistorial },
  { ruta: '/menu', etiqueta: 'Menú', Icono: IconoMenu },
]

export function BarraNavegacion() {
  const { reiniciarDatos } = useCalculo()

  return (
    <nav className={estilos.barra} aria-label="Navegación principal">
      <ul className={estilos.lista}>
        {itemsNavegacion.map(({ ruta, etiqueta, Icono }) => (
          <li key={ruta}>
            <NavLink
              to={ruta}
              end={ruta === '/'}
              onClick={() => {
                if (ruta === '/tipo-servicio') reiniciarDatos()
              }}
              className={({ isActive }) =>
                isActive ? `${estilos.enlace} ${estilos.enlaceActivo}` : estilos.enlace
              }
            >
              <Icono />
              <span>{etiqueta}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
