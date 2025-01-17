// Select the signup form
const signupForm = document.querySelector('.signup-form');

// Add event listener for form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Collect form data
  const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value;
  const email = signupForm.querySelector('input[placeholder="Email"]').value;
  const password = signupForm.querySelector('input[placeholder="Password"]').value;
  const confirmPassword = signupForm.querySelector('input[placeholder="Confirm Password"]').value;

  // Basic validation: Check if passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Prepare data to send to the server
  const data = {
    fullName,
    email,
    password
  };

  console.log('Signup request data:', data);

  try {
    // Send POST request to the server
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('Signup response:', result);

    // Handle server response
    if (response.ok) {
      alert('Signup successful! You can now login.');
      // Optionally redirect to login page
      window.location.href = 'login.html';
    } else {
      alert('Signup failed: ' + (result.msg || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An error occurred during signup. Please try again later.');
  }
});

// document.getElementById('signup-Form').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const fullName = document.getElementById('fullName').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const confirmPassword = document.getElementById('confirmPassword').value;

//   if (password !== confirmPassword) {
//     document.getElementById('signupMessage').innerText = 'Passwords do not match.';
//     return;
//   }

//   const response = await fetch('http://localhost:3000/api/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ fullName, email, password })
//   });

//   const data = await response.json();
//   if (response.ok) {
//     alert(data.message);
//     window.location.href = 'login.html';
//   } else {
//     document.getElementById('signupMessage').innerText = data.message;
//   }
// });