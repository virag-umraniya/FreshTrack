# Backend Setup Guide

This guide provides a complete step-by-step process to set up the backend for your project using **Node.js**, **Express**, and **MongoDB**. It includes instructions for setting up the server, connecting to MongoDB, creating API endpoints, and deploying the backend.

---

## **1. Prerequisites**

Before starting, ensure you have the following installed:

- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (for cloud database) or **Local MongoDB Installation**
- **Git** (optional): [Download Git](https://git-scm.com/)
- **Postman** or **Insomnia** (for testing APIs): [Download Postman](https://www.postman.com/)

---

## **2. Project Setup**

### **Step 1: Create a Project Directory**
Create a new directory for your backend project:
```bash
mkdir backend
cd backend
```

### **Step 2: Initialize a Node.js Project**
Initialize a new Node.js project:
```bash
npm init -y
```

### **Step 3: Install Required Packages**
Install the necessary dependencies:
```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv express-validator express-rate-limit cors morgan
```

---

## **3. Set Up Environment Variables**

Create a `.env` file in the root of your project to store sensitive information:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

- Replace `your_mongodb_connection_string` with your MongoDB connection string.
- Replace `your_jwt_secret` with a strong secret key for JWT token generation.

---

## **4. Create the Server**

### **Step 1: Create `index.js`**
Create the main server file (`index.js`):
```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## **5. Set Up MongoDB**

### **Option 1: MongoDB Atlas (Cloud-Based)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster (choose the free tier).
3. Whitelist your IP address (or allow access from anywhere for testing).
4. Create a database user with a username and password.
5. Get the connection string (URI) for your cluster.

### **Option 2: Local MongoDB Installation**
1. Download and install MongoDB from the [official website](https://www.mongodb.com/try/download/community).
2. Start the MongoDB server:
   ```bash
   mongod
   ```
3. Use the default connection string: `mongodb://localhost:27017`.

---

## **6. Create the User Model**

Create a `models` directory and add `User.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
```

---

## **7. Create Authentication Routes**

Create a `routes` directory and add `auth.js`:
```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Sign-up route
router.post('/signup', [
  check('fullName', 'Full name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ fullName, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
```

---

## **8. Test the Backend**

1. Start the server:
   ```bash
   node index.js
   ```

2. Use **Postman** or **Insomnia** to test the API endpoints:
   - **Sign-up**: `POST http://localhost:5000/api/auth/signup`
   - **Login**: `POST http://localhost:5000/api/auth/login`