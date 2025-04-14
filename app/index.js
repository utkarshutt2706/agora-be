import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import healthRoutes from "./routes/healthRoute.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the real time chat app");
});

app.use("/api", healthRoutes);

httpServer.listen(port, (err) => {
  console.log(`Server running on port: ${port}`);
});
