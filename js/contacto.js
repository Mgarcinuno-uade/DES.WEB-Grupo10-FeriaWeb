document.addEventListener("DOMContentLoaded", () => {
  // Formulario de contacto
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Obtener datos del formulario
      const formData = new FormData(this)
      const nombre = formData.get("nombre")
      const email = formData.get("email")
      const telefono = formData.get("telefono")
      const asunto = formData.get("asunto")
      const mensaje = formData.get("mensaje")

      // Validación básica
      if (!nombre || !email || !asunto || !mensaje) {
        alert("Por favor, completa todos los campos obligatorios.")
        return
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.")
        return
      }

      // Simular envío del formulario
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.textContent = "Enviando..."
      submitButton.disabled = true

      // Simular tiempo de envío
      setTimeout(() => {
        // Mostrar mensaje de éxito
        alert("¡Mensaje enviado correctamente! Te responderemos pronto.")

        // Limpiar formulario
        this.reset()

        // Restaurar botón
        submitButton.textContent = originalText
        submitButton.disabled = false

        // Log para desarrollo (opcional)
        console.log("Formulario enviado:", {
          nombre,
          email,
          telefono,
          asunto,
          mensaje,
        })
      }, 2000)
    })
  }

  // Animaciones para FAQ
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Agregar efecto visual al hacer clic
      this.style.transform = "scale(1.02)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Efectos hover para redes sociales
  const redesSociales = document.querySelectorAll(".red-social")

  redesSociales.forEach((red) => {
    red.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
    })

    red.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)"
    })
  })
})
