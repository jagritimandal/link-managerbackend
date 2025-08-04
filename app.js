//express server setup
const express = require('express');

// Routes import
const linkRoute = require('./route/link.route');

//conneting to database
const connectDB = require('./config/db');

// swagger doc packages
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swagger_option = require('./config/swaggerOptions.json').options;
swagger_option.apis = ['./docs/**/*.yaml'];
const specs = swaggerJsdoc(swagger_option);

//cors
const cors = require('cors');

// dotenv for environment variables
require('dotenv').config({ debug: true});

// Connect to MongoDB and start server
connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/links', linkRoute);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
// Start server
const PORT = process.env.PORT || PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.....`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
module.exports = app;