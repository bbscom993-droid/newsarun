import type { Config, Context } from "@netlify/functions";
import { eq, min } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articles } from "../../db/schema.js";
import { requireAdmin, readJson } from "./_lib/auth.js";

// Admin-only article management: POST /api/articles, PUT|DELETE /api/articles/:id
export default async (req: Request, context: Context) => {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = context.params.id;

  if (req.method === "POST" && !id) {
    const article = await readJson(req);
    if (!article?.id || !article?.title) return Response.json({ error: "Data berita tidak valid." }, { status: 400 });
    // New articles go to the top of the list.
    const [{ top }] = await db.select({ top: min(articles.position) }).from(articles);
    const [row] = await db
      .insert(articles)
      .values({ id: String(article.id), data: article, position: (top ?? 0) - 1 })
      .returning();
    return Response.json(row.data, { status: 201 });
  }

  if (req.method === "PUT" && id) {
    const article = await readJson(req);
    if (!article?.title) return Response.json({ error: "Data berita tidak valid." }, { status: 400 });
    const [row] = await db
      .update(articles)
      .set({ data: { ...article, id } })
      .where(eq(articles.id, id))
      .returning();
    if (!row) return Response.json({ error: "Berita tidak ditemukan." }, { status: 404 });
    return Response.json(row.data);
  }

  if (req.method === "DELETE" && id) {
    await db.delete(articles).where(eq(articles.id, id));
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/articles", "/api/articles/:id"],
  method: ["POST", "PUT", "DELETE"],
};
