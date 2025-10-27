// Datos de ejemplo para el historial de reservas
const reservationsData = [
    {
        id: "RES-001",
        tourId: "guatape",
        tourName: "Guatapé - Tour Completo",
        image: "https://cincohorizontes.com/wp-content/uploads/2021/10/La-Piedra-del-Penon-de-Guatape-al-fondo.jpg",
        date: "2024-03-15",
        travelers: 2,
        price: 240000,
        status: "completed",
        destination: "Guatapé, Antioquia",
        duration: "1 día",
        guide: "Carlos Rodríguez"
    },
    {
        id: "RES-002",
        tourId: "jardin",
        tourName: "Jardín - Experiencia Cafetera",
        image: "https://visitarmedellin.com/wp-content/uploads/2024/05/Jardin-Antioquia.jpg",
        date: "2024-04-22",
        travelers: 4,
        price: 600000,
        status: "completed",
        destination: "Jardín, Antioquia",
        duration: "2 días",
        guide: "María González"
    },
    {
        id: "RES-003",
        tourId: "rio-claro",
        tourName: "Río Claro - Aventura Extrema",
        image: "https://www.viajescomfama.com/portals/1139/Images/rio-claro/viajescomfama-antioquia-viva-rio-claro.jpg",
        date: "2025-10-19",
        travelers: 3,
        price: 540000,
        status: "upcoming",
        destination: "Río Claro, Antioquia",
        duration: "3 días",
        guide: "Andrés López"
    },
    {
        id: "RES-004",
        tourId: "santa-fe",
        tourName: "Santa Fe - Tour Histórico",
        image: "https://puebliandoporantioquia.com.co/wp-content/uploads/2019/07/Santa-Fe-de-Antioquia-a9.jpg",
        date: "2024-02-08",
        travelers: 1,
        price: 100000,
        status: "completed",
        destination: "Santa Fe de Antioquia",
        duration: "1 día",
        guide: "Laura Martínez"
    },
    {
        id: "RES-005",
        tourId: "cerro-tusa",
        tourName: "Cerro Tusa - Senderismo",
        image: "https://www.medellinadvisors.com/wp-content/uploads/2019/05/cerro-tusa-is-a-natural-sanctuary-of-medellin.jpg",
        date: "2024-07-18",
        travelers: 2,
        price: 140000,
        status: "pending",
        destination: "Cerro Tusa, Antioquia",
        duration: "1 día",
        guide: "Pedro Sánchez"
    },
    {
        id: "RES-006",
        tourId: "parque-arvi",
        tourName: "Parque Arví - Ecoturismo",
        image: "https://blog.redbus.co/wp-content/uploads/2024/10/Proyecto-nuevo-2025-02-27T112200.640.jpg",
        date: "2024-01-12",
        travelers: 2,
        price: 160000,
        status: "cancelled",
        destination: "Parque Arví, Medellín",
        duration: "1 día",
        guide: "Ana Torres"
    }
];

// Mapeo de estados a texto y clases
const statusMap = {
    "completed": { text: "Completado", class: "status-completed" },
    "upcoming": { text: "Próximo", class: "status-upcoming" },
    "cancelled": { text: "Cancelado", class: "status-cancelled" },
    "pending": { text: "Pendiente", class: "status-pending" }
};

// Elementos del DOM
const reservationsContainer = document.getElementById('reservationsContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalReservationsElement = document.getElementById('totalReservations');
const completedTripsElement = document.getElementById('completedTrips');
const upcomingTripsElement = document.getElementById('upcomingTrips');
const totalSpentElement = document.getElementById('totalSpent');

let filteredReservations = [...reservationsData];

// Función para formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
}

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para calcular estadísticas
function calculateStats() {
    const totalReservations = reservationsData.length;
    const completedTrips = reservationsData.filter(r => r.status === 'completed').length;
    const upcomingTrips = reservationsData.filter(r => r.status === 'upcoming').length;
    const totalSpent = reservationsData
        .filter(r => r.status === 'completed')
        .reduce((sum, reservation) => sum + reservation.price, 0);

    totalReservationsElement.textContent = totalReservations;
    completedTripsElement.textContent = completedTrips;
    upcomingTripsElement.textContent = upcomingTrips;
    totalSpentElement.textContent = formatPrice(totalSpent);
}

// Función para renderizar reservas
function renderReservations() {
    reservationsContainer.innerHTML = '';

    if (filteredReservations.length === 0) {
        reservationsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No hay reservas que coincidan con tu filtro</h3>
                <p>¡Explora nuestros tours y comienza tu próxima aventura!</p>
                <a href="index.html" class="btn-secondary" style="margin-top: 1rem; display: inline-block;">Descubrir Tours</a>
            </div>
        `;
        return;
    }

    // Ordenar reservas por fecha (más recientes primero)
    const sortedReservations = [...filteredReservations].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    sortedReservations.forEach(reservation => {
        const status = statusMap[reservation.status];
        
        const reservationCard = document.createElement('div');
        reservationCard.className = 'reservation-card';

        // Añadir ID y Fecha del Tour como Data Attributes
        reservationCard.setAttribute('data-reservation-id', reservation.id);
        reservationCard.setAttribute('data-tour-date', reservation.date);

        reservationCard.innerHTML = `
            <div class="reservation-header">
                <div>
                    <h3 class="reservation-title">${reservation.tourName}</h3>
                    <div class="reservation-date">${formatDate(reservation.date)}</div>
                </div>
                <div class="status-badge ${status.class}">${status.text}</div>
            </div>
            <div class="reservation-body">
                <img src="${reservation.image}" alt="${reservation.tourName}" class="reservation-image">
                <div class="reservation-details">
                    <div class="detail-item">
                        <span class="detail-label">Destino:</span>
                        <span class="detail-value">${reservation.destination}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duración:</span>
                        <span class="detail-value">${reservation.duration}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Viajeros:</span>
                        <span class="detail-value">${reservation.travelers} persona${reservation.travelers > 1 ? 's' : ''}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Guía:</span>
                        <span class="detail-value">${reservation.guide}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Total:</span>
                        <span class="detail-value" style="font-weight: 600; color: var(--color-secondary);">${formatPrice(reservation.price)}</span>
                    </div>
                </div>
                <div class="reservation-actions">
                    <button class="btn-secondary" onclick="viewReservationDetails('${reservation.id}')">
                        Ver Detalles
                    </button>
                    ${reservation.status === 'completed' ? `
                        <button class="btn-outline" onclick="bookAgain('${reservation.tourId}')">
                            Reservar Nuevamente
                        </button>
                    ` : ''}
                    ${reservation.status === 'upcoming' ? `
                        <button class="btn-outline" onclick="cancelReservation('${reservation.id}')">
                            Cancelar Reserva
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        reservationsContainer.appendChild(reservationCard);
    });
}

// Funciones de acción
function viewReservationDetails(reservationId) {
    alert(`Mostrando detalles de la reserva: ${reservationId}\n\nEn una implementación real, esto mostraría información detallada de la reserva.`);
}

function bookAgain(tourId) {
    alert(`Redirigiendo a la página del tour: ${tourId}\n\nEn una implementación real, esto llevaría al usuario a la página del tour para reservar nuevamente.`);
    // window.location.href = `tour.html?id=${tourId}`;
}

function cancelReservation(reservationId) {
    // Encontrar la tarjeta de reserva usando el atributo data-
    let tarjetaReserva = document.querySelector(`.reservation-card[data-reservation-id="${reservationId}"]`);

    if (!tarjetaReserva) {
        console.error(`No se encontró la tarjeta para la reserva ID: ${reservationId}`);
        return;
    }

    // Obtener la fecha del tour para la validación
    let fechaTourString = tarjetaReserva.getAttribute('data-tour-date');
    if (!fechaTourString) {
        alert("Error: Fecha de tour no encontrada para validación.");
        return;
    }

    // Lógica de Validación de 48 Horas
    let fechaTour = new Date(fechaTourString);
    let fechaActual = new Date();

    // Límite: 48 horas * 60 min * 60 seg * 1000 ms
    const limiteMilisegundos = 48 * 60 * 60 * 1000; // conversión de horas a ms
    const diferenciaMilisegundos = fechaTour.getTime() - fechaActual.getTime();

    if (diferenciaMilisegundos < limiteMilisegundos) {
        alert(`❌ Error: La cancelación de esta reserva solo es posible si faltan más de 48 horas para el tour. Faltan ${Math.ceil(diferenciaMilisegundos / (60 * 60 * 1000))} horas.`);
        return;
    }

    if (confirm('✅ ¡Faltan más de 48 horas! ¿Estás seguro de que quieres cancelar esta reserva?')) {
        // Simulación:
        alert(`Reserva ${reservationId} cancelada exitosamente.`);

        const tourBuscado = reservationsData.find(tour => tour.id === reservationId);
        console.log(tourBuscado);

        tourBuscado.status = 'cancelled';
        tarjetaReserva.querySelector('.status-badge').textContent = 'Cancelado';
        tarjetaReserva.querySelector('.status-badge').className = 'status-badge status-cancelled';

        const cancelBtn = tarjetaReserva.querySelector(`.reservation-actions [onclick*="cancelReservation('${reservationId}')"]`);
        if (cancelBtn) cancelBtn.remove();
        
        // Actualizar estadísticas
        calculateStats();
    }
}

// Filtrado
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        if (filter === 'all') {
            filteredReservations = [...reservationsData];
        } else {
            filteredReservations = reservationsData.filter(reservation => 
                reservation.status === filter
            );
        }
        
        renderReservations();
    });
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    calculateStats();
    renderReservations();
});