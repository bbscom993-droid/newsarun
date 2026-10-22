import { useState } from 'react';
import {
  Clock,
  Eye,
  Share2,
  Bookmark,
  Sparkles,
  ChevronRight,
  Radio,
  Coffee,
  Megaphone,
  ExternalLink,
  MessageCircle,
  X
} from 'lucide-react';
import { Article, AdSlot } from '../data/newsData';

interface HeroHeadlinesProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onShare: (article: Article) => void;
  onOpenSawerKopi: (articleTitle?: string) => void;
  darkMode: boolean;
  adSlot?: AdSlot;
  onSubscribeAdSlot?: (
    slotId: string,
    data: { brandName: string; bannerUrl: string; targetUrl: string; durationDays: number }
  ) => void;
}

export default function HeroHeadlines({
  leadArticle,
  secondaryArticles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onShare,
  onOpenSawerKopi,
  darkMode,
  adSlot,
  onSubscribeAdSlot
}: HeroHeadlinesProps) {
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');

  const hotlinePhone = '0895626941900';
  const waAdUrl = `https://wa.me/62${hotlinePhone.replace(/^0/, '')}?text=${encodeURIComponent(
    'Halo Marketing Redaksi Arun News, saya ingin memasang iklan sidebar di bawah Live Report Agenda Nasional (300 x 250 px)'
  )}`;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !bannerUrl.trim()) return;

    if (adSlot && onSubscribeAdSlot) {
      onSubscribeAdSlot(adSlot.id, {
        brandName,
        bannerUrl,
        targetUrl: targetUrl || '#',
        durationDays: 30
      });
    }
    setIsBookingOpen(false);
  };

  const isActiveSponsor = !!adSlot?.currentSponsor?.bannerUrl;

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

              {/* Points Card */}
              {leadArticle.keyPoints && leadArticle.keyPoints.length > 0 && (
                <div className="mb-5 p-3.5 rounded-xl bg-blue-950/70 border border-blue-800/80">
                  <div className="text-[11px] font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Poin Kunci Redaksi</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-blue-100 font-medium">
                    {leadArticle.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Read Button & Action Utilities */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-blue-800/60">
              <button
                onClick={() => onSelectArticle(leadArticle)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Baca Selengkapnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenSawerKopi?.(leadArticle.title)}
                  className="px-3 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 text-xs font-bold transition-colors flex items-center gap-1.5"
                  title="Traktir Kopi Wartawan"
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-400" />
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

        {/* Tier 2 & 3: Secondary Features + Live Updates + SIDEBAR AD (5 cols) */}
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

          {/* Fokus Terkini / Live Ticker (LIVE REPORT Agenda Nasional) */}
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

          {/* DIBAWAH LIVE REPORT AGENDA NASIONAL: RUANG IKLAN SIDEBAR SESUAI UKURAN */}
          <div className="w-full">
            {/* Header Badge Ukuran Iklan */}
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-amber-400 mb-1.5 px-1">
              <span className="flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Ruang Iklan Sidebar (300 × 250 px / MREC)</span>
              </span>
              <span className="text-blue-300 font-mono">IAB Standard</span>
            </div>

            {/* Container Iklan Sidebar Presisi */}
            <div
              className={`w-full min-h-[230px] rounded-2xl overflow-hidden relative border shadow-2xl flex flex-col justify-between transition-all ${
                darkMode
                  ? 'bg-[#081b33] border-blue-900/80 hover:border-blue-700'
                  : 'bg-[#0a2347] border-blue-700/80 shadow-2xl hover:border-amber-400/80 text-white'
              }`}
            >
              {isActiveSponsor && adSlot?.currentSponsor ? (
                // Active Partner Sponsor Banner
                <a
                  href={adSlot.currentSponsor.targetUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full min-h-[230px] relative group block"
                >
                  <img
                    src={adSlot.currentSponsor.bannerUrl}
                    alt={adSlot.currentSponsor.brandName || 'Iklan Mitra Arun News'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-wider text-amber-300 block">
                        Mitra Resmi Arun News
                      </span>
                      <span className="text-xs sm:text-sm font-black truncate max-w-[200px] block">
                        {adSlot.currentSponsor.brandName}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md">
                      <span>Kunjungi</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ) : (
                // Available / Booking Call to Action
                <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between text-white bg-gradient-to-br from-[#0c264d] via-[#0f2e5a] to-[#071933]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-amber-300 text-[10px] font-black uppercase border border-amber-400/40">
                        Slot Sidebar Tersedia
                      </span>
                      <span className="text-[10px] font-bold text-blue-300">
                        300 × 250 px
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-white leading-tight mb-1.5">
                      Ruang Iklan Sidebar Tepat di Bawah Live Report
                    </h4>

                    <p className="text-xs text-blue-200 leading-relaxed">
                      Jangkau <strong>250.000+ pembaca</strong> setia dan pengambil keputusan saat mereka memantau pembaruan agenda nasional setiap hari.
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-blue-800/80 mt-2">
                    <a
                      href={waAdUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Hubungi Marketing (0895626941900)</span>
                    </a>

                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full py-1.5 px-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 border border-amber-400/50 font-bold text-[11px] transition-colors"
                    >
                      Pasang Banner Cepat di Sini
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Advertiser Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a2347] border border-amber-400/60 rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black uppercase text-amber-400 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <span>Pasang Iklan Sidebar 300x250</span>
              </h3>
              <button onClick={() => setIsBookingOpen(false)} className="text-blue-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-blue-200 mb-4 leading-relaxed">
              Tempatkan materi promosi brand atau instansi Anda tepat di bawah kotak Live Report Agenda Nasional di halaman utama Arun News.
            </p>

            <form onSubmit={handleSubmitBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-blue-200">Nama Perusahaan / Brand:</label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Contoh: Bank BNI / Astra Agro / UMKM Unggulan"
                  className="w-full px-3 py-2 rounded-lg bg-blue-950 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-blue-200">URL Gambar Banner (300 x 250 px):</label>
                <input
                  type="url"
                  required
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... atau URL materi"
                  className="w-full px-3 py-2 rounded-lg bg-blue-950 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-blue-200">URL Tujuan Klik (Website / WhatsApp):</label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://perusahaan-anda.com/promo"
                  className="w-full px-3 py-2 rounded-lg bg-blue-950 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-4 py-2 rounded-lg bg-blue-900 text-blue-200 font-bold hover:bg-blue-800 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition-colors shadow-md"
                >
                  Tayangkan Iklan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
