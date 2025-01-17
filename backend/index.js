const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('combined'));
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

// // index.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/freshtrack', { useNewUrlParser: true, useUnifiedTopology: true });

// // User schema
// const userSchema = new mongoose.Schema({
//     fullName: String,
//     email: String,
//     password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Sign-up route
// app.post('/api/signup', async (req, res) => {
//     try {
//         const { fullName, email, password } = req.body;
//         if (!fullName || !email || !password) {
//             return res.status(400).json({ message: 'All fields are required.' });
//         }
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: 'Email already exists.' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ fullName, email, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User created successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });

// // Login route
// app.post('/api/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required.' });
//         }
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials.' });
//         }
//         const token = jwt.sign({ userId: user._id }, 'your_secret_key');
//         res.json({ token, user: { _id: user._id, fullName: user.fullName, email: user.email } });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });