// Datos de ejemplo para la galería
let galleryExperiences = JSON.parse(localStorage.getItem('parchapp_gallery')) || [
    {
        id: 1,
        location: 'guatape',
        locationName: 'Guatapé',
        description: 'Una vista increíble desde la Piedra del Peñol. ¡Valió totalmente la pena subir los 740 escalones!',
        image: 'https://cincohorizontes.com/wp-content/uploads/2021/10/La-Piedra-del-Penon-de-Guatape-al-fondo.jpg',
        date: '2024-01-15',
        user: 'Ana María'
    },
    {
        id: 2,
        location: 'jardin',
        locationName: 'Jardín',
        description: 'El pueblo más colorido que he visitado. El café es excepcional y la gente muy amable.',
        image: 'https://visitarmedellin.com/wp-content/uploads/2024/05/Jardin-Antioquia.jpg',
        date: '2024-01-10',
        user: 'Carlos Rodríguez'
    },
    {
        id: 3,
        location: 'santa-fe',
        locationName: 'Santa Fe de Antioquia',
        description: 'Viaje en el tiempo con la arquitectura colonial. El puente de occidente es impresionante.',
        image: 'https://puebliandoporantioquia.com.co/wp-content/uploads/2019/07/Santa-Fe-de-Antioquia-a9.jpg',
        date: '2024-01-08',
        user: 'María Fernanda'
    },
    {
        id: 4,
        location: 'parque-arvi',
        locationName: 'Parque Arví',
        description: 'Día perfecto para caminar entre la naturaleza. Los senderos están muy bien mantenidos.',
        image: 'https://blog.redbus.co/wp-content/uploads/2024/10/Proyecto-nuevo-2025-02-27T112200.640.jpg',
        date: '2024-01-05',
        user: 'David López'
    }
];

// Elementos del DOM
const uploadForm = document.getElementById('uploadForm');
const locationSelect = document.getElementById('location');
const descriptionTextarea = document.getElementById('description');
const photoInput = document.getElementById('photo');
const fileNameSpan = document.getElementById('fileName');
const uploadBtn = document.getElementById('uploadBtn');
const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Variable para almacenar el filtro actual
let currentFilter = 'all';

// Función para mostrar alertas
function showAlert(message, type = 'success') {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        background-color: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
        color: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(alertDiv);

    // Remover después de 3 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Función para manejar la selección de archivos
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        fileNameSpan.textContent = file.name;
        
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            showAlert('Por favor selecciona una imagen válida', 'error');
            photoInput.value = '';
            fileNameSpan.textContent = 'No se ha seleccionado ningún archivo';
            return;
        }
        
        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showAlert('La imagen es demasiado grande. Máximo 5MB permitido.', 'error');
            photoInput.value = '';
            fileNameSpan.textContent = 'No se ha seleccionado ningún archivo';
            return;
        }
    }
}

// Función para simular la subida de archivos
function simulateUpload(file) {
    return new Promise((resolve) => {
        // Simular proceso de subida
        setTimeout(() => {
            // Crear URL local para la imagen
            const imageUrl = URL.createObjectURL(file);
            resolve(imageUrl);
        }, 1500);
    });
}

// Función para agregar experiencia a la galería
function addExperienceToGallery(experience) {
    galleryExperiences.unshift(experience);
    localStorage.setItem('parchapp_gallery', JSON.stringify(galleryExperiences));
    renderGallery();
}

// Función para manejar el envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const location = locationSelect.value;
    const description = descriptionTextarea.value.trim();
    const photoFile = photoInput.files[0];

    // Validaciones
    if (!location) {
        showAlert('Por favor selecciona un destino', 'error');
        return;
    }

    if (!description) {
        showAlert('Por favor escribe una descripción de tu experiencia', 'error');
        return;
    }

    if (!photoFile) {
        showAlert('Por favor selecciona una foto', 'error');
        return;
    }

    // Cambiar texto del botón durante la subida
    uploadBtn.textContent = 'Subiendo...';
    uploadBtn.disabled = true;

    try {
        // Simular subida de archivo
        const imageUrl = await simulateUpload(photoFile);

        // Crear nueva experiencia
        const newExperience = {
            id: Date.now(),
            location: location,
            locationName: getLocationName(location),
            description: description,
            image: imageUrl,
            date: new Date().toISOString().split('T')[0],
            user: 'Usuario Actual' // En una app real, esto vendría del sistema de autenticación
        };

        // Agregar a la galería
        addExperienceToGallery(newExperience);

        // Resetear formulario
        uploadForm.reset();
        fileNameSpan.textContent = 'No se ha seleccionado ningún archivo';

        showAlert('¡Foto subida exitosamente! Tu experiencia ahora es visible en la galería.');

    } catch (error) {
        console.error('Error al subir la foto:', error);
        showAlert('Error al subir la foto. Por favor intenta nuevamente.', 'error');
    } finally {
        // Restaurar botón
        uploadBtn.textContent = 'Subir Foto';
        uploadBtn.disabled = false;
    }
}

// Función para obtener el nombre del lugar
function getLocationName(location) {
    const locations = {
        'medellin': 'Medellín',
        'guatape': 'Guatapé',
        'santuario': 'Santuario',
        'jardin': 'Jardín',
        'santa-fe': 'Santa Fe de Antioquia',
        'parque-arvi': 'Parque Arví',
        'rio-claro': 'Río Claro',
        'san-jeronimo': 'San Jerónimo',
        'cerro-tusa': 'Cerro Tusa',
        'otros': 'Otros'
    };
    return locations[location] || location;
}

// Función para renderizar la galería
function renderGallery() {
    galleryGrid.innerHTML = '';

    const experiencesToShow = currentFilter === 'all' 
        ? galleryExperiences 
        : galleryExperiences.filter(exp => exp.location === currentFilter);

    if (experiencesToShow.length === 0) {
        galleryGrid.innerHTML = `
            <div class="empty-gallery">
                <h3>No hay experiencias para mostrar</h3>
                <p>¡Sé el primero en compartir tu experiencia!</p>
            </div>
        `;
        return;
    }

    experiencesToShow.forEach(experience => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-card">
                <img src="${experience.image}" alt="${experience.locationName}" class="gallery-image">
                <div class="gallery-content">
                    <h3 class="gallery-location">${experience.locationName}</h3>
                    <p class="gallery-description">${experience.description}</p>
                    <div class="gallery-meta">
                        <span class="gallery-user">👤 ${experience.user}</span>
                        <span class="gallery-date">📅 ${formatDate(experience.date)}</span>
                    </div>
                </div>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Función para formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Función para manejar filtros
function handleFilterClick(event) {
    const filter = event.target.dataset.filter;
    
    // Actualizar botones activos
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Actualizar filtro y renderizar
    currentFilter = filter;
    renderGallery();
}

// Inicializar la galería
function initGallery() {
    renderGallery();
    updateCartCount();
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('parchapp_cart')) || {};
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initGallery);
uploadForm.addEventListener('submit', handleFormSubmit);
photoInput.addEventListener('change', handleFileSelect);
filterButtons.forEach(btn => {
    btn.addEventListener('click', handleFilterClick);
});

// Drag and drop functionality
const fileInputWrapper = document.querySelector('.file-input-wrapper');
fileInputWrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileInputWrapper.style.borderColor = 'var(--color-secondary)';
    fileInputWrapper.style.backgroundColor = 'rgba(69, 122, 0, 0.1)';
});

fileInputWrapper.addEventListener('dragleave', (e) => {
    e.preventDefault();
    fileInputWrapper.style.borderColor = '#ddd';
    fileInputWrapper.style.backgroundColor = 'var(--color-light)';
});

fileInputWrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    fileInputWrapper.style.borderColor = '#ddd';
    fileInputWrapper.style.backgroundColor = 'var(--color-light)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        photoInput.files = files;
        handleFileSelect({ target: photoInput });
    }
});