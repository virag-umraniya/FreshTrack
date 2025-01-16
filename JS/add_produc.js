// script.js

// DOM Elements
const productForm = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const expiryDate = document.getElementById('expiry-date');
const quantity = document.getElementById('quantity');
const category = document.getElementById('category');
const storageLocation = document.getElementById('storage-location');
const purchaseDate = document.getElementById('purchase-date');
const brand = document.getElementById('brand');
const price = document.getElementById('price');
const notes = document.getElementById('notes');
const productImage = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const productList = document.getElementById('product-list');

// Product Data Storage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Helper Functions
const showError = (input, message) => {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  formGroup.classList.add('error');
  errorMessage.textContent = message;
};

const clearError = (input) => {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.textContent = '';
};

const validateInput = (input) => {
  if (!input.value.trim()) {
    showError(input, 'This field is required.');
    return false;
  }
  clearError(input);
  return true;
};

const validateDate = (dateInput) => {
  const selectedDate = new Date(dateInput.value);
  const today = new Date();
  if (selectedDate < today) {
    showError(dateInput, 'Date cannot be in the past.');
    return false;
  }
  clearError(dateInput);
  return true;
};

// Image Preview
productImage.addEventListener('change', () => {
  const file = productImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.src = '';
    imagePreview.style.display = 'none';
  }
});

// Form Submission Handler
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate All Fields
  const isNameValid = validateInput(productName);
  const isExpiryDateValid = validateInput(expiryDate) && validateDate(expiryDate);
  const isQuantityValid = validateInput(quantity);
  const isCategoryValid = validateInput(category);
  const isStorageLocationValid = validateInput(storageLocation);
  const isPurchaseDateValid = validateInput(purchaseDate) && validateDate(purchaseDate);

  if (
    isNameValid &&
    isExpiryDateValid &&
    isQuantityValid &&
    isCategoryValid &&
    isStorageLocationValid &&
    isPurchaseDateValid
  ) {
    // Create Product Object
    const product = {
      id: Date.now(), // Unique ID for each product
      name: productName.value.trim(),
      expiryDate: expiryDate.value,
      quantity: quantity.value,
      category: category.value.trim(), // User-defined category
      storageLocation: storageLocation.value.trim(),
      purchaseDate: purchaseDate.value,
      brand: brand.value.trim(),
      price: price.value,
      notes: notes.value.trim(),
      image: productImage.files[0] ? productImage.files[0].name : null,
    };

    // Save Product to Local Storage
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    // Clear Form Fields
    productForm.reset();
    imagePreview.src = '';
    imagePreview.style.display = 'none';

    // Show Success Message
    alert('Product added successfully!');

    // Refresh Product List
    loadProducts();
  }
});

// Load Products from Local Storage
const loadProducts = () => {
  productList.innerHTML = ''; // Clear existing list
  products.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <h3>${product.name}</h3>
      <p><strong>Expiry Date:</strong> ${product.expiryDate}</p>
      <p><strong>Quantity:</strong> ${product.quantity}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Storage Location:</strong> ${product.storageLocation}</p>
      <p><strong>Purchase Date:</strong> ${product.purchaseDate}</p>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Notes:</strong> ${product.notes}</p>
      ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image">` : ''}
      <button onclick="editProduct(${product.id})">Edit</button>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    productList.appendChild(productItem);
  });
};

// Edit Product
const editProduct = (id) => {
  const product = products.find((p) => p.id === id);
  if (product) {
    // Populate Form Fields
    productName.value = product.name;
    expiryDate.value = product.expiryDate;
    quantity.value = product.quantity;
    category.value = product.category;
    storageLocation.value = product.storageLocation;
    purchaseDate.value = product.purchaseDate;
    brand.value = product.brand;
    price.value = product.price;
    notes.value = product.notes;

    // Remove Product from List
    products = products.filter((p) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));

    // Refresh Product List
    loadProducts();
  }
};

// Delete Product
const deleteProduct = (id) => {
  products = products.filter((p) => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  loadProducts();
};

// Load Products on Page Load
window.addEventListener('load', loadProducts);