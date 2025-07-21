import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { createMongoConnection } from './db/mongo.js';
import chatRoutes from './routes/chatRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import userRoutes from './routes/userRoutes.js';
import initSocketServer from './socket/socketServer.js';
import swaggerSpec from './swagger/swagger.js';
import jwt from './utility/jwt.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);

await createMongoConnection();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
    res.redirect('/api-docs');
});

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// health check route
app.use('/api', healthRoutes);

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(jwt());
app.use((error, _, res, next) => {
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({ error: '401 Unauthorized' });
    }
    next(error);
});

// other express routes
app.use('/api', chatRoutes);
app.use('/api', roomRoutes);
app.use('/api', userRoutes);

const server = httpServer.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

initSocketServer(server);

module.exports = app;
