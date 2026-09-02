# Calculá y Compartí

Calculadora de presupuestos pensada para freelancers y prestadores de
servicios: permite calcular cuánto cobrar por hora, por proyecto o por
producto (ideal para reventa o emprendimientos gastronómicos/artesanales),
aplicar descuentos, detectar si un trabajo no es rentable y compartir el
resultado con el cliente.

Proyecto final de UX/UI llevado a código con React + Vite.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Esto levanta la app en `http://localhost:5173`.

Otros scripts disponibles:

- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente el build de producción para probarlo.
- `npm run lint`: corre el linter (oxlint) sobre el código.

## Cómo desplegarlo en Vercel

1. Subí este proyecto a un repositorio de GitHub.
2. En [Vercel](https://vercel.com), hacé clic en "Add New Project" e importá
   ese repositorio.
3. Vercel detecta automáticamente que es un proyecto Vite y usa `npm run
   build` como comando de build y `dist` como carpeta de salida. No hace
   falta configurar nada más ni cargar variables de entorno: la app es
   100% front-end.
4. Confirmá el despliegue y listo.

## Estructura del proyecto

```
src/
  components/   -> componentes reutilizables (Botón, Tarjeta, Navegación, etc.)
  pages/        -> una pantalla por archivo (Inicio, TipoServicio, DatosProyecto, Resultado, Historial, Menú)
  hooks/        -> lógica reutilizable (useCalculo, useCalculoPresupuesto)
  context/      -> estado compartido entre pantallas del flujo de cálculo
  utils/        -> funciones puras (cálculos, formato de moneda, validaciones)
  data/         -> plantillas de valores típicos sugeridos
```

## Notas y decisiones tomadas

- El margen de ganancia se calcula sobre el monto final que paga el
  cliente (después de aplicar el descuento, si corresponde), y se
  muestra una alerta cuando queda por debajo del 15%.
- El historial de cálculos se guarda en `localStorage` del navegador
  (no hay backend ni base de datos).
- El botón "Compartir" usa la Web Share API y, si el navegador no la
  soporta, copia el resultado al portapapeles como alternativa.
