// Datos de ejemplo
let users = JSON.parse(localStorage.getItem('parchapp_users')) || [
    { id: 1, name: "María González", email: "maria@ejemplo.com", role: "user", status: "active" },
    { id: 2, name: "Carlos Rodríguez", email: "carlos@ejemplo.com", role: "agency", status: "active" },
    { id: 3, name: "Ana López", email: "ana@ejemplo.com", role: "admin", status: "active" },
    { id: 4, name: "Pedro Martínez", email: "pedro@ejemplo.com", role: "user", status: "inactive" }
];

let agencies = JSON.parse(localStorage.getItem('parchapp_agencies')) || [
    { id: 1, name: "Aventura Extrema", contact: "Juan Pérez", email: "aventura@ejemplo.com", phone: "+57 300 123 4567", status: "active" },
    { id: 2, name: "Tours Colombia", contact: "Laura García", email: "tours@ejemplo.com", phone: "+57 310 987 6543", status: "active" },
    { id: 3, name: "Naturaleza Viva", contact: "Carlos Sánchez", email: "naturaleza@ejemplo.com", phone: "+57 320 456 7890", status: "pending" }
];

// Elementos DOM
const userForm = document.getElementById('userForm');
const agencyForm = document.getElementById('agencyForm');
const usersTableBody = document.getElementById('usersTableBody');
const agenciesTableBody = document.getElementById('agenciesTableBody');
const confirmModal = document.getElementById('confirmModal');
const successModal = document.getElementById('successModal');

// Función para guardar datos en localStorage
function saveData() {
    localStorage.setItem('parchapp_users', JSON.stringify(users));
    localStorage.setItem('parchapp_agencies', JSON.stringify(agencies));
}

// Función para mostrar usuarios en la tabla
function displayUsers() {
    usersTableBody.innerHTML = '';
    
    users.forEach(user => {
        const statusClass = `status-${user.status}`;
        const statusText = user.status === 'active' ? 'Activo' : 
                         user.status === 'inactive' ? 'Inactivo' : 'Pendiente';
        
        const roleText = user.role === 'user' ? 'Usuario' : 
                       user.role === 'agency' ? 'Agencia' : 'Administrador';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${roleText}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-warning btn-small btn-icon" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small btn-icon" onclick="confirmDelete('user', ${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// Función para mostrar agencias en la tabla
function displayAgencies() {
    agenciesTableBody.innerHTML = '';
    
    agencies.forEach(agency => {
        const statusClass = `status-${agency.status}`;
        const statusText = agency.status === 'active' ? 'Activa' : 
                         agency.status === 'inactive' ? 'Inactiva' : 'Pendiente';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${agency.name}</td>
            <td>${agency.contact}</td>
            <td>${agency.email}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-warning btn-small btn-icon" onclick="editAgency(${agency.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small btn-icon" onclick="confirmDelete('agency', ${agency.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        agenciesTableBody.appendChild(row);
    });
}

// Función para validar formulario de usuario
function validateUserForm() {
    let isValid = true;
    
    // Resetear errores
    document.querySelectorAll('#userForm .error-message').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('#userForm .form-input, #userForm .form-select').forEach(input => {
        input.classList.remove('error');
    });
    
    // Validar nombre
    const name = document.getElementById('userName').value.trim();
    if (!name) {
        document.getElementById('errorUserName').style.display = 'block';
        document.getElementById('userName').classList.add('error');
        isValid = false;
    }
    
    // Validar email
    const email = document.getElementById('userEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('errorUserEmail').style.display = 'block';
        document.getElementById('userEmail').classList.add('error');
        isValid = false;
    }
    
    // Validar rol
    const role = document.getElementById('userRole').value;
    if (!role) {
        document.getElementById('errorUserRole').style.display = 'block';
        document.getElementById('userRole').classList.add('error');
        isValid = false;
    }
    
    // Validar estado
    const status = document.getElementById('userStatus').value;
    if (!status) {
        document.getElementById('errorUserStatus').style.display = 'block';
        document.getElementById('userStatus').classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Función para validar formulario de agencia
function validateAgencyForm() {
    let isValid = true;
    
    // Resetear errores
    document.querySelectorAll('#agencyForm .error-message').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('#agencyForm .form-input, #agencyForm .form-select').forEach(input => {
        input.classList.remove('error');
    });
    
    // Validar nombre
    const name = document.getElementById('agencyName').value.trim();
    if (!name) {
        document.getElementById('errorAgencyName').style.display = 'block';
        document.getElementById('agencyName').classList.add('error');
        isValid = false;
    }
    
    // Validar contacto
    const contact = document.getElementById('agencyContact').value.trim();
    if (!contact) {
        document.getElementById('errorAgencyContact').style.display = 'block';
        document.getElementById('agencyContact').classList.add('error');
        isValid = false;
    }
    
    // Validar email
    const email = document.getElementById('agencyEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('errorAgencyEmail').style.display = 'block';
        document.getElementById('agencyEmail').classList.add('error');
        isValid = false;
    }
    
    // Validar teléfono
    const phone = document.getElementById('agencyPhone').value.trim();
    if (!phone) {
        document.getElementById('errorAgencyPhone').style.display = 'block';
        document.getElementById('agencyPhone').classList.add('error');
        isValid = false;
    }
    
    // Validar estado
    const status = document.getElementById('agencyStatus').value;
    if (!status) {
        document.getElementById('errorAgencyStatus').style.display = 'block';
        document.getElementById('agencyStatus').classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Función para guardar usuario
function saveUser(event) {
    event.preventDefault();
    
    if (!validateUserForm()) {
        return;
    }
    
    const userId = document.getElementById('userId').value;
    const userData = {
        name: document.getElementById('userName').value.trim(),
        email: document.getElementById('userEmail').value.trim(),
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value
    };
    
    if (userId) {
        // Editar usuario existente
        const index = users.findIndex(user => user.id == userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            showSuccess('Usuario actualizado correctamente');
        }
    } else {
        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            ...userData
        };
        users.push(newUser);
        showSuccess('Usuario creado correctamente');
    }
    
    // Guardar y actualizar
    saveData();
    displayUsers();
    clearUserForm();
}

// Función para guardar agencia
function saveAgency(event) {
    event.preventDefault();
    
    if (!validateAgencyForm()) {
        return;
    }
    
    const agencyId = document.getElementById('agencyId').value;
    const agencyData = {
        name: document.getElementById('agencyName').value.trim(),
        contact: document.getElementById('agencyContact').value.trim(),
        email: document.getElementById('agencyEmail').value.trim(),
        phone: document.getElementById('agencyPhone').value.trim(),
        status: document.getElementById('agencyStatus').value
    };
    
    if (agencyId) {
        // Editar agencia existente
        const index = agencies.findIndex(agency => agency.id == agencyId);
        if (index !== -1) {
            agencies[index] = { ...agencies[index], ...agencyData };
            showSuccess('Agencia actualizada correctamente');
        }
    } else {
        // Crear nueva agencia
        const newAgency = {
            id: Date.now(),
            ...agencyData
        };
        agencies.push(newAgency);
        showSuccess('Agencia creada correctamente');
    }
    
    // Guardar y actualizar
    saveData();
    displayAgencies();
    clearAgencyForm();
}

// Función para editar usuario
function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        document.getElementById('userId').value = user.id;
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userStatus').value = user.status;
        
        document.getElementById('saveUserBtn').innerHTML = '<i class="fas fa-save"></i> Actualizar Usuario';
    }
}

// Función para editar agencia
function editAgency(id) {
    const agency = agencies.find(agency => agency.id === id);
    if (agency) {
        document.getElementById('agencyId').value = agency.id;
        document.getElementById('agencyName').value = agency.name;
        document.getElementById('agencyContact').value = agency.contact;
        document.getElementById('agencyEmail').value = agency.email;
        document.getElementById('agencyPhone').value = agency.phone;
        document.getElementById('agencyStatus').value = agency.status;
        
        document.getElementById('saveAgencyBtn').innerHTML = '<i class="fas fa-save"></i> Actualizar Agencia';
    }
}

// Función para confirmar eliminación
function confirmDelete(type, id) {
    const modalTitle = document.getElementById('confirmModalTitle');
    const modalMessage = document.getElementById('confirmModalMessage');
    const confirmBtn = document.getElementById('confirmActionBtn');
    
    if (type === 'user') {
        const user = users.find(user => user.id === id);
        modalTitle.textContent = 'Eliminar Usuario';
        modalMessage.textContent = `¿Estás seguro de que deseas eliminar al usuario "${user.name}"? Esta acción no se puede deshacer.`;
        confirmBtn.onclick = () => deleteUser(id);
    } else {
        const agency = agencies.find(agency => agency.id === id);
        modalTitle.textContent = 'Eliminar Agencia';
        modalMessage.textContent = `¿Estás seguro de que deseas eliminar la agencia "${agency.name}"? Esta acción no se puede deshacer.`;
        confirmBtn.onclick = () => deleteAgency(id);
    }
    
    confirmModal.classList.add('active');
}

// Función para eliminar usuario
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    saveData();
    displayUsers();
    confirmModal.classList.remove('active');
    showSuccess('Usuario eliminado correctamente');
}

// Función para eliminar agencia
function deleteAgency(id) {
    agencies = agencies.filter(agency => agency.id !== id);
    saveData();
    displayAgencies();
    confirmModal.classList.remove('active');
    showSuccess('Agencia eliminada correctamente');
}

// Función para limpiar formulario de usuario
function clearUserForm() {
    userForm.reset();
    document.getElementById('userId').value = '';
    document.getElementById('saveUserBtn').innerHTML = '<i class="fas fa-save"></i> Guardar Usuario';
}

// Función para limpiar formulario de agencia
function clearAgencyForm() {
    agencyForm.reset();
    document.getElementById('agencyId').value = '';
    document.getElementById('saveAgencyBtn').innerHTML = '<i class="fas fa-save"></i> Guardar Agencia';
}

// Función para mostrar modal de éxito
function showSuccess(message) {
    document.getElementById('successModalMessage').textContent = message;
    successModal.classList.add('active');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar datos iniciales
    displayUsers();
    displayAgencies();
    
    // Configurar formularios
    userForm.addEventListener('submit', saveUser);
    agencyForm.addEventListener('submit', saveAgency);
    
    // Configurar botones de limpiar
    document.getElementById('clearUserBtn').addEventListener('click', clearUserForm);
    document.getElementById('clearAgencyBtn').addEventListener('click', clearAgencyForm);
    
    // Configurar modales
    document.getElementById('closeConfirmModal').addEventListener('click', function() {
        confirmModal.classList.remove('active');
    });
    
    document.getElementById('cancelConfirmBtn').addEventListener('click', function() {
        confirmModal.classList.remove('active');
    });
    
    document.getElementById('closeSuccessModal').addEventListener('click', function() {
        successModal.classList.remove('active');
    });
    
    // Cerrar modales al hacer clic fuera
    confirmModal.addEventListener('click', function(e) {
        if (e.target === confirmModal) {
            confirmModal.classList.remove('active');
        }
    });
    
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
});