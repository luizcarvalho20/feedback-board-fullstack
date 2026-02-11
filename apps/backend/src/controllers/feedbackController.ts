import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { createFeedbackSchema, updateFeedbackSchema } from "../validators/feedbackSchemas";

function getParamId(req: Request): string | null {
  const raw = (req.params as any).id as unknown;

  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];

  return null;
}

export async function createFeedback(req: Request, res: Response) {
  const parsed = createFeedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation error", details: parsed.error.flatten() });
  }

  const feedback = await prisma.feedback.create({ data: parsed.data });
  return res.status(201).json(feedback);
}

/**
 * GET /feedbacks
 * Filtros:
 * - type=bug|idea|other
 * - status=open|planned|done
 * - q=texto (busca em title/message)
 * - sort=createdAt|updatedAt (default createdAt)
 * - order=asc|desc (default desc)
 * - page=1..n (default 1)
 * - pageSize=1..50 (default 10)
 */
export async function listFeedbacks(req: Request, res: Response) {
  const {
    type,
    status,
    q,
    sort = "createdAt",
    order = "desc",
    page = "1",
    pageSize = "10",
  } = req.query as Record<string, string>;

  const pageNum = Math.max(1, Number(page) || 1);
  const pageSizeNum = Math.min(50, Math.max(1, Number(pageSize) || 10));
  const skip = (pageNum - 1) * pageSizeNum;

  const where: any = {};
  if (type) where.type = type;
  if (status) where.status = status;

  if (q && q.trim()) {
    where.OR = [
      { title: { contains: q.trim() } },
      { message: { contains: q.trim() } },
    ];
  }

  const sortField = sort === "updatedAt" || sort === "createdAt" ? sort : "createdAt";
  const sortOrder = order === "asc" || order === "desc" ? order : "desc";

  const [items, total] = await Promise.all([
    prisma.feedback.findMany({
      where,
      orderBy: { [sortField]: sortOrder },
      skip,
      take: pageSizeNum,
    }),
    prisma.feedback.count({ where }),
  ]);

  return res.json({
    items,
    meta: {
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum),
    },
  });
}

export async function getFeedbackById(req: Request, res: Response) {
  const id = getParamId(req);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const item = await prisma.feedback.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Feedback not found" });

  return res.json(item);
}

export async function updateFeedback(req: Request, res: Response) {
  const id = getParamId(req);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const parsed = updateFeedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation error", details: parsed.error.flatten() });
  }

  try {
    const updated = await prisma.feedback.update({
      where: { id },
      data: parsed.data,
    });
    return res.json(updated);
  } catch {
    return res.status(404).json({ error: "Feedback not found" });
  }
}

export async function deleteFeedback(req: Request, res: Response) {
  const id = getParamId(req);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  try {
    await prisma.feedback.delete({ where: { id } });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: "Feedback not found" });
  }
}
