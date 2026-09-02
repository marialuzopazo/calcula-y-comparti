// Guarda el historial de cálculos en localStorage. No hay backend:
// toda la persistencia vive en el navegador del usuario.
const CLAVE_HISTORIAL = 'calculaYComparti.historial'

export function obtenerCalculos() {
  try {
    const datos = localStorage.getItem(CLAVE_HISTORIAL)
    return datos ? JSON.parse(datos) : []
  } catch {
    return []
  }
}

export function guardarCalculo(calculo) {
  const historial = obtenerCalculos()
  const nuevoHistorial = [{ id: crypto.randomUUID(), fecha: new Date().toISOString(), ...calculo }, ...historial]
  localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(nuevoHistorial.slice(0, 20)))
}

export function borrarHistorial() {
  localStorage.removeItem(CLAVE_HISTORIAL)
}
