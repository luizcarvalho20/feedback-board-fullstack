import { Router } from "express";
import {
  createFeedback,
  listFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} from "../controllers/feedbackController";

export const feedbackRoutes = Router();

feedbackRoutes.post("/feedbacks", createFeedback);
feedbackRoutes.get("/feedbacks", listFeedbacks);
feedbackRoutes.get("/feedbacks/:id", getFeedbackById);
feedbackRoutes.patch("/feedbacks/:id", updateFeedback);
feedbackRoutes.delete("/feedbacks/:id", deleteFeedback);
