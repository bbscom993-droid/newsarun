import type { Article, AdSlot, CitizenReport, CoffeeTip, CommentItem, LaporWargaConfig } from '../data/newsData';

export interface PortalSnapshot {
  articles: Article[];
  adSlots: AdSlot[];
  coffeeTips: CoffeeTip[];
  customLogoUrl: string | null;
  laporConfig: LaporWargaConfig | null;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    let message = `Permintaan gagal (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // keep default message
    }
    throw new Error(message);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

export const api = {
  getPortal: () => request<PortalSnapshot>('GET', '/api/portal'),

  addComment: (articleId: string, comment: CommentItem) =>
    request<CommentItem>('POST', `/api/articles/${encodeURIComponent(articleId)}/comments`, comment),
  addTip: (tip: CoffeeTip) => request<CoffeeTip>('POST', '/api/tips', tip),
  addReport: (report: CitizenReport) => request<CitizenReport>('POST', '/api/reports', report),
  subscribeAdSlot: (
    slotId: string,
    data: { brandName: string; bannerUrl: string; targetUrl: string; durationDays: number }
  ) => request<AdSlot>('POST', `/api/ads/${encodeURIComponent(slotId)}/subscribe`, data),

  // Admin-only
  createArticle: (article: Article) => request<Article>('POST', '/api/articles', article),
  updateArticle: (article: Article) =>
    request<Article>('PUT', `/api/articles/${encodeURIComponent(article.id)}`, article),
  deleteArticle: (articleId: string) => request<void>('DELETE', `/api/articles/${encodeURIComponent(articleId)}`),
  updateAdSlot: (slot: AdSlot) => request<AdSlot>('PUT', `/api/ads/${encodeURIComponent(slot.id)}`, slot),
  listReports: () => request<CitizenReport[]>('GET', '/api/reports'),
  updateReport: (report: CitizenReport) =>
    request<CitizenReport>('PUT', `/api/reports/${encodeURIComponent(report.id)}`, report),
  deleteReport: (reportId: string) => request<void>('DELETE', `/api/reports/${encodeURIComponent(reportId)}`),
  updateSetting: (key: 'logo' | 'lapor_config', value: unknown) =>
    request<{ key: string; value: unknown }>('PUT', `/api/settings/${key}`, { value })
};
