import { useNavigate } from 'react-router-dom'
import { Encabezado } from '../components/Encabezado'
import { Boton } from '../components/Boton'
import { useCalculo } from '../hooks/useCalculo'
import estilos from './TipoServicio.module.css'

const opciones = [
  {
    valor: 'hora',
    titulo: 'Por hora',
    descripcion: 'Cobrás según las horas que le vas a dedicar al trabajo.',
    color: 'var(--color-azul-texto)',
    letra: 'H',
  },
  {
    valor: 'proyecto',
    titulo: 'Por proyecto',
    descripcion: 'Cobrás un monto cerrado por todo el trabajo entregado.',
    color: 'var(--color-naranja-texto)',
    letra: 'P',
  },
  {
    valor: 'producto',
    titulo: 'Por producto',
    descripcion: 'Reventa o productos artesanales/gastronómicos: calculás el precio por unidad.',
    color: 'var(--color-amarillo-texto)',
    letra: 'U',
  },
]

export function TipoServicio() {
  const navegar = useNavigate()
  const { datos, actualizarDatos } = useCalculo()

  function handleContinuar(evento) {
    evento.preventDefault()
    navegar('/datos')
  }

  return (
    <div className="pantalla">
      <Encabezado
        titulo="¿Cómo vas a cobrar?"
        subtitulo="Elegí el tipo de servicio para este trabajo"
        mostrarAtras
        rutaAtras="/"
      />
      <form onSubmit={handleContinuar}>
        <fieldset className={estilos.opciones} style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
            Tipo de servicio
          </legend>
          {opciones.map((opcion) => (
            <label
              key={opcion.valor}
              className={`${estilos.opcion} ${
                datos.tipoServicio === opcion.valor ? estilos.opcionSeleccionada : ''
              }`}
            >
              <input
                type="radio"
                name="tipoServicio"
                value={opcion.valor}
                checked={datos.tipoServicio === opcion.valor}
                onChange={() => actualizarDatos({ tipoServicio: opcion.valor })}
                style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
              />
              <span className={estilos.opcionIcono} style={{ backgroundColor: opcion.color }}>
                {opcion.letra}
              </span>
              <p className={estilos.opcionTitulo}>{opcion.titulo}</p>
              <p className={estilos.opcionDescripcion}>{opcion.descripcion}</p>
            </label>
          ))}
        </fieldset>
        <Boton tipo="submit" disabled={!datos.tipoServicio}>
          Continuar
        </Boton>
      </form>
    </div>
  )
}
