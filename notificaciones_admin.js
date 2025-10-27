// Datos de ejemplo para solicitudes pendientes
const agencyRequests = [
    { 
        id: 1, 
        agency: "EcoTours Colombia", 
        plan: "Tour Sostenible Antioquia", 
        value: 125000, 
        category: "cultural",
        date: "2024-01-15",
        contact: "Carlos Mendoza",
        email: "carlos@ecotours.com"
    },
    { 
        id: 2, 
        agency: "Aventura Total", 
        plan: "Expedición Selva Tropical", 
        value: 220000, 
        category: "aventura",
        date: "2024-01-16",
        contact: "Ana Rodríguez",
        email: "ana@aventuratotal.com"
    },
    { 
        id: 3, 
        agency: "Playa Paradise", 
        plan: "Escapada a Nuquí", 
        value: 350000, 
        category: "playa",
        date: "2024-01-17",
        contact: "Miguel Torres",
        email: "miguel@playaparadise.com"
    }
];

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para mostrar solicitudes pendientes
function displayAgencyRequests() {
    const container = document.getElementById('agencyRequests');
    
    if (agencyRequests.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <p>No hay solicitudes pendientes en este momento</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    agencyRequests.forEach(request => {
        const requestItem = document.createElement('div');
        requestItem.className = 'request-item';
        requestItem.innerHTML = `
            <div class="request-info">
                <h3>${request.agency}</h3>
                <p><strong>Plan:</strong> ${request.plan}</p>
                <p><strong>Valor:</strong> ${formatPrice(request.value)}</p>
                <p><strong>Categoría:</strong> ${request.category}</p>
                <p><strong>Contacto:</strong> ${request.contact} (${request.email})</p>
                <p><strong>Fecha de solicitud:</strong> ${request.date}</p>
            </div>
            <div class="request-actions">
                <button class="btn btn-success btn-small" onclick="approveRequest(${request.id})">
                    Aprobar
                </button>
                <button class="btn btn-danger btn-small" onclick="rejectRequest(${request.id})">
                    Rechazar
                </button>
            </div>
        `;
        container.appendChild(requestItem);
    });
}

// Función para aprobar solicitud
function approveRequest(requestId) {
    const request = agencyRequests.find(r => r.id === requestId);
    if (request) {
        if (confirm(`¿Estás seguro de que deseas aprobar la solicitud de "${request.agency}"?`)) {
            // Aquí iría la lógica para aprobar la solicitud
            alert(`Solicitud de ${request.agency} aprobada exitosamente`);
            
            // Eliminar la solicitud de la lista (simulación)
            const index = agencyRequests.findIndex(r => r.id === requestId);
            if (index !== -1) {
                agencyRequests.splice(index, 1);
                displayAgencyRequests();
            }
        }
    }
}

// Función para rechazar solicitud
function rejectRequest(requestId) {
    const request = agencyRequests.find(r => r.id === requestId);
    if (request) {
        if (confirm(`¿Estás seguro de que deseas rechazar la solicitud de "${request.agency}"?`)) {
            // Aquí iría la lógica para rechazar la solicitud
            alert(`Solicitud de ${request.agency} rechazada`);
            
            // Eliminar la solicitud de la lista (simulación)
            const index = agencyRequests.findIndex(r => r.id === requestId);
            if (index !== -1) {
                agencyRequests.splice(index, 1);
                displayAgencyRequests();
            }
        }
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    displayAgencyRequests();
});