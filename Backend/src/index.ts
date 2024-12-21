import express, { Express, Request, Response } from "express"; 
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Import endpoints
import basicEndpoints from "./api/utilityEndpoints";
import dbQueries from "./api/dbQueriesEndpoints";

// Import database
import sequelize from "./ConfigFiles/dbConfig";
import { testDatabaseConnection } from "./ConfigFiles/dbUtils";

const cors = require('cors');

const app: Express = express();
const port = 3000;

// CORS for any origin: 
// app.use(cors());

// CORS for specific origins
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Swagger version
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the backend',
    },
  },
  apis: ['./src/api/apiAnnotations.ts'], // Path to the API route files (can be specific files or directories)
};

// Use the endpoints defined
app.use(basicEndpoints);
app.use(dbQueries);

// Serve Swagger UI at /api-docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Database test connection
testDatabaseConnection(sequelize);



// Server running ?
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});