const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/freshtrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User schema and model
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/api/signup', (req, res) => {
  const { fullName, email, password } = req.body;

  const newUser = new User({ fullName, email, password });
  newUser.save().then(() => {
    res.status(200).json({ success: true, message: 'User created successfully.' });
  }).catch(err => {
    res.status(500).json({ success: false, message: 'Error creating user.' });
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password }).then(user => {
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    res.status(200).json({ success: true, message: 'Login successful.' });
  }).catch(err => {
    res.status(500).json({ success: false, message: 'Error logging in.' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
