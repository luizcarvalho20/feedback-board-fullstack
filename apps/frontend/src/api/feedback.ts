import { http } from "./http";

export type FeedbackType = "bug" | "idea" | "other";
export type FeedbackStatus = "open" | "planned" | "done";

export type Feedback = {
  id: string;
  title: string;
  message: string;
  type: FeedbackType;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
};

export type ListResponse = {
  items: Feedback[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

export type ListParams = {
  type?: FeedbackType | "";
  status?: FeedbackStatus | "";
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: "createdAt" | "updatedAt";
  order?: "asc" | "desc";
};

export function listFeedbacks(params: ListParams = {}) {
  const sp = new URLSearchParams();

  if (params.type) sp.set("type", params.type);
  if (params.status) sp.set("status", params.status);
  if (params.q) sp.set("q", params.q);

  sp.set("page", String(params.page ?? 1));
  sp.set("pageSize", String(params.pageSize ?? 10));
  sp.set("sort", params.sort ?? "createdAt");
  sp.set("order", params.order ?? "desc");

  return http<ListResponse>(`/feedbacks?${sp.toString()}`);
}

export function createFeedback(data: { title: string; message: string; type: FeedbackType }) {
  return http<Feedback>("/feedbacks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateFeedback(
  id: string,
  data: Partial<Pick<Feedback, "title" | "message" | "type" | "status">>
) {
  return http<Feedback>(`/feedbacks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteFeedback(id: string) {
  return http<void>(`/feedbacks/${id}`, {
    method: "DELETE",
  });
}
