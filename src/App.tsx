/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Megaphone, ShieldCheck } from 'lucide-react';
import TopUtilityBar from './components/TopUtilityBar';
import Header from './components/Header';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import TrendingBar from './components/TrendingBar';
import HeroHeadlines from './components/HeroHeadlines';
import PublicServicesWidget from './components/PublicServicesWidget';
import EditorialPicksSection from './components/EditorialPicksSection';
import VideoNewsSection from './components/VideoNewsSection';
import NewsStreamSection from './components/NewsStreamSection';
import MultimediaGallery from './components/MultimediaGallery';
import ArticleModal from './components/ArticleModal';
import SavedArticlesDrawer from './components/SavedArticlesDrawer';
import SearchModal from './components/SearchModal';
import SawerKopiModal from './components/SawerKopiModal';
import LaporWargaModal from './components/LaporWargaModal';
import EditorialInfoModal, { EditorialModalTab } from './components/EditorialInfoModal';
import AdminPanel from './components/AdminPanel';
import AdSlotBanner from './components/AdSlotBanner';
import Footer from './components/Footer';
import FloatingSawerKopi from './components/FloatingSawerKopi';
import LegalitasSection from './components/LegalitasSection';
import AdminGate from './components/AdminGate';
import { api } from './lib/api';
import {
  INITIAL_ARTICLES,
  INITIAL_AD_SLOTS,
  INITIAL_COFFEE_TIPS,
  Article,
  AdSlot,
  CitizenReport,
  CoffeeTip,
  CommentItem,
  LaporWargaConfig,
  DEFAULT_LAPOR_WARGA_CONFIG
} from './data/newsData';

export default function App() {
  // Portal content is loaded from the shared database via /api/portal
  const [articles, setArticles] = useState<Article[]>([]);
  const [adSlots, setAdSlots] = useState<AdSlot[]>([]);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>([]);
  const [coffeeTips, setCoffeeTips] = useState<CoffeeTip[]>([]);
  const [isPortalLoading, setIsPortalLoading] = useState(true);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Modals & Drawers
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSawerKopiOpen, setIsSawerKopiOpen] = useState(false);
  const [sawerKopiContextTitle, setSawerKopiContextTitle] = useState<string | undefined>(undefined);
  const [isLaporWargaOpen, setIsLaporWargaOpen] = useState(false);
  const [editorialModalTab, setEditorialModalTab] = useState<EditorialModalTab | null>(null);

  // View Mode: 'portal' or 'admin'
  const [viewMode, setViewMode] = useState<'portal' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      return 'admin';
    }
    return 'portal';
  });

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arun_dark_mode');
      if (saved !== null) return saved === 'true';
    }
    return false;
  });

  // Bookmarks
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_saved_articles');
        if (saved) return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [customLogoUrl, setCustomLogoUrl] = useState<string | undefined>(undefined);
  const [laporConfig, setLaporConfig] = useState<LaporWargaConfig>(DEFAULT_LAPOR_WARGA_CONFIG);

  useEffect(() => {
    let cancelled = false;
    api
      .getPortal()
      .then((data) => {
        if (cancelled) return;
        setArticles(data.articles);
        setAdSlots(data.adSlots);
        setCoffeeTips(data.coffeeTips);
        setCustomLogoUrl(data.customLogoUrl || undefined);
        setLaporConfig({ ...DEFAULT_LAPOR_WARGA_CONFIG, ...(data.laporConfig || {}) });
      })
      .catch(() => {
        if (cancelled) return;
        // Keep the portal readable with starter content if the API is unreachable.
        setArticles(INITIAL_ARTICLES);
        setAdSlots(INITIAL_AD_SLOTS);
        setCoffeeTips(INITIAL_COFFEE_TIPS);
        showToast('Gagal memuat data terbaru dari server.');
      })
      .finally(() => {
        if (!cancelled) setIsPortalLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Citizen reports include reporter contacts, so they're only fetched for authorized editors.
  useEffect(() => {
    if (!isAdminAuthorized) return;
    api
      .listReports()
      .then(setCitizenReports)
      .catch((err: Error) => showToast(err.message));
  }, [isAdminAuthorized]);

  useEffect(() => {
    localStorage.setItem('arun_saved_articles', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('arun_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Deep linking and hash/URL change listener for dedicated admin link
  useEffect(() => {
    const handleUrlState = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      if (
        hash === '#admin' ||
        /^#(invite_token|recovery_token|confirmation_token|email_change_token)=/.test(hash) ||
        hash === '#redaksi' ||
        search.includes('admin=true') ||
        window.location.pathname === '/admin'
      ) {
        setViewMode('admin');
        setSelectedArticle(null);
      } else if (hash.startsWith('#article-')) {
        const artId = hash.replace('#article-', '');
        const target = articles.find((a) => a.id === artId);
        if (target) {
          setSelectedArticle(target);
          setViewMode('portal');
        }
      } else {
        setViewMode('portal');
      }
    };

    handleUrlState();
    window.addEventListener('hashchange', handleUrlState);
    window.addEventListener('popstate', handleUrlState);
    return () => {
      window.removeEventListener('hashchange', handleUrlState);
      window.removeEventListener('popstate', handleUrlState);
    };
  }, [articles]);

  // Keyboard shortcut (Cmd+K / Ctrl+K for search, Ctrl+Shift+A for secret admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      // Secret editorial staff shortcut: Ctrl+Shift+A or Cmd+Shift+A
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        window.location.hash = 'admin';
        setViewMode((prev) => (prev === 'admin' ? 'portal' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleBookmark = (articleId: string) => {
    setSavedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const isBookmarked = (articleId: string) => savedIds.includes(articleId);

  // WhatsApp Share with specific image + text + link format
  const handleShare = (article: Article) => {
    const origin = window.location.origin;
    const path = window.location.pathname;
    const deepLink = `${origin}${path}#article-${article.id}`;
    const imgUrl = article.imageUrl.startsWith('http') ? article.imageUrl : origin + article.imageUrl;

    const message = `📰 *${article.title}*\n\n_${article.summary}_\n\n📸 *Foto Berita:* ${imgUrl}\n\n🔗 *Baca Selengkapnya di ARUN NEWS:*\n${deepLink}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleAddComment = async (articleId: string, comment: CommentItem) => {
    try {
      const saved = await api.addComment(articleId, comment);
      setArticles((prev) =>
        prev.map((art) => (art.id === articleId ? { ...art, comments: [saved, ...art.comments] } : art))
      );
      setSelectedArticle((prev) =>
        prev && prev.id === articleId ? { ...prev, comments: [saved, ...prev.comments] } : prev
      );
      showToast('Komentar Anda berhasil dipublikasikan!');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleOpenSawerKopi = (contextTitle?: string) => {
    setSawerKopiContextTitle(contextTitle);
    setIsSawerKopiOpen(true);
  };

  const handleAddCoffeeTip = async (tip: CoffeeTip) => {
    try {
      const saved = await api.addTip(tip);
      setCoffeeTips((prev) => [saved, ...prev]);
      showToast(`Terima kasih atas sawer kopi Rp ${saved.amount.toLocaleString('id-ID')}!`);
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleAddCitizenReport = async (report: CitizenReport) => {
    try {
      const saved = await api.addReport(report);
      if (isAdminAuthorized) setCitizenReports((prev) => [saved, ...prev]);
      showToast('Laporan warga Anda telah diterima oleh redaksi!');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  // Admin Actions
  const handleAddArticle = async (newArt: Article) => {
    try {
      const saved = await api.createArticle(newArt);
      setArticles((prev) => [saved, ...prev]);
      showToast('Berita baru berhasil diterbitkan!');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleUpdateArticle = async (updatedArt: Article) => {
    try {
      const saved = await api.updateArticle(updatedArt);
      setArticles((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
      showToast('Berita berhasil diperbarui!');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await api.deleteArticle(articleId);
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
      showToast('Berita berhasil dihapus.');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleUpdateAdSlot = async (updatedSlot: AdSlot) => {
    try {
      const saved = await api.updateAdSlot(updatedSlot);
      setAdSlots((prev) => prev.map((s) => (s.id === saved.id ? saved : s)));
      showToast('Slot iklan berhasil diperbarui!');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleSubscribeAdSlot = async (
    slotId: string,
    data: { brandName: string; bannerUrl: string; targetUrl: string; durationDays: number }
  ) => {
    try {
      const saved = await api.subscribeAdSlot(slotId, data);
      setAdSlots((prev) => prev.map((s) => (s.id === saved.id ? saved : s)));
      showToast(`Slot iklan ${slotId} berhasil dilanggani untuk ${data.brandName}!`);
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  // Convert citizen report to published article
  const handlePublishCitizenReport = async (report: CitizenReport) => {
    const now = new Date();
    const newArt: Article = {
      id: `art-citizen-${Date.now()}`,
      title: `[Lapor Warga] ${report.title}`,
      slug: report.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60),
      category: 'Lapor Warga',
      summary: `${report.description.slice(0, 160)}... Dilaporkan oleh ${report.reporterName} dari ${report.location}.`,
      content: [
        `Laporan Warga dari ${report.location}: ${report.description}`,
        `Informasi ini disampaikan langsung oleh warga setempat (${report.reporterName}) dan telah diverifikasi oleh tim redaksi Arun News.`,
        'Pihak terkait dan dinas berwenang diimbau segera menindaklanjuti kebutuhan fasilitas warga tersebut demi kenyamanan bersama.'
      ],
      keyPoints: [
        `Lokasi: ${report.location}`,
        `Status Verifikasi: Telah diverifikasi redaksi Arun News`,
        `Pelapor: ${report.reporterName}`
      ],
      author: {
        name: 'Kanal Lapor Warga',
        role: 'Jurnalisme Warga Arun News',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
      },
      publishedAt: `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${now
        .toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
        .replace('.', ':')} WIB`,
      readTime: '2 mnt baca',
      imageUrl: report.photoUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      imageCaption: `Kondisi lapangan yang dilaporkan warga di ${report.location}.`,
      viewsCount: 0,
      sharesCount: 0,
      tags: ['Lapor Warga', 'Aspirasi Daerah'],
      comments: []
    };

    try {
      const savedArticle = await api.createArticle(newArt);
      const savedReport = await api.updateReport({ ...report, status: 'published' });
      setArticles((prev) => [savedArticle, ...prev]);
      setCitizenReports((prev) => prev.map((r) => (r.id === savedReport.id ? savedReport : r)));
      showToast('Laporan warga berhasil diterbitkan sebagai berita!');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  const handleDeleteCitizenReport = async (reportId: string) => {
    try {
      await api.deleteReport(reportId);
      setCitizenReports((prev) => prev.filter((r) => r.id !== reportId));
      showToast('Laporan warga dihapus.');
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  // Filtered Articles for Portal
  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCategory === 'Semua' || art.category === activeCategory;
    const matchesTag = !selectedTag || art.tags.includes(selectedTag.replace('#', '')) || art.tags.some(t => selectedTag.includes(t));
    return matchesCat && matchesTag;
  });

  const leadArticle = articles.find((a) => a.isHeadline) || articles[0];
  const secondaryArticles = articles.filter((a) => a.id !== leadArticle?.id && a.isEditorPick).slice(0, 2);
  const headerAdSlot = adSlots.find((s) => s.position === 'header_leaderboard');
  const savedArticlesList = articles.filter((a) => savedIds.includes(a.id));

  const toastNode = toastMessage && (
    <div className="fixed bottom-6 right-6 z-[100] bg-blue-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-400 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
      <span className="w-2 h-2 rounded-full bg-amber-400" />
      <span>{toastMessage}</span>
    </div>
  );

  const exitAdmin = () => {
    setIsAdminAuthorized(false);
    setCitizenReports([]);
    window.location.hash = '';
    setViewMode('portal');
  };

  const loadingScreen = (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0c2447] text-slate-100">
      <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Memuat Arun News...</p>
    </div>
  );

  // IF ADMIN VIEW MODE
  if (viewMode === 'admin') {
    return (
      <>
      <AdminGate darkMode={darkMode} onExit={exitAdmin} onAuthorizedChange={setIsAdminAuthorized}>
      {(session) => isPortalLoading ? loadingScreen : (
      <AdminPanel
        adminEmail={session.email}
        onLogout={session.logout}
        articles={articles}
        onAddArticle={handleAddArticle}
        onUpdateArticle={handleUpdateArticle}
        onDeleteArticle={handleDeleteArticle}
        adSlots={adSlots}
        onUpdateAdSlot={handleUpdateAdSlot}
        citizenReports={citizenReports}
        onPublishReport={handlePublishCitizenReport}
        onDeleteReport={handleDeleteCitizenReport}
        coffeeTips={coffeeTips}
        onExitAdmin={exitAdmin}
        darkMode={darkMode}
        customLogoUrl={customLogoUrl}
        onUpdateCustomLogo={async (logo) => {
          try {
            await api.updateSetting('logo', logo ?? null);
            setCustomLogoUrl(logo);
            showToast(logo ? 'Logo resmi berhasil diperbarui!' : 'Logo dikembalikan ke simbol default!');
          } catch (err) {
            showToast((err as Error).message);
          }
        }}
        laporConfig={laporConfig}
        onUpdateLaporConfig={async (cfg) => {
          try {
            await api.updateSetting('lapor_config', cfg);
            setLaporConfig(cfg);
            showToast('Pengaturan Lapor Warga berhasil disimpan!');
          } catch (err) {
            showToast((err as Error).message);
          }
        }}
      />
      )}
      </AdminGate>
      {toastNode}
      </>
    );
  }

  if (isPortalLoading) return loadingScreen;

  // PORTAL VIEW MODE
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        darkMode ? 'bg-[#07162b] text-slate-100' : 'bg-[#0c2447] text-slate-100'
      }`}
    >
      {/* 1. Market Data & Date Bar */}
      <TopUtilityBar darkMode={darkMode} />

      {/* 2. Main Header (3D ARUN NEWS - Jembatan Media Nusantara & Custom Logo) */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedTag(null);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedIds.length}
        onOpenLaporWarga={() => setIsLaporWargaOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        customLogoUrl={customLogoUrl}
      />

      {/* 3. Running Teks Headline */}
      <BreakingNewsTicker
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        darkMode={darkMode}
      />

      {/* Top Header Leaderboard Ad Slot */}
      {headerAdSlot && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlotBanner
            slot={headerAdSlot}
            onSubscribe={handleSubscribeAdSlot}
            darkMode={darkMode}
          />
        </div>
      )}

      {/* 4. Trending Topics (#TopikTerhangat) */}
      <TrendingBar
        selectedTag={selectedTag}
        onSelectTag={(tag) => setSelectedTag(tag)}
        darkMode={darkMode}
      />

      {/* Toast Notification */}
      {toastNode}

      {/* Main News Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full text-white">
        {/* Front Page Featured Sections */}
        {activeCategory === 'Semua' && !selectedTag && (
          <>
            {leadArticle && (
            <HeroHeadlines
              leadArticle={leadArticle}
              secondaryArticles={secondaryArticles}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
              onShare={handleShare}
              onOpenSawerKopi={handleOpenSawerKopi}
              darkMode={darkMode}
            />
            )}

            {/* Prakiraan Cuaca & Jadwal Transportasi Nusantara */}
            <PublicServicesWidget darkMode={darkMode} />

            {/* Berita Pilihan Redaksi */}
            <EditorialPicksSection
              articles={articles}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
              darkMode={darkMode}
            />

            {/* Warta Video & Liputan Khusus */}
            <VideoNewsSection
              articles={articles}
              onSelectArticle={(art) => setSelectedArticle(art)}
              darkMode={darkMode}
            />
          </>
        )}

        {/* Dedicated Category Spotlight Header (Active when clicking any category) */}
        {activeCategory !== 'Semua' && (
          <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#091f3d] via-[#0d2a52] to-[#091f3d] border border-blue-700/70 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <button
                    onClick={() => setActiveCategory('Semua')}
                    className="text-blue-300 hover:text-amber-400 font-bold transition-colors flex items-center gap-1"
                  >
                    <span>← Beranda</span>
                  </button>
                  <span className="text-blue-500">/</span>
                  <span className="text-amber-400 font-extrabold uppercase tracking-wider">Kanal Berita Nusantara</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse" />
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    Kanal {activeCategory}
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-blue-950 text-amber-400 border border-amber-400/40 text-xs font-black">
                    {filteredArticles.length} Berita Terkini
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-blue-200 mt-2 max-w-2xl leading-relaxed">
                  {activeCategory === 'Politik' && 'Liputan komprehensif, independen dan tepercaya mengenai dinamika parlemen, kebijakan pemerintah, dan peta politik Nusantara.'}
                  {activeCategory === 'Daerah' && 'Kabar dan perkembangan langsung dari pelosok Nusantara, pembangunan infrastruktur, budaya lokal, dan denyut nadi daerah.'}
                  {activeCategory === 'Kriminal' && 'Laporan penegakan hukum, pemberantasan kejahatan, dan investigasi kasus hukum dengan akurasi dan etika jurnalistik teruji.'}
                  {activeCategory === 'Olahraga' && 'Ulasan pertandingan, prestasi atlet kebanggaan Garuda, dan dinamika kompetisi olahraga nasional hingga internasional.'}
                  {activeCategory === 'Legalitas' && 'Profil dan keabsahan hukum resmi PT Arun Media Nusantara: SK Kemenkumham RI, NIB KBLI 63122, NPWP Perusahaan Pers, serta Sertifikasi Verifikasi Faktual Dewan Pers.'}
                  {activeCategory === 'Ekonomi' && 'Analisis komprehensif pasar modal, pergerakan IHSG, industri perbankan nasional, pembiayaan digital UMKM, investasi manufaktur hijau, dan denyut nadi perekonomian Nusantara.'}
                  {activeCategory === 'Lapor Warga' && 'Ruang suara dan advokasi jurnalisme warga. Laporkan kerusakan fasilitas publik, keluhan layanan, atau peristiwa di sekitar Anda.'}
                  {activeCategory === 'Lain-lain' && 'Ragam informasi gaya hidup, teknologi, fenomena terkini, dan serba-serbi Nusantara terhangat.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeCategory === 'Lapor Warga' && (
                  <button
                    onClick={() => setIsLaporWargaOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Megaphone className="w-4 h-4 fill-slate-950" />
                    <span>Kirim Laporan Warga</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveCategory('Semua')}
                  className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 border border-blue-700/80 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Lihat Semua Kategori
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tag filter notification */}
        {selectedTag && (
          <div className="mb-6 p-3 rounded-xl bg-blue-950 border border-amber-400/60 flex items-center justify-between text-xs text-amber-300 shadow-md">
            <span>
              Menampilkan berita dengan topik <strong>{selectedTag}</strong>
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="font-bold text-amber-400 hover:text-amber-300 hover:underline"
            >
              Hapus Filter ×
            </button>
          </div>
        )}

        {/* 5. Main Stream & Sidebars or Dedicated Legalitas Section */}
        {activeCategory === 'Legalitas' ? (
          <LegalitasSection
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            darkMode={darkMode}
          />
        ) : (
          <>
            <NewsStreamSection
              articles={filteredArticles}
              allArticles={articles}
              selectedCategory={activeCategory}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                setSelectedTag(null);
              }}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
              onShare={handleShare}
              onOpenLaporWarga={() => setIsLaporWargaOpen(true)}
              onOpenSawerKopi={handleOpenSawerKopi}
              adSlots={adSlots}
              onSubscribeAdSlot={handleSubscribeAdSlot}
              darkMode={darkMode}
            />

            {/* 6. Photojournalism Gallery */}
            <MultimediaGallery
              articles={articles}
              onSelectArticle={(art) => setSelectedArticle(art)}
              darkMode={darkMode}
            />
          </>
        )}
      </main>

      {/* 7. Footer with 3D Brand & Custom Logo */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedTag(null);
        }}
        onOpenSawerKopi={() => handleOpenSawerKopi('Dukungan Redaksi')}
        onOpenLaporWarga={() => setIsLaporWargaOpen(true)}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          setViewMode('admin');
        }}
        onOpenEditorialInfo={(tab) => setEditorialModalTab(tab)}
        darkMode={darkMode}
        customLogoUrl={customLogoUrl}
      />

      {/* FLOATING SAWER KOPI WIDGET (Appears on every news channel & page) */}
      <FloatingSawerKopi
        onOpenFullModal={handleOpenSawerKopi}
        onQuickTip={handleAddCoffeeTip}
        activeCategory={activeCategory}
      />

      {/* Article Modal Reader View */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => {
            setSelectedArticle(null);
            if (window.location.hash.startsWith('#article-')) {
              window.history.pushState(null, '', window.location.pathname);
            }
          }}
          onSelectArticle={(art) => setSelectedArticle(art)}
          relatedArticles={articles.filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category).slice(0, 3)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked(selectedArticle.id)}
          onAddComment={handleAddComment}
          onOpenSawerKopi={handleOpenSawerKopi}
          darkMode={darkMode}
        />
      )}

      {/* Saved Articles Drawer */}
      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => setSavedIds([])}
        darkMode={darkMode}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        darkMode={darkMode}
      />

      {/* Sawer Kopi Modal */}
      <SawerKopiModal
        isOpen={isSawerKopiOpen}
        onClose={() => setIsSawerKopiOpen(false)}
        onAddTip={handleAddCoffeeTip}
        articleTitle={sawerKopiContextTitle}
        darkMode={darkMode}
      />

      {/* Lapor Warga Submission Modal */}
      <LaporWargaModal
        isOpen={isLaporWargaOpen}
        onClose={() => setIsLaporWargaOpen(false)}
        onSubmitReport={handleAddCitizenReport}
        darkMode={darkMode}
        laporConfig={laporConfig}
      />

      {/* Official Journalistic & Editorial Info Modal */}
      <EditorialInfoModal
        isOpen={editorialModalTab !== null}
        initialTab={editorialModalTab || 'box_redaksi'}
        onClose={() => setEditorialModalTab(null)}
        onOpenLaporWarga={() => setIsLaporWargaOpen(true)}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          setViewMode('admin');
        }}
        darkMode={darkMode}
      />
    </div>
  );
}
