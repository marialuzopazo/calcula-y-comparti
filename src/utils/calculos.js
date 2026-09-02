// Funciones puras con toda la matemática del presupuesto.
// Se mantienen separadas de los componentes para poder probarlas
// y leerlas sin mezclarlas con el JSX.

export const MARGEN_MINIMO_RECOMENDADO = 15

// Costo base, antes de aplicar la ganancia deseada. Para "producto" el
// resultado es el costo POR UNIDAD: se reparte el costo de los insumos
// entre las unidades que rinde la receta o compra, se suma el envoltorio
// y, si corresponde, una parte proporcional de los costos fijos del período
// (luz, internet, traslados) repartida entre las unidades producidas.
export function calcularCostoBase({
  tipoServicio,
  horas,
  costoPorHora,
  costoTotal,
  costoInsumos,
  unidadesPorReceta,
  costoEnvoltorio,
  aplicaCostosFijos,
  costosFijos,
  unidadesCostosFijos,
}) {
  if (tipoServicio === 'hora') {
    return horas * costoPorHora
  }

  if (tipoServicio === 'producto') {
    const costoInsumosPorUnidad = unidadesPorReceta > 0 ? costoInsumos / unidadesPorReceta : 0
    const costoFijoPorUnidad =
      aplicaCostosFijos && unidadesCostosFijos > 0 ? costosFijos / unidadesCostosFijos : 0
    return costoInsumosPorUnidad + costoEnvoltorio + costoFijoPorUnidad
  }

  return costoTotal
}

// Se suma la ganancia deseada como un porcentaje sobre el costo base
// (ej: costo $1000 + 30% de ganancia = $1300 a cobrar).
export function calcularMontoConGanancia(costoBase, gananciaDeseada) {
  return costoBase * (1 + gananciaDeseada / 100)
}

export function aplicarDescuento(monto, porcentajeDescuento) {
  return monto - monto * (porcentajeDescuento / 100)
}

export function calcularGananciaNeta(montoFinal, costoBase) {
  return montoFinal - costoBase
}

// El margen se calcula sobre el monto final (lo que realmente paga
// el cliente), no sobre el costo base, para reflejar la rentabilidad
// real del trabajo una vez aplicado el descuento.
export function calcularMargenGanancia(gananciaNeta, montoFinal) {
  if (montoFinal <= 0) return 0
  return (gananciaNeta / montoFinal) * 100
}

export function esRentabilidadBaja(margenGanancia) {
  return margenGanancia < MARGEN_MINIMO_RECOMENDADO
}

// Corre todo el flujo de cálculo de una vez a partir de los datos
// cargados por el usuario y devuelve un resumen listo para mostrar.
export function calcularPresupuesto(datos) {
  const { gananciaDeseada, aplicaDescuento, porcentajeDescuento } = datos

  const costoBase = calcularCostoBase(datos)
  const montoSinDescuento = calcularMontoConGanancia(costoBase, gananciaDeseada)
  const montoFinal = aplicaDescuento
    ? aplicarDescuento(montoSinDescuento, porcentajeDescuento)
    : montoSinDescuento
  const gananciaNeta = calcularGananciaNeta(montoFinal, costoBase)
  const margenGanancia = calcularMargenGanancia(gananciaNeta, montoFinal)

  return {
    costoBase,
    montoSinDescuento,
    montoFinal,
    gananciaNeta,
    margenGanancia,
    rentabilidadBaja: esRentabilidadBaja(margenGanancia),
  }
}
