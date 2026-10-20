import type { Config, Context } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { settings } from "../../db/schema.js";
import { requireAdmin, readJson } from "./_lib/auth.js";

const EDITABLE_KEYS = new Set(["logo", "lapor_config"]);

// Admin-only: PUT /api/settings/:key with body { value }
export default async (req: Request, context: Context) => {
  const denied = await requireAdmin();
  if (denied) return denied;

  const key = context.params.key;
  if (!EDITABLE_KEYS.has(key)) return Response.json({ error: "Pengaturan tidak dikenal." }, { status: 404 });

  const body = await readJson<{ value: unknown }>(req);
  const value = body?.value ?? null;

  if (value === null) {
    await db.delete(settings).where(eq(settings.key, key));
  } else {
    await db
      .insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: new Date() } });
  }
  return Response.json({ key, value });
};

export const config: Config = {
  path: "/api/settings/:key",
  method: "PUT",
};
