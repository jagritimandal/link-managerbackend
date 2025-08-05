// Express server setup
const express = require('express');

// Routes import
const linkRoute = require('./route/link.route');

// Connecting to database
const connectDB = require('./config/db');

// Swagger doc packages
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swaggerOptions.json').options;
swaggerOptions.apis = ['./docs/**/*.yaml']; // Ensure this path is correct
const specs = swaggerJsdoc(swaggerOptions);

// CORS
const cors = require('cors');

// dotenv for environment variables
require('dotenv').config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/link', linkRoute);

// Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start server
const PORT = process.env.PORT || 5000; // ❗Fix: fallback to hardcoded 5000 if env is undefined
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;
