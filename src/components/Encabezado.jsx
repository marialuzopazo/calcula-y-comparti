import { useNavigate } from 'react-router-dom'
import { IconoFlechaAtras } from './Iconos'
import estilos from './Encabezado.module.css'

export function Encabezado({ titulo, subtitulo, mostrarAtras = false, rutaAtras }) {
  const navegar = useNavigate()

  return (
    <header className={estilos.encabezado}>
      {mostrarAtras && (
        <button
          type="button"
          className={estilos.botonAtras}
          onClick={() => (rutaAtras ? navegar(rutaAtras) : navegar(-1))}
          aria-label="Volver a la pantalla anterior"
        >
          <IconoFlechaAtras />
        </button>
      )}
      <div>
        <h1 className={estilos.titulo}>{titulo}</h1>
        {subtitulo && <p className={estilos.subtitulo}>{subtitulo}</p>}
      </div>
    </header>
  )
}
