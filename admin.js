// admin.js - Funcionalidades del Panel de Administración

// Datos de ejemplo para el dashboard
const adminData = {
    notifications: 3,
    userRole: 'Administrador',
    modules: [
        {
            id: 'comparacion',
            name: 'Comparación de Agencias',
            description: 'Compara planes y métricas de diferentes agencias',
            link: 'comparacion_metricas.html',
            icon: '📊'
        },
        {
            id: 'publicacion',
            name: 'Publicación de Planes',
            description: 'Gestiona y publica nuevos planes turísticos',
            link: 'publicar_planes.html',
            icon: '📝'
        },
        {
            id: 'notificaciones',
            name: 'Notificaciones',
            description: 'Revisa solicitudes y alertas del sistema',
            link: 'notificaciones_admin.html',
            icon: '🔔'
        }
    ]
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    setupEventListeners();
    loadAdminData();
});

// Inicializar el panel de administración
function initializeAdminPanel() {
    console.log('Panel de Administración ParchApp inicializado');
    
    // Actualizar contador de notificaciones
    updateNotificationCount();
    
    // Cargar datos del usuario
    loadUserData();
}

// Configurar event listeners
function setupEventListeners() {
    // Event listener para el botón de cerrar sesión
    const logoutBtn = document.querySelector('.btn-secondary');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Event listener para notificaciones
    const notificationLink = document.querySelector('.notification-link');
    if (notificationLink) {
        notificationLink.addEventListener('click', handleNotificationClick);
    }
    
    // Event listeners para las tarjetas del dashboard
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
        card.addEventListener('click', handleCardClick);
    });
    
    // Event listener para teclado
    document.addEventListener('keydown', handleKeyPress);
}

// Cargar datos del administrador
function loadAdminData() {
    // Simular carga de datos desde el servidor
    setTimeout(() => {
        console.log('Datos de administración cargados:', adminData);
        
        // Actualizar la interfaz con los datos cargados
        updateDashboardCards();
        
        // Mostrar mensaje de bienvenida
        showWelcomeMessage();
    }, 1000);
}

// Actualizar contador de notificaciones
function updateNotificationCount() {
    const notificationCount = document.getElementById('notificationCount');
    if (notificationCount) {
        // Simular obtención de notificaciones no leídas
        const unreadNotifications = adminData.notifications;
        notificationCount.textContent = unreadNotifications;
        
        // Mostrar/ocultar badge según haya notificaciones
        if (unreadNotifications > 0) {
            notificationCount.style.display = 'flex';
        } else {
            notificationCount.style.display = 'none';
        }
    }
}

// Cargar datos del usuario
function loadUserData() {
    const userName = document.querySelector('.user-name');
    if (userName) {
        // En una implementación real, esto vendría del servidor
        const userData = {
            name: 'Administrador',
            role: 'Super Admin',
            lastLogin: new Date().toLocaleDateString()
        };
        
        userName.textContent = userData.name;
        
        // Agregar tooltip con información adicional
        userName.title = `Rol: ${userData.role} | Último acceso: ${userData.lastLogin}`;
    }
}

// Actualizar tarjetas del dashboard
function updateDashboardCards() {
    const dashboardCards = document.querySelector('.dashboard-cards');
    if (!dashboardCards) return;
    
    // Limpiar tarjetas existentes
    dashboardCards.innerHTML = '';
    
    // Crear nuevas tarjetas basadas en los datos
    adminData.modules.forEach(module => {
        const card = createDashboardCard(module);
        dashboardCards.appendChild(card);
    });
}

// Crear tarjeta del dashboard
function createDashboardCard(module) {
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.setAttribute('data-module', module.id);
    
    card.innerHTML = `
        <div class="card-icon">${module.icon}</div>
        <h3>${module.name}</h3>
        <p>${module.description}</p>
        <a href="${module.link}" class="btn btn-primary">Ir al Módulo</a>
    `;
    
    return card;
}

// Manejar cierre de sesión
function handleLogout(event) {
    event.preventDefault();
    
    // Mostrar confirmación
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        // Simular proceso de logout
        showAlert('Cerrando sesión...', 'info');
        
        setTimeout(() => {
            // En una implementación real, aquí se limpiarían las cookies/session storage
            localStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminSession');
            
            // Redirigir al login
            window.location.href = 'login.html';
        }, 1500);
    }
}

// Manejar clic en notificaciones
function handleNotificationClick(event) {
    event.preventDefault();
    
    // Marcar notificaciones como leídas
    adminData.notifications = 0;
    updateNotificationCount();
    
    // Navegar a la página de notificaciones
    window.location.href = 'notificaciones_admin.html';
}

// Manejar hover en tarjetas
function handleCardHover(event) {
    const card = event.currentTarget;
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
}

function handleCardLeave(event) {
    const card = event.currentTarget;
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
}

// Manejar clic en tarjetas
function handleCardClick(event) {
    const card = event.currentTarget;
    const moduleId = card.getAttribute('data-module');
    
    // Agregar animación de clic
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);
    
    console.log(`Navegando al módulo: ${moduleId}`);
}

// Manejar teclas de acceso rápido
function handleKeyPress(event) {
    // Ctrl + 1: Comparación de métricas
    if (event.ctrlKey && event.key === '1') {
        event.preventDefault();
        window.location.href = 'comparacion_metricas.html';
    }
    
    // Ctrl + 2: Publicación de planes
    if (event.ctrlKey && event.key === '2') {
        event.preventDefault();
        window.location.href = 'publicar_planes.html';
    }
    
    // Ctrl + 3: Notificaciones
    if (event.ctrlKey && event.key === '3') {
        event.preventDefault();
        window.location.href = 'notificaciones_admin.html';
    }
    
    // Ctrl + L: Logout
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        handleLogout(event);
    }
}

// Mostrar mensaje de bienvenida
function showWelcomeMessage() {
    const welcomeMessage = `Bienvenido al Panel de Administración de ParchApp`;
    console.log(welcomeMessage);
    
    // Podría mostrarse como un toast/notificación
    showAlert(welcomeMessage, 'success', 3000);
}

// Mostrar alertas/notificaciones
function showAlert(message, type = 'info', duration = 5000) {
    // Crear elemento de alerta
    const alert = document.createElement('div');
    alert.className = `admin-alert admin-alert-${type}`;
    alert.innerHTML = `
        <span class="alert-message">${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Estilos para la alerta
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Colores según el tipo
    const colors = {
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-primary)'
    };
    
    alert.style.backgroundColor = colors[type] || colors.info;
    
    // Agregar al documento
    document.body.appendChild(alert);
    
    // Auto-remover después del tiempo especificado
    if (duration > 0) {
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, duration);
    }
    
    return alert;
}

// Función global para logout (accesible desde HTML)
function logout() {
    handleLogout(new Event('click'));
}

// Funciones de utilidad para el administrador
const AdminUtils = {
    // Formatear fecha
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Formatear moneda
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    },
    
    // Validar email
    validateEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Generar ID único
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Exportar funciones para uso global
window.AdminUtils = AdminUtils;
window.showAlert = showAlert;

// Animación CSS para las alertas
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .admin-alert .alert-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .admin-alert .alert-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);