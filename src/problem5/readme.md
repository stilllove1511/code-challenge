# Simple CRUD API

A simple CRUD application built with TypeScript, Express.js, SQLite, and Prisma ORM following a layered architecture pattern.

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **SQLite** - Database
- **Prisma** - ORM and database toolkit
- **Node.js** - Runtime environment

## Architecture

The application follows a layered architecture pattern:

```
src/
├── config/         # Database configuration
├── controllers/    # HTTP request handlers (Controller layer)
├── services/       # Business logic (Service layer)
├── routes/         # Route definitions (Router layer)
├── types/          # TypeScript type definitions
└── index.ts        # Application entry point
```

## Features

### Users CRUD
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts CRUD
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `GET /api/posts/published` - Get published posts
- `GET /api/posts/author/:authorId` - Get posts by author
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Additional Endpoints
- `GET /` - API information
- `GET /api/health` - Health check

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

3. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

## API Usage Examples

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "Hello World!", "published": true, "authorId": 1}'
```

### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

## Database Schema

### Users Table
- `id` - Auto-incrementing primary key
- `email` - Unique email address
- `name` - User's name
- `createdAt` - Timestamp when created
- `updatedAt` - Timestamp when last updated

### Posts Table
- `id` - Auto-incrementing primary key
- `title` - Post title
- `content` - Post content (optional)
- `published` - Boolean flag for published status
- `authorId` - Foreign key to users table
- `createdAt` - Timestamp when created
- `updatedAt` - Timestamp when last updated

## Development

- Use `npm run dev` for development with hot reloading
- Use `npm run db:studio` to open Prisma Studio for database management
- All API responses follow a consistent format with `success`, `data`/`message`, and optional `error` fields

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Database constraint violations
- 404 for not found resources
- 500 for server errors
- Proper HTTP status codes
