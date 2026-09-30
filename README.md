# Book API - Advanced

Practice backend project using:

- Node.js
- Express
- Router
- Middleware
- Config
- express-validator
- Lodash
- Mongoose
- MongoDB
- Pagination

## MongoDB

This project uses a local MongoDB server:

mongodb://127.0.0.1:27017/book_api

Make sure MongoDB is running before starting the project.

## Install

npm install

## Run

npm run dev

## API

### Get books with pagination

GET /api/book

GET /api/book?page=1&limit=5

GET /api/book?page=2&limit=10

The response contains:

- data
- currentPage
- limit
- totalBooks
- totalPages
- hasNextPage
- hasPreviousPage

Maximum limit is 50.

### Get one book

GET /api/book/:id

### Create a book

POST /api/book

Body:

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "description": "A book about writing clean and maintainable code."
}

### Update a book

PUT /api/book/:id

Body:

{
  "title": "Clean Code Updated",
  "author": "Robert C. Martin",
  "description": "Updated description"
}

### Delete a book

DELETE /api/book/:id
