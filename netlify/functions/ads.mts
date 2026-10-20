import type { Config, Context } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { adSlots } from "../../db/schema.js";
import { requireAdmin, readJson, clip } from "./_lib/auth.js";

type Slot = { id: string; currentSponsor?: unknown };

// PUT /api/ads/:id (admin) replaces a slot; POST /api/ads/:id/subscribe (public) books an empty slot.
export default async (req: Request, context: Context) => {
  const id = context.params.id;
  const [row] = await db.select().from(adSlots).where(eq(adSlots.id, id));
  if (!row) return Response.json({ error: "Slot iklan tidak ditemukan." }, { status: 404 });
  const slot = row.data as Slot;

  if (req.method === "PUT") {
    const denied = await requireAdmin();
    if (denied) return denied;
    const body = await readJson(req);
    if (!body) return Response.json({ error: "Data slot tidak valid." }, { status: 400 });
    const [updated] = await db.update(adSlots).set({ data: { ...body, id } }).where(eq(adSlots.id, id)).returning();
    return Response.json(updated.data);
  }

  if (req.method === "POST" && new URL(req.url).pathname.endsWith("/subscribe")) {
    if (slot.currentSponsor) {
      return Response.json({ error: "Slot ini sedang dipakai sponsor lain." }, { status: 409 });
    }
    const body = await readJson(req);
    const brandName = clip(body?.brandName, 100);
    const bannerUrl = clip(body?.bannerUrl, 3_000_000);
    const targetUrl = clip(body?.targetUrl, 500);
    const durationDays = Math.min(Math.max(Math.round(Number(body?.durationDays) || 7), 1), 365);
    if (!brandName || !bannerUrl) return Response.json({ error: "Nama brand dan banner wajib diisi." }, { status: 400 });
    if (targetUrl && !/^https?:\/\//i.test(targetUrl)) {
      return Response.json({ error: "Link tujuan harus diawali http:// atau https://" }, { status: 400 });
    }

    const expired = new Date();
    expired.setDate(expired.getDate() + durationDays);
    const next = {
      ...slot,
      currentSponsor: {
        brandName,
        bannerUrl,
        targetUrl,
        expiredAt: expired.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      },
    };
    const [updated] = await db.update(adSlots).set({ data: next }).where(eq(adSlots.id, id)).returning();
    return Response.json(updated.data);
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/ads/:id", "/api/ads/:id/subscribe"],
  method: ["PUT", "POST"],
};
