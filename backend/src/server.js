import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import mailRoutes from './routes/mail.js';

dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;



  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disable for Swagger UI
  }));

  // Cookie parser
  app.use(cookieParser());

  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.'
    }
  });
  app.use(limiter);

  // CORS configuration
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Handle text/plain content type for JSON
  app.use((req, res, next) => {
    if (req.headers['content-type'] === 'text/plain' && req.body && typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
        req.headers['content-type'] = 'application/json';
      } catch (e) {
        // If parsing fails, continue with original body
      }
    }
    next();
  });

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Kynix API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true
    }
  }));

  // Swagger JSON endpoint
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // API routes
  app.use('/api/mail', mailRoutes);

  // Root endpoint
  app.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Kynix Backend API',
      version: '1.0.0',
      endpoints: {
        mail: '/api/mail',
        health: '/health',
        documentation: '/api-docs'
      }
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });

  // Global error handler
  app.use((error, req, res, next) => {
    console.error('Global error handler:', error);

    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
    console.log(`📝 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`📄 Swagger JSON: http://localhost:${PORT}/api-docs.json`);
  });

  return app;
};

// Start the server
startServer().catch(console.error);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
