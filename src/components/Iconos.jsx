// Set chico de íconos en SVG inline. Se evita sumar una librería de
// íconos externa para no agregar dependencias innecesarias en un
// proyecto de este tamaño.
const propsBase = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function IconoInicio(props) {
  return (
    <svg {...propsBase} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

export function IconoMas(props) {
  return (
    <svg {...propsBase} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

export function IconoHistorial(props) {
  return (
    <svg {...propsBase} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

export function IconoMenu(props) {
  return (
    <svg {...propsBase} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function IconoCompartir(props) {
  return (
    <svg {...propsBase} {...props}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.6 15.8 6.4M8.2 13.4l7.6 4.2" />
    </svg>
  )
}

export function IconoAlerta(props) {
  return (
    <svg {...propsBase} {...props}>
      <path d="M12 3 2 21h20L12 3Z" />
      <path d="M12 10v4M12 17.5v.01" />
    </svg>
  )
}

export function IconoVarita(props) {
  return (
    <svg {...propsBase} {...props}>
      <path d="m15 4 1.5 1.5M19 3l-1 1M20 8l1.5-1.5M4 20l9-9M14 8l2 2" />
    </svg>
  )
}

export function IconoReloj(props) {
  return (
    <svg {...propsBase} {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9 2h6" />
    </svg>
  )
}

export function IconoFlechaAtras(props) {
  return (
    <svg {...propsBase} {...props}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  )
}
