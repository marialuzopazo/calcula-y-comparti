import estilos from './Boton.module.css'

// Botón chico y de una sola responsabilidad: solo se encarga de la
// apariencia según la variante, la lógica de cada pantalla vive afuera.
export function Boton({ children, variante = 'primario', tipo = 'button', className = '', ...resto }) {
  const claseVariante = estilos[variante] ?? estilos.primario

  return (
    <button type={tipo} className={`${estilos.boton} ${claseVariante} ${className}`} {...resto}>
      {children}
    </button>
  )
}
