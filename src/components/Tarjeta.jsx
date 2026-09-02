import estilos from './Tarjeta.module.css'

export function Tarjeta({ children, variante = 'clara', className = '' }) {
  const claseVariante = estilos[variante] ?? estilos.clara

  return (
    <div className={`${estilos.tarjeta} ${claseVariante} ${className}`}>
      <div className={estilos.contenido}>{children}</div>
    </div>
  )
}
