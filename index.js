// Datos de los tours (ACTUALIZADO CON NIVELES DE DIFICULTAD)
const destinations = [
    {
        id: "guatape",
        name: "Guatapé",
        description: "Conocido por su impresionante Peñol y sus coloridas casas, Guatapé ofrece paisajes únicos y actividades acuáticas.",
        image: "https://cincohorizontes.com/wp-content/uploads/2021/10/La-Piedra-del-Penon-de-Guatape-al-fondo.jpg",
        price: 120000,
        category: "naturaleza",
        difficulty: "easy", // fácil
        availability: "available",
        maxQuantity: 10,
        redirectUrl: "guatape.html" // URL de redirección para Guatapé
    },
    {
        id: "jardin",
        name: "Jardín",
        description: "Un pueblo mágico con arquitectura colonial, cascadas y cafetales. Perfecto para los amantes de la naturaleza.",
        image: "https://visitarmedellin.com/wp-content/uploads/2024/05/Jardin-Antioquia.jpg",
        price: 150000,
        category: "naturaleza",
        difficulty: "easy", // fácil
        availability: "limited",
        maxQuantity: 5,
        redirectUrl: "jardin.html" // URL de redirección para Jardín
    },
    {
        id: "santa-fe",
        name: "Santa Fe de Antioquia",
        description: "Ciudad histórica con arquitectura colonial bien conservada y puentes emblemáticos sobre el río Cauca.",
        image: "https://puebliandoporantioquia.com.co/wp-content/uploads/2019/07/Santa-Fe-de-Antioquia-a9.jpg",
        price: 100000,
        category: "cultura",
        difficulty: "easy", // fácil
        availability: "available",
        maxQuantity: 8,
        redirectUrl: "santafe.html" // URL de redirección para Santa Fe
    },
    {
        id: "medellin",
        name: "Medellín",
        description: "La vibrante capital de Antioquia, conocida por su innovación, cultura y hermosos paisajes urbanos.",
        image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/dd/d4/1b.jpg",
        price: 90000,
        category: "ciudad",
        difficulty: "easy", // fácil
        availability: "available",
        maxQuantity: 15
    },
    {
        id: "parque-arvi",
        name: "Parque Arví",
        description: "Reserva natural con senderos ecológicos, actividades al aire libre y una vista panorámica de Medellín.",
        image: "https://blog.redbus.co/wp-content/uploads/2024/10/Proyecto-nuevo-2025-02-27T112200.640.jpg",
        price: 80000,
        category: "naturaleza",
        difficulty: "medium", // intermedio
        availability: "available",
        maxQuantity: 12
    },
    {
        id: "rio-claro",
        name: "Río Claro",
        description: "Paraíso natural con ríos de aguas cristalinas, cuevas de mármol y exuberante vegetación.",
        image: "https://www.viajescomfama.com/portals/1139/Images/rio-claro/viajescomfama-antioquia-viva-rio-claro.jpg",
        price: 180000,
        category: "aventura",
        difficulty: "hard", // difícil
        availability: "limited",
        maxQuantity: 6
    },
    {
        id: "san-jeronimo",
        name: "San Jerónimo",
        description: "Pueblo tranquilo ideal para descansar, con fincas cafeteras y paisajes rurales encantadores.",
        image: "https://periodicoeloccidental.com/wp-content/uploads/2024/04/img_4582-1.jpg",
        price: 110000,
        category: "naturaleza",
        difficulty: "easy", // fácil
        availability: "available",
        maxQuantity: 8
    },
    {
        id: "cerro-tusa",
        name: "Cerro Tusa",
        description: "Una pirámide natural perfecta para el senderismo y disfrutar de vistas espectaculares.",
        image: "https://www.medellinadvisors.com/wp-content/uploads/2019/05/cerro-tusa-is-a-natural-sanctuary-of-medellin.jpg",
        price: 70000,
        category: "aventura",
        difficulty: "expert", // experto
        availability: "available",
        maxQuantity: 10
    }
];

const heroTitle = document.querySelector('.hero h1');
const heroDesc = document.querySelector('.hero p');

// Texto en diapositivas
function changeText(index) {
    const titles = [
        "Descubre las Maravillas de Antioquia",
        "Explora Guatapé y el Peñol",
        "Visita el Encantador Jardín",
        "Explora Santa Fe de Antioquia",
        "Aventúrate en el Parque Arví",
        "Conquista el Cerro Tusa"
    ];
    const descriptions = [
        "Explora los diversos paisajes y la vibrante cultura de Antioquia, Colombia.",
        "Conocido por su impresionante Peñol y sus coloridas casas, Guatapé ofrece paisajes únicos y actividades acuáticas.",
        "Un pueblo mágico con arquitectura colonial, cascadas y cafetales. Perfecto para los amantes de la naturaleza.",
        "Ciudad histórica con arquitectura colonial bien conservada y puentes emblemáticos sobre el río Cauca.",
        "Reserva natural con senderos ecológicos, actividades al aire libre y una vista panorámica de Medellín.",
        "Una pirámide natural perfecta para el senderismo y disfrutar de vistas espectaculares."
    ];
    heroTitle.textContent = titles[index];
    heroDesc.textContent = descriptions[index];
}

// Mapeo de dificultad a texto y clase CSS
const difficultyMap = {
    "easy": { text: "Fácil", class: "difficulty-easy-badge" },
    "medium": { text: "Intermedio", class: "difficulty-medium-badge" },
    "hard": { text: "Difícil", class: "difficulty-hard-badge" },
    "expert": { text: "Experto", class: "difficulty-expert-badge" }
};

// Mapeo de categorías a texto
const categoryMap = {
    "naturaleza": "Naturaleza",
    "ciudad": "Ciudad",
    "cultura": "Cultura",
    "aventura": "Aventura"
};

// Carrusel functionality
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
        changeText(index);
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % carouselItems.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(prevIndex);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide
    startAutoSlide();
}

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para mostrar alertas
function showAlert(message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.textContent = message;
    alertContainer.classList.add('show');
    
    setTimeout(() => {
        alertContainer.classList.remove('show');
    }, 3000);
}

// Función para agregar al carrito
function addToCart(tourId) {
    let cart = JSON.parse(localStorage.getItem('parchapp_cart')) || {};
    const tour = destinations.find(d => d.id === tourId);
    
    if (!tour) return;

    // Verificar disponibilidad
    const currentQuantity = cart[tourId] || 0;
    if (currentQuantity >= tour.maxQuantity) {
        showAlert(`❌ Solo hay ${tour.maxQuantity} cupos disponibles para ${tour.name}`);
        return;
    }

    // Agregar al carrito
    cart[tourId] = (cart[tourId] || 0) + 1;
    localStorage.setItem('parchapp_cart', JSON.stringify(cart));
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Mostrar mensaje de éxito con fondo verde
    showAlert(`✅ ${tour.name} agregado al carrito`);
}

// Función para redirigir a página de destino específica
function redirectToDestination(tourId) {
    const tour = destinations.find(d => d.id === tourId);
    if (tour && tour.redirectUrl) {
        window.location.href = tour.redirectUrl;
    }
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('parchapp_cart')) || {};
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Pagination variables
const cardsPerPage = 6;
let currentPage = 1;
let filteredDestinations = [...destinations];

// DOM elements
const cardsContainer = document.getElementById('cardsContainer');
const paginationContainer = document.getElementById('pagination');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to display cards for current page
function displayCards() {
    cardsContainer.innerHTML = '';
    
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = filteredDestinations.slice(startIndex, endIndex);
    
    cardsToShow.forEach(destination => {
        const difficulty = difficultyMap[destination.difficulty];
        const category = categoryMap[destination.category];
        
        const card = document.createElement('div');
        card.className = 'card';
        
        // Si el destino tiene una URL de redirección, agregar evento de clic
        if (destination.redirectUrl) {
            card.addEventListener('click', function() {
                redirectToDestination(destination.id);
            });
        }
        
        card.innerHTML = `
            ${destination.availability === 'limited' ? '<span class="availability">Últimos cupos</span>' : ''}
            <div class="difficulty-badge ${difficulty.class}">${difficulty.text}</div>
            <img src="${destination.image}" alt="${destination.name}" class="card-img">
            <div class="card-content">
                <h3 class="card-title">${destination.name}</h3>
                <div class="card-meta">
                    <span class="card-category">${category}</span>
                </div>
                <p class="card-description">${destination.description}</p>
                <div class="card-footer">
                    <span class="card-price">${formatPrice(destination.price)}</span>
                    <button class="card-btn" onclick="event.stopPropagation(); addToCart('${destination.id}')">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
    
    updatePagination();
}

// Function to update pagination buttons
function updatePagination() {
    paginationContainer.innerHTML = '';
    
    const totalPages = Math.ceil(filteredDestinations.length / cardsPerPage);
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = 'Anterior';
        prevBtn.addEventListener('click', () => {
            currentPage--;
            displayCards();
        });
        paginationContainer.appendChild(prevBtn);
    }
    
    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayCards();
        });
        paginationContainer.appendChild(pageBtn);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.textContent = 'Siguiente';
        nextBtn.addEventListener('click', () => {
            currentPage++;
            displayCards();
        });
        paginationContainer.appendChild(nextBtn);
    }
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.textContent.toLowerCase().trim();
        
        if (filter === 'todos') {
            filteredDestinations = [...destinations];
        } else if (['fácil', 'intermedio', 'difícil', 'experto'].includes(filter)) {
            // Filtrar por dificultad
            const difficultyMapReverse = {
                'fácil': 'easy',
                'intermedio': 'medium',
                'difícil': 'hard',
                'experto': 'expert'
            };
            filteredDestinations = destinations.filter(dest => 
                dest.difficulty === difficultyMapReverse[filter]
            );
        } else {
            // Filtrar por categoría
            filteredDestinations = destinations.filter(dest => 
                dest.category === filter
            );
        }
        
        currentPage = 1;
        displayCards();
    });
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm) {
        filteredDestinations = destinations.filter(dest => 
            dest.name.toLowerCase().includes(searchTerm) || 
            dest.description.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredDestinations = [...destinations];
    }
    
    currentPage = 1;
    displayCards();
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    displayCards();
    updateCartCount();
    
    // Agregar evento al botón "Proceder al pago" en el carrito
    // Esto se manejará en carrito.html, pero aquí podemos agregar el enlace
    // para que cuando se cree carrito.html, ya tenga la redirección
});