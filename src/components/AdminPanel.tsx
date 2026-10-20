import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  Coffee,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Eye,
  ArrowLeft,
  X,
  ExternalLink,
  Upload,
  Image,
  Video,
  Play,
  Film,
  ShieldAlert,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { Article, AdSlot, CitizenReport, CoffeeTip, NewsCategory, LaporWargaConfig } from '../data/newsData';

interface AdminPanelProps {
  articles: Article[];
  onAddArticle: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  adSlots: AdSlot[];
  onUpdateAdSlot: (slot: AdSlot) => void;
  citizenReports: CitizenReport[];
  onPublishReport: (report: CitizenReport) => void;
  onDeleteReport: (reportId: string) => void;
  coffeeTips: CoffeeTip[];
  onExitAdmin: () => void;
  darkMode: boolean;
  customLogoUrl?: string;
  onUpdateCustomLogo: (logoUrl: string | undefined) => void;
  laporConfig: LaporWargaConfig;
  onUpdateLaporConfig: (config: LaporWargaConfig) => void;
}

export default function AdminPanel({
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  adSlots,
  onUpdateAdSlot,
  citizenReports,
  onPublishReport,
  onDeleteReport,
  coffeeTips,
  onExitAdmin,
  darkMode,
  customLogoUrl,
  onUpdateCustomLogo,
  laporConfig,
  onUpdateLaporConfig
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'reports' | 'lapor_settings' | 'ads' | 'coffee' | 'settings'>('overview');

  // Article Modal Form State (Add / Edit)
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<NewsCategory>('Politik');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('Redaksi Arun News');
  const [formAuthorRole, setFormAuthorRole] = useState('Jurnalis Redaksi');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsHeadline, setFormIsHeadline] = useState(false);
  const [formIsBreaking, setFormIsBreaking] = useState(false);
  const [formTags, setFormTags] = useState('');

  // Local Video & Image upload state for articles
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formIsVideo, setFormIsVideo] = useState(false);
  const [videoFileName, setVideoFileName] = useState('');
  const [imageFileName, setImageFileName] = useState('');

  // Portal settings state & Logo upload
  const [portalName, setPortalName] = useState('ARUN NEWS');
  const [portalSlogan, setPortalSlogan] = useState('Jembatan Media Nusantara');
  const [editorialEmail, setEditorialEmail] = useState('redaksi@arunnews.id');
  const [editorialPhone, setEditorialPhone] = useState('(021) 388-7200');
  const [logoFileName, setLogoFileName] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Local Ad Upload Form state
  const [adBrandName, setAdBrandName] = useState('');
  const [adTargetUrl, setAdTargetUrl] = useState('');
  const [adBannerUrl, setAdBannerUrl] = useState('');
  const [adSlotPosition, setAdSlotPosition] = useState<AdSlot['position']>('header_leaderboard');
  const [adDurationDays, setAdDurationDays] = useState(7);
  const [adBannerFileName, setAdBannerFileName] = useState('');
  const [adUploadSuccess, setAdUploadSuccess] = useState(false);

  // Lapor Warga Admin Settings State
  const [laporWA, setLaporWA] = useState(laporConfig.hotlineWA);
  const [laporEmail, setLaporEmail] = useState(laporConfig.emailAdvokasi);
  const [laporHours, setLaporHours] = useState(laporConfig.operatingHours);
  const [laporAutoApprove, setLaporAutoApprove] = useState(laporConfig.autoApprove);
  const [laporGuidelines, setLaporGuidelines] = useState(laporConfig.guidelines);
  const [laporCategories, setLaporCategories] = useState<string[]>(laporConfig.categories);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [laporSettingsSaved, setLaporSettingsSaved] = useState(false);

  // Statistics
  const totalViews = articles.reduce((acc, a) => acc + a.viewsCount, 0);
  const totalTips = coffeeTips.reduce((acc, t) => acc + t.amount, 0);
  const pendingReportsCount = citizenReports.filter((r) => r.status === 'pending').length;

  const openAddArticle = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormCategory('Politik');
    setFormSummary('');
    setFormContent('');
    setFormAuthorName('Redaksi Arun News');
    setFormAuthorRole('Wartawan Redaksi');
    setFormImageUrl('/src/assets/images/hero_headline_summit_1792424745951.jpg');
    setFormVideoUrl('');
    setFormIsVideo(false);
    setVideoFileName('');
    setImageFileName('');
    setFormIsHeadline(false);
    setFormIsBreaking(false);
    setFormTags('Arun News, Berita Terkini');
    setIsArticleModalOpen(true);
  };

  const openEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setFormTitle(art.title);
    setFormCategory(art.category);
    setFormSummary(art.summary);
    setFormContent(art.content.join('\n\n'));
    setFormAuthorName(art.author.name);
    setFormAuthorRole(art.author.role);
    setFormImageUrl(art.imageUrl);
    setFormVideoUrl(art.videoUrl || '');
    setFormIsVideo(!!art.isVideo || !!art.videoUrl);
    setVideoFileName('');
    setImageFileName('');
    setFormIsHeadline(!!art.isHeadline);
    setFormIsBreaking(!!art.isBreaking);
    setFormTags(art.tags.join(', '));
    setIsArticleModalOpen(true);
  };

  // Local Video File Upload Handler
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFileName(file.name);
    setFormIsVideo(true);
    // Create object URL or read as Data URL
    const url = URL.createObjectURL(file);
    setFormVideoUrl(url);
  };

  // Local Article Image File Upload Handler
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Local Logo Upload Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const url = event.target.result as string;
        onUpdateCustomLogo(url);
      }
    };
    reader.readAsDataURL(file);
  };

  // Local Ad Banner Upload Handler
  const handleAdBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAdBannerFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAdBannerUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Create / Update Ad Slot with Local Banner
  const handleCreateAdWithLocalBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adBrandName.trim()) return;

    const targetSlot = adSlots.find((s) => s.position === adSlotPosition) || adSlots[0];
    if (targetSlot) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + adDurationDays);
      const formattedDate = `${expiry.getDate()} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][expiry.getMonth()]} ${expiry.getFullYear()}`;

      onUpdateAdSlot({
        ...targetSlot,
        currentSponsor: {
          brandName: adBrandName.trim(),
          bannerUrl: adBannerUrl.trim() || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80',
          targetUrl: adTargetUrl.trim() || 'https://arunnews.id',
          expiredAt: formattedDate
        }
      });

      setAdUploadSuccess(true);
      setTimeout(() => {
        setAdUploadSuccess(false);
        setAdBrandName('');
        setAdTargetUrl('');
        setAdBannerUrl('');
        setAdBannerFileName('');
      }, 2500);
    }
  };

  // Save Lapor Warga Settings
  const handleSaveLaporSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: LaporWargaConfig = {
      hotlineWA: laporWA.trim() || '0812-3888-7200',
      emailAdvokasi: laporEmail.trim() || 'lapor@arunnews.id',
      operatingHours: laporHours.trim() || '24 Jam Nonstop Siaga Publik',
      autoApprove: laporAutoApprove,
      guidelines: laporGuidelines.trim(),
      categories: laporCategories.length > 0 ? laporCategories : laporConfig.categories
    };
    onUpdateLaporConfig(updated);
    setLaporSettingsSaved(true);
    setTimeout(() => setLaporSettingsSaved(false), 3000);
  };

  const handleAddLaporCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryInput.trim()) return;
    if (!laporCategories.includes(newCategoryInput.trim())) {
      setLaporCategories([...laporCategories, newCategoryInput.trim()]);
    }
    setNewCategoryInput('');
  };

  const handleRemoveLaporCategory = (catToRemove: string) => {
    if (laporCategories.length <= 1) return;
    setLaporCategories(laporCategories.filter((c) => c !== catToRemove));
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const contentParagraphs = formContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const tagList = formTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const hasVideo = !!formVideoUrl.trim() || formIsVideo;

    if (editingArticleId) {
      // Update existing
      const existing = articles.find((a) => a.id === editingArticleId);
      if (existing) {
        const updated: Article = {
          ...existing,
          title: formTitle.trim(),
          category: formCategory,
          summary: formSummary.trim(),
          content: contentParagraphs.length > 0 ? contentParagraphs : existing.content,
          imageUrl: formImageUrl.trim() || existing.imageUrl,
          isVideo: hasVideo,
          videoUrl: formVideoUrl.trim() || undefined,
          isHeadline: formIsHeadline,
          isBreaking: formIsBreaking,
          tags: tagList.length > 0 ? tagList : existing.tags,
          author: {
            ...existing.author,
            name: formAuthorName.trim() || existing.author.name,
            role: formAuthorRole.trim() || existing.author.role
          }
        };
        onUpdateArticle(updated);
      }
    } else {
      // Create new
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: formTitle.trim(),
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60),
        category: formCategory,
        summary: formSummary.trim(),
        content: contentParagraphs.length > 0 ? contentParagraphs : ['Laporan berita terbaru sedang diperbarui oleh redaksi Arun News.'],
        keyPoints: [
          'Laporan berita terkini yang diverifikasi oleh tim redaksi Arun News.',
          'Pembaruan berkala di lapangan secara cepat dan tepercaya.'
        ],
        author: {
          name: formAuthorName.trim() || 'Redaktur Arun News',
          role: formAuthorRole.trim() || 'Wartawan Berita',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
        },
        publishedAt: '19 Okt 2026, 15:00 WIB',
        readTime: hasVideo ? 'Video Berita' : '3 mnt baca',
        imageUrl: formImageUrl.trim() || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
        imageCaption: 'Dokumentasi liputan jurnalis Arun News.',
        isVideo: hasVideo,
        videoUrl: formVideoUrl.trim() || undefined,
        viewsCount: 120,
        sharesCount: 15,
        isHeadline: formIsHeadline,
        isBreaking: formIsBreaking,
        tags: tagList.length > 0 ? tagList : ['Arun News', formCategory],
        comments: []
      };
      onAddArticle(newArt);
    }

    setIsArticleModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c2447] text-white">
      {/* Top Admin Header */}
      <header className="bg-[#071933] text-white border-b border-blue-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-xs font-bold text-amber-400 transition-colors border border-blue-700/80"
            title="Kembali ke portal pembaca"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ke Portal Publik</span>
          </button>
          <div className="h-4 w-px bg-blue-800" />
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-base tracking-tight">ARUN <span className="text-amber-400">NEWS</span></span>
            <span className="text-xs bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black uppercase tracking-wider text-[10px]">
              PANEL REDAKSI & ADMIN
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="hidden sm:inline text-blue-200">Login sebagai:</span>
          <span className="font-bold text-amber-300">Pemimpin Redaksi</span>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Admin Navigation Sidebar (3 cols) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="p-3 rounded-2xl border bg-[#081a33] border-blue-800 shadow-xl text-white">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'overview'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span>Ringkasan Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('articles')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'articles'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Manajemen Berita</span>
                </div>
                <span className="text-[10px] bg-blue-950 text-amber-400 border border-amber-400/30 px-1.5 py-0.5 rounded font-bold">
                  {articles.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'reports'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Lapor Warga</span>
                </div>
                {pendingReportsCount > 0 && (
                  <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold">
                    {pendingReportsCount} Baru
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('lapor_settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'lapor_settings'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Pengaturan Lapor Warga</span>
              </button>

              <button
                onClick={() => setActiveTab('ads')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'ads'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>Slot Iklan & Upload Banner</span>
              </button>

              <button
                onClick={() => setActiveTab('coffee')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'coffee'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span>Sawer Kopi Donatur</span>
                </div>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">
                  {coffeeTips.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'settings'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Upload Logo & Identitas</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Admin Content Area (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border bg-[#0e2a52] border-blue-700/60 text-white shadow-md">
                  <div className="text-[11px] font-bold text-blue-200 uppercase">Total Berita</div>
                  <div className="text-2xl font-black text-amber-400 mt-1 tabular-nums">
                    {articles.length}
                  </div>
                  <div className="text-[10px] text-emerald-300 font-semibold mt-1">● Semua kanal aktif</div>
                </div>

                <div className="p-4 rounded-xl border bg-[#0e2a52] border-blue-700/60 text-white shadow-md">
                  <div className="text-[11px] font-bold text-blue-200 uppercase">Total Pembaca</div>
                  <div className="text-2xl font-black text-white mt-1 tabular-nums">
                    {totalViews.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-blue-300 mt-1">Impresi terakumulasi</div>
                </div>

                <div className="p-4 rounded-xl border bg-[#0e2a52] border-blue-700/60 text-white shadow-md">
                  <div className="text-[11px] font-bold text-blue-200 uppercase">Sawer Kopi Masuk</div>
                  <div className="text-2xl font-black text-amber-400 mt-1 tabular-nums">
                    Rp {totalTips.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-blue-300 mt-1">{coffeeTips.length} donatur setia</div>
                </div>

                <div className="p-4 rounded-xl border bg-[#0e2a52] border-blue-700/60 text-white shadow-md">
                  <div className="text-[11px] font-bold text-blue-200 uppercase">Lapor Warga</div>
                  <div className="text-2xl font-black text-rose-400 mt-1 tabular-nums">
                    {citizenReports.length}
                  </div>
                  <div className="text-[10px] text-rose-300 font-semibold mt-1">
                    {pendingReportsCount} perlu verifikasi
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent */}
              <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white">
                    Aksi Cepat Redaksi
                  </h3>
                  <button
                    onClick={openAddArticle}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-lg transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tulis Berita Baru</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Berita Terakhir Diterbitkan:</h4>
                  {articles.slice(0, 4).map((art) => (
                    <div
                      key={art.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-blue-800 bg-[#0e2a52] hover:bg-[#123567] transition-colors text-xs text-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-blue-950 text-amber-400 border border-amber-400/30 font-bold text-[10px] uppercase">
                          {art.category}
                        </span>
                        <span className="font-semibold text-white truncate max-w-md">
                          {art.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditArticle(art)}
                          className="p-1.5 text-blue-200 hover:text-amber-400"
                          title="Edit berita"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-blue-800 mb-4">
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Kelola Seluruh Berita ({articles.length})
                  </h3>
                  <p className="text-xs text-blue-200">
                    Kategori: Politik, Daerah, Kriminal, Lain-lain, Olahraga, Legalitas, Lapor Warga
                  </p>
                </div>
                <button
                  onClick={openAddArticle}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>Tambah Berita</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-white">
                  <thead>
                    <tr className="border-b border-blue-800 text-amber-400 uppercase text-[10px] font-bold">
                      <th className="pb-2.5">Judul Berita</th>
                      <th className="pb-2.5">Kategori</th>
                      <th className="pb-2.5">Penulis</th>
                      <th className="pb-2.5">Dibaca</th>
                      <th className="pb-2.5 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800/60">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-blue-900/40 transition-colors">
                        <td className="py-3 pr-4">
                          <div className="font-bold text-white line-clamp-1">
                            {art.title}
                          </div>
                          <div className="text-[10px] text-blue-300 mt-0.5">
                            {art.publishedAt} · {art.readTime}
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-amber-400 border border-amber-400/30 font-bold text-[10px]">
                            {art.category}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-blue-200 whitespace-nowrap">
                          {art.author.name}
                        </td>
                        <td className="py-3 pr-4 font-bold tabular-nums text-amber-300">
                          {art.viewsCount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 text-right whitespace-nowrap space-x-1">
                          <button
                            onClick={() => openEditArticle(art)}
                            className="p-1.5 rounded bg-blue-950 text-amber-400 border border-blue-700 hover:bg-blue-900 transition-colors"
                            title="Edit Berita"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteArticle(art.id)}
                            className="p-1.5 rounded bg-rose-950/60 text-rose-400 border border-rose-800 hover:bg-rose-900 transition-colors"
                            title="Hapus Berita"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CITIZEN REPORTS MODERATION */}
          {activeTab === 'reports' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl">
              <div className="pb-3 border-b border-blue-800 mb-4">
                <h3 className="font-extrabold text-base text-white">
                  Laporan Masuk dari Warga ({citizenReports.length})
                </h3>
                <p className="text-xs text-blue-200">
                  Verifikasi aspirasi dan kejadian lapangan dari masyarakat untuk diterbitkan di kanal Lapor Warga.
                </p>
              </div>

              <div className="space-y-3.5">
                {citizenReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 rounded-xl border bg-[#0e2a52] border-blue-700/60 flex flex-col sm:flex-row justify-between gap-4 text-white"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            report.status === 'published'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                              : report.status === 'verified'
                              ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {report.status === 'published'
                            ? 'Tayang di Portal'
                            : report.status === 'verified'
                            ? 'Terverifikasi'
                            : 'Menunggu Review'}
                        </span>
                        <span className="text-xs text-blue-300">{report.timestamp}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {report.title}
                      </h4>
                      <p className="text-xs text-blue-100 leading-relaxed">
                        {report.description}
                      </p>
                      <div className="text-[11px] text-blue-200 flex flex-wrap gap-x-3 gap-y-1 pt-1">
                        <span><strong>Lokasi:</strong> {report.location}</span>
                        <span><strong>Pelapor:</strong> {report.reporterName} ({report.reporterContact})</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                      {report.status !== 'published' && (
                        <button
                          onClick={() => onPublishReport(report)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Publikasikan</span>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteReport(report.id)}
                        className="px-3 py-1.5 text-rose-400 hover:bg-rose-950/60 text-xs font-semibold rounded-lg transition-colors border border-rose-900/60"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: LAPOR WARGA SETTINGS (PENGATURAN ADMIN) */}
          {activeTab === 'lapor_settings' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-6">
              <div className="pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Sliders className="w-4 h-4" />
                  <span>Pengaturan Resmi Kanal Lapor Warga</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Konfigurasi Layanan Pengaduan & Advokasi Publik
                </h3>
                <p className="text-xs text-blue-200">
                  Atur nomor kontak WhatsApp hotline, email verifikasi, jam siaga, serta daftar kategori laporan warga.
                </p>
              </div>

              {laporSettingsSaved && (
                <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Pengaturan Lapor Warga berhasil disimpan dan langsung aktif di portal!</span>
                </div>
              )}

              <form onSubmit={handleSaveLaporSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white mb-1">
                      Nomor WhatsApp Hotline Pengaduan:
                    </label>
                    <input
                      type="text"
                      value={laporWA}
                      onChange={(e) => setLaporWA(e.target.value)}
                      placeholder="Contoh: 0812-3888-7200"
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white font-mono font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white mb-1">
                      Email Khusus Advokasi Warga:
                    </label>
                    <input
                      type="email"
                      value={laporEmail}
                      onChange={(e) => setLaporEmail(e.target.value)}
                      placeholder="lapor@arunnews.id"
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white mb-1">
                      Jam Layanan Operasional:
                    </label>
                    <input
                      type="text"
                      value={laporHours}
                      onChange={(e) => setLaporHours(e.target.value)}
                      placeholder="24 Jam Nonstop Siaga Publik"
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white mb-1">
                      Mode Publikasi Laporan:
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                        <input
                          type="checkbox"
                          checked={laporAutoApprove}
                          onChange={(e) => setLaporAutoApprove(e.target.checked)}
                          className="w-4 h-4 text-amber-500 rounded"
                        />
                        <span className="text-blue-100">
                          {laporAutoApprove ? 'Publikasi Otomatis (Tanpa Moderasi)' : 'Moderasi Manual oleh Redaksi (Direkomendasikan)'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Kategori Laporan Manager */}
                <div className="p-4 rounded-xl bg-blue-950/70 border border-blue-800 space-y-3">
                  <div className="font-bold text-amber-300">
                    Daftar Kategori Pilihan Laporan Warga:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {laporCategories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2.5 py-1 rounded-lg bg-blue-900 border border-blue-700 text-white text-[11px] font-semibold flex items-center gap-1.5"
                      >
                        <span>{cat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLaporCategory(cat)}
                          className="text-rose-400 hover:text-rose-200"
                          title="Hapus Kategori"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Tambah kategori laporan baru..."
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-blue-700 bg-[#071933] text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddLaporCategory}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>

                {/* Guidelines */}
                <div>
                  <label className="block font-bold text-white mb-1">
                    Petunjuk Resmi & Jaminan Kerahasiaan Saksi:
                  </label>
                  <textarea
                    rows={3}
                    value={laporGuidelines}
                    onChange={(e) => setLaporGuidelines(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan Pengaturan Lapor Warga</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: AD SLOTS & LOCAL BANNER UPLOAD */}
          {activeTab === 'ads' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-6">
              <div className="pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Megaphone className="w-4 h-4" />
                  <span>Manajemen Iklan & Upload Banner Sponsor</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Posisi Kolom Iklan & Unggah Banner dari Komputer Lokal
                </h3>
                <p className="text-xs text-blue-200">
                  Unggah file gambar iklan langsung dari perangkat Anda dan tempatkan pada slot tayang strategis Arun News.
                </p>
              </div>

              {adUploadSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Banner iklan lokal berhasil diunggah dan aktif tayang di slot!</span>
                </div>
              )}

              {/* Form Upload Iklan dari Lokal */}
              <div className="p-5 rounded-2xl bg-[#0a2142] border-2 border-amber-400/60 shadow-xl space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-800">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <h4 className="font-black text-sm text-amber-300 uppercase tracking-wide">
                    Unggah Banner Iklan dari Lokal
                  </h4>
                </div>

                <form onSubmit={handleCreateAdWithLocalBanner} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-white mb-1">
                        Pilih File Gambar Banner (Lokal):
                      </label>
                      <label className="cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-amber-400/80 bg-blue-950 hover:bg-blue-900 transition-colors">
                        <Upload className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-300 font-semibold truncate">
                          {adBannerFileName || 'Pilih file banner (JPG, PNG, GIF, WEBP)...'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAdBannerUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block font-bold text-white mb-1">
                        Posisi Slot Tayang:
                      </label>
                      <select
                        value={adSlotPosition}
                        onChange={(e) => setAdSlotPosition(e.target.value as AdSlot['position'])}
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-700 bg-[#071933] text-white font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                      >
                        <option value="header_leaderboard" className="bg-[#071933] text-white">Banner Utama Atas (Leaderboard 728×90)</option>
                        <option value="sidebar_rectangle" className="bg-[#071933] text-white">Banner Sidebar Kanan (Medium Rectangle 300×250)</option>
                        <option value="infeed_native" className="bg-[#071933] text-white">Banner In-Feed Native (Antara Berita 600×120)</option>
                        <option value="footer_banner" className="bg-[#071933] text-white">Banner Bawah / Footer (970×90)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-white mb-1">
                        Nama Brand / Perusahaan Pengiklan:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: PT Semen Nusantara"
                        value={adBrandName}
                        onChange={(e) => setAdBrandName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white mb-1">
                        Target Link / URL Tujuan:
                      </label>
                      <input
                        type="url"
                        placeholder="https://perusahaan.co.id"
                        value={adTargetUrl}
                        onChange={(e) => setAdTargetUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white mb-1">
                        Masa Tayang:
                      </label>
                      <select
                        value={adDurationDays}
                        onChange={(e) => setAdDurationDays(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                      >
                        <option value={7} className="bg-[#071933]">7 Hari (1 Minggu)</option>
                        <option value={14} className="bg-[#071933]">14 Hari (2 Minggu)</option>
                        <option value={30} className="bg-[#071933]">30 Hari (1 Bulan)</option>
                      </select>
                    </div>
                  </div>

                  {/* Banner Preview */}
                  {adBannerUrl && (
                    <div className="p-3 rounded-xl bg-blue-950/80 border border-amber-400/50 space-y-2">
                      <div className="text-[11px] font-bold text-amber-400">Pratinjau Banner Lokal:</div>
                      <div className="max-h-28 overflow-hidden rounded-lg bg-black flex items-center justify-center">
                        <img
                          src={adBannerUrl}
                          alt="Pratinjau Banner Iklan"
                          className="max-h-28 w-auto object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Tayangkan Banner Iklan ke Portal Sekarang</span>
                  </button>
                </form>
              </div>

              {/* Status Slot Iklan Saat Ini */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                  Status 4 Slot Periklanan Aktif:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-4 rounded-xl border bg-[#0e2a52] border-blue-700/60 flex flex-col justify-between text-white"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                            {slot.dimensions}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              slot.currentSponsor
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                : 'bg-blue-950 text-blue-300 border border-blue-700'
                            }`}
                          >
                            {slot.currentSponsor ? 'Aktif Tayang' : 'Tersedia'}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-white">
                          {slot.name}
                        </h4>
                        <div className="text-xs font-semibold text-amber-300 mt-1">
                          Tarif: Rp {slot.pricePerWeek.toLocaleString('id-ID')} / minggu
                        </div>

                        {slot.currentSponsor ? (
                          <div className="mt-3 p-2.5 rounded-lg bg-blue-950/80 border border-blue-800 text-xs space-y-1.5">
                            <div className="font-bold text-amber-400">
                              Sponsor: {slot.currentSponsor.brandName}
                            </div>
                            <div className="text-[11px] text-blue-200 truncate">
                              Target: {slot.currentSponsor.targetUrl}
                            </div>
                            {slot.currentSponsor.bannerUrl && (
                              <div className="h-14 overflow-hidden rounded bg-black/40">
                                <img
                                  src={slot.currentSponsor.bannerUrl}
                                  alt={slot.currentSponsor.brandName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="text-[10px] text-emerald-400 font-semibold">
                              Berakhir pada: {slot.currentSponsor.expiredAt}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/80 text-xs text-blue-300 italic">
                            Slot ini siap dipesan oleh calon mitra pengiklan.
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-blue-800 flex items-center justify-between gap-2">
                        <label className="cursor-pointer text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Ganti Banner Lokal</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  onUpdateAdSlot({
                                    ...slot,
                                    currentSponsor: {
                                      brandName: slot.currentSponsor?.brandName || 'Sponsor Lokal',
                                      bannerUrl: event.target.result as string,
                                      targetUrl: slot.currentSponsor?.targetUrl || 'https://arunnews.id',
                                      expiredAt: '30 Hari ke depan'
                                    }
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="hidden"
                          />
                        </label>

                        {slot.currentSponsor && (
                          <button
                            onClick={() => {
                              onUpdateAdSlot({
                                ...slot,
                                currentSponsor: undefined
                              });
                            }}
                            className="text-xs text-rose-400 hover:underline font-semibold"
                          >
                            Hentikan Iklan
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COFFEE TIPS MANAGEMENT */}
          {activeTab === 'coffee' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl">
              <div className="pb-3 border-b border-blue-800 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-amber-400" />
                    <span>Catatan Sawer Kopi Pembaca</span>
                  </h3>
                  <p className="text-xs text-blue-200">
                    Total Dana Kopi Terkumpul: <strong className="text-amber-400">Rp {totalTips.toLocaleString('id-ID')}</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {coffeeTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="p-3.5 rounded-xl border bg-[#0e2a52] border-blue-700/60 flex items-center justify-between text-white"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">
                          {tip.supporterName}
                        </span>
                        <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black">
                          {tip.paymentMethod}
                        </span>
                        <span className="text-[11px] text-blue-300">{tip.timestamp}</span>
                      </div>
                      <p className="text-xs text-blue-100 mt-1 italic">
                        "{tip.message}"
                      </p>
                    </div>
                    <div className="text-sm font-black text-amber-400 tabular-nums">
                      +Rp {tip.amount.toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: UPLOAD LOGO & PORTAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-6">
              <div className="pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Settings className="w-4 h-4" />
                  <span>Branding & Logo Resmi Arun News</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Pengaturan Identitas Portal & Upload Logo Lokal
                </h3>
                <p className="text-xs text-blue-200">
                  Unggah file logo resmi dari komputer/HP lokal Anda, dan sesuaikan identitas nama media dan slogan 3D.
                </p>
              </div>

              {settingsSaved && (
                <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Pengaturan identitas dan logo portal berhasil diperbarui!</span>
                </div>
              )}

              {/* Box Upload Logo dari Lokal */}
              <div className="p-5 rounded-2xl bg-[#0a2142] border-2 border-amber-400/70 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-blue-800">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-amber-400" />
                    <h4 className="font-black text-sm text-amber-300 uppercase tracking-wide">
                      Upload Logo dari Penyimpanan Lokal
                    </h4>
                  </div>
                  {customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateCustomLogo(undefined);
                        setLogoFileName('');
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Kembalikan ke Logo Default</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-bold text-white mb-2">
                      Pilih Berkas Logo (PNG, JPG, SVG, WEBP):
                    </label>
                    <label className="cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-amber-400/80 bg-blue-950 hover:bg-blue-900 transition-colors text-center">
                      <Upload className="w-6 h-6 text-amber-400 mb-1" />
                      <span className="text-xs font-bold text-white">
                        {logoFileName ? logoFileName : 'Klik untuk Memilih File Logo dari Komputer / HP'}
                      </span>
                      <span className="text-[10px] text-blue-200 mt-1">
                        Disarankan format transparan (PNG/SVG) rasio persegi atau persegi panjang
                      </span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/svg+xml, image/webp"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Live 3D Typography & Logo Preview */}
                  <div className="p-4 rounded-xl bg-[#071933] border border-blue-800 space-y-2">
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Pratinjau Tampilan Header (Font 3D & Logo):
                    </div>
                    <div className="p-3 rounded-lg bg-[#0a1e3b] border border-blue-700/80 flex items-center gap-3 brand-3d-container">
                      {customLogoUrl ? (
                        <div className="h-11 max-w-[120px] rounded-lg overflow-hidden border border-amber-400/80 bg-[#071933] flex items-center justify-center p-0.5 shadow-md">
                          <img
                            src={customLogoUrl}
                            alt="Pratinjau Logo"
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center text-amber-400 font-black text-2xl shadow-lg border-2 border-amber-400/60">
                          <span className="tracking-tighter">A</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div className="flex items-center leading-none">
                          <span className="text-xl sm:text-2xl font-black tracking-tight text-3d-arun">
                            {portalName.split(' ')[0] || 'ARUN'}
                          </span>
                          <span className="text-xl sm:text-2xl font-black tracking-tight ml-1.5 text-3d-news">
                            {portalName.split(' ').slice(1).join(' ') || 'NEWS'}
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-1.5 mb-1 shadow-sm shadow-amber-400 animate-pulse" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-3d-tagline -mt-0.5">
                          {portalSlogan || 'Jembatan Media Nusantara'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-blue-300">
                      {customLogoUrl
                        ? '✓ Logo kustom dari lokal aktif digunakan pada Header, Footer & Dokumen Resmi.'
                        : 'Menggunakan logo simbol default Arun News.'}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white mb-1">
                      Nama Media Siber (3D Wordmark):
                    </label>
                    <input
                      type="text"
                      value={portalName}
                      onChange={(e) => setPortalName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-white mb-1">
                      Slogan / Tagline Resmi (3D Pop-up):
                    </label>
                    <input
                      type="text"
                      value={portalSlogan}
                      onChange={(e) => setPortalSlogan(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-sm font-bold text-amber-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white mb-1">
                      Email Resmi Redaksi:
                    </label>
                    <input
                      type="email"
                      value={editorialEmail}
                      onChange={(e) => setEditorialEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-white mb-1">
                      Telepon Redaksi / Hotline:
                    </label>
                    <input
                      type="text"
                      value={editorialPhone}
                      onChange={(e) => setEditorialPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan Perubahan Identitas Portal</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Article Creation / Editing Modal (With Local Video & Image Upload) */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl rounded-2xl border border-blue-700/80 shadow-2xl overflow-hidden my-auto bg-[#0a2142] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-blue-800 flex items-center justify-between bg-blue-950 text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {editingArticleId ? 'Edit Berita & Unggah Media' : 'Tulis Berita Baru & Unggah Media'}
                </h3>
              </div>
              <button onClick={() => setIsArticleModalOpen(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-5 sm:p-6 space-y-4 text-xs text-white max-h-[85vh] overflow-y-auto">
              <div>
                <label className="block font-bold text-white mb-1">
                  Judul Berita:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ketik judul berita yang lugas dan berimbang..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-white mb-1">
                    Kanal Kategori:
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as NewsCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                  >
                    <option value="Politik" className="bg-[#071933] text-white">Politik</option>
                    <option value="Daerah" className="bg-[#071933] text-white">Daerah</option>
                    <option value="Kriminal" className="bg-[#071933] text-white">Kriminal</option>
                    <option value="Lain-lain" className="bg-[#071933] text-white">Lain-lain</option>
                    <option value="Olahraga" className="bg-[#071933] text-white">Olahraga</option>
                    <option value="Legalitas" className="bg-[#071933] text-white">Legalitas</option>
                    <option value="Lapor Warga" className="bg-[#071933] text-white">Lapor Warga</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">
                    Nama Penulis / Redaktur:
                  </label>
                  <input
                    type="text"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-white mb-1">
                  Ringkasan / Deck (1-2 Paragraf Singkat):
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan intisari berita..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">
                  Konten Berita Lengkap (Pisahkan paragraf dengan baris kosong):
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Isi berita lengkap..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>

              {/* SECTION: UPLOAD VIDEO BERITA DARI LOKAL */}
              <div className="p-3.5 rounded-xl bg-blue-950/80 border border-amber-400/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                    <Video className="w-4 h-4 text-amber-400" />
                    <span>Upload Video Berita dari Lokal:</span>
                  </label>
                  {formVideoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormVideoUrl('');
                        setVideoFileName('');
                        setFormIsVideo(false);
                      }}
                      className="text-[11px] text-rose-400 hover:text-rose-300"
                    >
                      Hapus Video
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="cursor-pointer flex items-center gap-2 p-2.5 rounded-lg border-2 border-dashed border-blue-700 bg-[#071933] hover:bg-blue-900 transition-colors">
                    <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-[11px] text-blue-100 font-semibold truncate">
                      {videoFileName || 'Pilih Video Lokal (MP4, WebM)...'}
                    </span>
                    <input
                      type="file"
                      accept="video/mp4, video/webm, video/ogg, video/quicktime"
                      onChange={handleVideoFileUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Atau tautan URL video (opsional)..."
                    value={formVideoUrl}
                    onChange={(e) => {
                      setFormVideoUrl(e.target.value);
                      if (e.target.value) setFormIsVideo(true);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-[11px] text-white"
                  />
                </div>

                {/* Video Player Preview */}
                {formVideoUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-amber-400/50 bg-black aspect-video max-h-40 flex items-center justify-center">
                    <video
                      src={formVideoUrl}
                      controls
                      className="w-full h-full object-contain"
                    >
                      Browser tidak mendukung pemutar video.
                    </video>
                  </div>
                )}
              </div>

              {/* SECTION: UPLOAD GAMBAR UTAMA BERITA DARI LOKAL */}
              <div className="p-3.5 rounded-xl bg-blue-950/80 border border-blue-800 space-y-2.5">
                <label className="block font-bold text-white flex items-center gap-1.5 text-xs">
                  <Image className="w-4 h-4 text-amber-400" />
                  <span>Gambar Utama Berita / Thumbnail:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="cursor-pointer flex items-center gap-2 p-2.5 rounded-lg border-2 border-dashed border-blue-700 bg-[#071933] hover:bg-blue-900 transition-colors">
                    <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-[11px] text-blue-100 font-semibold truncate">
                      {imageFileName || 'Upload Gambar Lokal (JPG, PNG)...'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Atau URL gambar web..."
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-[11px] text-white"
                  />
                </div>

                {formImageUrl && (
                  <div className="h-20 w-32 rounded-lg overflow-hidden border border-blue-700 bg-black">
                    <img
                      src={formImageUrl}
                      alt="Pratinjau"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formIsHeadline}
                    onChange={(e) => setFormIsHeadline(e.target.checked)}
                    className="w-4 h-4 text-blue-900 rounded"
                  />
                  <span>Jadikan Headline Utama</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formIsBreaking}
                    onChange={(e) => setFormIsBreaking(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <span>Tayangkan di Flash News / Running Teks</span>
                </label>
              </div>

              <div className="pt-3 border-t border-blue-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 border border-blue-700 rounded-lg text-blue-200 hover:text-white font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg shadow-md transition-colors"
                >
                  {editingArticleId ? 'Perbarui Berita' : 'Terbitkan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
