document.getElementById('signup-form').addEventListener('submit', function (event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('password-error');
  
    if (password !== confirmPassword) {
      passwordError.textContent = 'Passwords do not match!';
      passwordError.style.display = 'block';
      event.preventDefault(); // Prevent form submission
    } else {
      passwordError.style.display = 'none';
    }
  });