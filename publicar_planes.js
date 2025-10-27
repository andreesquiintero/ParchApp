// Datos de planes publicados (almacenados en localStorage)
let publishedPlans = JSON.parse(localStorage.getItem('parchapp_published_plans')) || [];

// Elementos DOM
const planForm = document.getElementById('planForm');
const plansGrid = document.getElementById('plansGrid');
const emptyState = document.getElementById('emptyState');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para mostrar planes en el catálogo
function displayPlans() {
    if (publishedPlans.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    plansGrid.innerHTML = '';
    
    // Mostrar planes en orden inverso (más recientes primero)
    publishedPlans.slice().reverse().forEach(plan => {
        const planCard = document.createElement('div');
        planCard.className = 'plan-card';
        
        const categoryIcons = {
            'playa': '🏖️',
            'montaña': '⛰️',
            'ciudad': '🏙️',
            'aventura': '🎢',
            'cultural': '🎭'
        };
        
        planCard.innerHTML = `
            <div class="plan-image" style="background-image: url('${plan.image}'); background-size: cover; background-position: center;">
                ${!plan.image ? categoryIcons[plan.category] || '🏞️' : ''}
            </div>
            <div class="plan-content">
                <div class="plan-header">
                    <div>
                        <h3 class="plan-name">${plan.name}</h3>
                        <div class="plan-price">${formatPrice(plan.price)}</div>
                    </div>
                    <span class="plan-category">${categoryIcons[plan.category]} ${plan.category}</span>
                </div>
                <div class="plan-info">
                    <div class="plan-detail">
                        <strong>📍 Ubicación:</strong> ${plan.location}
                    </div>
                    <div class="plan-detail">
                        <strong>📅 Fecha:</strong> ${plan.date}
                    </div>
                </div>
                <p class="plan-description">${plan.description}</p>
            </div>
        `;
        
        plansGrid.appendChild(planCard);
    });
}

// Función para validar formulario
function validateForm() {
    let isValid = true;
    
    // Resetear errores
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
        input.classList.remove('error');
    });
    
    // Validar nombre
    const name = document.getElementById('planName').value.trim();
    if (!name) {
        document.getElementById('errorName').style.display = 'block';
        document.getElementById('planName').classList.add('error');
        isValid = false;
    }
    
    // Validar fecha
    const date = document.getElementById('planDate').value;
    const today = new Date().toISOString().split('T')[0];
    if (!date || date < today) {
        document.getElementById('errorDate').style.display = 'block';
        document.getElementById('planDate').classList.add('error');
        isValid = false;
    }
    
    // Validar precio
    const price = parseInt(document.getElementById('planPrice').value);
    if (!price || price <= 0) {
        document.getElementById('errorPrice').style.display = 'block';
        document.getElementById('planPrice').classList.add('error');
        isValid = false;
    }
    
    // Validar ubicación
    const location = document.getElementById('planLocation').value.trim();
    if (!location) {
        document.getElementById('errorLocation').style.display = 'block';
        document.getElementById('planLocation').classList.add('error');
        isValid = false;
    }
    
    // Validar categoría
    const category = document.getElementById('planCategory').value;
    if (!category) {
        document.getElementById('errorCategory').style.display = 'block';
        document.getElementById('planCategory').classList.add('error');
        isValid = false;
    }
    
    // Validar imagen
    const image = document.getElementById('planImage').value.trim();
    if (!image) {
        document.getElementById('errorImage').style.display = 'block';
        document.getElementById('planImage').classList.add('error');
        isValid = false;
    }
    
    // Validar descripción
    const description = document.getElementById('planDescription').value.trim();
    if (!description) {
        document.getElementById('errorDescription').style.display = 'block';
        document.getElementById('planDescription').classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Función para guardar plan
function savePlan(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Crear objeto plan
    const plan = {
        id: Date.now().toString(),
        name: document.getElementById('planName').value.trim(),
        date: document.getElementById('planDate').value,
        price: parseInt(document.getElementById('planPrice').value),
        location: document.getElementById('planLocation').value.trim(),
        category: document.getElementById('planCategory').value,
        image: document.getElementById('planImage').value.trim(),
        description: document.getElementById('planDescription').value.trim(),
        availability: "available",
        maxQuantity: 10
    };
    
    // Agregar a la lista de planes
    publishedPlans.push(plan);
    
    // Guardar en localStorage
    localStorage.setItem('parchapp_published_plans', JSON.stringify(publishedPlans));
    
    // También guardar en el localStorage principal para que la página principal pueda acceder
    localStorage.setItem('parchapp_destinations', JSON.stringify(publishedPlans));
    
    // Actualizar catálogo
    displayPlans();
    
    // Mostrar modal de éxito
    modalOverlay.classList.add('active');
    
    // Limpiar formulario
    planForm.reset();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar planes al cargar la página
    displayPlans();
    
    // Configurar formulario
    planForm.addEventListener('submit', savePlan);
    
    // Configurar modal
    closeModal.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
    });
    
    // Cerrar modal al hacer clic fuera
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});