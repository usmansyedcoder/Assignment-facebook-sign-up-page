document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');
    const submitBtn = document.getElementById('submitBtn');
    
    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let strength = 'weak';
        
        if (password.length >= 12) {
            strength = 'strong';
        } else if (password.length >= 8) {
            strength = 'medium';
        }
        
        passwordStrength.className = 'strength-bar';
        passwordStrength.classList.add(`strength-${strength}`);
    });
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset all errors
        document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');
        document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));
        
        let isValid = true;
        
        // Validate first name
        const firstName = document.getElementById('firstName').value.trim();
        if (firstName.length < 2) {
            document.getElementById('firstNameError').style.display = 'block';
            document.getElementById('firstName').parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate last name
        const lastName = document.getElementById('lastName').value.trim();
        if (lastName.length < 2) {
            document.getElementById('lastNameError').style.display = 'block';
            document.getElementById('lastName').parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            document.getElementById('email').parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate password
        const password = passwordInput.value;
        if (password.length < 8) {
            document.getElementById('passwordError').style.display = 'block';
            passwordInput.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate birthdate (must be at least 13 years old)
        const birthdate = new Date(document.getElementById('birthdate').value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 13);
        
        if (birthdate > minDate) {
            document.getElementById('birthdateError').style.display = 'block';
            document.getElementById('birthdate').parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate gender
        const gender = document.getElementById('gender').value;
        if (!gender) {
            document.getElementById('genderError').style.display = 'block';
            document.getElementById('gender').parentElement.classList.add('error');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            submitBtn.disabled = true;
            submitBtn.value = 'Creating Account...';
            
            // Simulate API call
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'block';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    document.getElementById('successMessage').style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.value = 'Sign Up';
                    passwordStrength.className = 'strength-bar';
                    
                    alert('Account created successfully! (This is a demo)');
                }, 3000);
            }, 2000);
        }
    });
    
    // Set max date for birthdate (13 years ago)
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 13);
    document.getElementById('birthdate').max = maxDate.toISOString().split('T')[0];
    
    // Set placeholder date (18 years ago)
    const placeholderDate = new Date();
    placeholderDate.setFullYear(today.getFullYear() - 18);
    document.getElementById('birthdate').value = placeholderDate.toISOString().split('T')[0];
});
