document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const alertContainer = document.getElementById('alertContainer');
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
        
        // Auto-ocultar alerta después de 5 segundos
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 5000);
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para mostrar/ocultar errores
    function toggleError(elementId, show) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        
        if (show) {
            errorElement.classList.add('show');
            if (inputElement) {
                inputElement.classList.add('error');
            }
        } else {
            errorElement.classList.remove('show');
            if (inputElement) {
                inputElement.classList.remove('error');
            }
        }
    }
    
    // Validación en tiempo real
    document.getElementById('email').addEventListener('blur', function() {
        const email = this.value.trim();
        toggleError('emailError', email && !isValidEmail(email));
    });
    
    document.getElementById('password').addEventListener('blur', function() {
        const password = this.value;
        toggleError('passwordError', password && password.length < 6);
    });
    
    document.getElementById('confirmPassword').addEventListener('blur', function() {
        const password = document.getElementById('password').value;
        const confirmPassword = this.value;
        toggleError('confirmPasswordError', confirmPassword && password !== confirmPassword);
    });
    
    document.getElementById('terms').addEventListener('change', function() {
        toggleError('termsError', !this.checked);
    });
    
    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Validaciones
        let isValid = true;
        
        if (!email || !isValidEmail(email)) {
            toggleError('emailError', true);
            isValid = false;
        } else {
            toggleError('emailError', false);
        }
        
        if (!password || password.length < 6) {
            toggleError('passwordError', true);
            isValid = false;
        } else {
            toggleError('passwordError', false);
        }
        
        if (!confirmPassword || password !== confirmPassword) {
            toggleError('confirmPasswordError', true);
            isValid = false;
        } else {
            toggleError('confirmPasswordError', false);
        }
        
        if (!termsAccepted) {
            toggleError('termsError', true);
            isValid = false;
        } else {
            toggleError('termsError', false);
        }
        
        // Si es válido, simular registro exitoso
        if (isValid) {
            // Simular envío al servidor
            showAlert('¡Registro exitoso! Redirigiendo...', 'success');
            
            // Deshabilitar el botón de envío
            const submitBtn = form.querySelector('.btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creando cuenta...';
            
            // Simular redirección después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showAlert('Por favor corrige los errores en el formulario', 'error');
        }
    });
});