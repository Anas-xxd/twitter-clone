import express from "express";
import feedRouter from "./routes/feedRouter";
import {
  testDatabaseConnection,
  closeDatabaseConnection,
} from "./database/database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/feed", feedRouter);

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

async function startServer() {
  try {
    await testDatabaseConnection();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    let isShuttingDown = false;

    async function shutdown() {
      if (isShuttingDown) return;
      isShuttingDown = true;

      console.log("Shutting down server...");

      server.close(async (error) => {
        if (error) {
          console.error("Error closing server:", error);
          process.exitCode = 1;
        }

        try {
          await closeDatabaseConnection();
          console.log("Server shutdown complete.");
        } catch (error) {
          console.error("Error closing database:", error);
          process.exitCode = 1;
        }
      });
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
