import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import healthRoutes from './routes/healthRoute.js';
import swaggerSpec from './swagger/swagger.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the real time chat app');
});

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// health check route
app.use('/api', healthRoutes);

// other express routes
// app.use('/api', routeFileName);

httpServer.listen(port, (err) => {
  console.log(`Server running on port: ${port}`);
});
