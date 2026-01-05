// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');

    // Input elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const mobileInput = document.getElementById('mobile');
    const termsInput = document.getElementById('terms');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const mobileError = document.getElementById('mobileError');
    const termsError = document.getElementById('termsError');

    const successMessage = document.getElementById('successMessage');

    // Simple email check (pattern)
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Clear all error messages and styles
    function clearErrors() {
        const errorElements = [
            nameError, emailError, passwordError,
            confirmPasswordError, mobileError, termsError
        ];
        errorElements.forEach(el => el.textContent = '');

        const inputs = [
            nameInput, emailInput, passwordInput,
            confirmPasswordInput, mobileInput
        ];
        inputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();         // Stop normal form submit
        clearErrors();              // Remove old errors
        successMessage.classList.add('d-none');

        let isFormValid = true;     // We will flip this if any check fails

        // ----- 1. Full Name -----
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Full Name is required';
            nameInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            nameInput.classList.add('is-valid');
        }

        // ----- 2. Email -----
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('is-invalid');
            isFormValid = false;
        } else if (!isValidEmail(emailValue)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            emailInput.classList.add('is-valid');
        }

        // ----- 3. Password -----
        const passwordValue = passwordInput.value;
        if (passwordValue.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            passwordInput.classList.add('is-valid');
        }

        // ----- 4. Confirm Password -----
        if (confirmPasswordInput.value !== passwordValue || confirmPasswordInput.value === '') {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            confirmPasswordInput.classList.add('is-valid');
        }

        // ----- 5. Mobile Number -----
        const mobileValue = mobileInput.value.trim();
        const mobilePattern = /^\d{10}$/; // exactly 10 digits
        if (!mobilePattern.test(mobileValue)) {
            mobileError.textContent = 'Enter a valid 10-digit mobile number';
            mobileInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            mobileInput.classList.add('is-valid');
        }

        // ----- 6. Terms & Conditions -----
        if (!termsInput.checked) {
            termsError.textContent = 'You must accept the terms';
            isFormValid = false;
        }

        // ----- Final: if all checks passed -----
        if (isFormValid) {
            successMessage.classList.remove('d-none'); // show success alert
            form.reset();                               // clear form fields

            // remove green borders after reset
            const inputs = [
                nameInput, emailInput, passwordInput,
                confirmPasswordInput, mobileInput
            ];
            inputs.forEach(input => input.classList.remove('is-valid'));
        }
    });
});
