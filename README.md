# Vehicle Transfer System API

A Nest.js backend application that implements a CRUD module for managing vehicle transfers in a management system.

## Features

- User authentication with JWT and secure cookies
- Role-based access control system
- Project and organizational unit based permissions
- Complete CRUD operations for vehicle transfers
- PostgreSQL database with TypeORM
- Docker and docker-compose setup
- API security with Helmet
- Swagger UI API documentation

## Tech Stack

- Node.js
- Nest.js
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Docker & Docker Compose
- Swagger / OpenAPI 

## Data Models

- **User**: Manages user accounts with role-based access
- **Role**: Contains sets of permissions
- **Permission**: Defines allowed actions
- **Project**: Top-level grouping of organizational units
- **OrganizationalUnit**: Belongs to a project, contains users
- **Vehicle**: Stores vehicle information
- **Transfer**: Records vehicle transfers with relationships to other entities

## Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (if not using Docker)

### Environment Variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configuration.
### Running with Docker (Recommended)

```bash
# Build and start containers
docker-compose up -d

# The API will be available at http://localhost:3000
```

### Running Locally (without Docker)

```bash
# Install dependencies
npm install

# Create a PostgreSQL database named 'vehicle_transfer_system'

# Run database migrations
npm run typeorm:migration:run

# Start the application in development mode
npm run start:dev

# The API will be available at http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /auth/login` - Authenticate user and get JWT token (stored as HTTP-only cookie)
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- `GET /auth/me` - Get current user profile (requires authentication)
- `POST /auth/logout` - Logout and clear JWT cookie

### Transfers

- `GET /transfers` - Get transfers (filtered by user access)
- `POST /transfers` - Create a new transfer
- `GET /transfers/:id` - Get a specific transfer
- `PUT /transfers/:id` - Update a transfer
- `DELETE /transfers/:id` - Delete a transfer

All endpoints require proper authentication and authorization based on the user's roles and permissions.

## API Documentation

The API is documented using Swagger UI. After starting the application, you can access the API documentation at:

```
http://localhost:3000/api/docs
```

Additionally, the API has been deployed online, and you can also view the documentation and test the endpoints at:

```
https://vehicle-transfer-system.onrender.com/api/docs
```

### Authentication

All API endpoints (except login and register) require authentication. The application uses JWT tokens stored in HTTP-only cookies for secure authentication.

#### Cookie-based Authentication

The API uses secure cookie-based authentication instead of the traditional bearer token approach. When you log in through the `/auth/login` endpoint, the JWT token is automatically stored in an HTTP-only cookie, which provides better security against XSS attacks.

##### How to authenticate in Swagger UI:

1. First, use the `/auth/login` endpoint to log in, providing your email and password
2. The API will set the JWT cookie automatically
3. Swagger UI will include this cookie in subsequent requests
4. All secured endpoints will now be accessible

#### Available endpoints:

- **POST /auth/login** - Authenticate and receive a JWT token in cookies
- **GET /auth/me** - Get the current user's profile
- **POST /auth/logout** - Logout and clear the JWT cookie

### Transfers

The main functionality of the API is managing vehicle transfers:

- **GET /transfers** - Get a list of transfers with filtering options
- **GET /transfers/:id** - Get a specific transfer by ID
- **POST /transfers** - Create a new transfer
- **PATCH /transfers/:id** - Update an existing transfer
- **DELETE /transfers/:id** - Delete a transfer

### Authorization

The API implements a role-based access control system with the following permissions:

- **view_transfers** - Allows viewing transfer records
- **create_transfers** - Allows creating new transfers
- **edit_transfers** - Allows editing existing transfers
- **delete_transfers** - Allows deleting transfers

Users are assigned roles with specific permissions, and also have access to specific projects and organizational units.

## Authentication

The system uses JWT tokens stored in secure cookies for authentication. 

The tokens contain:
- User ID
- Username
- Timestamp

## Authentication Flow

1. User logs in with email and password at `/auth/login`
2. Server verifies credentials and returns user data
3. JWT token is stored as an HTTP-only cookie
4. Client includes this cookie in subsequent requests
5. Protected endpoints verify the JWT token and user permissions

## Access Control

Access is controlled by:
1. JWT validation
2. Role-based permissions (view_transfers, create_transfers, etc.)
3. Project and organizational unit access checks

## Test Users

The included init.sql file provides the following test users:

| Username | Email               | Password    | Role     |
|----------|---------------------|-------------|----------|
| admin    | admin@example.com   | password123 | Admin    |
| manager  | manager@example.com | password123 | Manager  |
| operator | operator@example.com| password123 | Operator |
