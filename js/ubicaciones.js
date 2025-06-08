document.addEventListener("DOMContentLoaded", () => {
  // Filtros de ubicaciones
  const filtroButtons = document.querySelectorAll(".filtro-btn")
  const regionButtons = document.querySelectorAll(".region-btn")
  const ubicacionCards = document.querySelectorAll(".ubicacion-card")

  // Filtro por mes
  filtroButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filtroButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      const filtroMes = this.getAttribute("data-mes")
      const filtroRegionActivo = document.querySelector(".region-btn.active").getAttribute("data-region")

      filtrarUbicaciones(filtroMes, filtroRegionActivo)
    })
  })

  // Filtro por región
  regionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      regionButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      const filtroRegion = this.getAttribute("data-region")
      const filtroMesActivo = document.querySelector(".filtro-btn.active").getAttribute("data-mes")

      filtrarUbicaciones(filtroMesActivo, filtroRegion)
    })
  })

  function filtrarUbicaciones(mes, region) {
    ubicacionCards.forEach((card) => {
      const cardMes = card.getAttribute("data-mes")
      const cardRegion = card.getAttribute("data-region")

      const mostrarPorMes = mes === "todos" || cardMes === mes
      const mostrarPorRegion = region === "todas" || cardRegion === region

      if (mostrarPorMes && mostrarPorRegion) {
        card.style.display = "block"
        card.classList.add("fade-in-up")
      } else {
        card.style.display = "none"
        card.classList.remove("fade-in-up")
      }
    })
  }
})

// Funciones para los botones de ubicaciones
function verMapa(ciudad) {
  const mapas = {
    "cordoba-capital": "https://maps.google.com/?q=Plaza+San+Martin+Cordoba+Argentina",
    "villa-carlos-paz": "https://maps.google.com/?q=Centro+Villa+Carlos+Paz+Cordoba",
    "rio-cuarto": "https://maps.google.com/?q=Plaza+Olmos+Rio+Cuarto+Cordoba",
    "san-francisco": "https://maps.google.com/?q=Plaza+25+de+Mayo+San+Francisco+Cordoba",
    "villa-maria": "https://maps.google.com/?q=Parque+Sobremonte+Villa+Maria+Cordoba",
    "la-falda": "https://maps.google.com/?q=Plaza+Prospero+Molina+La+Falda+Cordoba",
  }

  if (mapas[ciudad]) {
    window.open(mapas[ciudad], "_blank")
  } else {
    alert("Mapa no disponible para esta ubicación")
  }
}

function compartirEvento(eventoId) {
  const eventos = {
    "cordoba-15-jun": {
      titulo: "Feria Sustentable - Córdoba Capital",
      fecha: "15 de junio, 2025",
      ubicacion: "Plaza San Martín",
    },
    "vcp-22-jun": {
      titulo: "Feria Sustentable - Villa Carlos Paz",
      fecha: "22 de junio, 2025",
      ubicacion: "Centro de la ciudad",
    },
    "rc-29-jun": {
      titulo: "Feria Sustentable - Río Cuarto",
      fecha: "29 de junio, 2025",
      ubicacion: "Plaza Olmos",
    },
    "sf-05-jul": {
      titulo: "Feria Sustentable - San Francisco",
      fecha: "05 de julio, 2025",
      ubicacion: "Plaza 25 de Mayo",
    },
    "vm-12-jul": {
      titulo: "Feria Sustentable - Villa María",
      fecha: "12 de julio, 2025",
      ubicacion: "Parque Sobremonte",
    },
    "lf-10-ago": {
      titulo: "Feria Sustentable - La Falda",
      fecha: "10 de agosto, 2025",
      ubicacion: "Plaza Próspero Molina",
    },
  }

  const evento = eventos[eventoId]
  if (evento) {
    const texto = `¡No te pierdas la ${evento.titulo}! 📅 ${evento.fecha} 📍 ${evento.ubicacion} #FeriaSustentable #Córdoba`

    if (navigator.share) {
      navigator.share({
        title: evento.titulo,
        text: texto,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(texto + " " + window.location.href).then(() => {
        alert("¡Información del evento copiada al portapapeles!")
      })
    }
  }
}
