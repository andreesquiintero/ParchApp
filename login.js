document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const alertContainer = document.getElementById('alertContainer');
    const loginBtn = document.getElementById('loginBtn');
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const usernameInput = document.getElementById('username');
    const usernameLabel = document.getElementById('usernameLabel');
    const socialLogin = document.getElementById('socialLogin');
    const registerLink = document.getElementById('registerLink');
    
    // Credenciales de ejemplo
    const demoCredentials = {
        user: {
            username: "usuario",
            password: "demo123"
        },
        admin: {
            username: "admin",
            password: "admin123"
        }
    };
    
    // Tipo de usuario actual
    let currentUserType = 'user';
    
    // Función para cambiar tipo de usuario
    function setUserType(type) {
        currentUserType = type;
        
        // Actualizar botones activos
        userTypeBtns.forEach(btn => {
            if (btn.dataset.type === type) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Actualizar interfaz según el tipo de usuario
        if (type === 'admin') {
            usernameLabel.textContent = 'Usuario Administrador';
            usernameInput.placeholder = 'Ingresa tu usuario de administrador';
            socialLogin.style.display = 'none';
            registerLink.style.display = 'none';
        } else {
            usernameLabel.textContent = 'Usuario';
            usernameInput.placeholder = 'Ingresa tu usuario';
            socialLogin.style.display = 'block';
            registerLink.style.display = 'block';
        }
        
        // Limpiar campos
        usernameInput.value = '';
        document.getElementById('password').value = '';
        clearErrors();
        alertContainer.innerHTML = '';
    }
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
        
        // Auto-ocultar alerta después de 5 segundos
        if (type === 'error') {
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 5000);
        }
    }
    
    // Función para limpiar errores
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
        document.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error');
        });
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
    
    // Event listeners para botones de tipo de usuario
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setUserType(this.dataset.type);
        });
    });
    
    // Validación en tiempo real
    usernameInput.addEventListener('blur', function() {
        const username = this.value.trim();
        toggleError('usernameError', !username);
    });
    
    document.getElementById('password').addEventListener('blur', function() {
        const password = this.value;
        toggleError('passwordError', !password);
    });
    
    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const username = usernameInput.value.trim();
        const password = document.getElementById('password').value;
        
        // Validaciones
        let isValid = true;
        
        if (!username) {
            toggleError('usernameError', true);
            isValid = false;
        } else {
            toggleError('usernameError', false);
        }
        
        if (!password) {
            toggleError('passwordError', true);
            isValid = false;
        } else {
            toggleError('passwordError', false);
        }
        
        // Si es válido, simular inicio de sesión
        if (isValid) {
            // Cambiar texto del botón y deshabilitar
            loginBtn.textContent = 'Iniciando sesión...';
            loginBtn.disabled = true;
            
            // Simular petición al servidor
            setTimeout(() => {
                // Verificar credenciales según el tipo de usuario
                const credentials = demoCredentials[currentUserType];
                if (username === credentials.username && password === credentials.password) {
                    showAlert(`¡Inicio de sesión exitoso! Redirigiendo al ${currentUserType === 'admin' ? 'panel de administración' : 'inicio'}...`, 'success');
                    
                    // Simular redirección después de 2 segundos
                    setTimeout(() => {
                        if (currentUserType === 'admin') {
                            window.location.href = 'admin.html';
                        } else {
                            window.location.href = 'index.html';
                        }
                    }, 2000);
                } else {
                    showAlert('Credenciales incorrectas. Por favor verifica tu usuario y contraseña.', 'error');
                    loginBtn.textContent = 'Iniciar Sesión';
                    loginBtn.disabled = false;
                }
            }, 1500);
        } else {
            showAlert('Por favor corrige los errores en el formulario', 'error');
        }
    });
    
    // Funcionalidad para botones de redes sociales (solo para usuarios normales)
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            showAlert(`Iniciando sesión con ${provider}...`, 'success');
            
            // En un caso real, aquí iría la integración con OAuth
            setTimeout(() => {
                showAlert(`La integración con ${provider} estaría aquí en una implementación real`, 'success');
            }, 1000);
        });
    });
    
    // Inicializar con usuario normal
    setUserType('user');
});