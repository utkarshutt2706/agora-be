import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { createMongoConnection } from './db/mongo.js';
import chatRoutes from './routes/chatRoute.js';
import healthRoutes from './routes/healthRoute.js';
import initSocketServer from './socket/socketServer.js';
import swaggerSpec from './swagger/swagger.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);

await createMongoConnection();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// health check route
app.use('/api', healthRoutes);

// other express routes
app.use('/api', chatRoutes);

const server = httpServer.listen(port, (err) => {
  console.log(`Server running on port: ${port}`);
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/public', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

initSocketServer(server);
