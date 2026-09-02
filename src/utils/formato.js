export function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor || 0)
}

export function formatearPorcentaje(valor) {
  return `${Math.round(valor)}%`
}

export function formatearFecha(fechaIso) {
  return new Date(fechaIso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
