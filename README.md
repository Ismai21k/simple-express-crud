# API Assignment

A simple RESTful API built with Express.js for managing a collection of items in memory.

## Features

- Get a welcome message at `/`
- Retrieve an item by ID: `GET /items/:id`
- Add a new item: `POST /items`
- Update an item: `PUT /items/:id`
- Delete an item: `DELETE /items/:id`
- Handles unknown routes with a 404 response

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository or download the files.
2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Server

Start the server with:

```sh
npm start
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### GET `/`

Returns a welcome message.

### GET `/items/:id`

Retrieve an item by its ID.

- **Response:** The item object or 404 if not found.

### POST `/items`

Add a new item.

- **Request Body:**
  ```json
  {
    "name": "Item Name",
    "description": "Item Description"
  }
  ```
- **Response:** The updated list of items.

### PUT `/items/:id`

Update an existing item by ID.

- **Request Body:** (any or both fields)
  ```json
  {
    "name": "Updated Name",
    "description": "Updated Description"
  }
  ```
- **Response:** Success message.

### DELETE `/items/:id`

Delete an item by ID.

- **Response:** Success message.

## Notes

- Data is stored in memory and will reset when the server restarts.
- Handles unknown routes with a JSON 404 message.

## License

