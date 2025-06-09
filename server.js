// Import necessary libraries
import express from 'express';
import { swaggerDocs } from './swaggerConfig.js';
import { router } from './userRoute.js';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Swagger setup
swaggerDocs(app);

// Use external route definitions
app.use('/', router);

// Global error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Internal Server Error" });
});


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});
