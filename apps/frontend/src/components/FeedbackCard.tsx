import type { Feedback, FeedbackStatus } from "../api/feedback";

type Props = {
  item: Feedback;
  onChangeStatus: (id: string, status: FeedbackStatus) => void;
  onDelete: (id: string) => void;
  busy?: boolean;
};

export function FeedbackCard({ item, onChangeStatus, onDelete, busy }: Props) {
  return (
    <div
      data-testid={`card-${item.id}`}
      style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <strong data-testid={`title-${item.id}`}>{item.title}</strong>
        <span data-testid={`meta-${item.id}`}>
          {item.type} • {item.status}
        </span>
      </div>

      <p data-testid={`message-${item.id}`} style={{ marginTop: 8 }}>
        {item.message}
      </p>

      <small data-testid={`createdAt-${item.id}`}>{new Date(item.createdAt).toLocaleString()}</small>

      <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          data-testid={`status-open-${item.id}`}
          disabled={busy || item.status === "open"}
          onClick={() => onChangeStatus(item.id, "open")}
        >
          Marcar open
        </button>

        <button
          data-testid={`status-planned-${item.id}`}
          disabled={busy || item.status === "planned"}
          onClick={() => onChangeStatus(item.id, "planned")}
        >
          Marcar planned
        </button>

        <button
          data-testid={`status-done-${item.id}`}
          disabled={busy || item.status === "done"}
          onClick={() => onChangeStatus(item.id, "done")}
        >
          Marcar done
        </button>

        <button
          data-testid={`delete-${item.id}`}
          disabled={busy}
          onClick={() => {
            const ok = confirm("Tem certeza que deseja excluir este feedback?");
            if (ok) onDelete(item.id);
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
