import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat App API',
      version: '1.0.0',
      description: 'A simple real-time chat app API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`, // Adjust port if needed
      },
    ],
  },
  apis: ['./app/routes/*.js'], // Files containing Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
