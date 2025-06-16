document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const tabButtons = document.querySelectorAll(".tab-btn")
  const productoCards = document.querySelectorAll(".producto-card")
  const busquedaInput = document.getElementById("busquedaProductos")
  const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]')
  const noResultados = document.getElementById("noResultados")

  // Filtro por categorías
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover clase active de todos los botones
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      // Agregar clase active al botón clickeado
      this.classList.add("active")

      filtrarProductos()
    })
  })

  // Filtro por certificaciones
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filtrarProductos)
  })

  // Búsqueda de texto
  busquedaInput.addEventListener("input", filtrarProductos)

  function filtrarProductos() {
    const categoriaActiva = document.querySelector(".tab-btn.active").getAttribute("data-categoria")
    const certificacionesSeleccionadas = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value)
    const textoBusqueda = busquedaInput.value.toLowerCase()

    let productosVisibles = 0

    productoCards.forEach((card) => {
      const categoriaCard = card.getAttribute("data-categoria")
      const certificacionesCard = card.getAttribute("data-certificaciones")?.split(",") || []
      const textoCard = card.textContent.toLowerCase()

      // Filtro por categoría
      const pasaCategoria = categoriaActiva === "todos" || categoriaCard === categoriaActiva

      // Filtro por certificaciones
      const pasaCertificaciones =
        certificacionesSeleccionadas.length === 0 ||
        certificacionesSeleccionadas.some((cert) => certificacionesCard.includes(cert))

      // Filtro por texto de búsqueda
      const pasaBusqueda = textoBusqueda === "" || textoCard.includes(textoBusqueda)

      if (pasaCategoria && pasaCertificaciones && pasaBusqueda) {
        card.style.display = "block"
        card.classList.add("fade-in-up")
        productosVisibles++
      } else {
        card.style.display = "none"
        card.classList.remove("fade-in-up")
      }
    })

    // Mostrar mensaje de no resultados
    if (productosVisibles === 0) {
      noResultados.style.display = "block"
    } else {
      noResultados.style.display = "none"
    }
  }

  // Animaciones al hacer scroll para los expositores
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
  const animatedElements = document.querySelectorAll(".expositor-card, .beneficio-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Funciones para los botones de productos
function verExpositores(categoria) {
  const expositoresPorCategoria = {
    alimentacion: ["EcoVida", "Huerta Orgánica", "Granja Verde", "Productos del Campo"],
    veganos: ["Verde Vegano", "Plant Power", "Vida Verde", "Alternativas Naturales"],
    textiles: ["Textiles Eco", "Moda Sustentable", "Algodón Puro", "Ropa Consciente"],
    accesorios: ["Accesorios Verde", "Bolsos Eco", "Carteras Sustentables"],
    cosmetica: ["Verde Natural", "Belleza Pura", "Cosmética Artesanal", "Natura Bella"],
    tecnologia: ["Solar Tech", "Energía Verde", "Eco Tecnología", "Innovación Sustentable"],
    artesanias: ["Arte Reciclado", "Creaciones Únicas", "Artesanos Unidos", "Manos Verdes"],
    hogar: ["Hogar Verde", "Limpieza Natural", "Eco Hogar", "Casa Sustentable"],
  }

  const expositores = expositoresPorCategoria[categoria] || []
  const mensaje = `Expositores de ${categoria}:\n\n${expositores.join("\n")}\n\n¿Te interesa contactar con alguno en particular?`

  alert(mensaje)
}

function contactarCategoria(categoria) {
  const email = "info@feriasustentable.com"
  const asunto = `Consulta sobre productos de ${categoria}`
  const cuerpo = `Hola,\n\nEstoy interesado/a en conocer más sobre los productos de la categoría ${categoria} que ofrecen en la Feria Sustentable.\n\n¿Podrían proporcionarme más información?\n\nGracias.`

  window.location.href = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
}

function verProductosExpositor(expositor) {
  const productos = {
    ecovida: [
      "Frutas orgánicas de estación",
      "Verduras sin pesticidas",
      "Granos integrales",
      "Miel pura de abeja",
      "Conservas artesanales",
    ],
    "verde-natural": [
      "Jabones artesanales",
      "Cremas hidratantes naturales",
      "Aceites esenciales",
      "Champús sólidos",
      "Desodorantes naturales",
    ],
    "solar-tech": [
      "Paneles solares residenciales",
      "Sistemas de calentamiento solar",
      "Baterías de almacenamiento",
      "Inversores de energía",
      "Kits de iluminación solar",
    ],
    "textiles-eco": [
      "Remeras de algodón orgánico",
      "Pantalones de fibras naturales",
      "Vestidos sustentables",
      "Ropa interior ecológica",
      "Accesorios textiles",
    ],
    "arte-reciclado": [
      "Muebles de materiales reciclados",
      "Decoración para el hogar",
      "Juguetes ecológicos",
      "Arte funcional",
      "Objetos únicos personalizados",
    ],
    "hogar-verde": [
      "Productos de limpieza naturales",
      "Utensilios de bambú",
      "Contenedores reutilizables",
      "Velas de cera de soja",
      "Ambientadores naturales",
    ],
  }

  const listaProductos = productos[expositor] || []
  const mensaje = `Productos de ${expositor}:\n\n${listaProductos.join("\n")}\n\n¿Te interesa algún producto en particular?`

  alert(mensaje)
}

function descargarInfo() {
  // Simular descarga de información para expositores
  const contenido = `INFORMACIÓN PARA EXPOSITORES - FERIA SUSTENTABLE ITINERANTE

REQUISITOS:
- Productos sustentables y ecológicos
- Certificaciones de calidad (cuando aplique)
- Compromiso con prácticas responsables
- Disponibilidad para múltiples fechas

BENEFICIOS:
- Acceso a más de 50,000 visitantes anuales
- Presencia en 25 ciudades de Córdoba
- Networking con otros emprendedores
- Marketing y promoción en nuestras redes

COSTOS:
- Stand básico (3x3m): $15,000 por evento
- Stand premium (6x3m): $25,000 por evento
- Paquete anual (10 eventos): 20% descuento

CONTACTO:
Email: expositores@feriasustentable.com
Teléfono: +54 9 351 456-7890
WhatsApp: +54 9 351 456-7890

Para más información, visita: www.feriasustentable.com/expositores`

  const blob = new Blob([contenido], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "info-expositores-feria-sustentable.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)

  alert("¡Información descargada! Revisa tu carpeta de descargas.")
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalContacto');
  const closeModal = document.querySelector('.close-modal');
  const expositorInput = document.getElementById('expositor');

  // Asociar botón de contacto
  document.querySelectorAll('.expositor-contacto .btn').forEach(btn => {
    if (btn.textContent.includes('Contactar')) {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.expositor-card');
        const nombreExpositor = card.querySelector('h3')?.textContent || '';
        expositorInput.value = nombreExpositor;
        modal.classList.remove('hidden');
      });
    }
  });

  // Cerrar modal
  closeModal.addEventListener('click', () => modal.classList.add('hidden'));
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Validación y envío (solo ejemplo)
  document.getElementById('formContactoExpositor').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Mensaje enviado correctamente.');
    modal.classList.add('hidden');
    this.reset();
  });
});
