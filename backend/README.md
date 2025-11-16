# Kynix Backend API

A professional Node.js + Express backend for the Kynix web development platform, featuring JWT authentication, PostgreSQL database with Prisma ORM, and comprehensive API documentation.

## Features

- ✅ Express.js REST API
- ✅ PostgreSQL database with Prisma ORM
- ✅ JWT authentication
- ✅ CORS support with configurable origins
- ✅ Rate limiting for security
- ✅ Session management with cookies
- ✅ Swagger/OpenAPI documentation
- ✅ Comprehensive logging system
- ✅ Link management system
- ✅ User authentication (register/login)
- ✅ Error handling and validation
- ✅ Security headers with Helmet.js
- ✅ Graceful shutdown handling

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # Prisma database connection
│   │   └── swagger.js        # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   ├── authController.js # Auth logic (register, login)
│   │   ├── linkController.js # Link management logic
│   │   └── logController.js  # Logging logic
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── links.js          # Link routes
│   │   └── logRoutes.js      # Logging routes
│   ├── utils/
│   │   └── jwt.js            # JWT utilities
│   └── server.js             # Main server entry point
├── prisma/
│   └── schema.prisma         # Prisma database schema
├── .env                      # Environment variables (local)
├── .env.example              # Example environment variables
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- PostgreSQL 12+ (local or remote)

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/kynix_db
JWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

5. Run Prisma migrations:
```bash
npm run prisma:migrate
```

6. (Optional) Generate Prisma client:
```bash
npm run prisma:generate
```

## Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3001` (or the PORT specified in `.env`)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Links
- `POST /api/links` - Create a new link (requires auth)
- `GET /api/links` - Get all user links (requires auth)
- `DELETE /api/links/:id` - Delete a link (requires auth)

### Logs
- `POST /api/logs` - Create a log entry (requires auth)
- `GET /api/logs` - Get logs (requires auth)

### Utility
- `GET /` - API info and endpoints
- `GET /health` - Health check
- `GET /api-docs` - Swagger documentation UI
- `GET /api-docs.json` - Swagger JSON schema

## Database Schema

### Users Table
- `id` - Unique identifier
- `email` - User email (unique)
- `username` - Username (unique)
- `password` - Hashed password
- `firstName` - First name
- `lastName` - Last name
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Links Table
- `id` - Unique identifier
- `shortCode` - Short URL code (unique)
- `originalUrl` - Full original URL
- `clicks` - Click count
- `userId` - Reference to user
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Logs Table
- `id` - Unique identifier
- `action` - Log action type
- `details` - Additional details
- `ipAddress` - User IP address
- `userAgent` - Browser user agent
- `userId` - Reference to user (optional)
- `linkId` - Reference to link (optional)
- `createdAt` - Creation timestamp

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

Tokens are returned after successful login/registration and expire after 24 hours by default.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | `24h` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |
| `SESSION_SECRET` | Session encryption secret | Generated |

## API Documentation

Access the interactive API documentation at:
```
http://localhost:3001/api-docs
```

All endpoints are documented with request/response examples and required parameters.

## Security Features

- **Helmet.js** - Sets security HTTP headers
- **CORS** - Cross-origin resource sharing with whitelisted origins
- **Rate Limiting** - Prevents abuse with IP-based rate limiting
- **JWT Auth** - Secure token-based authentication
- **Session Management** - HTTP-only cookies for session security
- **Input Validation** - Request body validation
- **Error Handling** - Secure error messages without stack traces in production

## Development Notes

### Password Hashing
Currently, passwords are stored in plain text for development. **In production**, use `bcryptjs`:

```bash
npm install bcryptjs
```

Then update `authController.js`:
```javascript
import bcrypt from 'bcryptjs';

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Compare during login
const isValid = await bcrypt.compare(password, user.password);
```

### Prisma Studio
View and manage your database GUI:
```bash
npm run prisma:studio
```

### Database Migrations
Create new migration:
```bash
npm run prisma:migrate
```

## Troubleshooting

**Database connection failed:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists and credentials are correct

**Port already in use:**
- Change PORT in .env
- Or kill process: `lsof -ti:3001 | xargs kill -9` (Linux/Mac)

**JWT errors:**
- Ensure JWT_SECRET is set in .env
- Check token format in Authorization header
- Verify token hasn't expired

## API Examples

### Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Link (requires token)
```bash
curl -X POST http://localhost:3001/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "abc123"
  }'
```

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit pull request

## License

MIT

## Support

For issues or questions, contact: support@kynix.co.in

## Frontend Integration

Connect this backend to your Kynix frontend (React):

```javascript
const API_URL = 'http://localhost:3001';

// Login example
const response = await fetch(`${API_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { token } = await response.json();
localStorage.setItem('token', token);

// Use token for authenticated requests
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};
```

## Deployment

### Vercel/Railway/Render
1. Connect repository
2. Set environment variables
3. Database: Connect PostgreSQL instance
4. Deploy

### Self-hosted
```bash
npm run build  # If applicable
npm start
```

Use process manager like PM2:
```bash
pm2 start src/server.js --name "kynix-api"
pm2 save
pm2 startup
```

---

**Built with ❤️ for Kynix**
