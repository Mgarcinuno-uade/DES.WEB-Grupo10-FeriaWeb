document.addEventListener("DOMContentLoaded", () => {

  const cantidadInput = document.getElementById('cantidadPersonas');
  const descuentoSelect = document.getElementById('descuento');
  const precioTotal = document.getElementById('precioTotal');

  const PRECIO_BASE = 1000;

  function actualizarPrecio() {
    const cantidad = parseInt(cantidadInput.value) || 1;
    const descuento = parseFloat(descuentoSelect.value);
    const total = cantidad * PRECIO_BASE * (1 - descuento);
    precioTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  cantidadInput.addEventListener('input', actualizarPrecio);
  descuentoSelect.addEventListener('change', actualizarPrecio);

  actualizarPrecio(); // inicial

  // Menú responsive
  const menuToggle = document.querySelector(".menu-toggle")
  const menu = document.querySelector(".menu")

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault()
      menu.classList.toggle("active")

      // Cambiar icono del menú
      const icon = menuToggle.querySelector("i")
      if (menu.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Cerrar menú al hacer clic en un enlace
  const menuLinks = document.querySelectorAll(".menu a")
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu) {
        menu.classList.remove("active")
        const icon = menuToggle?.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      }
    })
  })

  // Cerrar menú al hacer clic fuera de él
  document.addEventListener("click", (e) => {
    if (menu && menuToggle && !menu.contains(e.target) && !menuToggle.contains(e.target)) {
      menu.classList.remove("active")
      const icon = menuToggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  })

  // Animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos para animaciones
  const animatedElements = document.querySelectorAll(
    ".evento-card, .categoria-card, .actividad-card, .mvv-item, .miembro-card, .cert-item, .impacto-item, .ubicacion-card, .producto-card",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Contador animado para las estadísticas
  function animateCounter(element, target) {
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      if (target >= 1000) {
        element.textContent = Math.floor(current / 1000) + "K+"
      } else if (target === 100) {
        element.textContent = Math.floor(current) + "%"
      } else {
        element.textContent = Math.floor(current) + "+"
      }
    }, 20)
  }

  // Observar estadísticas para animación
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number, .impacto-number")
        if (statNumber) {
          const text = statNumber.textContent
          let target = 0

          if (text.includes("150")) target = 150
          else if (text.includes("25")) target = 25
          else if (text.includes("50,000")) target = 50000
          else if (text.includes("100")) target = 100
          else if (text.includes("2,500")) target = 2500
          else if (text.includes("15")) target = 15
          else if (text.includes("8,000")) target = 8000
          else if (text.includes("200")) target = 200

          if (target > 0) {
            animateCounter(statNumber, target)
            statsObserver.unobserve(entry.target)
          }
        }
      }
    })
  }, observerOptions)

  const statItems = document.querySelectorAll(".stat-item, .impacto-item")
  statItems.forEach((item) => statsObserver.observe(item))

  // Smooth scroll para enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Lazy loading para imágenes
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})
