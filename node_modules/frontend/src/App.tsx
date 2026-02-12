import { useEffect, useMemo, useState } from "react";
import {
  createFeedback,
  deleteFeedback,
  listFeedbacks,
  updateFeedback,
  type FeedbackType,
  type FeedbackStatus,
  type Feedback,
} from "./api/feedback";
import { FeedbackCard } from "./components/FeedbackCard";

export default function App() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // filtros
  const [q, setQ] = useState("");
  const [type, setType] = useState<FeedbackType | "">("");
  const [status, setStatus] = useState<FeedbackStatus | "">("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // form criar
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [newType, setNewType] = useState<FeedbackType>("bug");

  const query = useMemo(() => ({ q, type, status, page, pageSize }), [q, type, status, page]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await listFeedbacks(query);
      setItems(res.items);
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.q, query.type, query.status, query.page]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await createFeedback({ title, message, type: newType });
      setTitle("");
      setMessage("");
      setNewType("bug");
      setPage(1);
      await load();
    } catch (e: any) {
      setError(e?.message || "Erro ao criar");
    }
  }

  async function handleChangeStatus(id: string, status: FeedbackStatus) {
    setBusyId(id);
    setError(null);
    try {
      await updateFeedback(id, { status });
      await load();
    } catch (e: any) {
      setError(e?.message || "Erro ao atualizar status");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    setError(null);
    try {
      await deleteFeedback(id);
      await load();
    } catch (e: any) {
      setError(e?.message || "Erro ao excluir");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 data-testid="page-title">Feedback Board</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Criar feedback</h2>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
          <input
            data-testid="create-title"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            data-testid="create-message"
            placeholder="Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />

          <select
            data-testid="create-type"
            value={newType}
            onChange={(e) => setNewType(e.target.value as FeedbackType)}
          >
            <option value="bug">bug</option>
            <option value="idea">idea</option>
            <option value="other">other</option>
          </select>

          <button data-testid="create-submit" type="submit" disabled={!title || !message}>
            Enviar
          </button>
        </form>
      </section>

      <section style={{ marginBottom: 12 }}>
        <h2>Filtros</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            data-testid="filter-q"
            placeholder="Buscar (q)"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />

          <select
            data-testid="filter-type"
            value={type}
            onChange={(e) => {
              setType(e.target.value as any);
              setPage(1);
            }}
          >
            <option value="">type (todos)</option>
            <option value="bug">bug</option>
            <option value="idea">idea</option>
            <option value="other">other</option>
          </select>

          <select
            data-testid="filter-status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as any);
              setPage(1);
            }}
          >
            <option value="">status (todos)</option>
            <option value="open">open</option>
            <option value="planned">planned</option>
            <option value="done">done</option>
          </select>

          <button
            data-testid="filters-clear"
            onClick={() => {
              setQ("");
              setType("");
              setStatus("");
              setPage(1);
            }}
          >
            Limpar
          </button>

          <button data-testid="filters-reload" onClick={load}>
            Recarregar
          </button>
        </div>
      </section>

      {error && (
        <div data-testid="error-box" style={{ marginTop: 12, padding: 12, border: "1px solid #ccc" }}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      <section style={{ marginTop: 16 }}>
        <h2>Lista</h2>

        {loading ? (
          <p data-testid="loading">Carregando...</p>
        ) : (
          <div data-testid="feedback-list" style={{ display: "grid", gap: 10 }}>
            {items.map((f) => (
              <FeedbackCard
                key={f.id}
                item={f}
                busy={busyId === f.id}
                onChangeStatus={handleChangeStatus}
                onDelete={handleDelete}
              />
            ))}

            {items.length === 0 && <p data-testid="empty-state">Nenhum feedback encontrado.</p>}
          </div>
        )}

        <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
          <button data-testid="pagination-prev" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Anterior
          </button>

          <span data-testid="pagination-page">Página {page}</span>

          <button
            data-testid="pagination-next"
            disabled={items.length < pageSize}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      </section>
    </div>
  );
}
