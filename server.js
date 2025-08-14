const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting Secrets application...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', PORT);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : true,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// In-memory user storage (in production, use a database)
const users = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    console.log('No token provided for protected route');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token verified for user:', decoded.email);
    next();
  } catch (error) {
    console.log('Invalid token:', error.message);
    res.status(403).json({ error: 'Invalid token.' });
  }
};

// Routes
app.get('/', (req, res) => {
  console.log('Serving main page');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    console.log('Registration request received:', { name: req.body.name, email: req.body.email });
    console.log('Password received (first 3 chars):', req.body.password ? req.body.password.substring(0, 3) + '...' : 'undefined');
    
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log('Registration failed: Missing fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Registration failed: Invalid email format');
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&*!]{6,8}$/;
    if (!passwordRegex.test(password)) {
      console.log('Registration failed: Password requirements not met');
      return res.status(400).json({ 
        error: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and be 6-8 characters long. Special characters are allowed.' 
      });
    }

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      console.log('Registration failed: User already exists');
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(newUser);
    console.log('User registered successfully:', { id: newUser.id, name: newUser.name, email: newUser.email });
    console.log('Stored users:', users.map(u => ({ id: u.id, email: u.email, hasPassword: !!u.password })));

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login request received for email:', req.body.email);
    console.log('Password received (first 3 chars):', req.body.password ? req.body.password.substring(0, 3) + '...' : 'undefined');
    
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('Login failed: Missing fields');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log('Login failed: User not found');
      console.log('Available users:', users.map(u => u.email));
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('User found:', { id: user.id, email: user.email, hasStoredPassword: !!user.password });

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Login failed: Invalid password');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    console.log('User logged in successfully:', { id: user.id, name: user.name, email: user.email });

    res.json({ 
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route - get user info
app.get('/api/user', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      console.log('User not found for ID:', req.user.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User info requested for:', user.email);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error getting user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  console.log('Logout request received');
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Test endpoint to see registered users (remove in production)
app.get('/api/debug/users', (req, res) => {
  console.log('Debug: All users in memory');
  const debugUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    hasPassword: !!user.password,
    passwordLength: user.password ? user.password.length : 0,
    createdAt: user.createdAt
  }));
  console.log('Debug users:', debugUsers);
  res.json({ 
    message: 'Debug info - Users in memory',
    users: debugUsers,
    totalUsers: users.length
  });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Visit http://localhost:${PORT} to access the application`);
  console.log(`🔐 JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
  console.log(`👥 Users in memory: ${users.length}`);
});
