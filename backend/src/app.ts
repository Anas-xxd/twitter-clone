import express from "express";
import feedRouter from "./routes/feedRouter";
import { pool } from "./database/database";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.get("/api/ready", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "healthy",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
    });
  }
});

app.use("/api/feed", feedRouter);

app.use(errorHandler);

export default app;
