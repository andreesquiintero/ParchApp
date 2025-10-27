// Datos de ejemplo del carrito
const cartData = JSON.parse(localStorage.getItem('parchapp_cart')) || {};
const toursData = {
    "guatape": { name: "Guatapé - Tour Completo", price: 120000 },
    "jardin": { name: "Jardín - Experiencia Cafetera", price: 150000 },
    "santa-fe": { name: "Santa Fe de Antioquia", price: 100000 },
    "medellin": { name: "Medellín - Tour Ciudad", price: 90000 },
    "parque-arvi": { name: "Parque Arví", price: 80000 },
    "rio-claro": { name: "Río Claro - Aventura", price: 180000 }
};

// Elementos del DOM
const orderItemsContainer = document.getElementById('orderItems');
const totalAmountElement = document.getElementById('totalAmount');
const payButton = document.getElementById('payButton');
const alertContainer = document.getElementById('alertContainer');
const cartCount = document.getElementById('cartCount');

// Elementos de opciones de pago
const paymentOptions = document.querySelectorAll('.payment-option');
const creditCardForm = document.getElementById('creditCardForm');
const cardNumberInput = document.getElementById('cardNumber');

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para mostrar alertas
function showAlert(message, type) {
    alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
    
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Función para cargar los items del carrito
function loadCartItems() {
    orderItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

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
                <div>
                    <div class="fw-bold">${tour.name}</div>
                    <div class="text-muted small">Cantidad: ${quantity}</div>
                </div>
                <div class="fw-bold">${formatPrice(itemTotal)}</div>
            `;
            orderItemsContainer.appendChild(orderItem);
        }
    });

    totalAmountElement.textContent = formatPrice(total);
    cartCount.textContent = totalItems;

    // Si el carrito está vacío, mostrar mensaje
    if (Object.keys(cartData).length === 0) {
        orderItemsContainer.innerHTML = '<p class="text-muted text-center">Tu carrito está vacío</p>';
        payButton.disabled = true;
    } else {
        payButton.disabled = false;
    }
}

// Función para validar tarjeta de crédito
function validateCreditCard() {
    let isValid = true;
    
    // Validar tipo de tarjeta
    const cardType = document.getElementById('cardType').value;
    if (!cardType) {
        document.getElementById('cardTypeError').classList.add('show');
        document.getElementById('cardType').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('cardTypeError').classList.remove('show');
        document.getElementById('cardType').classList.remove('error');
    }
    
    // Validar número de tarjeta
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    let cardNumberValid = false;
    
    if (cardType === 'Visa' || cardType === 'Mastercard') {
        cardNumberValid = /^\d{16}$/.test(cardNumber);
    } else if (cardType === 'American Express') {
        cardNumberValid = /^\d{15}$/.test(cardNumber);
    }
    
    if (!cardNumberValid) {
        document.getElementById('cardNumberError').classList.add('show');
        document.getElementById('cardNumber').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('cardNumberError').classList.remove('show');
        document.getElementById('cardNumber').classList.remove('error');
    }
    
    // Validar fecha de vencimiento
    const expiryDate = document.getElementById('expiryDate').value;
    const currentDate = new Date();
    const selectedDate = new Date(expiryDate);
    
    if (!expiryDate || selectedDate <= currentDate) {
        document.getElementById('expiryDateError').classList.add('show');
        document.getElementById('expiryDate').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('expiryDateError').classList.remove('show');
        document.getElementById('expiryDate').classList.remove('error');
    }
    
    // Validar CVV
    const cvv = document.getElementById('cvv').value;
    let cvvValid = false;
    
    if (cardType === 'American Express') {
        cvvValid = /^\d{4}$/.test(cvv);
    } else {
        cvvValid = /^\d{3}$/.test(cvv);
    }
    
    if (!cvvValid) {
        document.getElementById('cvvError').classList.add('show');
        document.getElementById('cvv').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('cvvError').classList.remove('show');
        document.getElementById('cvv').classList.remove('error');
    }
    
    // Validar titular
    const cardHolder = document.getElementById('cardHolder').value.trim();
    if (!cardHolder) {
        document.getElementById('cardHolderError').classList.add('show');
        document.getElementById('cardHolder').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('cardHolderError').classList.remove('show');
        document.getElementById('cardHolder').classList.remove('error');
    }
    
    return isValid;
}

// Función para procesar el pago
function processPayment() {
    const activePaymentOption = document.querySelector('.payment-option.active').id;
    
    if (activePaymentOption === 'creditCardOption') {
        if (!validateCreditCard()) {
            showAlert('Por favor corrige los errores en el formulario', 'error');
            return;
        }
        
        // Simular procesamiento de pago
        showAlert('Procesando tu pago con tarjeta...', 'success');
        payButton.textContent = 'Procesando...';
        payButton.disabled = true;
        
        setTimeout(() => {
            // Guardar datos del pago
            const paymentData = {
                method: 'credit_card',
                cardType: document.getElementById('cardType').value,
                lastFour: document.getElementById('cardNumber').value.slice(-4),
                amount: totalAmountElement.textContent,
                timestamp: new Date().toISOString(),
                items: cartData
            };
            
            localStorage.setItem('parchapp_payment', JSON.stringify(paymentData));
            
            // Limpiar carrito
            localStorage.removeItem('parchapp_cart');
            
            // Redirigir a página de éxito
            window.location.href = 'pagoexitoso.html';
        }, 2000);
        
    } else if (activePaymentOption === 'bankPaymentOption') {
        const bank = document.getElementById('bankPaymentSelect').value;
        if (!bank) {
            showAlert('Por favor selecciona un banco', 'error');
            return;
        }
        
        // Generar código de referencia
        const referenceCode = 'PARCH' + Date.now().toString().slice(-8);
        showAlert(`Tu código de referencia es: ${referenceCode}. Preséntalo en cualquier sucursal de ${bank}`, 'success');
        
        setTimeout(() => {
            const paymentData = {
                method: 'bank_payment',
                bank: bank,
                referenceCode: referenceCode,
                amount: totalAmountElement.textContent,
                timestamp: new Date().toISOString(),
                items: cartData
            };
            
            localStorage.setItem('parchapp_payment', JSON.stringify(paymentData));
            localStorage.removeItem('parchapp_cart');
            
            // Redirigir a página de éxito
            window.location.href = 'pagoexitoso.html';
        }, 2000);
    }
}

// Formatear número de tarjeta
cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    
    if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    
    e.target.value = value;
});

// Cambiar entre opciones de pago
paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remover clase active de todas las opciones
        paymentOptions.forEach(opt => {
            opt.classList.remove('active');
            const details = opt.querySelector('.payment-details');
            if (details) details.classList.remove('active');
        });
        
        // Agregar clase active a la opción seleccionada
        this.classList.add('active');
        const details = this.querySelector('.payment-details');
        if (details) details.classList.add('active');
    });
});

// Event listener para el botón de pago
payButton.addEventListener('click', processPayment);

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
});