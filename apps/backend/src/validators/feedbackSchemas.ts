import { z } from "zod";

export const feedbackTypeEnum = z.enum(["bug", "idea", "other"]);
export const feedbackStatusEnum = z.enum(["open", "planned", "done"]);

export const createFeedbackSchema = z.object({
  title: z.string().min(3).max(80),
  message: z.string().min(3).max(1000),
  type: feedbackTypeEnum
});

export const updateFeedbackSchema = z.object({
  title: z.string().min(3).max(80).optional(),
  message: z.string().min(3).max(1000).optional(),
  type: feedbackTypeEnum.optional(),
  status: feedbackStatusEnum.optional()
});
