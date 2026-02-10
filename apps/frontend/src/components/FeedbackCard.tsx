import type { Feedback, FeedbackStatus } from "../api/feedback";

type Props = {
  item: Feedback;
  onChangeStatus: (id: string, status: FeedbackStatus) => void;
  onDelete: (id: string) => void;
  busy?: boolean;
};

export function FeedbackCard({ item, onChangeStatus, onDelete, busy }: Props) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <strong>{item.title}</strong>
        <span>
          {item.type} • {item.status}
        </span>
      </div>

      <p style={{ marginTop: 8 }}>{item.message}</p>
      <small>{new Date(item.createdAt).toLocaleString()}</small>

      <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          disabled={busy || item.status === "open"}
          onClick={() => onChangeStatus(item.id, "open")}
        >
          Marcar open
        </button>

        <button
          disabled={busy || item.status === "planned"}
          onClick={() => onChangeStatus(item.id, "planned")}
        >
          Marcar planned
        </button>

        <button
          disabled={busy || item.status === "done"}
          onClick={() => onChangeStatus(item.id, "done")}
        >
          Marcar done
        </button>

        <button
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
