# Kynix Project

Complete full-stack web development platform with React frontend and Node.js/Express backend.

## Project Structure

```
Kynix/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── routes/            # Route configuration
│   └── assets/            # Images, logos, SVGs
├── backend/               # Backend API (Node.js + Express)
│   ├── src/              # Backend source
│   ├── prisma/           # Database schema
│   └── package.json
├── index.html            # Frontend entry point
├── package.json          # Frontend dependencies
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## Frontend Setup

Navigate to project root and start frontend:

```bash
# Install dependencies
npm install

# Start development server (Vite)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

Frontend runs at: http://localhost:5173

## Backend Setup

Navigate to backend directory:

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database URL and configuration

# Run Prisma migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Backend runs at: http://localhost:3001

API Documentation: http://localhost:3001/api-docs

## Quick Start (Full Stack)

**Terminal 1 - Frontend:**
```bash
npm install
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run prisma:migrate
npm run dev
```

Then open:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

## Technologies

### Frontend
- React 18
- TypeScript
- Vite
- React Router v7
- Emotion (CSS-in-JS)
- Material-UI (MUI)

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger/OpenAPI

## Features

### Frontend
- ✅ Responsive design
- ✅ Modern UI components
- ✅ Client-side routing
- ✅ SVG logo with animations
- ✅ SEO optimized

### Backend
- ✅ RESTful API
- ✅ User authentication
- ✅ Link management
- ✅ Activity logging
- ✅ API documentation
- ✅ Rate limiting
- ✅ Security headers

## Environment Variables

### Frontend (.env at project root)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (.env in backend/)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/kynix_db
JWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/links` - Create link
- `GET /api/links` - Get user links
- `DELETE /api/links/:id` - Delete link
- `GET /api/logs` - Get activity logs
- `GET /api-docs` - API documentation

## Database Setup

1. Install PostgreSQL locally or use remote service
2. Create database: `kynix_db`
3. Update DATABASE_URL in backend/.env
4. Run migrations: `cd backend && npm run prisma:migrate`

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
cd backend
npm install
npm run prisma:migrate
npm start
```

## Support

For issues or questions:
- Email: support@kynix.co.in
- GitHub: https://github.com/AsheeshMohammad/Kynix

---

**Built with ❤️ for modern web development**
