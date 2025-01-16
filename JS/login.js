// login.js

// DOM Elements
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const errorMessage = document.createElement("p"); // For displaying errors

// Add error message styling
errorMessage.style.color = "#ff0000"; // Red color for errors
errorMessage.style.marginTop = "10px";
errorMessage.style.textAlign = "center";

// Insert error message after the form
loginForm.appendChild(errorMessage);

// Form Submission Handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Clear previous error messages
  errorMessage.textContent = "";

  // Basic Validation
  if (!emailInput.value || !passwordInput.value) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!validateEmail(emailInput.value)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  // Simulate API Call (Replace with actual API call)
  try {
    // Show loading spinner (optional)
    loginForm.querySelector("button").innerHTML = "Logging in...";

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Replace this with actual API call
    const response = await fakeLoginAPI(emailInput.value, passwordInput.value);

    if (response.success) {
      // Redirect to dashboard or home page
      window.location.href = "/dashboard.html";
    } else {
      errorMessage.textContent = response.message || "Login failed. Please try again.";
    }
  } catch (error) {
    errorMessage.textContent = "An error occurred. Please try again later.";
  } finally {
    // Reset button text
    loginForm.querySelector("button").innerHTML = "Sign In";
  }
});

// Email Validation Function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Fake Login API (Replace with real API call)
function fakeLoginAPI(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: "Invalid email or password." });
      }
    }, 1000);
  });
}