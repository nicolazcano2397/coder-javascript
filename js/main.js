// Scroll para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Mostrar navbar al hacer scroll hacia arriba
  let lastScrollTop = 0;
  const navbar = document.querySelector('header');
  
  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop){
      navbar.style.top = "-80px"; // Oculta
    } else {
      navbar.style.top = "0"; // Muestra
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
  
  // Confirmación básica al enviar formulario
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      alert("Gracias por contactarnos. Te responderemos pronto.");
    });
  }
  