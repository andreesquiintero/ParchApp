// comparacion_metricas.js - Módulo de Comparación y Métricas

// Datos completos de agencias y planes
const agenciesData = {
    agency1: {
        name: "Aventura Extrema",
        plans: [
            { 
                name: "Escalada en Piedra del Peñol", 
                value: 150000, 
                category: "aventura", 
                rating: 4.8,
                duration: "1 día",
                difficulty: "Alta",
                includes: "Guía, equipo, seguro"
            },
            { 
                name: "Rappel en Cascadas", 
                value: 180000, 
                category: "aventura", 
                rating: 4.7,
                duration: "1 día",
                difficulty: "Media",
                includes: "Guía, equipo, transporte"
            },
            { 
                name: "Tour Nocturno Guatapé", 
                value: 120000, 
                category: "cultural", 
                rating: 4.5,
                duration: "Noche",
                difficulty: "Baja",
                includes: "Guía, cena, transporte"
            }
        ],
        metrics: {
            totalPlans: 8,
            activePlans: 6,
            satisfaction: 92,
            reservations: 45
        }
    },
    agency2: {
        name: "Tours Colombia",
        plans: [
            { 
                name: "Recorrido Histórico Medellín", 
                value: 80000, 
                category: "cultural", 
                rating: 4.5,
                duration: "4 horas",
                difficulty: "Baja",
                includes: "Guía, entradas, refrigerio"
            },
            { 
                name: "Tour del Café Antioqueño", 
                value: 110000, 
                category: "cultural", 
                rating: 4.6,
                duration: "6 horas",
                difficulty: "Baja",
                includes: "Guía, degustación, transporte"
            },
            { 
                name: "Pueblos Patrimonio", 
                value: 130000, 
                category: "cultural", 
                rating: 4.4,
                duration: "1 día",
                difficulty: "Baja",
                includes: "Guía, almuerzo, transporte"
            }
        ],
        metrics: {
            totalPlans: 12,
            activePlans: 10,
            satisfaction: 88,
            reservations: 67
        }
    },
    agency3: {
        name: "Naturaleza Viva",
        plans: [
            { 
                name: "Senderismo Parque Arví", 
                value: 70000, 
                category: "naturaleza", 
                rating: 4.7,
                duration: "5 horas",
                difficulty: "Media",
                includes: "Guía, seguro, refrigerio"
            },
            { 
                name: "Avistamiento de Aves", 
                value: 90000, 
                category: "naturaleza", 
                rating: 4.3,
                duration: "3 horas",
                difficulty: "Baja",
                includes: "Guía, binoculares, guía de aves"
            },
            { 
                name: "Tour Ecológico Río Claro", 
                value: 160000, 
                category: "naturaleza", 
                rating: 4.8,
                duration: "1 día",
                difficulty: "Media",
                includes: "Guía, almuerzo, equipo"
            }
        ],
        metrics: {
            totalPlans: 9,
            activePlans: 7,
            satisfaction: 94,
            reservations: 38
        }
    },
    agency4: {
        name: "EcoTours Antioquia",
        plans: [
            { 
                name: "Tour Sostenible Jardín", 
                value: 140000, 
                category: "ecoturismo", 
                rating: 4.9,
                duration: "1 día",
                difficulty: "Baja",
                includes: "Guía, almuerzo orgánico, transporte"
            },
            { 
                name: "Agricultura Local", 
                value: 95000, 
                category: "cultural", 
                rating: 4.6,
                duration: "4 horas",
                difficulty: "Baja",
                includes: "Guía, degustación, materiales"
            },
            { 
                name: "Caminata Nocturna", 
                value: 85000, 
                category: "aventura", 
                rating: 4.4,
                duration: "3 horas",
                difficulty: "Baja",
                includes: "Guía, linterna, seguro"
            }
        ],
        metrics: {
            totalPlans: 6,
            activePlans: 5,
            satisfaction: 96,
            reservations: 29
        }
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeComparisonModule();
    setupEventListeners();
    updateMetrics();
    showInitialMessage();
});

// Inicializar el módulo de comparación
function initializeComparisonModule() {
    console.log('Módulo de Comparación y Métricas inicializado');
    
    // Cargar datos adicionales si es necesario
    loadAdditionalData();
}

// Configurar event listeners
function setupEventListeners() {
    // Event listener para el botón de comparar
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.addEventListener('click', compareAgencies);
    }
    
    // Event listeners para cambios en los selects
    const agencyA = document.getElementById('agencyA');
    const agencyB = document.getElementById('agencyB');
    
    if (agencyA) {
        agencyA.addEventListener('change', handleAgencySelection);
    }
    
    if (agencyB) {
        agencyB.addEventListener('change', handleAgencySelection);
    }
    
    // Event listener para teclado
    document.addEventListener('keydown', handleKeyPress);
}

// Cargar datos adicionales
function loadAdditionalData() {
    // Simular carga de datos adicionales desde API
    setTimeout(() => {
        console.log('Datos adicionales cargados para comparación');
    }, 500);
}

// Función para formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para comparar agencias
function compareAgencies() {
    const agencyA = document.getElementById('agencyA').value;
    const agencyB = document.getElementById('agencyB').value;
    const resultContainer = document.getElementById('comparisonResult');
    
    if (!agencyA || !agencyB) {
        showErrorMessage('Por favor selecciona dos agencias para comparar');
        return;
    }
    
    if (agencyA === agencyB) {
        showErrorMessage('Por favor selecciona dos agencias diferentes');
        return;
    }
    
    const agencyAData = agenciesData[agencyA];
    const agencyBData = agenciesData[agencyB];
    
    if (!agencyAData || !agencyBData) {
        showErrorMessage('Error: Datos de agencias no encontrados');
        return;
    }
    
    // Mostrar loading
    showLoading();
    
    // Simular procesamiento
    setTimeout(() => {
        generateComparisonTable(agencyAData, agencyBData);
    }, 1000);
}

// Generar tabla de comparación
function generateComparisonTable(agencyAData, agencyBData) {
    const resultContainer = document.getElementById('comparisonResult');
    
    let html = `
        <div class="comparison-header">
            <h3>Comparación: ${agencyAData.name} vs ${agencyBData.name}</h3>
            <div class="comparison-summary">
                <span class="agency-a-badge">${agencyAData.name}</span>
                <span class="vs-text">VS</span>
                <span class="agency-b-badge">${agencyBData.name}</span>
            </div>
        </div>
        <div class="comparison-table">
            <table>
                <thead>
                    <tr>
                        <th>Plan</th>
                        <th>Agencia</th>
                        <th>Valor</th>
                        <th>Categoría</th>
                        <th>Calificación</th>
                        <th>Duración</th>
                        <th>Incluye</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Agregar planes de Agencia A
    agencyAData.plans.forEach(plan => {
        html += `
            <tr class="agency-a-row">
                <td><strong>${plan.name}</strong></td>
                <td><span class="agency-badge agency-a">${agencyAData.name}</span></td>
                <td>${formatPrice(plan.value)}</td>
                <td><span class="category-tag category-${plan.category}">${plan.category}</span></td>
                <td><span class="rating">${plan.rating}/5 ⭐</span></td>
                <td>${plan.duration}</td>
                <td>${plan.includes}</td>
            </tr>
        `;
    });
    
    // Agregar planes de Agencia B
    agencyBData.plans.forEach(plan => {
        html += `
            <tr class="agency-b-row">
                <td><strong>${plan.name}</strong></td>
                <td><span class="agency-badge agency-b">${agencyBData.name}</span></td>
                <td>${formatPrice(plan.value)}</td>
                <td><span class="category-tag category-${plan.category}">${plan.category}</span></td>
                <td><span class="rating">${plan.rating}/5 ⭐</span></td>
                <td>${plan.duration}</td>
                <td>${plan.includes}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        
        <div class="metrics-comparison">
            <h4>Métricas Comparativas</h4>
            <div class="metrics-grid">
                <div class="metric-comparison">
                    <h5>Total de Planes</h5>
                    <div class="metric-bar">
                        <div class="metric-fill agency-a" style="width: ${(agencyAData.metrics.totalPlans / 15) * 100}%">
                            ${agencyAData.metrics.totalPlans}
                        </div>
                        <div class="metric-fill agency-b" style="width: ${(agencyBData.metrics.totalPlans / 15) * 100}%">
                            ${agencyBData.metrics.totalPlans}
                        </div>
                    </div>
                </div>
                <div class="metric-comparison">
                    <h5>Tasa de Satisfacción</h5>
                    <div class="metric-bar">
                        <div class="metric-fill agency-a" style="width: ${agencyAData.metrics.satisfaction}%">
                            ${agencyAData.metrics.satisfaction}%
                        </div>
                        <div class="metric-fill agency-b" style="width: ${agencyBData.metrics.satisfaction}%">
                            ${agencyBData.metrics.satisfaction}%
                        </div>
                    </div>
                </div>
                <div class="metric-comparison">
                    <h5>Reservas Activas</h5>
                    <div class="metric-bar">
                        <div class="metric-fill agency-a" style="width: ${(agencyAData.metrics.reservations / 70) * 100}%">
                            ${agencyAData.metrics.reservations}
                        </div>
                        <div class="metric-fill agency-b" style="width: ${(agencyBData.metrics.reservations / 70) * 100}%">
                            ${agencyBData.metrics.reservations}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="comparison-insights">
            <h4>Análisis y Recomendaciones</h4>
            <div class="insights-grid">
                ${generateInsights(agencyAData, agencyBData)}
            </div>
        </div>
    `;
    
    resultContainer.innerHTML = html;
}

// Generar insights basados en la comparación
function generateInsights(agencyA, agencyB) {
    const insights = [];
    
    // Comparar número de planes
    if (agencyA.metrics.totalPlans > agencyB.metrics.totalPlans) {
        insights.push(`
            <div class="insight-card">
                <div class="insight-icon">📊</div>
                <div class="insight-content">
                    <h5>Variedad de Oferta</h5>
                    <p>${agencyA.name} ofrece ${agencyA.metrics.totalPlans - agencyB.metrics.totalPlans} planes más que ${agencyB.name}</p>
                </div>
            </div>
        `);
    }
    
    // Comparar satisfacción
    if (agencyA.metrics.satisfaction > agencyB.metrics.satisfaction) {
        insights.push(`
            <div class="insight-card">
                <div class="insight-icon">⭐</div>
                <div class="insight-content">
                    <h5>Satisfacción del Cliente</h5>
                    <p>${agencyA.name} tiene ${agencyA.metrics.satisfaction - agencyB.metrics.satisfaction}% más de satisfacción que ${agencyB.name}</p>
                </div>
            </div>
        `);
    }
    
    // Comparar reservas
    if (agencyA.metrics.reservations > agencyB.metrics.reservations) {
        insights.push(`
            <div class="insight-card">
                <div class="insight-icon">📈</div>
                <div class="insight-content">
                    <h5>Demanda</h5>
                    <p>${agencyA.name} tiene ${agencyA.metrics.reservations - agencyB.metrics.reservations} reservas más activas que ${agencyB.name}</p>
                </div>
            </div>
        `);
    }
    
    // Insight sobre categorías
    const categoriesA = [...new Set(agencyA.plans.map(p => p.category))];
    const categoriesB = [...new Set(agencyB.plans.map(p => p.category))];
    
    if (categoriesA.length > categoriesB.length) {
        insights.push(`
            <div class="insight-card">
                <div class="insight-icon">🏷️</div>
                <div class="insight-content">
                    <h5>Diversidad de Categorías</h5>
                    <p>${agencyA.name} cubre ${categoriesA.length - categoriesB.length} categorías más que ${agencyB.name}</p>
                </div>
            </div>
        `);
    }
    
    return insights.join('');
}

// Función para actualizar métricas generales
function updateMetrics() {
    // Calcular métricas generales
    const totalAgencies = Object.keys(agenciesData).length;
    let totalPlans = 0;
    let totalReservations = 0;
    let totalSatisfaction = 0;
    let agencyCount = 0;
    
    Object.values(agenciesData).forEach(agency => {
        totalPlans += agency.metrics.totalPlans;
        totalReservations += agency.metrics.reservations;
        totalSatisfaction += agency.metrics.satisfaction;
        agencyCount++;
    });
    
    const avgSatisfaction = Math.round(totalSatisfaction / agencyCount);
    
    // Actualizar UI con animación
    animateCounter('totalAgencies', totalAgencies);
    animateCounter('totalPlans', totalPlans);
    animateCounter('reservationsToday', totalReservations);
    
    const satisfactionElement = document.getElementById('satisfactionRate');
    if (satisfactionElement) {
        satisfactionElement.textContent = `${avgSatisfaction}%`;
    }
}

// Animación para contadores
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = parseInt(element.textContent) || 0;
    const increment = Math.ceil(targetValue / 50);
    const duration = 1000;
    const stepTime = Math.floor(duration / (targetValue / increment));
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = currentValue;
        }
    }, stepTime);
}

// Manejar selección de agencias
function handleAgencySelection() {
    const agencyA = document.getElementById('agencyA').value;
    const agencyB = document.getElementById('agencyB').value;
    
    // Habilitar/deshabilitar botón de comparar
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.disabled = !agencyA || !agencyB || agencyA === agencyB;
    }
}

// Mostrar mensaje inicial
function showInitialMessage() {
    const resultContainer = document.getElementById('comparisonResult');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <div class="info-message">
                <div class="info-icon">📊</div>
                <div class="info-content">
                    <h4>Bienvenido al Comparador de Agencias</h4>
                    <p>Selecciona dos agencias del menú desplegable y haz clic en "Comparar" para ver el análisis detallado.</p>
                    <p><strong>Agencias disponibles:</strong> ${Object.values(agenciesData).map(a => a.name).join(', ')}</p>
                </div>
            </div>
        `;
    }
}

// Mostrar mensaje de error
function showErrorMessage(message) {
    const resultContainer = document.getElementById('comparisonResult');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <div class="error-message">
                <div class="error-icon">⚠️</div>
                <div class="error-content">
                    <h4>Error en la Comparación</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }
}

// Mostrar loading
function showLoading() {
    const resultContainer = document.getElementById('comparisonResult');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <div class="loading-message">
                <div class="loading-spinner"></div>
                <p>Analizando datos y generando comparación...</p>
            </div>
        `;
    }
}

// Manejar teclas de acceso rápido
function handleKeyPress(event) {
    // Ctrl + C: Comparar agencias
    if (event.ctrlKey && event.key === 'c') {
        event.preventDefault();
        compareAgencies();
    }
    
    // Ctrl + R: Resetear selección
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        document.getElementById('agencyA').value = '';
        document.getElementById('agencyB').value = '';
        showInitialMessage();
    }
}

// Funciones de utilidad para exportación
window.ComparisonUtils = {
    compareAgencies,
    updateMetrics,
    formatPrice
};