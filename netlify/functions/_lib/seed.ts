import { sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { articles, adSlots, citizenReports, coffeeTips, settings } from "../../../db/schema.js";
import {
  INITIAL_ARTICLES,
  INITIAL_AD_SLOTS,
  INITIAL_CITIZEN_REPORTS,
  INITIAL_COFFEE_TIPS,
} from "../../../src/data/newsData.js";

const SEED_KEY = "seeded_v1";

/** Fills a fresh database with the portal's starter content exactly once. */
export async function ensureSeeded() {
  const [row] = await db.select().from(settings).where(sql`${settings.key} = ${SEED_KEY}`);
  if (row) return;

  // Claim the seed marker first so concurrent cold starts don't seed twice.
  const claimed = await db
    .insert(settings)
    .values({ key: SEED_KEY, value: true })
    .onConflictDoNothing()
    .returning();
  if (claimed.length === 0) return;

  const now = Date.now();
  await db
    .insert(articles)
    .values(INITIAL_ARTICLES.map((a, i) => ({ id: a.id, data: a, position: -i, createdAt: new Date(now - i * 1000) })))
    .onConflictDoNothing();
  await db
    .insert(adSlots)
    .values(INITIAL_AD_SLOTS.map((s, i) => ({ id: s.id, data: s, position: i })))
    .onConflictDoNothing();
  await db
    .insert(citizenReports)
    .values(INITIAL_CITIZEN_REPORTS.map((r, i) => ({ id: r.id, data: r, createdAt: new Date(now - i * 1000) })))
    .onConflictDoNothing();
  await db
    .insert(coffeeTips)
    .values(INITIAL_COFFEE_TIPS.map((t, i) => ({ id: t.id, data: t, createdAt: new Date(now - i * 1000) })))
    .onConflictDoNothing();
}
