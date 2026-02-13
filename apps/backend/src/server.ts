import { app } from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend rodando em http://0.0.0.0:${PORT}`);
});
