import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kynix Backend API',
      version: '1.0.0',
      description: 'API documentation for Kynix backend services',
      contact: {
        name: 'Kynix Support',
        email: 'support@kynix.co.in'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      },
      {
        url: 'https://api.kynix.co.in',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
