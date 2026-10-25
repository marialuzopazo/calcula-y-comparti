import { useNavigate } from 'react-router-dom'
import { Boton } from '../components/Boton'
import { useCalculo } from '../hooks/useCalculo'
import estilos from './Inicio.module.css'

const beneficios = [
  { texto: 'Calculá cuánto cobrar por hora o por proyecto', color: 'var(--color-teal)' },
  { texto: 'Aplicá descuentos y mirá cómo afectan tu ganancia', color: 'var(--color-naranja)' },
  { texto: 'Recibí un aviso si el trabajo no es rentable', color: 'var(--color-rojo)' },
]

export function Inicio() {
  const navegar = useNavigate()
  const { reiniciarDatos } = useCalculo()

  function handleNuevoCalculo() {
    reiniciarDatos()
    navegar('/tipo-servicio')
  }

  return (
    <div className={`pantalla ${estilos.contenedor}`}>
      <img
        src="/logo-estructura.png"
        alt="Logo de Estructura de Impacto: una figura humana con los brazos en alto rodeada de círculos concéntricos"
        className={estilos.logo}
      />
      <h1 className={estilos.titulo}>
        Calculá y Compartí
      </h1>
      <p className={estilos.descripcion}>
        La calculadora de presupuestos: definí cuánto cobrar,
        revisá tu rentabilidad y compartilo con tu cliente en segundos.
      </p>
      <ul className={estilos.listaBeneficios}>
        {beneficios.map((beneficio) => (
          <li key={beneficio.texto} className={estilos.beneficio}>
            <span
              className={estilos.puntoBeneficio}
              style={{ backgroundColor: beneficio.color }}
              aria-hidden="true"
            />
            {beneficio.texto}
          </li>
        ))}
      </ul>
      <Boton onClick={handleNuevoCalculo}>Nuevo cálculo</Boton>
    </div>
  )
}
