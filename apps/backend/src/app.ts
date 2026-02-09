import express from "express";
import cors from "cors";
import { feedbackRoutes } from "./routes/feedbackRoutes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// IMPORTANTE: rotas do feedback
app.use(feedbackRoutes);
