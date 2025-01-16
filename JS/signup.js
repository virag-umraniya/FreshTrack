// signup.js

// DOM Elements
const signupForm = document.querySelector(".signup-form");
const fullNameInput = document.querySelector('input[placeholder="Full Name"]');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const confirmPasswordInput = document.querySelector(
  'input[placeholder="Confirm Password"]'
);
const errorMessage = document.createElement("p"); // For displaying errors

// Add error message styling
errorMessage.style.color = "#ff0000"; // Red color for errors
errorMessage.style.marginTop = "10px";
errorMessage.style.textAlign = "center";

// Insert error message after the form
signupForm.appendChild(errorMessage);

// Form Submission Handler
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Clear previous error messages
  errorMessage.textContent = "";

  // Basic Validation
  if (!fullNameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!validateEmail(emailInput.value)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage.textContent = "Passwords do not match.";
    return;
  }

  // Simulate API Call (Replace with actual API call)
  try {
    // Show loading spinner (optional)
    signupForm.querySelector("button").innerHTML = "Signing up...";

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Replace this with actual API call
    const response = await fakeSignupAPI(
      fullNameInput.value,
      emailInput.value,
      passwordInput.value
    );

    if (response.success) {
      // Redirect to login page or dashboard
      window.location.href = "/login.html";
    } else {
      errorMessage.textContent = response.message || "Sign-up failed. Please try again.";
    }
  } catch (error) {
    errorMessage.textContent = "An error occurred. Please try again later.";
  } finally {
    // Reset button text
    signupForm.querySelector("button").innerHTML = "Sign Up";
  }
});

// Email Validation Function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Fake Sign-Up API (Replace with real API call)
function fakeSignupAPI(fullName, email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}