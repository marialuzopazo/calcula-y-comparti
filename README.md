# Calculá y Compartí

Calculadora de presupuestos pensada para trabajadores independientes:
esta plataforma te permite calcular cuánto cobrar por hora, por proyecto o por
producto (esta pensada principalmente para reventa o emprendimientos relacionados a servicios),
aplicar descuentos, detectar si un trabajo no es rentable y compartir el
resultado con el cliente.

Proyecto final de UX/UI llevado a código con React + Vite.

# ux de este proyecto

link al portfolio de diseño:
https://www.behance.net/gallery/233159457/Portfolio-UX
este trabajo fue realizado bajo un estudio completo de diseño ux ui
con metodologias scrum - entrevistas con emprendedores y freelancers que fueron
una parte fundamental para el proyecto y su validación. ( a quienes fueron parte: gracias !)

## Notas y decisiones tomadas

- El margen de ganancia se calcula sobre el monto final que paga el
  cliente (después de aplicar el descuento, si corresponde), y se
  muestra una alerta cuando queda por debajo del 15%.
- El historial de cálculos se guarda en `localStorage` del navegador
  (no hay backend ni base de datos).
- El botón "Compartir" usa la Web Share API y, si el navegador no la
  soporta, copia el resultado al portapapeles como alternativa.
