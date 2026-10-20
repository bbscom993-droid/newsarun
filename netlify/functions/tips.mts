import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { coffeeTips } from "../../db/schema.js";
import { readJson, clip } from "./_lib/auth.js";

// Public: POST /api/tips (Sawer Kopi)
export default async (req: Request) => {
  const body = await readJson(req);
  const amount = Math.round(Number(body?.amount));
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100_000_000) {
    return Response.json({ error: "Nominal sawer tidak valid." }, { status: 400 });
  }

  const tip = {
    id: `tip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    supporterName: clip(body?.supporterName, 80) || "Hamba Allah",
    amount,
    message: clip(body?.message, 500),
    timestamp: clip(body?.timestamp, 60) || "Baru saja",
    paymentMethod: clip(body?.paymentMethod, 50),
  };
  await db.insert(coffeeTips).values({ id: tip.id, data: tip });
  return Response.json(tip, { status: 201 });
};

export const config: Config = {
  path: "/api/tips",
  method: "POST",
};
