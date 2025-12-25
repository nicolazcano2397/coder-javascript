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

## Funcionalidades del Simulador

### Características principales:

**Selección de habitación** - 3 opciones con capacidades diferentes  
**Captura de fechas** - En un solo paso (formato: DD/MM/YYYY - DD/MM/YYYY)  
**Cálculo de temporada** - Alta (Oct-Mar) con recargo del 25%  
**Tours opcionales** - 6 experiencias culturales disponibles  
**Personas por tour** - Calcula precio × cantidad de personas  
**Validaciones robustas** - Formatos, capacidades, fechas válidas  
**Resumen detallado** - Alert compacto + desglose en consola  

---

## Tec usadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados
- **Bootstrap 5.3.3** - Framework CSS
- **JavaScript ES6+** - Lógica del simulador
- **SASS/SCSS** - Preprocesador CSS

---

## Cómo usar el simulador

1. Abrir el archivo `simulador.html` en navegador
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

## Datos del simulador

### Habitaciones disponibles:

| Habitación | Precio/Noche | Capacidad | Tamaño |
|------------|--------------|-----------|--------|
| Deluxe | $85.000 CLP | 2 personas | 28 m² |
| Superior | $70.000 CLP | 2 personas | 24 m² |
| Familiar | $110.000 CLP | 4 personas | 32 m² |

### Tours

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