document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resetForm');
    const alertContainer = document.getElementById('alertContainer');
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
        
        // Auto-ocultar alerta después de 5 segundos
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 5000);
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
    document.getElementById('password1').addEventListener('blur', function() {
        const password = this.value;
        toggleError('password1Error', password && password.length < 6);
    });
    
    document.getElementById('password2').addEventListener('blur', function() {
        const password1 = document.getElementById('password1').value;
        const password2 = this.value;
        toggleError('password2Error', password2 && password1 !== password2);
    });
    
    // Validación mientras se escribe (para mejor UX)
    document.getElementById('password2').addEventListener('input', function() {
        const password1 = document.getElementById('password1').value;
        const password2 = this.value;
        
        if (password2.length > 0 && password1 !== password2) {
            toggleError('password2Error', true);
        } else {
            toggleError('password2Error', false);
        }
    });
    
    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        
        // Validaciones
        let isValid = true;
        
        if (!password1 || password1.length < 6) {
            toggleError('password1Error', true);
            isValid = false;
        } else {
            toggleError('password1Error', false);
        }
        
        if (!password2 || password1 !== password2) {
            toggleError('password2Error', true);
            isValid = false;
        } else {
            toggleError('password2Error', false);
        }
        
        // Si es válido, simular restablecimiento exitoso
        if (isValid) {
            // Simular envío al servidor
            showAlert('¡Contraseña restablecida correctamente! Redirigiendo...', 'success');
            
            // Deshabilitar el botón de envío
            const submitBtn = form.querySelector('.btn-primary');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Restableciendo...';
            
            // Simular redirección después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showAlert('Por favor corrige los errores en el formulario', 'error');
        }
    });
    
    // Validación de fortaleza de contraseña (opcional)
    document.getElementById('password1').addEventListener('input', function() {
        const password = this.value;
        const strengthIndicator = document.getElementById('passwordStrength');
        
        if (!strengthIndicator) {
            // Crear indicador de fortaleza si no existe
            const strengthDiv = document.createElement('div');
            strengthDiv.id = 'passwordStrength';
            strengthDiv.className = 'password-strength';
            this.parentNode.appendChild(strengthDiv);
        }
        
        updatePasswordStrength(password);
    });
    
    function updatePasswordStrength(password) {
        const strengthIndicator = document.getElementById('passwordStrength');
        if (!strengthIndicator) return;
        
        let strength = 0;
        let feedback = '';
        
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        switch(strength) {
            case 0:
            case 1:
                feedback = 'Muy débil';
                strengthIndicator.className = 'password-strength weak';
                break;
            case 2:
                feedback = 'Débil';
                strengthIndicator.className = 'password-strength weak';
                break;
            case 3:
                feedback = 'Media';
                strengthIndicator.className = 'password-strength medium';
                break;
            case 4:
                feedback = 'Fuerte';
                strengthIndicator.className = 'password-strength strong';
                break;
            case 5:
                feedback = 'Muy fuerte';
                strengthIndicator.className = 'password-strength very-strong';
                break;
        }
        
        strengthIndicator.textContent = `Fortaleza: ${feedback}`;
        strengthIndicator.style.display = password ? 'block' : 'none';
    }
});