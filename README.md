**Entregable 1 - JavaScript CoderHouse**  
**Alumno:** Nicolás Lamas  

## Descripción del Proyecto

Simulador de reservas para el Hotel Rapa Nui, ubicado en Isla de Pascua, Chile. El sistema permite calcular el costo total de una estadía considerando:

- 3 tipos de habitaciones (Deluxe, Superior, Familiar)
- 6 tours culturales en la isla
- Cálculo automático de temporada alta/baja
- Precios por persona en tours
- Resumen detallado de la reserva

Este simulador está integrado en un sitio web completo del hotel, desarrollado previamente en el curso de HTML/CSS.

---

## Demo en Vivo

**Sitio:** https://nicolazcano2397.github.io/coder-javascript/
**Simulador:** https://nicolazcano2397.github.io/coder-javascript/simulador.html


---

## 📂 Estructura del Proyecto

```
proyecto/
├── index.html                 # Página principal del hotel
├── simulador.html            # Página del simulador de reservas ⭐
├── css/
│   └── style.css            # Estilos globales (incluye simulador)
├── js/
│   ├── main.js              # JavaScript del sitio
│   └── simulador.js         # Lógica del simulador ⭐
├── html/
│   ├── habitaciones.html
│   ├── tours.html
│   └── ...
├── multimedia/
│   ├── habitaciones/
│   ├── tours/
│   └── otros/
└── README.md
```

---

## 🎯 Funcionalidades del Simulador

### Características principales:

✅ **Selección de habitación** - 3 opciones con capacidades diferentes  
✅ **Captura de fechas** - En un solo paso (formato: DD/MM/YYYY - DD/MM/YYYY)  
✅ **Cálculo de temporada** - Alta (Oct-Mar) con recargo del 25%  
✅ **Tours opcionales** - 6 experiencias culturales disponibles  
✅ **Personas por tour** - Calcula precio × cantidad de personas  
✅ **Validaciones robustas** - Formatos, capacidades, fechas válidas  
✅ **Resumen detallado** - Alert compacto + desglose en consola  

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados
- **Bootstrap 5.3.3** - Framework CSS
- **JavaScript ES6+** - Lógica del simulador
- **SASS/SCSS** - Preprocesador CSS

---

## 📖 Cómo Usar el Simulador

1. Abre el archivo `simulador.html` en tu navegador
2. Presiona **F12** para abrir la consola del navegador
3. Haz clic en el botón **"Iniciar Simulador de Reservas"**
4. Sigue las instrucciones en los cuadros de diálogo:
   - Selecciona una habitación (1-3)
   - Ingresa fechas (formato: 15/01/2026 - 20/01/2026)
   - Indica cantidad de personas
   - Agrega tours (opcional)
   - Para cada tour, indica cantidad de personas
5. Revisa el resumen en el alert y el desglose completo en la consola

---

## 💻 Requisitos Técnicos Implementados

### Variables y Estructuras de Datos
- ✅ Variables: `reservaActual`, `seleccion`, `intentos`, `cantidad`
- ✅ Constantes: `HABITACIONES`, `TOURS`, `MESES_TEMPORADA_ALTA`, `RECARGO_TEMPORADA_ALTA`
- ✅ Arrays: Habitaciones (3), Tours (6), Meses temporada alta (6)

### Funciones (9 total - requería 3+)
1. `iniciarSimulador()` - Función principal
2. `capturarDatosReserva()` - **ENTRADA** de datos
3. `seleccionarHabitacion()` - Selección con validación
4. `capturarFechas()` - Captura y validación de fechas
5. `capturarCantidadPersonas()` - Validación de capacidad
6. `seleccionarTours()` - Selección múltiple de tours
7. `calcularPrecioReserva()` - **PROCESAMIENTO** de cálculos
8. `mostrarResumen()` - **SALIDA** de resultados
9. `reiniciarReserva()` - Reset de datos

### Ciclos de Iteración
- **FOR** (5 implementaciones): Construcción de menús, procesamiento de tours
- **WHILE** (1 implementación): Validación con límite de intentos

### Condicionales
- **IF/ELSE** (15+ implementaciones): Validaciones múltiples

### Interacción con el Usuario
- **prompt()** (6+ usos): Captura de datos
- **confirm()** (3 usos): Confirmaciones
- **alert()** (8+ usos): Mensajes y resumen
- **console.log()** (25+ usos): Registro detallado

---

## 📊 Datos del Simulador

### Habitaciones Disponibles:

| Habitación | Precio/Noche | Capacidad | Tamaño |
|------------|--------------|-----------|--------|
| Deluxe | $85.000 CLP | 2 personas | 28 m² |
| Superior | $70.000 CLP | 2 personas | 24 m² |
| Familiar | $110.000 CLP | 4 personas | 32 m² |

### Tours Disponibles:

| Tour | Precio/Persona | Duración |
|------|----------------|----------|
| Hanga Roa | $70.000 CLP | Half Day |
| Amanecer Tongariki | $120.000 CLP | Full Day |
| Costa Norte | $80.000 CLP | Full Day |
| Cuevas Ancestrales | $115.000 CLP | Full Day |
| Fábrica de Moais | $135.000 CLP | Full Day |
| Volcán Rano Kau | $60.000 CLP | Half Day |

### Temporadas:

- **Temporada Alta** (Octubre - Marzo): +25% de recargo
- **Temporada Baja** (Abril - Septiembre): Precio base

---

## 🧪 Ejemplo de Uso

### Entrada:
```
Habitación: Deluxe
Fechas: 15/01/2026 - 20/01/2026
Personas en habitación: 2
Tours: Amanecer Tongariki (3 personas), Costa Norte (2 personas)
```

### Salida:
```
RESUMEN DE RESERVA - HOTEL RAPA NUI

DATOS DE ALOJAMIENTO
Habitación: Deluxe
Período: 15/01/2026 al 20/01/2026
Noches: 5
Temporada: ALTA

DESGLOSE DE PRECIOS
Habitación (5 noches): $425.000 CLP
Recargo temporada alta (+25%): $106.250 CLP

TOURS INCLUIDOS (2):
1. Amanecer en Ahu Tongariki
   3 persona(s) × $120.000 = $360.000 CLP
2. Tour Costa Norte Rapa Nui
   2 persona(s) × $80.000 = $160.000 CLP
Subtotal tours: $520.000 CLP

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL DE LA RESERVA: $1.051.250 CLP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚀 Instalación y Uso Local

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/hotel-rapa-nui-simulador.git

# Navegar al directorio
cd hotel-rapa-nui-simulador

# Abrir con Live Server o directamente en el navegador
open simulador.html
```

---

## 🎓 Contexto Académico

Este proyecto fue desarrollado como **Entregable 1** del curso de JavaScript en CoderHouse.

### Objetivos Cumplidos:
- ✅ Estructura base del simulador
- ✅ Variables, constantes y arrays
- ✅ 3+ funciones (entrada, procesamiento, salida)
- ✅ Ciclos de iteración (FOR, WHILE)
- ✅ Condicionales (IF/ELSE)
- ✅ Interacción por consola (prompt, confirm, alert)
- ✅ Validaciones robustas
- ✅ Código limpio y comentado

---

## 📞 Contacto

**Hotel Rapa Nui**  
📧 Email: reservas@harenua.cl  
📱 Teléfono: +56 9 3391 4780 / +56 9 7603 5591  
📍 Ubicación: Atamu Tekena, Hanga Roa, Isla de Pascua, Chile

**Desarrollador**  
👨‍💻 Nicolás Lamas  
🎓 Estudiante CoderHouse - JavaScript

---

## 📄 Licencia

Este proyecto fue creado con fines educativos para el curso de JavaScript en CoderHouse.

---

**Desarrollado con ❤️ para CoderHouse JavaScript - 2025**