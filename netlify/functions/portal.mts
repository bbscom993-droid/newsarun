import type { Config } from "@netlify/functions";
import { asc, desc, inArray } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articles, adSlots, coffeeTips, settings } from "../../db/schema.js";
import { ensureSeeded } from "./_lib/seed.js";

// Public snapshot of everything the portal homepage needs.
export default async () => {
  await ensureSeeded();

  const [articleRows, adRows, tipRows, settingRows] = await Promise.all([
    db.select().from(articles).orderBy(asc(articles.position), desc(articles.createdAt)),
    db.select().from(adSlots).orderBy(asc(adSlots.position)),
    db.select().from(coffeeTips).orderBy(desc(coffeeTips.createdAt)).limit(200),
    db.select().from(settings).where(inArray(settings.key, ["logo", "lapor_config"])),
  ]);
  const settingMap = Object.fromEntries(settingRows.map((s) => [s.key, s.value]));

  return Response.json(
    {
      articles: articleRows.map((r) => r.data),
      adSlots: adRows.map((r) => r.data),
      coffeeTips: tipRows.map((r) => r.data),
      customLogoUrl: settingMap.logo ?? null,
      laporConfig: settingMap.lapor_config ?? null,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
};

export const config: Config = {
  path: "/api/portal",
  method: "GET",
};
