import swaggerJSDoc from 'swagger-jsdoc';

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
                url:
                    process.env.BE_BASE_URL ||
                    `http://localhost:${process.env.PORT || 3000}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional: for documentation only
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./app/routes/*.js'], // Files containing Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
