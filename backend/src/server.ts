import express from "express";
import feedRouter from "./routes/feedRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/feed", feedRouter);

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
