// Datos de ejemplo de tours
const toursData = {
    "guatape": { name: "Guatapé - Tour Completo", price: 120000, duration: "1 día", category: "Naturaleza" },
    "jardin": { name: "Jardín - Experiencia Cafetera", price: 150000, duration: "2 días", category: "Cultura" },
    "santa-fe": { name: "Santa Fe de Antioquia", price: 100000, duration: "1 día", category: "Historia" },
    "medellin": { name: "Medellín - Tour Ciudad", price: 90000, duration: "1 día", category: "Ciudad" },
    "parque-arvi": { name: "Parque Arví", price: 80000, duration: "1 día", category: "Naturaleza" },
    "rio-claro": { name: "Río Claro - Aventura", price: 180000, duration: "3 días", category: "Aventura" }
};

// Elementos del DOM
const paymentDetailsContainer = document.getElementById('paymentDetails');
const orderItemsContainer = document.getElementById('orderItems');
const totalAmountElement = document.getElementById('totalAmount');
const cartCount = document.getElementById('cartCount');

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para formatear fecha
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-CO', options);
}

// Función para limpiar el carrito
function clearCart() {
    localStorage.removeItem('parchapp_cart');
    cartCount.textContent = '0';
}

// Función para cargar los detalles del pago
function loadPaymentDetails() {
    // Obtener datos del pago desde localStorage
    const paymentData = JSON.parse(localStorage.getItem('parchapp_payment')) || {};
    const cartData = paymentData.items || {};
    
    let total = 0;
    let totalItems = 0;

    // Mostrar detalles del pago
    if (paymentData.method) {
        paymentDetailsContainer.innerHTML = `
            <div class="detail-item">
                <span class="detail-label">Método de Pago:</span>
                <span class="detail-value">${paymentData.method === 'credit_card' ? 'Tarjeta de Crédito' : 'Pago en Banco'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Tipo de Tarjeta:</span>
                <span class="detail-value">${paymentData.cardType || 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Últimos 4 Dígitos:</span>
                <span class="detail-value">${paymentData.lastFour ? '**** ' + paymentData.lastFour : 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Código de Referencia:</span>
                <span class="detail-value">${paymentData.referenceCode || 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Fecha y Hora:</span>
                <span class="detail-value">${formatDate(paymentData.timestamp || new Date().toISOString())}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Número de Confirmación:</span>
                <span class="detail-value highlight">PARCH${Date.now().toString().slice(-8)}</span>
            </div>
        `;
    } else {
        // Datos de ejemplo si no hay datos en localStorage
        paymentDetailsContainer.innerHTML = `
            <div class="detail-item">
                <span class="detail-label">Método de Pago:</span>
                <span class="detail-value">Tarjeta de Crédito</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Tipo de Tarjeta:</span>
                <span class="detail-value">Visa</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Últimos 4 Dígitos:</span>
                <span class="detail-value">**** 4321</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Fecha y Hora:</span>
                <span class="detail-value">${formatDate(new Date().toISOString())}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Número de Confirmación:</span>
                <span class="detail-value highlight">PARCH${Date.now().toString().slice(-8)}</span>
            </div>
        `;
    }

    // Mostrar items de la orden
    orderItemsContainer.innerHTML = '';
    
    if (Object.keys(cartData).length > 0) {
        Object.keys(cartData).forEach(tourId => {
            const tour = toursData[tourId];
            if (tour) {
                const quantity = cartData[tourId];
                const itemTotal = tour.price * quantity;
                total += itemTotal;
                totalItems += quantity;

                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <div class="item-info">
                        <div class="item-name">${tour.name}</div>
                        <div class="item-details">${tour.duration} • ${tour.category} • ${quantity} persona${quantity > 1 ? 's' : ''}</div>
                    </div>
                    <div class="item-price">${formatPrice(itemTotal)}</div>
                `;
                orderItemsContainer.appendChild(orderItem);
            }
        });
    } else {
        // Datos de ejemplo si no hay items en el carrito
        const exampleItems = [
            { id: "guatape", quantity: 2 },
            { id: "jardin", quantity: 1 }
        ];
        
        exampleItems.forEach(item => {
            const tour = toursData[item.id];
            const itemTotal = tour.price * item.quantity;
            total += itemTotal;
            totalItems += item.quantity;

            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${tour.name}</div>
                    <div class="item-details">${tour.duration} • ${tour.category} • ${item.quantity} persona${item.quantity > 1 ? 's' : ''}</div>
                </div>
                <div class="item-price">${formatPrice(itemTotal)}</div>
            `;
            orderItemsContainer.appendChild(orderItem);
        });
    }

    totalAmountElement.textContent = formatPrice(total);
    
    // LIMPIAR EL CARRITO INMEDIATAMENTE
    clearCart();

    // Simular envío de correo de confirmación
    setTimeout(() => {
        console.log('Correo de confirmación enviado al usuario');
    }, 2000);
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    loadPaymentDetails();
});