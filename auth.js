document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Password strength checker
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let status = '';

            if (password.length >= 8) strength += 25;
            if (password.match(/[a-z]/)) strength += 25;
            if (password.match(/[A-Z]/)) strength += 25;
            if (password.match(/[0-9]/)) strength += 25;

            strengthBar.style.width = strength + '%';

            if (strength <= 25) {
                status = 'Weak';
                strengthBar.style.background = '#ef4444';
            } else if (strength <= 50) {
                status = 'Fair';
                strengthBar.style.background = '#f97316';
            } else if (strength <= 75) {
                status = 'Good';
                strengthBar.style.background = '#eab308';
            } else {
                status = 'Strong';
                strengthBar.style.background = '#22c55e';
            }

            strengthText.textContent = `Password strength: ${status}`;
        });
    }

    // Form submission
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your login logic here
            console.log('Login submitted');
            // Redirect to main page after successful login
            window.location.href = 'index.html';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your signup logic here
            console.log('Signup submitted');
            // Redirect to main page after successful signup
            window.location.href = 'index.html';
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add your social login logic here
            console.log('Social login clicked:', this.classList.contains('google') ? 'Google' : 'Apple');
        });
    });
}); 