import type { Config, Context } from "@netlify/functions";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articles } from "../../db/schema.js";
import { readJson, clip } from "./_lib/auth.js";

// Public: POST /api/articles/:id/comments
export default async (req: Request, context: Context) => {
  const body = await readJson(req);
  const content = clip(body?.content, 2000);
  if (!content) return Response.json({ error: "Komentar tidak boleh kosong." }, { status: 400 });

  const comment = {
    id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    author: clip(body?.author, 80) || "Pembaca Arun News",
    avatar: clip(body?.avatar, 500),
    timeAgo: "Baru saja",
    content,
    likes: 0,
  };

  // Prepend atomically so concurrent comments are never lost.
  const [updated] = await db
    .update(articles)
    .set({
      data: sql`jsonb_set(${articles.data}, '{comments}', jsonb_build_array(${JSON.stringify(comment)}::jsonb) || coalesce(${articles.data}->'comments', '[]'::jsonb))`,
    })
    .where(eq(articles.id, context.params.id))
    .returning({ id: articles.id });

  if (!updated) return Response.json({ error: "Berita tidak ditemukan." }, { status: 404 });
  return Response.json(comment, { status: 201 });
};

export const config: Config = {
  path: "/api/articles/:id/comments",
  method: "POST",
};
