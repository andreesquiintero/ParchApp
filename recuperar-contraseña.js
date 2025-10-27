// Validación del formulario de recuperación de contraseña
document.addEventListener('DOMContentLoaded', function() {
    const recoveryForm = document.querySelector('.recoveryForm');
    const emailInput = document.getElementById('correo');
    const emailError = document.getElementById('emailError');
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mostrar/ocultar mensaje de error
    function toggleEmailError(show) {
        if (show) {
            emailError.style.display = 'block';
            emailInput.classList.add('error');
        } else {
            emailError.style.display = 'none';
            emailInput.classList.remove('error');
        }
    }
    
    // Validación en tiempo real
    emailInput.addEventListener('input', function() {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            toggleEmailError(true);
        } else {
            toggleEmailError(false);
        }
    });
    
    // Validación al enviar el formulario
    recoveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            emailError.textContent = 'Por favor ingresa tu correo electrónico';
            toggleEmailError(true);
            return;
        }
        
        if (!isValidEmail(email)) {
            emailError.textContent = 'Por favor ingresa un email válido';
            toggleEmailError(true);
            return;
        }
        
        // Si la validación es exitosa
        toggleEmailError(false);
        
        // Simular envío de formulario
        const submitBtn = recoveryForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular petición al servidor
        setTimeout(function() {
            alert('Se ha enviado un enlace de recuperación a tu correo electrónico');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            recoveryForm.reset();
        }, 1500);
    });
    
    // Limpiar error cuando el usuario empiece a escribir
    emailInput.addEventListener('focus', function() {
        toggleEmailError(false);
    });
});