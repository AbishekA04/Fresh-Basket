document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const formTitle = document.getElementById('formTitle');
    const submitButton = document.getElementById('submitButton');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Handle Login only
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            try {
                // Here you would typically verify credentials with your backend
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = '/shop';
            } catch (error) {
                console.error('Login error:', error);
                showCustomAlert('Login failed. Please try again.');
            }
        } else {
            showCustomAlert('Please enter both email and password');
        }
    });

    // Admin login handler
    document.getElementById('adminLoginLink').addEventListener('click', function(e) {
        e.preventDefault();
        const loginContainer = document.querySelector('.login-container');
        
        // Change form title and hide signup link
        formTitle.textContent = 'Admin Login';
        signupLinks[0].style.display = 'none'; // Hide "Don't have an account?"
        
        // Show admin login indicator
        if (!document.querySelector('.admin-login-text')) {
            const adminLoginText = document.createElement('h3');
            adminLoginText.textContent = 'Admin Access Only';
            adminLoginText.classList.add('admin-login-text');
            loginContainer.insertBefore(adminLoginText, loginContainer.querySelector('h2'));
        }

        // Modify form submission for admin login
        loginForm.removeEventListener('submit', regularFormHandler);
        loginForm.addEventListener('submit', adminFormHandler);
    });

    // Regular form submission handler
    function regularFormHandler(e) {
        e.preventDefault();
        // ... your existing login/signup logic ...
    }

    // Admin form submission handler
    function adminFormHandler(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Add your admin credentials validation here
        if (email === 'admin@freshbasket.com' && password === 'admin123') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            window.location.href = '/admin_dashboard';
        } else {
            showCustomAlert('Invalid admin credentials');
        }
    }

    // Add this function to reset to regular login
    function resetToRegularLogin() {
        formTitle.textContent = 'Sign In to Fresh Basket';
        signupLinks[0].style.display = 'block';
        const adminLoginText = document.querySelector('.admin-login-text');
        if (adminLoginText) {
            adminLoginText.remove();
        }
        loginForm.removeEventListener('submit', adminFormHandler);
        loginForm.addEventListener('submit', regularFormHandler);
    }

    // Initialize regular form handler
    loginForm.addEventListener('submit', regularFormHandler);
});

function showCustomAlert(message) {
    alert(message);
}
