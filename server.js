// Import necessary libraries
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
// Requirement: Set up proper middleware (e.g., express.json())
app.use(bodyParser.json());

// 3. Data Management
// Requirement: Create a simple in-memory data store (array) to manage items
let store = []; // Each item should have: id, name, description

// 1. Root route
// Requirement: Define a route for the root URL ("/") that returns a "Hello, World!" message
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

// 2. CRUD: Retrieve all items
// Requirement: GET /items - Retrieve all items
app.get('/items', (req, res) => {
    res.send(store);
});

// 2. CRUD: Retrieve a single item by ID
// Requirement: GET /items/:id - Retrieve a single item by ID
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = store.find(item => item.id === id);

    if (!item) {
        // 4. Error Handling: Return 404 if not found
        return res.status(404).send({ message: "Item not found" });
    }

    res.send(item);
});

// 2. CRUD: Create a new item
// Requirement: POST /items - Create a new item
app.post('/items', (req, res) => {
    const { name, description } = req.body;

    // 3. Validation
    // Requirement: Validate incoming data
    if (!name || !description) {
        return res.status(400).send({ message: "Name and description are required" });
    }

    const id = store.length + 1;
    const newItem = { id, name, description };

    store.push(newItem);
    res.status(201).send(newItem);
});

// 2. CRUD: Update an item by ID
// Requirement: PUT /items/:id - Update an item by ID
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;

    const item = store.find(item => item.id === id);

    if (!item) {
        // 4. Error Handling
        return res.status(404).send({ message: "Item not found" });
    }

    // Optional updates
    if (name) item.name = name;
    if (description) item.description = description;

    res.send({ message: `Item with id ${id} has been updated`, item });
});

// 2. CRUD: Delete an item by ID
// Requirement: DELETE /items/:id - Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = store.length;

    store = store.filter(item => item.id !== id);

    if (store.length === initialLength) {
        // 4. Error Handling
        return res.status(404).send({ message: "Item not found" });
    }

    res.send({ message: `Item with id ${id} has been deleted` });
});

// 1 & 4. Error Handling for undefined routes
// Requirement: Implement error handling for invalid routes
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// Optional: Global error handler
// Requirement: Implement proper error responses (400, 404, 500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Internal Server Error" });
});

// 5. Testing
// Requirement: Test using Postman or similar tools
// You can test endpoints like:
// - GET http://localhost:3000/items
// - POST http://localhost:3000/items with JSON body { "name": "Pen", "description": "Blue ink" }
// - PUT http://localhost:3000/items/1
// - DELETE http://localhost:3000/items/1

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

