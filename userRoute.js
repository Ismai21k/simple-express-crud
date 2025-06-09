import express from 'express';
const router = express.Router();

let store = []; // In-memory store

// Root route
router.get('/', (req, res) => {
    res.send("Hello, world!");
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root route
 *     description: Returns a "Hello, world!" message.
 *     responses:
 *       200:
 *         description: A successful response
 */

// Retrieve all items
router.get('/items', (req, res) => {
    res.send(store);
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: Retrieve the full list of items.
 *     responses:
 *       200:
 *         description: A list of items
 */

// Retrieve a single item
router.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = store.find(item => item.id === id);

    if (!item) {
        return res.status(404).send({ message: "Item not found" });
    }

    res.send(item);
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item
 *     description: Retrieve a single item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single item
 *       404:
 *         description: Item not found
 */

// Create a new item
router.post('/items', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).send({ message: "Name and description are required" });
    }

    const id = store.length ? Math.max(...store.map(item => item.id)) + 1 : 1;
    const newItem = { id, name, description };

    store.push(newItem);
    res.status(201).send(newItem);
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Name and description are required
 */

// Update an item
router.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;

    const item = store.find(item => item.id === id);
    if (!item) {
        return res.status(404).send({ message: "Item not found" });
    }

    if (name) item.name = name;
    if (description) item.description = description;

    res.send({ message: `Item with id ${id} has been updated`, item });
});

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 */

// Delete an item
router.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = store.length;

    store = store.filter(item => item.id !== id);

    if (store.length === initialLength) {
        return res.status(404).send({ message: "Item not found" });
    }

    res.send({ message: `Item with id ${id} has been deleted` });
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */

export { router };
