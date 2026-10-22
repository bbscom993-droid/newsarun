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
import PopularAndTrendingSection from './components/PopularAndTrendingSection';
import BrowserNotificationManager from './components/BrowserNotificationManager';
import OpiniEsaiSection from './components/OpiniEsaiSection';
import DailyNewsletterSection from './components/DailyNewsletterSection';
import ArticleModal from './components/ArticleModal';
import SavedArticlesDrawer from './components/SavedArticlesDrawer';
import SearchModal from './components/SearchModal';
import SawerKopiModal from './components/SawerKopiModal';
import LaporWargaModal from './components/LaporWargaModal';
import EditorialInfoModal, { EditorialModalTab } from './components/EditorialInfoModal';
import WhatsAppShareModal from './components/WhatsAppShareModal';
import AdminPanel from './components/AdminPanel';
import AdSlotBanner from './components/AdSlotBanner';
import Footer from './components/Footer';
import FloatingSawerKopi from './components/FloatingSawerKopi';
import LegalitasSection from './components/LegalitasSection';
import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import {
  INITIAL_ARTICLES,
  INITIAL_AD_SLOTS,
  INITIAL_CITIZEN_REPORTS,
  INITIAL_COFFEE_TIPS,
  Article,
  AdSlot,
  CitizenReport,
  CoffeeTip,
  CommentItem,
  LaporWargaConfig,
  DEFAULT_LAPOR_WARGA_CONFIG,
  CategoryItem,
  PortalThemeConfig,
  AntiBuzzerConfig,
  BuzzerInterceptionLog,
  DEFAULT_CATEGORIES,
  DEFAULT_THEME_CONFIG,
  DEFAULT_ANTI_BUZZER_CONFIG,
  INITIAL_BUZZER_LOGS
} from './data/newsData';

export default function App() {
  // Articles state with localStorage backup
  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_articles');
        if (saved) return JSON.parse(saved);
      } catch {
        return INITIAL_ARTICLES;
      }
    }
    return INITIAL_ARTICLES;
  });

  // Ad slots state
  const [adSlots, setAdSlots] = useState<AdSlot[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_ad_slots');
        if (saved) return JSON.parse(saved);
      } catch {
        return INITIAL_AD_SLOTS;
      }
    }
    return INITIAL_AD_SLOTS;
  });

  // Citizen reports state
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_citizen_reports');
        if (saved) return JSON.parse(saved);
      } catch {
        return INITIAL_CITIZEN_REPORTS;
      }
    }
    return INITIAL_CITIZEN_REPORTS;
  });

  // Coffee tips state
  const [coffeeTips, setCoffeeTips] = useState<CoffeeTip[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_coffee_tips');
        if (saved) return JSON.parse(saved);
      } catch {
        return INITIAL_COFFEE_TIPS;
      }
    }
    return INITIAL_COFFEE_TIPS;
  });

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
  const [shareModalArticle, setShareModalArticle] = useState<Article | null>(null);

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

  // Local Logo State with LocalStorage Persistence
  const [customLogoUrl, setCustomLogoUrl] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('arun_news_custom_logo') || undefined;
    }
    return undefined;
  });

  // Lapor Warga Config State with LocalStorage Persistence
  const [laporConfig, setLaporConfig] = useState<LaporWargaConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_news_lapor_config');
        if (saved) return JSON.parse(saved);
      } catch {
        return DEFAULT_LAPOR_WARGA_CONFIG;
      }
    }
    return DEFAULT_LAPOR_WARGA_CONFIG;
  });

  // Categories State with LocalStorage Persistence
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_news_categories');
        if (saved) return JSON.parse(saved);
      } catch {
        return DEFAULT_CATEGORIES;
      }
    }
    return DEFAULT_CATEGORIES;
  });

  // Portal Theme & Design Template State
  const [themeConfig, setThemeConfig] = useState<PortalThemeConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_news_theme_config');
        if (saved) return JSON.parse(saved);
      } catch {
        return DEFAULT_THEME_CONFIG;
      }
    }
    return DEFAULT_THEME_CONFIG;
  });

  // Anti-Buzzer Shield State
  const [antiBuzzerConfig, setAntiBuzzerConfig] = useState<AntiBuzzerConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_news_antibuzzer_config');
        if (saved) return JSON.parse(saved);
      } catch {
        return DEFAULT_ANTI_BUZZER_CONFIG;
      }
    }
    return DEFAULT_ANTI_BUZZER_CONFIG;
  });

  // Buzzer Interception Logs State
  const [buzzerLogs, setBuzzerLogs] = useState<BuzzerInterceptionLog[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_news_buzzer_logs');
        if (saved) return JSON.parse(saved);
      } catch {
        return INITIAL_BUZZER_LOGS;
      }
    }
    return INITIAL_BUZZER_LOGS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('arun_news_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('arun_news_theme_config', JSON.stringify(themeConfig));
  }, [themeConfig]);

  useEffect(() => {
    localStorage.setItem('arun_news_antibuzzer_config', JSON.stringify(antiBuzzerConfig));
  }, [antiBuzzerConfig]);

  useEffect(() => {
    localStorage.setItem('arun_news_buzzer_logs', JSON.stringify(buzzerLogs));
  }, [buzzerLogs]);

  useEffect(() => {
    localStorage.setItem('arun_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('arun_ad_slots', JSON.stringify(adSlots));
  }, [adSlots]);

  useEffect(() => {
    localStorage.setItem('arun_citizen_reports', JSON.stringify(citizenReports));
  }, [citizenReports]);

  useEffect(() => {
    localStorage.setItem('arun_coffee_tips', JSON.stringify(coffeeTips));
  }, [coffeeTips]);

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

  // Real-time synchronization with Firebase Firestore
  useEffect(() => {
    try {
      const unsubArticles = onSnapshot(collection(db, 'articles'), (snap) => {
        if (!snap.empty) {
          const remoteArts: Article[] = [];
          snap.forEach((d) => remoteArts.push(d.data() as Article));
          if (remoteArts.length > 0) {
            setArticles(remoteArts);
          }
        }
      }, (err) => {
        console.warn('Firestore articles listener notice:', err.message);
      });

      const unsubReports = onSnapshot(collection(db, 'citizenReports'), (snap) => {
        if (!snap.empty) {
          const remoteReports: CitizenReport[] = [];
          snap.forEach((d) => remoteReports.push(d.data() as CitizenReport));
          if (remoteReports.length > 0) {
            setCitizenReports(remoteReports);
          }
        }
      }, (err) => {
        console.warn('Firestore reports listener notice:', err.message);
      });

      const unsubTips = onSnapshot(collection(db, 'coffeeTips'), (snap) => {
        if (!snap.empty) {
          const remoteTips: CoffeeTip[] = [];
          snap.forEach((d) => remoteTips.push(d.data() as CoffeeTip));
          if (remoteTips.length > 0) {
            setCoffeeTips(remoteTips);
          }
        }
      }, (err) => {
        console.warn('Firestore coffee tips listener notice:', err.message);
      });

      return () => {
        unsubArticles();
        unsubReports();
        unsubTips();
      };
    } catch (e) {
      console.warn('Firebase real-time sync initialization notice:', e);
    }
  }, []);

  // Deep linking and hash/URL change listener for dedicated admin link
  useEffect(() => {
    const handleUrlState = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      if (
        hash === '#admin' ||
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

  // WhatsApp Share with smart modal (Image + Text + Link)
  const handleShare = (article: Article) => {
    setShareModalArticle(article);
  };

  const handleAddComment = (articleId: string, comment: CommentItem) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, comments: [comment, ...art.comments] } : art))
    );
    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle((prev) => (prev ? { ...prev, comments: [comment, ...prev.comments] } : null));
    }
    showToast('Komentar Anda berhasil dipublikasikan!');
  };

  const handleOpenSawerKopi = (contextTitle?: string) => {
    setSawerKopiContextTitle(contextTitle);
    setIsSawerKopiOpen(true);
  };

  const handleAddCoffeeTip = async (tip: CoffeeTip) => {
    setCoffeeTips((prev) => [tip, ...prev]);
    showToast(`Terima kasih atas sawer kopi Rp ${tip.amount.toLocaleString('id-ID')}!`);
    try {
      await setDoc(doc(db, 'coffeeTips', tip.id), tip);
    } catch (e) {
      console.warn('Firestore tip write notice:', e);
    }
  };

  const handleAddCitizenReport = async (report: CitizenReport) => {
    setCitizenReports((prev) => [report, ...prev]);
    showToast('Laporan warga Anda telah diterima oleh redaksi!');
    try {
      await setDoc(doc(db, 'citizenReports', report.id), report);
    } catch (e) {
      console.warn('Firestore report write notice:', e);
    }
  };

  // Admin Actions
  const handleAddArticle = async (newArt: Article) => {
    setArticles((prev) => [newArt, ...prev]);
    showToast('Berita baru berhasil diterbitkan!');
    try {
      await setDoc(doc(db, 'articles', newArt.id), newArt);
    } catch (e) {
      console.warn('Firestore article write notice:', e);
    }
  };

  const handleUpdateArticle = async (updatedArt: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updatedArt.id ? updatedArt : a)));
    showToast('Berita berhasil diperbarui!');
    try {
      await setDoc(doc(db, 'articles', updatedArt.id), updatedArt);
    } catch (e) {
      console.warn('Firestore article update notice:', e);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
    showToast('Berita berhasil dihapus.');
    try {
      await deleteDoc(doc(db, 'articles', articleId));
    } catch (e) {
      console.warn('Firestore article delete notice:', e);
    }
  };

  const handleUpdateAdSlot = (updatedSlot: AdSlot) => {
    setAdSlots((prev) => prev.map((s) => (s.id === updatedSlot.id ? updatedSlot : s)));
    showToast('Slot iklan berhasil diperbarui!');
  };

  const handleSubscribeAdSlot = (
    slotId: string,
    data: { brandName: string; bannerUrl: string; targetUrl: string; durationDays: number }
  ) => {
    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + data.durationDays);

    setAdSlots((prev) =>
      prev.map((s) => {
        if (s.id === slotId) {
          return {
            ...s,
            currentSponsor: {
              brandName: data.brandName,
              bannerUrl: data.bannerUrl,
              targetUrl: data.targetUrl,
              expiredAt: expiredDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
            }
          };
        }
        return s;
      })
    );
    showToast(`Slot iklan ${slotId} berhasil dilanggani untuk ${data.brandName}!`);
  };

  // Convert citizen report to published article
  const handlePublishCitizenReport = (report: CitizenReport) => {
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
      publishedAt: '19 Okt 2026, 15:30 WIB',
      readTime: '2 mnt baca',
      imageUrl: report.photoUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      imageCaption: `Kondisi lapangan yang dilaporkan warga di ${report.location}.`,
      viewsCount: 450,
      sharesCount: 30,
      tags: ['Lapor Warga', 'Aspirasi Daerah'],
      comments: []
    };

    setArticles((prev) => [newArt, ...prev]);
    setCitizenReports((prev) =>
      prev.map((r) => (r.id === report.id ? { ...r, status: 'published' } : r))
    );
    showToast('Laporan warga berhasil diterbitkan sebagai berita!');
  };

  const handleDeleteCitizenReport = (reportId: string) => {
    setCitizenReports((prev) => prev.filter((r) => r.id !== reportId));
    showToast('Laporan warga dihapus.');
  };

  // Filtered Articles for Portal
  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCategory === 'Semua' || art.category === activeCategory;
    const matchesTag = !selectedTag || art.tags.includes(selectedTag.replace('#', '')) || art.tags.some(t => selectedTag.includes(t));
    return matchesCat && matchesTag;
  });

  // Category, Theme & Anti-Buzzer Handlers
  const handleAddCategory = (newCat: CategoryItem) => {
    setCategories((prev) => [...prev, newCat]);
    showToast(`Kategori "${newCat.name}" berhasil ditambahkan ke portal!`);
  };

  const handleDeleteCategory = (catId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Kategori berhasil dihapus.');
  };

  const handleUpdateThemeConfig = (updated: PortalThemeConfig) => {
    setThemeConfig(updated);
    showToast('Pengaturan desain & warna portal berhasil disimpan!');
  };

  const handleUpdateAntiBuzzerConfig = (updated: AntiBuzzerConfig) => {
    setAntiBuzzerConfig(updated);
    showToast('Konfigurasi Perisai Anti-Buzzer berhasil diperbarui!');
  };

  const handleClearBuzzerLogs = () => {
    setBuzzerLogs([]);
    showToast('Riwayat log intersepsi buzzer berhasil dibersihkan.');
  };

  const handleLogBuzzerInterception = (log: BuzzerInterceptionLog) => {
    setBuzzerLogs((prev) => [log, ...prev]);
    setAntiBuzzerConfig((prev) => ({
      ...prev,
      interceptedCount: prev.interceptedCount + 1
    }));
  };

  const leadArticle = articles.find((a) => a.isHeadline) || articles[0];
  const secondaryArticles = articles.filter((a) => a.id !== leadArticle.id && a.isEditorPick).slice(0, 2);
  const headerAdSlot = adSlots.find((s) => s.position === 'header_leaderboard');
  const savedArticlesList = articles.filter((a) => savedIds.includes(a.id));

  // IF ADMIN VIEW MODE
  if (viewMode === 'admin') {
    return (
      <AdminPanel
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
        onExitAdmin={() => {
          window.location.hash = '';
          setViewMode('portal');
        }}
        darkMode={darkMode}
        customLogoUrl={customLogoUrl}
        onUpdateCustomLogo={(logo) => {
          setCustomLogoUrl(logo);
          if (logo) {
            localStorage.setItem('arun_news_custom_logo', logo);
            setToastMessage('Logo resmi lokal berhasil diperbarui!');
          } else {
            localStorage.removeItem('arun_news_custom_logo');
            setToastMessage('Logo dikembalikan ke simbol default!');
          }
          setTimeout(() => setToastMessage(null), 3000);
        }}
        laporConfig={laporConfig}
        onUpdateLaporConfig={(cfg) => {
          setLaporConfig(cfg);
          localStorage.setItem('arun_news_lapor_config', JSON.stringify(cfg));
          setToastMessage('Pengaturan Lapor Warga berhasil disimpan!');
          setTimeout(() => setToastMessage(null), 3000);
        }}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        themeConfig={themeConfig}
        onUpdateThemeConfig={handleUpdateThemeConfig}
        antiBuzzerConfig={antiBuzzerConfig}
        onUpdateAntiBuzzerConfig={handleUpdateAntiBuzzerConfig}
        buzzerLogs={buzzerLogs}
        onClearBuzzerLogs={handleClearBuzzerLogs}
      />
    );
  }

  // Theme and layout dynamic classes
  const getThemeBgClass = () => {
    switch (themeConfig.presetTheme) {
      case 'emerald_garuda':
        return darkMode ? 'bg-[#041a15]' : 'bg-[#062820]';
      case 'maroon_merdeka':
        return darkMode ? 'bg-[#1c050c]' : 'bg-[#2a0812]';
      case 'deep_sapphire':
        return darkMode ? 'bg-[#030c1a]' : 'bg-[#051329]';
      case 'classic_press':
        return darkMode ? 'bg-[#0b0f17]' : 'bg-[#111827]';
      case 'nusantara_navy':
      default:
        return darkMode ? 'bg-[#07162b]' : 'bg-[#0c2447]';
    }
  };

  // PORTAL VIEW MODE
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        themeConfig.primaryFont === 'serif' ? 'font-serif' : 'font-sans'
      } ${getThemeBgClass()} text-slate-100`}
      style={{
        // Expose dynamic accent color as CSS custom property
        ['--portal-accent' as any]: themeConfig.accentColor
      }}
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
        categoriesList={categories.map((c) => c.name)}
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

      {/* Real-time Browser Push Alert Manager */}
      <BrowserNotificationManager
        darkMode={darkMode}
        onSendTestToast={(msg) => {
          setToastMessage(msg);
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-400 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main News Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full text-white">
        {/* Front Page Featured Sections */}
        {activeCategory === 'Semua' && !selectedTag && (
          <>
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

            {/* Prakiraan Cuaca & Jadwal Transportasi Nusantara */}
            <PublicServicesWidget darkMode={darkMode} />

            {/* Terpopuler & Paling Banyak Dibahas (Peringkat 24 Jam Terakhir) */}
            <PopularAndTrendingSection
              articles={articles}
              onSelectArticle={(art) => setSelectedArticle(art)}
              darkMode={darkMode}
            />

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
                  {categories.find((c) => c.name === activeCategory)?.description || (
                    activeCategory === 'Politik' ? 'Liputan komprehensif, independen dan tepercaya mengenai dinamika parlemen, kebijakan pemerintah, dan peta politik Nusantara.' :
                    activeCategory === 'Daerah' ? 'Kabar dan perkembangan langsung dari pelosok Nusantara, pembangunan infrastruktur, budaya lokal, dan denyut nadi daerah.' :
                    activeCategory === 'Kriminal' ? 'Laporan penegakan hukum, pemberantasan kejahatan, dan investigasi kasus hukum dengan akurasi dan etika jurnalistik teruji.' :
                    activeCategory === 'Olahraga' ? 'Ulasan pertandingan, prestasi atlet kebanggaan Garuda, dan dinamika kompetisi olahraga nasional hingga internasional.' :
                    activeCategory === 'Legalitas' ? 'Profil dan keabsahan hukum resmi PT Arun Media Nusantara: SK Kemenkumham RI, NIB KBLI 63122, NPWP Perusahaan Pers, serta Sertifikasi Verifikasi Faktual Dewan Pers.' :
                    activeCategory === 'Ekonomi' ? 'Analisis komprehensif pasar modal, pergerakan IHSG, industri perbankan nasional, pembiayaan digital UMKM, investasi manufaktur hijau, dan denyut nadi perekonomian Nusantara.' :
                    activeCategory === 'Lapor Warga' ? 'Ruang suara dan advokasi jurnalisme warga. Laporkan kerusakan fasilitas publik, keluhan layanan, atau peristiwa di sekitar Anda.' :
                    activeCategory === 'Lain-lain' ? 'Ragam informasi gaya hidup, teknologi, fenomena terkini, dan serba-serbi Nusantara terhangat.' :
                    `Kumpulan berita terkini, investigasi mendalam, dan laporan faktual seputar ${activeCategory} dari seluruh pelosok Nusantara.`
                  )}
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

            {/* Kolom Opini & Esai Nusantara */}
            <OpiniEsaiSection
              onSelectArticle={(art) => setSelectedArticle(art)}
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

        {/* Langganan Newsletter Harian Arun News */}
        <DailyNewsletterSection darkMode={darkMode} />
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
        onScrollToVideo={() => {
          if (activeCategory !== 'Semua') {
            setActiveCategory('Semua');
          }
          setTimeout(() => {
            const el = document.getElementById('warta-video-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }}
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
          antiBuzzerConfig={antiBuzzerConfig}
          onLogBuzzer={handleLogBuzzerInterception}
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

      {/* WhatsApp Smart Share Modal (Gambar + Teks + Link) */}
      <WhatsAppShareModal
        article={shareModalArticle}
        isOpen={shareModalArticle !== null}
        onClose={() => setShareModalArticle(null)}
        darkMode={darkMode}
      />
    </div>
  );
}
