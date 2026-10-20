import type { Config, Context } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { citizenReports, settings } from "../../db/schema.js";
import { requireAdmin, readJson, clip } from "./_lib/auth.js";
import { ensureSeeded } from "./_lib/seed.js";

// POST /api/reports is public (Lapor Warga form). Listing, updating and deleting are admin-only
// because reports contain the reporter's contact details.
export default async (req: Request, context: Context) => {
  const id = context.params.id;

  if (req.method === "POST" && !id) {
    const body = await readJson(req);
    const title = clip(body?.title, 200);
    const description = clip(body?.description, 5000);
    if (!title || !description) return Response.json({ error: "Judul dan kronologi wajib diisi." }, { status: 400 });

    const [cfgRow] = await db.select().from(settings).where(eq(settings.key, "lapor_config"));
    const autoApprove = Boolean((cfgRow?.value as { autoApprove?: boolean } | undefined)?.autoApprove);

    const report = {
      id: `rep-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      reporterName: clip(body?.reporterName, 100) || "Anonim",
      reporterContact: clip(body?.reporterContact, 150),
      location: clip(body?.location, 200),
      title,
      description,
      category: clip(body?.category, 50) || "Lapor Warga",
      timestamp: clip(body?.timestamp, 60),
      status: autoApprove ? "published" : "pending",
      ...(body?.photoUrl ? { photoUrl: clip(body.photoUrl, 3_000_000) } : {}),
    };
    await db.insert(citizenReports).values({ id: report.id, data: report });
    return Response.json(report, { status: 201 });
  }

  const denied = await requireAdmin();
  if (denied) return denied;

  if (req.method === "GET") {
    await ensureSeeded();
    const rows = await db.select().from(citizenReports).orderBy(desc(citizenReports.createdAt));
    return Response.json(rows.map((r) => r.data), { headers: { "Cache-Control": "no-store" } });
  }

  if (req.method === "PUT" && id) {
    const report = await readJson(req);
    if (!report) return Response.json({ error: "Data laporan tidak valid." }, { status: 400 });
    const [row] = await db
      .update(citizenReports)
      .set({ data: { ...report, id } })
      .where(eq(citizenReports.id, id))
      .returning();
    if (!row) return Response.json({ error: "Laporan tidak ditemukan." }, { status: 404 });
    return Response.json(row.data);
  }

  if (req.method === "DELETE" && id) {
    await db.delete(citizenReports).where(eq(citizenReports.id, id));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/reports", "/api/reports/:id"],
  method: ["GET", "POST", "PUT", "DELETE"],
};
