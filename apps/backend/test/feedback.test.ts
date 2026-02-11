import request from "supertest";
import { app } from "../src/app";
import { prisma } from "../src/config/prisma";
import { resetDb } from "./setup";

beforeAll(async () => {
  process.env.NODE_ENV = "test";
});

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Feedbacks API", () => {
  test("POST /feedbacks cria feedback", async () => {
    const res = await request(app)
      .post("/feedbacks")
      .send({ title: "Bug no login", message: "Erro 500 ao entrar", type: "bug" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.status).toBe("open");
    expect(res.body.type).toBe("bug");
  });

  test("GET /feedbacks lista com meta", async () => {
    await prisma.feedback.create({
      data: { title: "Ideia", message: "Dark mode", type: "idea", status: "open" },
    });

    const res = await request(app).get("/feedbacks");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("items");
    expect(res.body).toHaveProperty("meta");
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  test("GET /feedbacks filtra por type e q", async () => {
    await prisma.feedback.createMany({
      data: [
        { title: "Bug no login", message: "Erro 500", type: "bug", status: "open" },
        { title: "Ideia: modo escuro", message: "dark mode", type: "idea", status: "open" },
      ],
    });

    const res1 = await request(app).get("/feedbacks?type=bug");
    expect(res1.status).toBe(200);
    expect(res1.body.items.length).toBe(1);
    expect(res1.body.items[0].type).toBe("bug");

    const res2 = await request(app).get("/feedbacks?q=dark");
    expect(res2.status).toBe(200);
    expect(res2.body.items.length).toBe(1);
    expect(res2.body.items[0].type).toBe("idea");
  });

  test("PATCH /feedbacks/:id atualiza status", async () => {
    const created = await prisma.feedback.create({
      data: { title: "Teste", message: "Mensagem", type: "other", status: "open" },
    });

    const res = await request(app)
      .patch(`/feedbacks/${created.id}`)
      .send({ status: "done" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("done");
  });

  test("DELETE /feedbacks/:id remove", async () => {
    const created = await prisma.feedback.create({
      data: { title: "Apagar", message: "x", type: "bug", status: "open" },
    });

    const res = await request(app).delete(`/feedbacks/${created.id}`);
    expect(res.status).toBe(204);

    const check = await prisma.feedback.findUnique({ where: { id: created.id } });
    expect(check).toBeNull();
  });
});
