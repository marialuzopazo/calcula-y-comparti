// Valida los datos cargados en el formulario de la pantalla "Datos del
// proyecto". Devuelve un objeto de errores por campo (vacío si todo está bien).
export function validarDatosProyecto(datos) {
  const errores = {}

  if (datos.tipoServicio === 'hora') {
    if (!datos.horas || Number(datos.horas) <= 0) {
      errores.horas = 'Ingresá una cantidad de horas mayor a 0.'
    }
    if (!datos.costoPorHora || Number(datos.costoPorHora) <= 0) {
      errores.costoPorHora = 'Ingresá un costo por hora mayor a 0.'
    }
  } else if (datos.tipoServicio === 'producto') {
    if (!datos.costoInsumos || Number(datos.costoInsumos) <= 0) {
      errores.costoInsumos = 'Ingresá un costo de insumos mayor a 0.'
    }
    if (!datos.unidadesPorReceta || Number(datos.unidadesPorReceta) <= 0) {
      errores.unidadesPorReceta = 'Ingresá una cantidad de unidades mayor a 0.'
    }
    if (datos.costoEnvoltorio !== '' && Number(datos.costoEnvoltorio) < 0) {
      errores.costoEnvoltorio = 'El costo de envoltorio no puede ser negativo.'
    }
    if (datos.aplicaCostosFijos) {
      if (!datos.costosFijos || Number(datos.costosFijos) < 0) {
        errores.costosFijos = 'Ingresá el total de costos fijos (puede ser 0).'
      }
      if (!datos.unidadesCostosFijos || Number(datos.unidadesCostosFijos) <= 0) {
        errores.unidadesCostosFijos = 'Ingresá cuántas unidades producís en ese período.'
      }
    }
  } else {
    if (!datos.costoTotal || Number(datos.costoTotal) <= 0) {
      errores.costoTotal = 'Ingresá un costo total mayor a 0.'
    }
  }

  if (datos.gananciaDeseada === '' || Number(datos.gananciaDeseada) < 0) {
    errores.gananciaDeseada = 'Ingresá un porcentaje de ganancia de 0 o más.'
  }

  if (datos.aplicaDescuento) {
    const descuento = Number(datos.porcentajeDescuento)
    if (datos.porcentajeDescuento === '' || descuento < 0 || descuento > 100) {
      errores.porcentajeDescuento = 'Ingresá un descuento entre 0 y 100.'
    }
  }

  return errores
}
