// Datos del tour para compartir
const tourData = {
    title: "Tour a Guatapé - Piedra del Peñol",
    description: "Descubre uno de los destinos más emblemáticos de Antioquia. Sube los 740 escalones de la Piedra del Peñol para disfrutar de vistas espectaculares.",
    price: "$120.000",
    image: "https://cincohorizontes.com/wp-content/uploads/2021/10/La-Piedra-del-Penon-de-Guatape-al-fondo.jpg",
    url: window.location.href
};

// Función para mostrar alertas
function showAlert(message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.textContent = message;
    alertContainer.classList.add('show');
    
    setTimeout(() => {
        alertContainer.classList.remove('show');
    }, 3000);
}

// Función para cambiar imagen principal
function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

// Función para agregar al carrito
function addToCart(tourId) {
    let cart = JSON.parse(localStorage.getItem('parchapp_cart')) || {};
    cart[tourId] = (cart[tourId] || 0) + 1;
    localStorage.setItem('parchapp_cart', JSON.stringify(cart));
    
    // Actualizar contador
    const cartCount = document.getElementById('cartCount');
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    cartCount.textContent = totalItems;
    
    showAlert('✅ Tour agregado al carrito');
}

// Funciones para compartir
function shareOnFacebook() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tourData.url)}&quote=${encodeURIComponent(tourData.title + ' - ' + tourData.description)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    showAlert('Compartiendo en Facebook...');
}

function shareOnTwitter() {
    const shareText = `🎯 ${tourData.title} - ${tourData.description} ${tourData.price} por persona`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(tourData.url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    showAlert('Compartiendo en Twitter...');
}

function shareOnInstagram() {
    // Instagram no permite sharing directo, se simula
    showAlert('📷 Para compartir en Instagram, copia el enlace y pégalo en tu historia o publicación');
    copyTourLink();
}

function shareOnWhatsApp() {
    const shareText = `*${tourData.title}*%0A%0A${tourData.description}%0A%0A💰 Precio: ${tourData.price}%0A%0A🔗 ${tourData.url}`;
    const shareUrl = `https://wa.me/?text=${shareText}`;
    window.open(shareUrl, '_blank', 'width=600,height=700');
    showAlert('Compartiendo en WhatsApp...');
}

function shareOnLinkedIn() {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tourData.url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    showAlert('Compartiendo en LinkedIn...');
}

function copyTourLink() {
    navigator.clipboard.writeText(tourData.url).then(() => {
        showAlert('✅ Enlace copiado al portapapeles');
    }).catch(() => {
        // Fallback para navegadores antiguos
        const tempInput = document.createElement('input');
        tempInput.value = tourData.url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showAlert('✅ Enlace copiado al portapapeles');
    });
}

// Otras funciones
function openMap() {
    const address = "Centro Comercial San Diego, Medellín, Antioquia";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

function showAllReviews() {
    alert('En una implementación completa, esto mostraría todas las reseñas en un modal o página separada.');
}

// Inicializar contador del carrito
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('parchapp_cart')) || {};
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
});