// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const loading = document.getElementById('loading');
const alertContainer = document.getElementById('alertContainer');

// Form elements
const registerForm = document.getElementById('registerForm');
const signinForm = document.getElementById('signinForm');

// Password requirement elements
const reqLowercase = document.getElementById('reqLowercase');
const reqUppercase = document.getElementById('reqUppercase');
const reqNumber = document.getElementById('reqNumber');
const reqLength = document.getElementById('reqLength');
const reqSpecial = document.getElementById('reqSpecial');

// Dashboard elements
const userName = document.getElementById('userName');
const dashboardName = document.getElementById('dashboardName');
const dashboardEmail = document.getElementById('dashboardEmail');
const dashboardDate = document.getElementById('dashboardDate');

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing application...');
    checkAuthStatus();
    setupPasswordValidation();
    setupNavigationButtons();
});

// Setup navigation buttons
function setupNavigationButtons() {
    // Add click event listeners to all navigation links
    const navLinks = document.querySelectorAll('a[onclick]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const onclick = link.getAttribute('onclick');
            if (onclick.includes('showLogin')) {
                showLogin();
            } else if (onclick.includes('showRegistration')) {
                showRegistration();
            }
        });
    });
    
    // Setup logout button
    const logoutButton = document.querySelector('button[onclick="logout()"]');
    if (logoutButton) {
        console.log('Logout button found, setting up event listener');
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        console.error('Logout button not found');
    }
    
    console.log('Navigation buttons setup complete');
}

// Password validation setup
function setupPasswordValidation() {
    const passwordInput = document.getElementById('regPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
        console.log('Password validation setup complete');
        
        // Check if toggle button exists
        const toggleButton = passwordInput.nextElementSibling;
        if (toggleButton) {
            console.log('Toggle button found for registration password');
            toggleButton.addEventListener('click', () => togglePassword('regPassword'));
        } else {
            console.error('Toggle button not found for registration password');
        }
    } else {
        console.error('Password input not found');
    }
    
    // Also setup toggle for login password
    const loginPasswordInput = document.getElementById('loginPassword');
    if (loginPasswordInput) {
        const toggleButton = loginPasswordInput.nextElementSibling;
        if (toggleButton) {
            console.log('Toggle button found for login password');
            toggleButton.addEventListener('click', () => togglePassword('loginPassword'));
        } else {
            console.error('Toggle button not found for login password');
        }
    }
}

// Password validation function
function validatePassword() {
    const password = document.getElementById('regPassword').value;
    
    console.log('Password being validated:', password);
    console.log('Password length:', password.length);
    
    // Check lowercase
    const hasLowercase = /[a-z]/.test(password);
    console.log('Has lowercase:', hasLowercase);
    reqLowercase.textContent = hasLowercase ? '✅ At least one lowercase letter' : '❌ At least one lowercase letter';
    reqLowercase.className = hasLowercase ? 'valid' : '';
    
    // Check uppercase
    const hasUppercase = /[A-Z]/.test(password);
    console.log('Has uppercase:', hasUppercase);
    reqUppercase.textContent = hasUppercase ? '✅ At least one uppercase letter' : '❌ At least one uppercase letter';
    reqUppercase.className = hasUppercase ? 'valid' : '';
    
    // Check number
    const hasNumber = /\d/.test(password);
    console.log('Has number:', hasNumber);
    reqNumber.textContent = hasNumber ? '✅ At least one number' : '❌ At least one number';
    reqNumber.className = hasNumber ? 'valid' : '';
    
    // Check length
    const hasValidLength = password.length >= 6 && password.length <= 8;
    console.log('Has valid length:', hasValidLength);
    reqLength.textContent = hasValidLength ? '✅ 6-8 characters long' : '❌ 6-8 characters long';
    reqLength.className = hasValidLength ? 'valid' : '';
    
    // Special characters are always allowed (optional)
    reqSpecial.textContent = '✅ Special characters allowed (@#$%^&*!)';
    reqSpecial.className = 'valid';
    
    // Overall validation check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&*!]{6,8}$/;
    const overallValid = passwordRegex.test(password);
    console.log('Overall password valid:', overallValid);
    console.log('Regex test result:', passwordRegex.test(password));
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) {
        console.error('Password input not found:', inputId);
        return;
    }
    
    const button = input.nextElementSibling;
    if (!button) {
        console.error('Toggle button not found for input:', inputId);
        return;
    }
    
    const icon = button.querySelector('i');
    if (!icon) {
        console.error('Icon not found in toggle button');
        return;
    }
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
        console.log('Password shown for:', inputId);
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
        console.log('Password hidden for:', inputId);
    }
}

// Show registration form
function showRegistration() {
    console.log('Showing registration form');
    registrationForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    dashboard.classList.add('hidden');
    
    // Clear any previous form data
    if (registerForm) registerForm.reset();
    
    // Reset password requirements display
    if (reqLowercase) reqLowercase.textContent = '❌ At least one lowercase letter';
    if (reqUppercase) reqUppercase.textContent = '❌ At least one uppercase letter';
    if (reqNumber) reqNumber.textContent = '❌ At least one number';
    if (reqLength) reqLength.textContent = '❌ 6-8 characters long';
    if (reqSpecial) reqSpecial.textContent = '✅ Special characters allowed (@#$%^&*!)';
    
    // Clear classes
    if (reqLowercase) reqLowercase.className = '';
    if (reqUppercase) reqUppercase.className = '';
    if (reqNumber) reqNumber.className = '';
    if (reqLength) reqLength.className = '';
    if (reqSpecial) reqSpecial.className = 'valid';
}

// Show login form
function showLogin() {
    console.log('Showing login form');
    loginForm.classList.remove('hidden');
    registrationForm.classList.add('hidden');
    dashboard.classList.add('hidden');
    
    // Clear any previous form data
    if (signinForm) signinForm.reset();
}

// Show dashboard
function showDashboard() {
    console.log('Showing dashboard');
    dashboard.classList.remove('hidden');
    registrationForm.classList.add('hidden');
    loginForm.classList.add('hidden');
}

// Show loading
function showLoading() {
    loading.classList.remove('hidden');
}

// Hide loading
function hideLoading() {
    loading.classList.add('hidden');
}

// Show alert message
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Check authentication status
async function checkAuthStatus() {
    try {
        console.log('Checking authentication status...');
        const response = await fetch('/api/user', {
            credentials: 'include'
        });
        
        if (response.ok) {
            const userData = await response.json();
            console.log('User authenticated:', userData);
            displayUserInfo(userData);
            showDashboard();
        } else {
            console.log('User not authenticated, showing registration');
            showRegistration();
        }
    } catch (error) {
        console.error('Auth check error:', error);
        showRegistration();
    }
}

// Display user information in dashboard
function displayUserInfo(userData) {
    if (userName) userName.textContent = userData.name;
    if (dashboardName) dashboardName.textContent = userData.name;
    if (dashboardEmail) dashboardEmail.textContent = userData.email;
    
    if (dashboardDate) {
        const date = new Date(userData.createdAt);
        dashboardDate.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Handle registration form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Registration form submitted');
    
    const formData = new FormData(registerForm);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    console.log('Registration data:', userData);
    
    // Client-side validation
    if (!validateRegistrationData(userData)) {
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        console.log('Registration response:', result);
        
        if (response.ok) {
            showAlert('Registration successful! Please sign in.', 'success');
            showLogin();
        } else {
            showAlert(result.error, 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('An error occurred during registration. Please try again.', 'error');
    } finally {
        hideLoading();
    }
});

// Handle login form submission
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    
    const formData = new FormData(signinForm);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    console.log('Login data:', userData);
    
    // Client-side validation
    if (!validateLoginData(userData)) {
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });
        
        const result = await response.json();
        console.log('Login response:', result);
        
        if (response.ok) {
            showAlert('Login successful!', 'success');
            await checkAuthStatus(); // This will show the dashboard
        } else {
            showAlert(result.error, 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('An error occurred during login. Please try again.', 'error');
    } finally {
        hideLoading();
    }
});

// Logout function
async function logout() {
    try {
        console.log('Logging out...');
        
        // Clear any stored user data
        if (userName) userName.textContent = '';
        if (dashboardName) dashboardName.textContent = '';
        if (dashboardEmail) dashboardName.textContent = '';
        if (dashboardDate) dashboardDate.textContent = '';
        
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            console.log('Logout successful');
            showAlert('Logged out successfully', 'success');
            
            // Clear any forms
            if (signinForm) signinForm.reset();
            if (registerForm) registerForm.reset();
            
            // Show login form
            showLogin();
        } else {
            console.log('Logout failed:', response.status);
            showAlert('Logout failed, but redirecting to login', 'warning');
            showLogin();
        }
    } catch (error) {
        console.error('Logout error:', error);
        showAlert('An error occurred during logout, but redirecting to login', 'warning');
        showLogin();
    }
}

// Client-side validation functions
function validateRegistrationData(data) {
    console.log('Validating registration data:', data);
    
    if (!data.name || !data.email || !data.password) {
        showAlert('All fields are required', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&*!]{6,8}$/;
    console.log('Password validation regex:', passwordRegex);
    console.log('Password to validate:', data.password);
    console.log('Password length:', data.password.length);
    console.log('Regex test result:', passwordRegex.test(data.password));
    
    if (!passwordRegex.test(data.password)) {
        showAlert('Password must meet all requirements', 'error');
        return false;
    }
    
    console.log('Registration validation passed');
    return true;
}

function validateLoginData(data) {
    if (!data.email || !data.password) {
        showAlert('All fields are required', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address', 'error');
        return false;
    }
    
    return true;
}

// Prevent form submission on Enter key in password fields
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.type === 'password') {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

console.log('Script loaded successfully');
