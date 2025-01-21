document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('ConfirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Perform further validation if needed

  // Submit the form data to the server
  const formData = {
    fullName,
    email,
    password
  };

  fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = 'login.html';
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
