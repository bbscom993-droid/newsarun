import { useState } from 'react';
import { Clock, Eye, MessageSquare, Share2, Bookmark, Vote, Megaphone, Coffee, Video, Play } from 'lucide-react';
import { Article, AdSlot } from '../data/newsData';
import AdSlotBanner from './AdSlotBanner';
import SocialFeedWidget from './SocialFeedWidget';
import SidebarAd300x250 from './SidebarAd300x250';
import PublicPollingWidget from './PublicPollingWidget';

interface NewsStreamSectionProps {
  articles: Article[];
  allArticles: Article[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onShare: (article: Article) => void;
  onOpenLaporWarga: () => void;
  onOpenSawerKopi: (articleTitle?: string) => void;
  adSlots: AdSlot[];
  onSubscribeAdSlot: (slotId: string, data: { brandName: string; bannerUrl: string; targetUrl: string; durationDays: number }) => void;
  darkMode: boolean;
}

export default function NewsStreamSection({
  articles,
  allArticles,
  selectedCategory,
  onSelectCategory,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onShare,
  onOpenLaporWarga,
  onOpenSawerKopi,
  adSlots,
  onSubscribeAdSlot,
  darkMode
}: NewsStreamSectionProps) {
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'discussed'>('latest');
  const [visibleCount, setVisibleCount] = useState(6);

  // Reader poll state
  const [pollVoted, setPollVoted] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState<{ [key: number]: number }>({
    1: 5210,
    2: 1140,
    3: 420
  });

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
    if (sortBy === 'discussed') return (b.comments?.length || 0) - (a.comments?.length || 0);
    return 0;
  });

  // Top 5 Most Read for Sidebar
  const popularArticles = [...allArticles]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 5);

  const totalPollVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  const handleVote = (id: number) => {
    if (pollVoted !== null) return;
    setPollVoted(id);
    setPollVotes((prev) => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const infeedSlot = adSlots.find((s) => s.position === 'infeed_native') || adSlots[0];
  const sidebarSlot = adSlots.find((s) => s.position === 'sidebar_rectangle') || adSlots[1];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Main News Feed (8 cols) */}
      <div
        className={`lg:col-span-8 p-5 sm:p-6 rounded-2xl border space-y-6 ${
          darkMode
            ? 'bg-[#081a33] border-blue-900/80 shadow-2xl text-white'
            : 'bg-[#0a2142] border-blue-700/60 shadow-2xl text-white'
        }`}
      >
        {/* Stream Header & Filters */}
        <div
          className={`pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            darkMode ? 'border-blue-900/80' : 'border-blue-700/70'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {selectedCategory === 'Semua' ? 'Arus Berita Utama' : `Kanal: ${selectedCategory}`}
            </h2>
            <span className="text-xs font-bold text-amber-400 tabular-nums">
              ({sortedArticles.length} Berita)
            </span>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-1 p-1 bg-blue-950/90 rounded-xl text-xs font-bold border border-blue-800/80">
            <button
              onClick={() => setSortBy('latest')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                sortBy === 'latest'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Terbaru
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                sortBy === 'popular'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Terpopuler
            </button>
            <button
              onClick={() => setSortBy('discussed')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                sortBy === 'discussed'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Komentar
            </button>
          </div>
        </div>

        {/* Lapor Warga Callout Banner when on Lapor Warga category */}
        {selectedCategory === 'Lapor Warga' && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950 via-[#0d2a52] to-blue-950 border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2.5">
              <Megaphone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h4 className="font-black text-sm text-white">Punya Kejadian atau Masalah Warga?</h4>
                <p className="text-xs text-blue-200">
                  Kirim laporan Anda langsung ke meja redaksi Arun News untuk diverifikasi dan disuarakan.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenLaporWarga}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg shrink-0 shadow-xs"
            >
              Kirim Laporan Sekarang
            </button>
          </div>
        )}

        {/* Empty state */}
        {sortedArticles.length === 0 && (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-blue-800 bg-blue-950/40">
            <p className="text-blue-200 text-sm font-semibold mb-3">
              Belum ada berita untuk kategori ini saat ini.
            </p>
            <button
              onClick={() => onSelectCategory('Semua')}
              className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-lg shadow-xs"
            >
              Kembali ke Semua Berita
            </button>
          </div>
        )}

        {/* Articles Feed */}
        <div className="space-y-4">
          {sortedArticles.slice(0, visibleCount).map((art, index) => {
            const bookmarked = isBookmarked(art.id);
            return (
              <div key={art.id}>
                {/* Insert Native Ad Slot between articles (e.g. after 3rd article) */}
                {index === 3 && infeedSlot && (
                  <div className="my-4">
                    <AdSlotBanner
                      slot={infeedSlot}
                      onSubscribe={onSubscribeAdSlot}
                      darkMode={darkMode}
                    />
                  </div>
                )}

                <article
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row gap-4 sm:gap-5 group cursor-pointer ${
                    darkMode
                      ? 'bg-[#081930] border-blue-900/80 hover:border-blue-700'
                      : 'bg-[#0e2a52] border-blue-700/60 hover:border-amber-400 hover:bg-[#113260] shadow-lg text-white'
                  }`}
                  onClick={() => onSelectArticle(art)}
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full sm:w-52 h-44 sm:h-36 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-950/90 text-amber-400 font-black text-[10px] uppercase rounded shadow-xs border border-amber-400/30">
                      {art.category}
                    </span>
                    {(art.videoUrl || art.isVideo) && (
                      <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                        </div>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-blue-950/90 text-[10px] font-black text-amber-300 border border-amber-400/40 flex items-center gap-1">
                          <Video className="w-3 h-3 text-amber-400" />
                          <span>VIDEO</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between text-white">
                    <div>
                      {/* Unboxed Metadata in gold/light blue */}
                      <div className="flex items-center gap-2 text-xs text-blue-200 mb-1.5 font-bold">
                        <span className="text-amber-400">
                          {art.author.name}
                        </span>
                        <span aria-hidden="true" className="text-blue-400">·</span>
                        <span>{art.publishedAt}</span>
                        <span aria-hidden="true" className="text-blue-400">·</span>
                        <span className="flex items-center gap-1 text-blue-200">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {art.readTime}
                        </span>
                      </div>

                      {/* Headline in crisp white */}
                      <h3 className="text-base sm:text-lg font-black text-white leading-snug group-hover:text-amber-300 transition-colors mb-2">
                        {art.title}
                      </h3>

                      {/* Summary in light blue */}
                      <p className="text-xs sm:text-sm text-blue-100/90 line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    {/* Actions & Metrics */}
                    <div
                      className="pt-3 mt-3 border-t border-blue-800/80 flex items-center justify-between text-xs text-blue-200 font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 tabular-nums">
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                          {art.viewsCount.toLocaleString('id-ID')}
                        </span>
                        <span className="flex items-center gap-1 tabular-nums">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                          {art.comments?.length || 0}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Sawer Kopi shortcut */}
                        <button
                          onClick={() => onOpenSawerKopi(art.title)}
                          className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors text-[11px] font-black flex items-center gap-1 shadow-2xs"
                          title="Traktir kopi redaksi"
                        >
                          <Coffee className="w-3.5 h-3.5 fill-slate-950" />
                          <span className="hidden sm:inline">Sawer</span>
                        </button>

                        <button
                          onClick={() => onToggleBookmark(art.id)}
                          className={`p-1.5 rounded transition-colors ${
                            bookmarked ? 'text-amber-400 bg-blue-950' : 'text-blue-200 hover:text-white'
                          }`}
                          title="Simpan Berita"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
                        </button>

                        <button
                          onClick={() => onShare(art)}
                          className="p-1.5 rounded text-blue-200 hover:text-white transition-colors"
                          title="Bagikan ke WhatsApp"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {visibleCount < sortedArticles.length && (
          <div className="text-center pt-2">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-md"
            >
              Muat Berita Lainnya ({sortedArticles.length - visibleCount} tersisa)
            </button>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Sidebar (4 cols) */}
      <aside className="lg:col-span-4 space-y-6">
        {/* Dedicated Sidebar Ad Slot (300 x 250 px MREC) */}
        <SidebarAd300x250
          slot={sidebarSlot}
          onSubscribeAdSlot={onSubscribeAdSlot}
          darkMode={darkMode}
        />

        {/* Widget 1: TERPOPULER (Top 5 Ranked) */}
        <div
          className={`p-5 rounded-2xl border ${
            darkMode ? 'bg-[#081930] border-blue-900/80 text-white' : 'bg-[#0e2a52] border-blue-700/60 shadow-xl text-white'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-blue-800/80 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h3 className="text-base font-black uppercase tracking-tight text-white">
                TERPOPULER
              </h3>
            </div>
            <span className="text-[11px] font-black text-amber-400">24 Jam</span>
          </div>

          <div className="space-y-4">
            {popularArticles.map((art, index) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="flex items-start gap-3.5 group cursor-pointer"
              >
                <span className="text-2xl font-black text-amber-400 tabular-nums shrink-0 leading-none pt-0.5">
                  0{index + 1}
                </span>

                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block mb-0.5">
                    {art.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <div className="text-[10px] text-blue-200/80 mt-1 font-semibold tabular-nums">
                    <span>{art.viewsCount.toLocaleString('id-ID')} pembaca</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget: SOCIAL MEDIA FEED (Official Arun News Handles) */}
        <SocialFeedWidget darkMode={darkMode} />

        {/* Widget 2: JAJAK PENDAPAT PUBLIK (Suara Pembaca Arun News) */}
        <PublicPollingWidget darkMode={darkMode} />

        {/* Widget 3: SAWER KOPI PROMO CARD */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Coffee className="w-5 h-5 fill-slate-950" />
            <span className="text-xs font-black uppercase tracking-wider">
              Traktir Kopi Redaksi
            </span>
          </div>
          <p className="text-xs font-bold leading-relaxed mb-3">
            Dukung kerja-kerja jurnalistik investigasi Arun News agar tetap bebas dari intervensi. Secangkir kopi Anda sangat berarti!
          </p>
          <button
            onClick={() => onOpenSawerKopi('Dukungan Pembaca')}
            className="w-full py-2 bg-blue-950 hover:bg-blue-900 text-white font-black text-xs rounded-xl shadow-xs transition-colors"
          >
            ☕ Sawer Kopi Sekarang
          </button>
        </div>
      </aside>
    </div>
  );
}
