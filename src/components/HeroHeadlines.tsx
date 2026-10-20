import { useState } from 'react';
import { Clock, Eye, Share2, Bookmark, Sparkles, ChevronRight, Radio, Coffee } from 'lucide-react';
import { Article } from '../data/newsData';

interface HeroHeadlinesProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onShare: (article: Article) => void;
  onOpenSawerKopi: (articleTitle?: string) => void;
  darkMode: boolean;
}

export default function HeroHeadlines({
  leadArticle,
  secondaryArticles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onShare,
  onOpenSawerKopi,
  darkMode
}: HeroHeadlinesProps) {
  const [showAiSummary, setShowAiSummary] = useState(false);

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Tier 1: Lead Story (7 cols) */}
        <div
          className={`lg:col-span-7 flex flex-col justify-between rounded-2xl overflow-hidden border transition-all ${
            darkMode
              ? 'bg-[#081930] border-blue-900/80 hover:border-blue-700'
              : 'bg-[#0e2a52] border-blue-700/60 shadow-xl hover:border-amber-400 text-white'
          }`}
        >
          {/* Hero Image Container */}
          <div
            className="relative group overflow-hidden aspect-[16/9] bg-slate-900 cursor-pointer"
            onClick={() => onSelectArticle(leadArticle)}
          >
            <img
              src={leadArticle.imageUrl}
              alt={leadArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-blue-950/90 text-amber-400 font-black text-xs tracking-wider uppercase rounded shadow-xs border border-amber-400/40">
                HEADLINE UTAMA
              </span>
              <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded shadow-xs">
                {leadArticle.category}
              </span>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] text-slate-200 bg-slate-950/80 px-2 py-0.5 rounded font-semibold border border-blue-900/50">
              Foto: Dokumentasi Arun News
            </div>
          </div>

          {/* Lead Content */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-white">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-blue-200 mb-2 font-bold">
                <span className="text-amber-400">{leadArticle.author.name}</span>
                <span aria-hidden="true" className="text-blue-400">·</span>
                <span>{leadArticle.publishedAt}</span>
                <span aria-hidden="true" className="text-blue-400">·</span>
                <span className="flex items-center gap-1 text-blue-200">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {leadArticle.readTime}
                </span>
                <span aria-hidden="true" className="text-blue-400">·</span>
                <span className="flex items-center gap-1 tabular-nums text-blue-200">
                  <Eye className="w-3 h-3 text-amber-400" />
                  {leadArticle.viewsCount.toLocaleString('id-ID')} dibaca
                </span>
              </div>

              {/* Title */}
              <h1
                onClick={() => onSelectArticle(leadArticle)}
                className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight mb-3 cursor-pointer text-white hover:text-amber-300 transition-colors"
                style={{ textWrap: 'balance' }}
              >
                {leadArticle.title}
              </h1>

              {/* Summary Deck */}
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-4 line-clamp-3 font-normal">
                {leadArticle.summary}
              </p>

              {/* Key points expander */}
              {leadArticle.keyPoints && leadArticle.keyPoints.length > 0 && (
                <div className="mb-4">
                  <button
                    onClick={() => setShowAiSummary(!showAiSummary)}
                    className="flex items-center gap-1.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{showAiSummary ? 'Sembunyikan Poin Kunci' : 'Ringkasan Kilat Berita (3 Poin)'}</span>
                  </button>

                  {showAiSummary && (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-blue-950/80 border border-blue-700/80 text-xs text-blue-100 space-y-1.5">
                      <div className="font-black text-amber-400 uppercase tracking-wider text-[11px]">
                        Intisari Editorial:
                      </div>
                      <ul className="list-disc list-inside space-y-1 font-medium text-slate-200">
                        {leadArticle.keyPoints.map((pt, idx) => (
                          <li key={idx} className="leading-snug">{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-blue-800/80 flex items-center justify-between">
              <button
                onClick={() => onSelectArticle(leadArticle)}
                className="flex items-center gap-1 text-xs font-black text-amber-400 hover:text-amber-300 transition-colors group"
              >
                <span>Baca Selengkapnya</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2">
                {/* Sawer Kopi Trigger */}
                <button
                  onClick={() => onOpenSawerKopi(leadArticle.title)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-2xs"
                  title="Traktir Kopi Redaksi"
                >
                  <Coffee className="w-3.5 h-3.5 fill-slate-950" />
                  <span className="hidden sm:inline">Sawer Kopi</span>
                </button>

                <button
                  onClick={() => onToggleBookmark(leadArticle.id)}
                  className={`p-2 rounded-lg border text-xs font-bold transition-colors ${
                    isBookmarked(leadArticle.id)
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'border-blue-700/80 text-blue-200 hover:text-white hover:bg-blue-900/60'
                  }`}
                  title="Simpan Berita"
                  aria-label="Simpan Berita"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(leadArticle.id) ? 'fill-slate-950' : ''}`} />
                </button>

                <button
                  onClick={() => onShare(leadArticle)}
                  className="p-2 rounded-lg border border-blue-700/80 text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors text-xs font-bold"
                  title="Bagikan ke WhatsApp"
                  aria-label="Bagikan Berita"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2 & 3: Secondary Features + Live Updates (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {secondaryArticles[0] && (
            <div
              className={`p-4 rounded-2xl border flex gap-4 transition-all group cursor-pointer ${
                darkMode
                  ? 'bg-[#081930] border-blue-900/80 hover:border-blue-700'
                  : 'bg-[#0e2a52] border-blue-700/60 shadow-xl hover:border-amber-400 text-white'
              }`}
              onClick={() => onSelectArticle(secondaryArticles[0])}
            >
              <div className="relative w-28 sm:w-36 h-24 sm:h-28 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={secondaryArticles[0].imageUrl}
                  alt={secondaryArticles[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-blue-950/90 text-amber-400 font-black text-[10px] uppercase rounded border border-amber-400/30">
                  {secondaryArticles[0].category}
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-200 mb-1">
                    {secondaryArticles[0].publishedAt}
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {secondaryArticles[0].title}
                  </h2>
                </div>
                <div className="flex items-center justify-between text-xs text-blue-200 mt-2 font-bold">
                  <span className="text-[11px] truncate max-w-[130px]">{secondaryArticles[0].author.name}</span>
                  <span className="text-amber-400 text-[11px]">Baca →</span>
                </div>
              </div>
            </div>
          )}

          {secondaryArticles[1] && (
            <div
              className={`p-4 rounded-2xl border flex gap-4 transition-all group cursor-pointer ${
                darkMode
                  ? 'bg-[#081930] border-blue-900/80 hover:border-blue-700'
                  : 'bg-[#0e2a52] border-blue-700/60 shadow-xl hover:border-amber-400 text-white'
              }`}
              onClick={() => onSelectArticle(secondaryArticles[1])}
            >
              <div className="relative w-28 sm:w-36 h-24 sm:h-28 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={secondaryArticles[1].imageUrl}
                  alt={secondaryArticles[1].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-blue-950/90 text-amber-400 font-black text-[10px] uppercase rounded border border-amber-400/30">
                  {secondaryArticles[1].category}
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-200 mb-1">
                    {secondaryArticles[1].publishedAt}
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {secondaryArticles[1].title}
                  </h2>
                </div>
                <div className="flex items-center justify-between text-xs text-blue-200 mt-2 font-bold">
                  <span className="text-[11px] truncate max-w-[130px]">{secondaryArticles[1].author.name}</span>
                  <span className="text-amber-400 text-[11px]">Baca →</span>
                </div>
              </div>
            </div>
          )}

          {/* Fokus Terkini / Live Ticker */}
          <div
            className={`p-4 rounded-2xl border ${
              darkMode
                ? 'bg-[#081930] border-blue-900/80 text-white'
                : 'bg-gradient-to-br from-[#0c264d] to-[#071933] border-blue-700/60 text-white shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-blue-800/70 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-600 text-white font-black text-[10px] uppercase tracking-wider shadow-xs">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>LIVE REPORT</span>
                </div>
                <span className="text-xs font-black text-amber-400">
                  Agenda Nasional
                </span>
              </div>
              <span className="text-[10px] font-bold text-blue-200">
                Pembaruan Berkala
              </span>
            </div>

            <div className="space-y-2.5">
              {leadArticle.liveUpdates?.slice(0, 3).map((upd, idx) => (
                <div key={idx} className="flex gap-2.5 text-xs">
                  <span className="font-black text-amber-400 tabular-nums shrink-0 pt-0.5">
                    {upd.time}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white leading-snug">
                      {upd.title}
                    </h3>
                    <p className="text-[11px] text-blue-200/90 line-clamp-1 mt-0.5">
                      {upd.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
