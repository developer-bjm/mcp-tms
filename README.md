# Express TypeScript API Project

A simple Express.js API application built with TypeScript featuring basic CRUD operations.

## Features

- Express.js server with TypeScript
- Type-safe development
- CORS enabled
- Environment variables support
- RESTful API routes with proper typing
- Error handling middleware
- Health check endpoint
- Input validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file and configure your environment variables (already created)

## Running the Application

### Development mode (with auto-reload and TypeScript compilation):
```bash
npm run dev
```

### Build the project:
```bash
npm run build
```

### Production mode (requires build first):
```bash
npm run build
npm start
```

### Watch mode for TypeScript compilation:
```bash
npm run dev:build
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Users (Sample endpoints)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

## Project Structure

```
├── src/
│   ├── app.ts              # Main application file
│   ├── routes/
│   │   └── api.ts          # API routes with TypeScript
│   └── types/
│       └── index.ts        # TypeScript type definitions
├── dist/                   # Compiled JavaScript (generated)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── nodemon.json            # Nodemon configuration
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Example Usage

### Get all users:
```bash
curl http://localhost:3000/api/users
```

### Create a new user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## Next Steps

- Add database integration (MongoDB, PostgreSQL, etc.)
- Implement authentication and authorization
- Add input validation
- Add unit and integration tests
- Add logging
- Add API documentation (Swagger/OpenAPI)
