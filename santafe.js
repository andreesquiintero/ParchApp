// Variables globales
let cartCount = 0;
let currentImageIndex = 0;

// Datos del tour
const tourData = {
    id: 'santafe',
    name: 'Santa Fe de Antioquia - Ciudad Madre',
    price: 120000,
    duration: '1 día completo',
    images: [
        'https://puebliandoporantioquia.com.co/wp-content/uploads/2019/07/Santa-Fe-de-Antioquia-a9.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Puente_de_Occidente%2C_Santa_Fe_de_Antioquia%2C_Colombia.jpg/1280px-Puente_de_Occidente%2C_Santa_Fe_de_Antioquia%2C_Colombia.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Catedral_de_Santa_Fe_de_Antioquia.jpg/1280px-Catedral_de_Santa_Fe_de_Antioquia.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Santa_Fe_de_Antioquia_plaza_principal.jpg/1280px-Santa_Fe_de_Antioquia_plaza_principal.jpg'
    ]
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    loadCartFromStorage();
    
    // Configurar galería de imágenes
    setupImageGallery();
    
    // Configurar eventos
    setupEventListeners();
});

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('parchapp_cart');
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        updateCartCount();
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Configurar galería de imágenes
function setupImageGallery() {
    const mainImage = document.getElementById('mainImage');
    if (mainImage && tourData.images.length > 0) {
        mainImage.src = tourData.images[0];
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación por teclado en la galería
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        }
    });
}

// Navegación en la galería
function navigateGallery(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = tourData.images.length - 1;
    } else if (currentImageIndex >= tourData.images.length) {
        currentImageIndex = 0;
    }
    
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = tourData.images[currentImageIndex];
    }
}

// Cambiar imagen principal
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
        
        // Encontrar el índice de la imagen actual
        currentImageIndex = tourData.images.findIndex(img => img === imageSrc);
        if (currentImageIndex === -1) currentImageIndex = 0;
    }
}

// Agregar al carrito
function addToCart(tourId) {
    // Obtener carrito actual
    let cart = JSON.parse(localStorage.getItem('parchapp_cart')) || [];
    
    // Verificar si el tour ya está en el carrito
    const existingItem = cart.find(item => item.id === tourId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: tourId,
            name: tourData.name,
            price: tourData.price,
            duration: tourData.duration,
            image: tourData.images[0],
            quantity: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('parchapp_cart', JSON.stringify(cart));
    
    // Actualizar contador
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartCount();
    
    // Mostrar alerta de éxito
    showAlert('✅ Tour agregado al carrito', 'success');
    
    // Animación del carrito
    animateCartIcon();
}

// Animación del icono del carrito
function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

// Mostrar alerta
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
        alertContainer.textContent = message;
        alertContainer.className = `alert ${type} show`;
        
        setTimeout(() => {
            alertContainer.className = 'alert';
        }, 3000);
    }
}

// Funciones de compartir
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('¡Mira este increíble tour a Santa Fe de Antioquia con ParchApp!');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    showAlert('📘 Compartiendo en Facebook...', 'success');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Tour a Santa Fe de Antioquia - ParchApp');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    showAlert('🐦 Compartiendo en Twitter...', 'success');
}

function shareOnInstagram() {
    showAlert('📷 Para compartir en Instagram, copia el enlace y pégalo en tu historia', 'success');
    copyTourLink();
}

function shareOnWhatsApp() {
    const text = encodeURIComponent('¡Mira este increíble tour a Santa Fe de Antioquia! ' + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showAlert('💚 Compartiendo en WhatsApp...', 'success');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    showAlert('💼 Compartiendo en LinkedIn...', 'success');
}

function copyTourLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showAlert('📋 Enlace copiado al portapapeles', 'success');
    }).catch(() => {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showAlert('📋 Enlace copiado al portapapeles', 'success');
    });
}

// Abrir mapa
function openMap() {
    const address = 'Terminal del Norte, Medellín, Antioquia';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

// Mostrar todas las reseñas
function showAllReviews() {
    showAlert('📝 Redirigiendo a todas las reseñas...', 'success');
    // En una implementación real, esto redirigiría a una página de reseñas
    setTimeout(() => {
        // Simulación de redirección
        console.log('Redirigiendo a página de reseñas completas');
    }, 1000);
}

// Funciones adicionales para mejorar la UX
function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('parchapp_favorites')) || [];
    const isFavorite = favorites.includes(tourData.id);
    
    if (isFavorite) {
        const index = favorites.indexOf(tourData.id);
        favorites.splice(index, 1);
        showAlert('💔 Eliminado de favoritos', 'success');
    } else {
        favorites.push(tourData.id);
        showAlert('❤️ Agregado a favoritos', 'success');
    }
    
    localStorage.setItem('parchapp_favorites', JSON.stringify(favorites));
    updateFavoriteButton(isFavorite);
}

function updateFavoriteButton(isFavorite) {
    // En una implementación real, cambiaría el icono del botón de favoritos
    console.log('Actualizando estado de favoritos:', isFavorite ? 'Agregado' : 'Eliminado');
}

// Funciones para el modal de imágenes (extensión futura)
function openImageModal(imageIndex) {
    currentImageIndex = imageIndex;
    // Implementación de modal de imagen
    console.log('Abriendo modal de imagen:', imageIndex);
}

function closeImageModal() {
    // Implementación para cerrar modal
    console.log('Cerrando modal de imagen');
}

// Funciones de accesibilidad
function handleKeyPress(event, action) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        action();
    }
}

// Inicializar tooltips (extensión futura)
function initializeTooltips() {
    // Implementación de tooltips para mejor UX
    console.log('Inicializando tooltips');
}