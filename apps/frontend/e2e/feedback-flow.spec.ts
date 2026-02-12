import { test, expect, request } from "@playwright/test";

const API_URL = process.env.E2E_API_URL || "http://localhost:3001";

test("fluxo completo: criar -> filtrar -> mudar status -> deletar", async ({ page }) => {
  // Abre a aplicação
  await page.goto("/");
  await expect(page.getByTestId("page-title")).toHaveText("Feedback Board");

  // Cria um feedback único (pra não conflitar)
  const unique = `e2e-${Date.now()}`;
  const title = `Bug ${unique}`;
  const message = `Mensagem ${unique}`;

  await page.getByTestId("create-title").fill(title);
  await page.getByTestId("create-message").fill(message);
  await page.getByTestId("create-type").selectOption("bug");
  await page.getByTestId("create-submit").click();

  // Filtra por texto para achar o item recém-criado
  await page.getByTestId("filter-q").fill(unique);

  // O item deve aparecer na lista
  await expect(page.getByTestId("feedback-list")).toContainText(title);

  // Descobrir o ID via API (para clicar em botões do card com testid baseado no id)
  const api = await request.newContext({ baseURL: API_URL });
  const list = await api.get(`/feedbacks?q=${encodeURIComponent(unique)}`);
  expect(list.ok()).toBeTruthy();
  const json = await list.json();
  expect(json.items.length).toBeGreaterThan(0);

  const id = json.items[0].id as string;

  // Mudar status para done pela UI
  await page.getByTestId(`status-done-${id}`).click();

  // Validar que o card mostra done
  await expect(page.getByTestId(`card-${id}`)).toContainText("done");

  // Deletar pela UI
  // (confirmação via confirm dialog)
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByTestId(`delete-${id}`).click();

  // Confirmar que sumiu da lista
  await expect(page.getByTestId("feedback-list")).not.toContainText(title);

  // Confirma no backend que não existe mais
  const check = await api.get(`/feedbacks/${id}`);
  expect(check.status()).toBe(404);
});
