import { prisma } from "../src/config/prisma";

export async function resetDb() {
  await prisma.feedback.deleteMany({});
}
