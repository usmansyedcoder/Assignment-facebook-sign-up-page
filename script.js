document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const birthdateInput = document.getElementById('birthdate');
    const calendarBtn = document.querySelector('.calendar-btn');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
    
    // Format birthdate input
    birthdateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length >= 5) {
            value = value.substring(0, 5) + '/' + value.substring(5);
        }
        
        e.target.value = value;
    });
    
    // Calendar button click
    calendarBtn.addEventListener('click', function() {
        birthdateInput.focus();
        // Show date picker
        birthdateInput.showPicker ? birthdateInput.showPicker() : birthdateInput.type = 'date';
        setTimeout(() => {
            birthdateInput.type = 'text';
        }, 100);
    });
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.input-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validate first name
        const firstName = document.getElementById('firstName').value.trim();
        if (firstName.length < 2) {
            showError('firstName', 'First name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate last name
        const lastName = document.getElementById('lastName').value.trim();
        if (lastName.length < 2) {
            showError('lastName', 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        const password = passwordInput.value;
        if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            isValid = false;
        }
        
        // Validate birthdate
        const birthdate = birthdateInput.value;
        const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!birthdateRegex.test(birthdate)) {
            showError('birthdate', 'Please enter a valid date (MM/DD/YYYY)');
            isValid = false;
        }
        
        // Validate terms
        const terms = document.getElementById('terms').checked;
        if (!terms) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = 'Account created successfully! Redirecting...';
                form.insertBefore(successMsg, form.querySelector('.submit-btn'));
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    successMsg.remove();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show welcome alert
                    alert('Welcome! Your account has been created successfully.');
                }, 3000);
            }, 2000);
        }
    });
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const inputGroup = field.closest('.input-group');
        inputGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = inputGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        inputGroup.appendChild(errorMsg);
    }
    
    // Social login buttons
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`Redirecting to ${platform} login...`);
        });
    });
});
