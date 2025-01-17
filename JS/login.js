// Select the login form
const loginForm = document.querySelector('.login-form');

// Add event listener for form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Collect form data
  const email = loginForm.querySelector('input[placeholder="Email"]').value;
  const password = loginForm.querySelector('input[placeholder="Password"]').value;

  // Prepare data to send to the server
  const data = {
    email,
    password
  };

  console.log('Login request data:', data);

  try {
    // Send POST request to the server
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('Login response:', result);

    // Handle server response
    if (response.ok) {
      // Store the token in localStorage or another storage mechanism
      localStorage.setItem('token', result.token);
      alert('Login successful!');
      // Optionally redirect to the dashboard or home page
      window.location.href = '/dashboard.html';
    } else {
      alert('Login failed: ' + (result.msg || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again later.');
  }
});

// document.getElementById('login-form').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   const response = await fetch('http://localhost:3000/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await response.json();
//   if (response.ok) {
//     // Store token and user data in localStorage or use session
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(data.user));
//     alert('Login successful!');
//     window.location.href = 'dashboard.html'; // Redirect to dashboard or home
//   } else {
//     document.getElementById('loginMessage').innerText = data.message;
//   }
// });