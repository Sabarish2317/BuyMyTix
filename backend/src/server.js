const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('./config/passportConfig');

dotenv.config();

const app = express();

const { errorHandler } = require('./middleware/errorhandle');  

// Middleware setup
app.use(cors());               
app.use(express.json());
app.use(errorHandler);

// Session middleware setup (used for managing user sessions)
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,                    
  saveUninitialized: true,        
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes for Google OAuth login
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],       
}));

// Callback route after Google authentication
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect('/profile'); 
  }
);

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));

  //user  routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

//movie routes
const movieRoutes = require('./routes/movieRoutes');
app.use('/movie', movieRoutes);

//google auth routes
const googleAuthRoutes = require('./routes/userRoutes');
app.use('/auth', googleAuthRoutes);

//sell ticket routes
const TicketRoutes = require('./routes/sellRoutes');
app.use('/sell', TicketRoutes);

//search movie routes
const searchRoutes = require('./routes/searchRoutes');
app.use('/find', searchRoutes);

//sports ticket routes
const sportsRoutes = require('./routes/sportRoutes');
app.use('/sports', sportsRoutes);

//concert ticket routes
const concertRoutes = require('./routes/concertRoutes');
app.use('/concert', concertRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
