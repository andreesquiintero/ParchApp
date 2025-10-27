// Datos de ejemplo para los tours (DEBE COINCIDIR CON INDEX.HTML)
const toursData = {
    "guatape": {
        id: "guatape",
        name: "Guatapé",
        description: "Tour a la Piedra del Peñol",
        price: 120000,
        image: "https://cincohorizontes.com/wp-content/uploads/2021/10/La-Piedra-del-Penon-de-Guatape-al-fondo.jpg",
        availability: "available",
        maxQuantity: 10
    },
    "jardin": {
        id: "jardin",
        name: "Jardín",
        description: "Pueblo mágico y cafetales",
        price: 150000,
        image: "https://visitarmedellin.com/wp-content/uploads/2024/05/Jardin-Antioquia.jpg",
        availability: "limited",
        maxQuantity: 5
    },
    "santa-fe": {
        id: "santa-fe",
        name: "Santa Fe de Antioquia",
        description: "Ciudad histórica colonial",
        price: 100000,
        image: "https://puebliandoporantioquia.com.co/wp-content/uploads/2019/07/Santa-Fe-de-Antioquia-a9.jpg",
        availability: "available",
        maxQuantity: 8
    },
    "medellin": {
        id: "medellin",
        name: "Medellín",
        description: "Tour por la ciudad innovadora",
        price: 90000,
        image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/dd/d4/1b.jpg",
        availability: "available",
        maxQuantity: 15
    },
    "parque-arvi": {
        id: "parque-arvi",
        name: "Parque Arví",
        description: "Reserva natural con senderos ecológicos",
        price: 80000,
        image: "https://blog.redbus.co/wp-content/uploads/2024/10/Proyecto-nuevo-2025-02-27T112200.640.jpg",
        availability: "available",
        maxQuantity: 12
    },
    "rio-claro": {
        id: "rio-claro",
        name: "Río Claro",
        description: "Paraíso natural con ríos cristalinos",
        price: 180000,
        image: "https://www.viajescomfama.com/portals/1139/Images/rio-claro/viajescomfama-antioquia-viva-rio-claro.jpg",
        availability: "limited",
        maxQuantity: 6
    },
    "san-jeronimo": {
        id: "san-jeronimo",
        name: "San Jerónimo",
        description: "Pueblo tranquilo con fincas cafeteras",
        price: 110000,
        image: "https://periodicoeloccidental.com/wp-content/uploads/2024/04/img_4582-1.jpg",
        availability: "available",
        maxQuantity: 8
    },
    "cerro-tusa": {
        id: "cerro-tusa",
        name: "Cerro Tusa",
        description: "Pirámide natural para senderismo",
        price: 70000,
        image: "https://www.medellinadvisors.com/wp-content/uploads/2019/05/cerro-tusa-is-a-natural-sanctuary-of-medellin.jpg",
        availability: "available",
        maxQuantity: 10
    }
};

// Códigos de descuento válidos
const validDiscounts = {
    "PARCH10": 0.1,   // 10% de descuento
    "VERDE15": 0.15,  // 15% de descuento
    "ANTIOQUIA20": 0.2 // 20% de descuento
};

// Carrito en localStorage
let cart = JSON.parse(localStorage.getItem('parchapp_cart')) || {};
let appliedDiscount = localStorage.getItem('parchapp_discount') || null;
let discountRate = 0;

// Elementos del DOM
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const subtotalElement = document.getElementById('subtotal');
const taxesElement = document.getElementById('taxes');
const totalAmountElement = document.getElementById('totalAmount');
const discountLine = document.getElementById('discountLine');
const discountAmountElement = document.getElementById('discountAmount');
const clearCartBtn = document.getElementById('clearCartBtn');
const applyDiscountBtn = document.getElementById('applyDiscountBtn');
const discountCodeInput = document.getElementById('discountCode');
const checkoutBtn = document.getElementById('checkoutBtn');
const alertContainer = document.getElementById('alertContainer');

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

// Función para calcular el carrito
function calculateCart() {
    let subtotal = 0;
    let totalItems = 0;

    Object.keys(cart).forEach(tourId => {
        const tour = toursData[tourId];
        if (tour) {
            const quantity = cart[tourId];
            subtotal += tour.price * quantity;
            totalItems += quantity;
        }
    });

    // CAMBIO: 19% de IVA en lugar de 10%
    const taxes = subtotal * 0.19;
    const discountAmount = subtotal * discountRate;
    const total = subtotal + taxes - discountAmount;

    // Actualizar UI
    cartCount.textContent = totalItems;
    subtotalElement.textContent = formatPrice(subtotal);
    taxesElement.textContent = formatPrice(taxes);
    totalAmountElement.textContent = formatPrice(total);

    if (discountRate > 0) {
        discountLine.style.display = 'flex';
        discountAmountElement.textContent = `-${formatPrice(discountAmount)}`;
    } else {
        discountLine.style.display = 'none';
    }

    // Habilitar/deshabilitar botón de pago
    checkoutBtn.disabled = totalItems === 0;
}

// Función para renderizar items del carrito
function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Tu carrito está vacío</h3>
                <p>¡Explora nuestros tours y agrega algunas aventuras!</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">Ver Tours Disponibles</a>
            </div>
        `;
        return;
    }

    Object.keys(cart).forEach(tourId => {
        const tour = toursData[tourId];
        if (tour) {
            const quantity = cart[tourId];
            const itemTotal = tour.price * quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-info">
                    <img src="${tour.image}" alt="${tour.name}" class="item-image">
                    <div class="item-details">
                        <h3>${tour.name}</h3>
                        <p>${tour.description}</p>
                        <span class="availability ${tour.availability}">
                            ${tour.availability === 'available' ? 'Disponible' : 'Últimos cupos'}
                        </span>
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${tourId}', ${quantity - 1})" ${quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span class="quantity">${quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${tourId}', ${quantity + 1})" ${quantity >= tour.maxQuantity ? 'disabled' : ''}>+</button>
                </div>
                <div class="item-price">${formatPrice(tour.price)}</div>
                <div class="item-total">${formatPrice(itemTotal)}</div>
                <button class="remove-btn" onclick="removeFromCart('${tourId}')">🗑️ Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        }
    });
}

// Función para actualizar cantidad
function updateQuantity(tourId, newQuantity) {
    const tour = toursData[tourId];

    if (!tour) {
        showAlert('Error: Tour no encontrado', 'error');
        return;
    }

    if (newQuantity <= 0) {
        removeFromCart(tourId);
        return;
    }

    if (newQuantity > tour.maxQuantity) {
        showAlert(`Solo hay ${tour.maxQuantity} cupos disponibles para ${tour.name}`, 'error');
        return;
    }

    cart[tourId] = newQuantity;
    saveCart();
    renderCartItems();
    calculateCart();
    showAlert(`Cantidad actualizada para ${tour.name}`, 'success');
}

// Función para eliminar item
function removeFromCart(tourId) {
    const tour = toursData[tourId];
    if (tour) {
        delete cart[tourId];
        saveCart();
        renderCartItems();
        calculateCart();
        showAlert(`${tour.name} eliminado del carrito`, 'success');
    }
}

// Función para vaciar carrito
function clearCart() {
    if (Object.keys(cart).length === 0) {
        showAlert('El carrito ya está vacío', 'error');
        return;
    }

    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = {};
        appliedDiscount = null;
        discountRate = 0;
        saveCart();
        localStorage.removeItem('parchapp_discount');
        discountCodeInput.value = '';
        renderCartItems();
        calculateCart();
        showAlert('Carrito vaciado correctamente', 'success');
    }
}

// Función para aplicar descuento
function applyDiscount() {
    const code = discountCodeInput.value.trim().toUpperCase();

    if (!code) {
        showAlert('Por favor ingresa un código de descuento', 'error');
        return;
    }

    if (validDiscounts[code]) {
        discountRate = validDiscounts[code];
        appliedDiscount = code;
        localStorage.setItem('parchapp_discount', code);
        calculateCart();
        showAlert(`¡Descuento del ${discountRate * 100}% aplicado!`, 'success');
    } else {
        showAlert('Código de descuento inválido', 'error');
        discountCodeInput.value = '';
    }
}

// Función para guardar carrito
function saveCart() {
    localStorage.setItem('parchapp_cart', JSON.stringify(cart));
}

// Función para proceder al pago
function proceedToCheckout() {
   if (Object.keys(cart).length === 0) {
       showAlert('Tu carrito está vacío', 'error');
       return;
   }

   // Redirigir a la página de métodos de pago
   window.location.href = 'metodospago.html';
}

// Event Listeners
clearCartBtn.addEventListener('click', clearCart);
applyDiscountBtn.addEventListener('click', applyDiscount);
checkoutBtn.addEventListener('click', proceedToCheckout);

// Aplicar descuento guardado al cargar la página
if (appliedDiscount && validDiscounts[appliedDiscount]) {
    discountRate = validDiscounts[appliedDiscount];
    discountCodeInput.value = appliedDiscount;
}

// Inicializar carrito
document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    calculateCart();
});