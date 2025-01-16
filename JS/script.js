document.addEventListener("DOMContentLoaded", () => {
    // Handle form submission for adding products
    const productForm = document.getElementById('product-form');

    if (productForm) {
        productForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // Get form field values
            const productName = document.getElementById('product-name').value.trim();
            const expiryDate = document.getElementById('expiry-date').value;
            const quantity = document.getElementById('quantity').value.trim();
            const category = document.getElementById('category').value;

            // Validate inputs
            if (!productName || !expiryDate || !quantity || !category) {
                alert('Please fill in all fields.');
                return;
            }

            // Log values (or you can send these to a server or use them in your app)
            console.log('Product Name:', productName);
            console.log('Expiry Date:', expiryDate);
            console.log('Quantity:', quantity);
            console.log('Category:', category);

            // Optionally, reset the form after submission
            productForm.reset();
            alert('Product added successfully!');
        });
    }

    // Handle Login button click
    const loginButton = document.querySelector('.login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            console.log('Login button clicked');
            // Redirect to the login page
            window.location.href = 'login.html'; // Update path to your login page
        });
    }

    // Handle Sign Up button click
    const signupButton = document.querySelector('.signup-btn');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            console.log('Sign Up button clicked');
            // Redirect to the sign-up page
            window.location.href = 'signup.html'; // Update path to your sign-up page
        });
    }

    // Handle Hamburger Menu Click
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Handle Dropdown Menu Click
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', dropdownMenu.classList.contains('active'));
        });
    }

    // Close dropdown menu when clicking outside
    document.addEventListener('click', function (event) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            dropdownMenu.classList.remove('active');
            dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        }
    });

    // Handle Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Validate email
            if (!email || !validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Log email (or you can send it to a server)
            console.log('Subscribed Email:', email);

            // Optionally, reset the form after submission
            this.reset();
            alert('Thank you for subscribing!');
        });
    }

    // Email validation function
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});