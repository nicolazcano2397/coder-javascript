// ========================================
// SIMULADOR DE RESERVAS - HOTEL RAPA NUI
// Entregable 1 - JavaScript CoderHouse
// Autor: Nicolás L.
// ========================================

// ============ CONSTANTES Y VARIABLES GLOBALES ============

// Array de habitaciones disponibles
const HABITACIONES = [
  {
    id: 1,
    nombre: "Deluxe",
    descripcion: "Cama King, terraza privada",
    capacidadMaxima: 2,
    precioNoche: 85000, // CLP
    tamaño: "28 m²"
  },
  {
    id: 2,
    nombre: "Superior",
    descripcion: "Cama Queen, decoración artesanal",
    capacidadMaxima: 2,
    precioNoche: 70000,
    tamaño: "24 m²"
  },
  {
    id: 3,
    nombre: "Familiar",
    descripcion: "2 camas Queen, ideal para familias",
    capacidadMaxima: 4,
    precioNoche: 110000,
    tamaño: "32 m²"
  }
];

// Array de tours disponibles
const TOURS = [
  { id: 1, nombre: "Hanga Roa: Única ciudad en Rapa Nui", precio: 70000, duracion: "Half Day" },
  { id: 2, nombre: "Amanecer en Ahu Tongariki", precio: 120000, duracion: "Full Day" },
  { id: 3, nombre: "Tour Costa Norte Rapa Nui", precio: 80000, duracion: "Full Day" },
  { id: 4, nombre: "Cuevas Ancestrales y Orongo", precio: 115000, duracion: "Full Day" },
  { id: 5, nombre: "Tour Privado Fábrica de los Moais", precio: 135000, duracion: "Full Day" },
  { id: 6, nombre: "Volcán Rano Kau y Orongo", precio: 60000, duracion: "Half Day" }
];

// Meses de temporada alta (octubre a marzo)
const MESES_TEMPORADA_ALTA = [1, 2, 3, 10, 11, 12];

// Recargo por temporada alta (25%)
const RECARGO_TEMPORADA_ALTA = 0.25;

// Variable global para almacenar los datos de la reserva
let reservaActual = {
  habitacion: null,
  fechaInicio: null,
  fechaFin: null,
  cantidadNoches: 0,
  cantidadPersonas: 0,
  toursSeleccionados: [],
  esTemporadaAlta: false,
  subtotalHabitacion: 0,
  recargoTemporada: 0,
  subtotalTours: 0,
  totalReserva: 0
};

// ============ FUNCIONES PRINCIPALES ============

/**
 * Función principal que inicia el simulador
 */
function iniciarSimulador() {
  console.clear();
  console.log("=".repeat(60));
  console.log("SIMULADOR DE RESERVAS - HOTEL RAPA NUI");
  console.log("=".repeat(60));
  console.log("\n");

  alert("¡Bienvenido al simulador de reservas del Hotel Rapa Nui!\n\nA continuación te guiaremos paso a paso para calcular el costo de tu estadía.");

  // ENTRADA DE DATOS
  let datosCompletos = capturarDatosReserva();

  if (datosCompletos) {
    // PROCESAMIENTO
    calcularPrecioReserva();

    // SALIDA
    mostrarResumen();
  } else {
    alert("Reserva cancelada. ¡Esperamos verte pronto en Rapa Nui!");
    console.log("Simulación cancelada por el usuario.");
  }
}

/**
 * FUNCIÓN 1: CAPTURA DE DATOS
 * Solicita al usuario todos los datos necesarios para la reserva
 * @returns {boolean} - True si se completaron todos los datos, False si se canceló
 */
function capturarDatosReserva() {
  console.log("PASO 1: Captura de datos de reserva\n");

  // 1. SELECCIÓN DE HABITACIÓN
  let habitacionSeleccionada = seleccionarHabitacion();
  if (!habitacionSeleccionada) return false;
  reservaActual.habitacion = habitacionSeleccionada;

  // 2. CAPTURA DE FECHAS
  let fechasValidas = capturarFechas();
  if (!fechasValidas) return false;

  // 3. CANTIDAD DE PERSONAS
  let personasValidas = capturarCantidadPersonas();
  if (!personasValidas) return false;

  // 4. SELECCIÓN DE TOURS (OPCIONAL)
  let confirmarTours = confirm("¿Deseas agregar tours a tu reserva?\n\nTenemos 6 experiencias culturales disponibles.");
  
  if (confirmarTours) {
    let toursSeleccionados = seleccionarTours();
    if (toursSeleccionados && toursSeleccionados.length > 0) {
      reservaActual.toursSeleccionados = toursSeleccionados;
    }
  }

  console.log("Datos de reserva capturados correctamente\n");
  return true;
}

/**
 * Función auxiliar para seleccionar habitación
 * @returns {object|null} - Objeto de habitación seleccionada o null si cancela
 */
function seleccionarHabitacion() {
  let menuHabitaciones = "SELECCIONA TU HABITACION:\n\n";
  
  // Ciclo FOR para construir el menú
  for (let i = 0; i < HABITACIONES.length; i++) {
    menuHabitaciones += `${HABITACIONES[i].id}. ${HABITACIONES[i].nombre}\n`;
    menuHabitaciones += `   ${HABITACIONES[i].descripcion}\n`;
    menuHabitaciones += `   Capacidad: ${HABITACIONES[i].capacidadMaxima} personas | Tamaño: ${HABITACIONES[i].tamaño}\n`;
    menuHabitaciones += `   Precio: $${HABITACIONES[i].precioNoche.toLocaleString('es-CL')} CLP por noche\n\n`;
  }

  menuHabitaciones += "Ingresa el número de la habitación (1-3):";

  let seleccion = null;
  let intentos = 0;
  const MAX_INTENTOS = 3;

  // Ciclo WHILE para validar entrada
  while (intentos < MAX_INTENTOS) {
    let input = prompt(menuHabitaciones);
    
    if (input === null) return null; // Usuario canceló

    let opcion = parseInt(input);

    // Condicional para validar opción
    if (opcion >= 1 && opcion <= 3) {
      seleccion = HABITACIONES[opcion - 1];
      console.log(`Habitación seleccionada: ${seleccion.nombre}`);
      break;
    } else {
      intentos++;
      if (intentos < MAX_INTENTOS) {
        alert("Opción inválida. Intenta de nuevo (" + intentos + "/" + MAX_INTENTOS + ")");
      }
    }
  }

  if (seleccion === null) {
    alert("Demasiados intentos fallidos.");
    return null;
  }

  return seleccion;
}

/**
 * Función auxiliar para capturar fechas
 * @returns {boolean} - True si las fechas son válidas
 */
function capturarFechas() {
  // Captura ambas fechas en un solo prompt
  let fechasInput = prompt(
    "FECHAS DE TU ESTADIA\n\n" +
    "Ingresa las fechas de entrada y salida separadas por guión:\n" +
    "Formato: DD/MM/YYYY - DD/MM/YYYY\n\n" +
    "Ejemplo: 15/01/2026 - 20/01/2026"
  );
  
  if (fechasInput === null) return false;

  // Separar las dos fechas
  let fechasSeparadas = fechasInput.split('-');
  
  if (fechasSeparadas.length !== 2) {
    alert("Formato inválido. Debes ingresar dos fechas separadas por guión (-)");
    return false;
  }

  let fechaInicio = fechasSeparadas[0].trim();
  let fechaFin = fechasSeparadas[1].trim();

  // Validar formato de fechas
  let formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!formatoFecha.test(fechaInicio) || !formatoFecha.test(fechaFin)) {
    alert("Formato de fecha inválido. Use DD/MM/YYYY para ambas fechas");
    return false;
  }

  // Convertir fechas a objetos Date
  let [diaIni, mesIni, añoIni] = fechaInicio.split('/');
  let [diaFin, mesFin, añoFin] = fechaFin.split('/');

  let dateInicio = new Date(añoIni, mesIni - 1, diaIni);
  let dateFin = new Date(añoFin, mesFin - 1, diaFin);

  // Validar que las fechas sean válidas
  if (isNaN(dateInicio.getTime()) || isNaN(dateFin.getTime())) {
    alert("Una o ambas fechas son inválidas. Verifica el día, mes y año.");
    return false;
  }

  // Validar que fecha fin sea posterior a fecha inicio
  if (dateFin <= dateInicio) {
    alert("La fecha de salida debe ser posterior a la fecha de entrada.");
    return false;
  }

  // Calcular cantidad de noches
  let diferenciaTiempo = dateFin - dateInicio;
  let cantidadNoches = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

  // Determinar si está en temporada alta
  let mesReserva = parseInt(mesIni);
  let esTemporadaAlta = MESES_TEMPORADA_ALTA.includes(mesReserva);

  // Guardar datos
  reservaActual.fechaInicio = fechaInicio;
  reservaActual.fechaFin = fechaFin;
  reservaActual.cantidadNoches = cantidadNoches;
  reservaActual.esTemporadaAlta = esTemporadaAlta;

  console.log(`Fechas: ${fechaInicio} al ${fechaFin} (${cantidadNoches} noches)`);
  console.log(`   Temporada: ${esTemporadaAlta ? 'ALTA' : 'BAJA'}`);

  return true;
}

/**
 * Función auxiliar para capturar cantidad de personas
 * @returns {boolean} - True si la cantidad es válida
 */
function capturarCantidadPersonas() {
  let capacidadMax = reservaActual.habitacion.capacidadMaxima;
  let mensaje = `CANTIDAD DE HUESPEDES\n\nLa habitación ${reservaActual.habitacion.nombre} tiene capacidad para ${capacidadMax} persona(s).\n\n¿Cuántas personas se alojarán?`;

  let cantidad = prompt(mensaje);
  if (cantidad === null) return false;

  cantidad = parseInt(cantidad);

  // Validación con condicional
  if (isNaN(cantidad) || cantidad < 1 || cantidad > capacidadMax) {
    alert(`La cantidad debe estar entre 1 y ${capacidadMax} personas.`);
    return false;
  }

  reservaActual.cantidadPersonas = cantidad;
  console.log(`Cantidad de personas: ${cantidad}`);

  return true;
}

/**
 * Función auxiliar para seleccionar tours
 * @returns {array} - Array de tours seleccionados con cantidad de personas
 */
function seleccionarTours() {
  let toursElegidos = [];
  let menuTours = "TOURS DISPONIBLES EN RAPA NUI:\n\n";

  // Ciclo FOR para mostrar tours
  for (let i = 0; i < TOURS.length; i++) {
    menuTours += `${TOURS[i].id}. ${TOURS[i].nombre}\n`;
    menuTours += `   Duración: ${TOURS[i].duracion} | Precio: $${TOURS[i].precio.toLocaleString('es-CL')} CLP por persona\n\n`;
  }

  menuTours += "Ingresa los números de los tours que deseas, separados por comas.\nEjemplo: 1,3,5";

  let seleccion = prompt(menuTours);
  if (seleccion === null || seleccion.trim() === "") return toursElegidos;

  // Procesar selección
  let numerosSeleccionados = seleccion.split(',');

  for (let i = 0; i < numerosSeleccionados.length; i++) {
    let numero = parseInt(numerosSeleccionados[i].trim());
    
    // Validar que el número esté en rango
    if (numero >= 1 && numero <= TOURS.length) {
      let tour = TOURS[numero - 1];
      
      // Preguntar cantidad de personas para este tour
      let cantidadPersonas = prompt(
        `TOUR: ${tour.nombre}\n\n` +
        `¿Cuántas personas participarán en este tour?\n` +
        `Precio: $${tour.precio.toLocaleString('es-CL')} CLP por persona`
      );
      
      if (cantidadPersonas !== null) {
        cantidadPersonas = parseInt(cantidadPersonas);
        
        // Validar cantidad
        if (!isNaN(cantidadPersonas) && cantidadPersonas > 0) {
          // Agregar tour con cantidad de personas
          toursElegidos.push({
            ...tour,
            cantidadPersonas: cantidadPersonas
          });
          console.log(`Tour agregado: ${tour.nombre} - ${cantidadPersonas} persona(s)`);
        } else {
          alert(`Cantidad inválida para el tour "${tour.nombre}". No se agregará.`);
        }
      }
    }
  }

  if (toursElegidos.length === 0) {
    alert("No se agregaron tours válidos.");
  }

  return toursElegidos;
}

/**
 * FUNCIÓN 2: PROCESAMIENTO
 * Calcula todos los precios de la reserva
 */
function calcularPrecioReserva() {
  console.log("\nPASO 2: Cálculo de precios\n");

  // Calcular subtotal de habitación
  let precioNoche = reservaActual.habitacion.precioNoche;
  let noches = reservaActual.cantidadNoches;
  let subtotalHabitacion = precioNoche * noches;

  reservaActual.subtotalHabitacion = subtotalHabitacion;
  console.log(`   Habitación: $${precioNoche.toLocaleString('es-CL')} × ${noches} noches = $${subtotalHabitacion.toLocaleString('es-CL')} CLP`);

  // Calcular recargo por temporada alta
  let recargoTemporada = 0;
  if (reservaActual.esTemporadaAlta) {
    recargoTemporada = subtotalHabitacion * RECARGO_TEMPORADA_ALTA;
    reservaActual.recargoTemporada = recargoTemporada;
    console.log(`   Recargo temporada alta (25%): $${recargoTemporada.toLocaleString('es-CL')} CLP`);
  }

  // Calcular subtotal de tours
  let subtotalTours = 0;
  if (reservaActual.toursSeleccionados.length > 0) {
    console.log(`   Tours seleccionados:`);
    
    for (let i = 0; i < reservaActual.toursSeleccionados.length; i++) {
      let tour = reservaActual.toursSeleccionados[i];
      let precioTour = tour.precio * tour.cantidadPersonas;
      subtotalTours += precioTour;
      console.log(`   - ${tour.nombre}: $${tour.precio.toLocaleString('es-CL')} × ${tour.cantidadPersonas} persona(s) = $${precioTour.toLocaleString('es-CL')} CLP`);
    }
    
    reservaActual.subtotalTours = subtotalTours;
    console.log(`   Subtotal tours: $${subtotalTours.toLocaleString('es-CL')} CLP`);
  }

  // Calcular total final
  let totalReserva = subtotalHabitacion + recargoTemporada + subtotalTours;
  reservaActual.totalReserva = totalReserva;

  console.log(`\nCálculos completados. Total: $${totalReserva.toLocaleString('es-CL')} CLP\n`);
}

/**
 * FUNCIÓN 3: SALIDA DE DATOS
 * Muestra el resumen completo de la reserva
 */
function mostrarResumen() {
  console.log("=".repeat(60));
  console.log("RESUMEN DE RESERVA - HOTEL RAPA NUI");
  console.log("=".repeat(60));
  console.log("\n");

  // Construir mensaje para alert y console
  let resumen = "";
  
  resumen += "DATOS DE ALOJAMIENTO\n";
  resumen += `Habitación: ${reservaActual.habitacion.nombre}\n`;
  resumen += `Capacidad: ${reservaActual.habitacion.capacidadMaxima} personas | Tamaño: ${reservaActual.habitacion.tamaño}\n`;
  resumen += `Huéspedes: ${reservaActual.cantidadPersonas} persona(s)\n`;
  resumen += `Período: ${reservaActual.fechaInicio} al ${reservaActual.fechaFin}\n`;
  resumen += `Noches: ${reservaActual.cantidadNoches}\n`;
  resumen += `Temporada: ${reservaActual.esTemporadaAlta ? 'ALTA' : 'BAJA'}\n\n`;

  resumen += "DESGLOSE DE PRECIOS\n";
  resumen += `Habitación (${reservaActual.cantidadNoches} noches): $${reservaActual.subtotalHabitacion.toLocaleString('es-CL')} CLP\n`;
  
  if (reservaActual.esTemporadaAlta) {
    resumen += `Recargo temporada alta (+25%): $${reservaActual.recargoTemporada.toLocaleString('es-CL')} CLP\n`;
  }

  if (reservaActual.toursSeleccionados.length > 0) {
    resumen += `\nTOURS INCLUIDOS (${reservaActual.toursSeleccionados.length}):\n`;
    
    for (let i = 0; i < reservaActual.toursSeleccionados.length; i++) {
      let tour = reservaActual.toursSeleccionados[i];
      let precioTour = tour.precio * tour.cantidadPersonas;
      resumen += `${i + 1}. ${tour.nombre}\n`;
      resumen += `   ${tour.cantidadPersonas} persona(s) × $${tour.precio.toLocaleString('es-CL')} = $${precioTour.toLocaleString('es-CL')} CLP\n`;
    }
    
    resumen += `Subtotal tours: $${reservaActual.subtotalTours.toLocaleString('es-CL')} CLP\n`;
  } else {
    resumen += `Tours: No se agregaron tours\n`;
  }

  resumen += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  resumen += `TOTAL DE LA RESERVA: $${reservaActual.totalReserva.toLocaleString('es-CL')} CLP\n`;
  resumen += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  // Mostrar en consola
  console.log(resumen);

  // Mostrar en alert (versión compacta)
  let resumenAlert = `RESUMEN DE TU RESERVA\n\n`;
  resumenAlert += `${reservaActual.habitacion.nombre} - ${reservaActual.cantidadNoches} noches\n`;
  resumenAlert += `${reservaActual.cantidadPersonas} persona(s)\n`;
  resumenAlert += `${reservaActual.fechaInicio} al ${reservaActual.fechaFin}\n`;
  resumenAlert += `Temporada ${reservaActual.esTemporadaAlta ? 'ALTA' : 'BAJA'}\n\n`;
  
  if (reservaActual.toursSeleccionados.length > 0) {
    resumenAlert += `Tours incluidos:\n`;
    for (let i = 0; i < reservaActual.toursSeleccionados.length; i++) {
      let tour = reservaActual.toursSeleccionados[i];
      resumenAlert += `   - ${tour.nombre} (${tour.cantidadPersonas} pers.)\n`;
    }
    resumenAlert += `\n`;
  }
  
  resumenAlert += `TOTAL: $${reservaActual.totalReserva.toLocaleString('es-CL')} CLP\n\n`;
  resumenAlert += `Para ver el desglose completo, revisa la consola del navegador. ¡Gracias por elegir Hotel Rapa Nui!`;

  alert(resumenAlert);

  console.log("Simulación completada exitosamente");
  console.log("Para confirmar tu reserva, contáctanos en: reservas@harenua.cl");
  console.log("Teléfono: +56 9 3391 4780 / +56 9 7603 5591\n");
  console.log("=".repeat(60));

  // Preguntar si desea hacer otra simulación
  let otraSimulacion = confirm("¿Deseas realizar otra simulación de reserva?");
  
  if (otraSimulacion) {
    // Reiniciar reserva
    reiniciarReserva();
    iniciarSimulador();
  } else {
    alert("¡Gracias por usar nuestro simulador! Esperamos verte pronto en Rapa Nui");
  }
}

/**
 * Función auxiliar para reiniciar los datos de reserva
 */
function reiniciarReserva() {
  reservaActual = {
    habitacion: null,
    fechaInicio: null,
    fechaFin: null,
    cantidadNoches: 0,
    cantidadPersonas: 0,
    toursSeleccionados: [],
    esTemporadaAlta: false,
    subtotalHabitacion: 0,
    recargoTemporada: 0,
    subtotalTours: 0,
    totalReserva: 0
  };
}

// ============ EJECUCIÓN ============
console.log("Sistema de reservas cargado correctamente");
console.log("Haz clic en el botón 'Iniciar Simulador' para comenzar\n");