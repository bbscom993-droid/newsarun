import { useState, useRef } from 'react';
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
  Image as ImageIcon,
  Video,
  Play,
  Film,
  Radio,
  Tv,
  Vote,
  Mail,
  Sparkles,
  RotateCcw,
  Clock,
  Send
} from 'lucide-react';
import {
  Article,
  AdSlot,
  CitizenReport,
  CoffeeTip,
  NewsCategory,
  LaporWargaConfig,
  CategoryItem,
  PortalThemeConfig,
  AntiBuzzerConfig,
  BuzzerInterceptionLog
} from '../data/newsData';

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
  categories?: CategoryItem[];
  onAddCategory?: (category: CategoryItem) => void;
  onDeleteCategory?: (categoryId: string) => void;
  themeConfig?: PortalThemeConfig;
  onUpdateThemeConfig?: (config: PortalThemeConfig) => void;
  antiBuzzerConfig?: AntiBuzzerConfig;
  onUpdateAntiBuzzerConfig?: (config: AntiBuzzerConfig) => void;
  buzzerLogs?: BuzzerInterceptionLog[];
  onClearBuzzerLogs?: () => void;
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
  // Streamlined focused tabs
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'articles'
    | 'video_stream'
    | 'ads'
    | 'poll'
    | 'newsletter'
    | 'reports'
    | 'coffee'
    | 'settings'
  >('overview');

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

  // Dedicated Video Upload & Live Streaming Manager State
  const [localVideoTitle, setLocalVideoTitle] = useState('');
  const [localVideoCategory, setLocalVideoCategory] = useState<NewsCategory>('Daerah');
  const [localVideoSummary, setLocalVideoSummary] = useState('');
  const [localVideoUrl, setLocalVideoUrl] = useState('');
  const [localVideoName, setLocalVideoName] = useState('');
  const [isLiveStream, setIsLiveStream] = useState(true);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState(false);

  // Portal settings state & Logo upload
  const [portalName, setPortalName] = useState('ARUN NEWS');
  const [portalSlogan, setPortalSlogan] = useState('Jembatan Media Nusantara');
  const [editorialEmail, setEditorialEmail] = useState('redaksi@arunnews.id');
  const [editorialPhone, setEditorialPhone] = useState('0895626941900');
  const [editorialAddress, setEditorialAddress] = useState('Gg Gaya, Pasar minggu, kec, Pasar minggu, Jakarta Selatan, DKI JAKARTA, Indonesia');
  const [logoFileName, setLogoFileName] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Local Ad Upload Form state (includes Sidebar 300x250)
  const [adBrandName, setAdBrandName] = useState('');
  const [adTargetUrl, setAdTargetUrl] = useState('');
  const [adBannerUrl, setAdBannerUrl] = useState('');
  const [adSlotPosition, setAdSlotPosition] = useState<AdSlot['position']>('sidebar_rectangle');
  const [adDurationDays, setAdDurationDays] = useState(30);
  const [adBannerFileName, setAdBannerFileName] = useState('');
  const [adUploadSuccess, setAdUploadSuccess] = useState(false);

  // Newsletter Subscribers list state
  const [newsletterSubs, setNewsletterSubs] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_newsletter_subscribers');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      { email: 'redaksi.mitra@antara.id', edition: 'kedua', date: '2026-10-22T08:15:00Z' },
      { email: 'investor.surya@bursa.co.id', edition: 'pagi', date: '2026-10-22T07:30:00Z' },
      { email: 'dewi.lestari@kompasianer.net', edition: 'sore', date: '2026-10-21T18:45:00Z' },
      { email: 'akademisi.ui@kampus.ac.id', edition: 'kedua', date: '2026-10-21T14:20:00Z' }
    ];
  });

  // Statistics
  const totalViews = articles.reduce((acc, a) => acc + a.viewsCount, 0);
  const totalTips = coffeeTips.reduce((acc, t) => acc + t.amount, 0);
  const pendingReportsCount = citizenReports.filter((r) => r.status === 'pending').length;
  const videoArticles = articles.filter((a) => a.isVideo || !!a.videoUrl);

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

  const openAddVideoArticle = () => {
    setEditingArticleId(null);
    setFormTitle('Warta Video: ');
    setFormCategory('Daerah');
    setFormSummary('Liputan video eksklusif dokumentasi peristiwa langsung oleh jurnalis Arun News...');
    setFormContent('Tayangan liputan video dokumentasi peristiwa langsung oleh tim jurnalis multimedia Arun News.');
    setFormAuthorName('Tim Liputan Video Arun News');
    setFormAuthorRole('Divisi Multimedia & Penyiaran');
    setFormImageUrl('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80');
    setFormVideoUrl('');
    setFormIsVideo(true);
    setVideoFileName('');
    setImageFileName('');
    setFormIsHeadline(false);
    setFormIsBreaking(false);
    setFormTags('Warta Video, Liputan Khusus, Streaming');
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

  // Local Video File Upload Handler for Form
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFileName(file.name);
    setFormIsVideo(true);
    const url = URL.createObjectURL(file);
    setFormVideoUrl(url);
  };

  // Dedicated Video Stream Local Upload Handler
  const handleDedicatedVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalVideoName(file.name);
    const url = URL.createObjectURL(file);
    setLocalVideoUrl(url);
  };

  // Publish Dedicated Video to Warta Video Section
  const handlePublishDedicatedVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localVideoTitle.trim() || !localVideoUrl) return;

    const newVideoArticle: Article = {
      id: `art-video-${Date.now()}`,
      title: localVideoTitle.trim(),
      slug: localVideoTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: localVideoCategory,
      summary: localVideoSummary.trim() || 'Siaran warta video dokumentasi dan liputan khusus Arun News.',
      content: [
        'Tayangan warta video eksklusif hasil liputan langsung dan dokumentasi lapangan tim jurnalisme multimedia Arun News.',
        'Seluruh materi visual telah melalui proses verifikasi faktual dan kepatuhan kode etik penyiaran jurnalistik.'
      ],
      keyPoints: [
        'Liputan video autentik diunggah langsung dari ruang redaksi.',
        'Dukungan siaran beresolusi tinggi dengan audio jernih.',
        'Hak cipta dan perlindungan jurnalistik PT Arun Media Nusantara.'
      ],
      author: {
        name: 'Tim Multimedia & Penyiaran',
        role: 'Redaktur Warta Video',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
      },
      publishedAt: 'Hari ini, Baru saja',
      readTime: 'Video 3:45 mnt',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
      imageCaption: `Dokumentasi video liputan: ${localVideoTitle}`,
      viewsCount: 1520,
      sharesCount: 180,
      isVideo: true,
      videoUrl: localVideoUrl,
      isBreaking: isLiveStream,
      tags: ['Warta Video', 'Liputan Khusus', 'Streaming', localVideoCategory],
      comments: []
    };

    onAddArticle(newVideoArticle);
    setVideoUploadSuccess(true);
    setTimeout(() => {
      setVideoUploadSuccess(false);
      setLocalVideoTitle('');
      setLocalVideoSummary('');
      setLocalVideoUrl('');
      setLocalVideoName('');
    }, 3000);
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

  // Create / Update Ad Slot with Local Banner (including 300x250 sidebar)
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

  // Save Portal Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Save Article (Add / Edit)
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    const contentParagraphs = formContent
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingArticleId) {
      const existing = articles.find((a) => a.id === editingArticleId);
      if (!existing) return;

      const updatedArticle: Article = {
        ...existing,
        title: formTitle,
        category: formCategory,
        summary: formSummary,
        content: contentParagraphs,
        author: {
          ...existing.author,
          name: formAuthorName,
          role: formAuthorRole
        },
        imageUrl: formImageUrl || existing.imageUrl,
        videoUrl: formIsVideo ? (formVideoUrl || existing.videoUrl) : undefined,
        isVideo: formIsVideo,
        isHeadline: formIsHeadline,
        isBreaking: formIsBreaking,
        tags: tagsArray.length > 0 ? tagsArray : existing.tags
      };
      onUpdateArticle(updatedArticle);
    } else {
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title: formTitle,
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: formCategory,
        summary: formSummary,
        content: contentParagraphs,
        keyPoints: [
          'Informasi resmi yang telah diverifikasi oleh tim redaksi Arun News.',
          'Diberitakan sesuai asas kepatutan dan Pedoman Pemberitaan Media Siber.',
          'Hak jawab dan klarifikasi terbuka bagi pihak berkepentingan.'
        ],
        author: {
          name: formAuthorName,
          role: formAuthorRole,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
        },
        publishedAt: 'Hari ini, Baru saja',
        readTime: formIsVideo ? 'Video 3 mnt' : '3 mnt baca',
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
        imageCaption: `Liputan dokumentasi: ${formTitle}`,
        viewsCount: 100,
        sharesCount: 15,
        isHeadline: formIsHeadline,
        isBreaking: formIsBreaking,
        isVideo: formIsVideo,
        videoUrl: formIsVideo ? formVideoUrl : undefined,
        tags: tagsArray.length > 0 ? tagsArray : ['Berita Terkini', 'Arun News'],
        comments: []
      };
      onAddArticle(newArticle);
    }

    setIsArticleModalOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#061527] text-white' : 'bg-[#071933] text-white'}`}>
      {/* Top Admin Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-3.5 border-b border-blue-800 bg-[#07162c] flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-xs font-bold text-amber-400 transition-colors border border-blue-700/80 shadow-xs"
            title="Kembali ke portal pembaca"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ke Portal Publik</span>
          </button>
          <div className="h-4 w-px bg-blue-800" />
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-base tracking-tight">ARUN <span className="text-amber-400">NEWS</span></span>
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black uppercase tracking-wider text-[10px]">
              PANEL REDAKSI RESMI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="hidden sm:inline text-blue-200">Hak Akses:</span>
          <span className="font-bold text-amber-300">Dewan Redaksi & Pemimpin Redaksi</span>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Admin Navigation Sidebar (3 cols) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="p-3 rounded-2xl border bg-[#081a33] border-blue-800 shadow-xl text-white">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-3 py-1.5 mb-1">
              Menu Utama Redaksi
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'overview'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
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
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
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

              {/* TAB: WARTA VIDEO & STREAMING AKTIF (UPLOAD DARI LOKAL) */}
              <button
                onClick={() => setActiveTab('video_stream')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'video_stream'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span>Warta Video & Streaming</span>
                </div>
                <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>{videoArticles.length} Video</span>
                </span>
              </button>

              {/* TAB: SLOT IKLAN (SIDEBAR 300x250 & LEADERBOARD) */}
              <button
                onClick={() => setActiveTab('ads')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'ads'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>Iklan Sidebar (300×250)</span>
              </button>

              {/* TAB: JAJAK PENDAPAT PUBLIK */}
              <button
                onClick={() => setActiveTab('poll')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'poll'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Vote className="w-4 h-4 text-amber-400" />
                <span>Jajak Pendapat Publik</span>
              </button>

              {/* TAB: LANGGANAN NEWSLETTER HARIAN */}
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'newsletter'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Langganan Newsletter</span>
                </div>
                <span className="text-[10px] bg-blue-950 text-amber-400 border border-amber-400/30 px-1.5 py-0.5 rounded font-bold">
                  {newsletterSubs.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'reports'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
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
                onClick={() => setActiveTab('coffee')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'coffee'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
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
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
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
                <div className="p-4 rounded-xl border bg-[#091f3d] border-blue-700/60 shadow-md">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-300">Total Berita</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">{articles.length}</div>
                  <div className="text-[10px] text-blue-300 mt-1">{articles.filter(a => a.isVideo).length} Warta Video</div>
                </div>

                <div className="p-4 rounded-xl border bg-[#091f3d] border-blue-700/60 shadow-md">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-300">Total Pembaca</div>
                  <div className="text-2xl font-black text-white mt-1">{(totalViews / 1000).toFixed(1)}k</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Tayangan 24 Jam</div>
                </div>

                <div className="p-4 rounded-xl border bg-[#091f3d] border-blue-700/60 shadow-md">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-300">Laporan Warga</div>
                  <div className="text-2xl font-black text-white mt-1">{citizenReports.length}</div>
                  <div className="text-[10px] text-amber-400 mt-1">{pendingReportsCount} Perlu Review</div>
                </div>

                <div className="p-4 rounded-xl border bg-[#091f3d] border-blue-700/60 shadow-md">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-300">Dana Sawer Kopi</div>
                  <div className="text-xl font-black text-amber-400 mt-1">Rp {(totalTips / 1000).toFixed(0)}k</div>
                  <div className="text-[10px] text-blue-300 mt-1">{coffeeTips.length} Donatur Pers</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-5 rounded-2xl bg-[#091f3d] border border-blue-700/60 space-y-3">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Aksi Cepat Redaksi</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={openAddArticle}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tulis Berita Baru</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('video_stream')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Video dari Komputer Lokal</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ads')}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-amber-300 border border-amber-400/40 font-bold text-xs rounded-xl transition-colors"
                  >
                    <Megaphone className="w-4 h-4" />
                    <span>Atur Iklan Sidebar 300×250</span>
                  </button>
                </div>
              </div>

              {/* Recent Articles Table Preview */}
              <div className="p-5 rounded-2xl bg-[#091f3d] border border-blue-700/60 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-blue-800">
                  <h3 className="font-extrabold text-sm text-white">5 Berita Terakhir Diterbitkan</h3>
                  <button onClick={() => setActiveTab('articles')} className="text-xs text-amber-400 hover:underline font-bold">
                    Lihat Semua Berita →
                  </button>
                </div>
                <div className="divide-y divide-blue-800/80">
                  {articles.slice(0, 5).map((art) => (
                    <div key={art.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-extrabold uppercase text-amber-300 bg-blue-950 px-1.5 py-0.5 rounded border border-amber-400/30 mr-2">
                          {art.category}
                        </span>
                        <span className="font-bold text-white truncate inline-block max-w-[400px] align-middle">
                          {art.title}
                        </span>
                      </div>
                      <span className="text-blue-300 tabular-nums shrink-0">{art.viewsCount.toLocaleString('id-ID')} views</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-blue-800 gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Manajemen Berita & Liputan ({articles.length})
                  </h3>
                  <p className="text-xs text-blue-200">
                    Kelola seluruh berita teks dan liputan video yang tayang di portal Arun News.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openAddArticle}
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tulis Berita Teks</span>
                  </button>

                  <button
                    onClick={openAddVideoArticle}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Video className="w-4 h-4" />
                    <span>+ Video Berita</span>
                  </button>
                </div>
              </div>

              {/* Articles Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-blue-100">
                  <thead className="bg-[#07162c] text-amber-400 uppercase text-[10px] font-black border-b border-blue-800">
                    <tr>
                      <th className="p-3">Judul Berita</th>
                      <th className="p-3">Kanal</th>
                      <th className="p-3">Format</th>
                      <th className="p-3">Pembaca</th>
                      <th className="p-3">Tanggal</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-800/60">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-blue-900/30 transition-colors">
                        <td className="p-3 font-bold text-white max-w-xs truncate">
                          {art.title}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-amber-300 text-[10px] font-extrabold border border-amber-400/30">
                            {art.category}
                          </span>
                        </td>
                        <td className="p-3">
                          {art.isVideo ? (
                            <span className="px-2 py-0.5 rounded bg-rose-600/40 text-rose-300 text-[10px] font-bold border border-rose-500/50">
                              📹 Video
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 text-[10px] font-bold">
                              📄 Teks
                            </span>
                          )}
                        </td>
                        <td className="p-3 tabular-nums font-semibold text-white">
                          {art.viewsCount.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-[11px] text-blue-300">
                          {art.publishedAt}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => openEditArticle(art)}
                            className="p-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-amber-300 border border-amber-400/30"
                            title="Edit Berita"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteArticle(art.id)}
                            className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/30"
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

          {/* TAB 3: WARTA VIDEO & STREAMING AKTIF (UPLOAD DARI LOKAL) */}
          {activeTab === 'video_stream' && (
            <div className="p-5 sm:p-6 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-6">
              <div className="pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span>Warta Video & Siaran Streaming Aktif</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Unggah Video dari Komputer / HP Lokal untuk Tayang di Portal
                </h3>
                <p className="text-xs text-blue-200">
                  Unggah berkas video liputan lokal (.mp4, .webm, .mov) dan aktifkan mode streaming siaran langsung untuk pemirsa Arun News.
                </p>
              </div>

              {videoUploadSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Video berhasil diunggah dan langsung tayang pada blok Warta Video & Liputan Khusus!</span>
                </div>
              )}

              {/* Upload Box Container */}
              <div className="p-5 rounded-2xl bg-[#0a2142] border-2 border-amber-400/80 shadow-2xl space-y-4">
                <h4 className="font-black text-sm text-amber-300 uppercase tracking-wide flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Pilih Berkas Video dari Penyimpanan Lokal</span>
                </h4>

                <form onSubmit={handlePublishDedicatedVideo} className="space-y-4 text-xs">
                  {/* File selector input */}
                  <div>
                    <label className="block font-bold text-white mb-1.5">
                      Pilih File Video Lokal (MP4, WebM, MOV):
                    </label>
                    <label className="cursor-pointer flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-amber-400/80 bg-blue-950 hover:bg-blue-900 transition-colors text-center group">
                      <Film className="w-8 h-8 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-black text-white">
                        {localVideoName ? localVideoName : 'Klik untuk Memilih File Video dari Laptop / HP Anda'}
                      </span>
                      <span className="text-[11px] text-blue-200 mt-1">
                        Format didukung: MP4, WebM, MKV, QuickTime. Video akan langsung diputar di player warta video.
                      </span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime,video/*"
                        onChange={handleDedicatedVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Video Live Preview if selected */}
                  {localVideoUrl && (
                    <div className="p-4 rounded-xl bg-black/60 border border-amber-400/60 space-y-2">
                      <div className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-amber-400" />
                        <span>Pratinjau Video Lokal yang Diunggah:</span>
                      </div>
                      <div className="relative aspect-[16/9] max-w-md mx-auto rounded-lg overflow-hidden bg-black shadow-md">
                        <video
                          src={localVideoUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Video Metadata Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-white mb-1">
                        Judul Tayangan Video:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Warta Video: Eksklusif Peresmian Jembatan Poros Nusantara"
                        value={localVideoTitle}
                        onChange={(e) => setLocalVideoTitle(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-700 bg-[#071933] text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white mb-1">
                        Kanal Kategori Berita:
                      </label>
                      <select
                        value={localVideoCategory}
                        onChange={(e) => setLocalVideoCategory(e.target.value as NewsCategory)}
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-700 bg-[#071933] text-white font-bold focus:outline-none focus:border-amber-400"
                      >
                        <option value="Politik" className="bg-[#071933]">Politik</option>
                        <option value="Daerah" className="bg-[#071933]">Daerah</option>
                        <option value="Kriminal" className="bg-[#071933]">Kriminal</option>
                        <option value="Ekonomi" className="bg-[#071933]">Ekonomi</option>
                        <option value="Olahraga" className="bg-[#071933]">Olahraga</option>
                        <option value="Legalitas" className="bg-[#071933]">Legalitas</option>
                        <option value="Lain-lain" className="bg-[#071933]">Lain-lain</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-white mb-1">
                      Deskripsi / Sinopsis Liputan Video:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ringkasan liputan visual yang ditampilkan..."
                      value={localVideoSummary}
                      onChange={(e) => setLocalVideoSummary(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Live Streaming Checkbox */}
                  <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-700/80 flex items-center justify-between">
                    <div>
                      <span className="font-black text-amber-300 block">
                        Tandai sebagai Siaran Langsung Streaming Aktif
                      </span>
                      <span className="text-[11px] text-blue-200">
                        Akan memunculkan badge merah berkedip "🔴 STREAMING AKTIF" di player utama portal.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isLiveStream}
                      onChange={(e) => setIsLiveStream(e.target.checked)}
                      className="w-5 h-5 text-amber-400 rounded accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!localVideoUrl}
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 fill-slate-950" />
                    <span>Publikasikan Video ke Warta Video & Liputan Khusus Portal</span>
                  </button>
                </form>
              </div>

              {/* Existing Video List */}
              <div className="space-y-3 pt-2">
                <h4 className="font-black text-xs text-amber-400 uppercase tracking-wider">
                  Daftar Warta Video Aktif di Portal ({videoArticles.length}):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {videoArticles.map((vid) => (
                    <div
                      key={vid.id}
                      className="p-3 rounded-xl bg-blue-950/70 border border-blue-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0 border border-amber-400/40">
                          <Play className="w-4 h-4 text-amber-400 ml-0.5" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-bold text-white truncate max-w-[260px]">{vid.title}</h5>
                          <span className="text-[10px] text-blue-300">{vid.category} · {vid.readTime}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteArticle(vid.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/50"
                        title="Hapus Video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AD SLOTS (HIGHLIGHT 300x250 SIDEBAR) */}
          {activeTab === 'ads' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-6">
              <div className="pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Megaphone className="w-4 h-4" />
                  <span>Manajemen Iklan Mitra & Ruang Iklan Sidebar 300 x 250 px</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Pengaturan Slot Iklan & Unggah Banner dari Komputer Lokal
                </h3>
                <p className="text-xs text-blue-200">
                  Kelola banner sponsor resmi, termasuk ruang iklan sidebar (300 x 250 px MREC) dan header leaderboard.
                </p>
              </div>

              {adUploadSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Banner iklan berhasil dipasang dan aktif tayang di portal!</span>
                </div>
              )}

              {/* Form Upload Iklan dari Lokal */}
              <div className="p-5 rounded-2xl bg-[#0a2142] border-2 border-amber-400/60 shadow-xl space-y-4">
                <h4 className="font-black text-sm text-amber-300 uppercase tracking-wide flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Unggah Banner Sponsor Resmi (300x250 px atau Leaderboard)</span>
                </h4>

                <form onSubmit={handleCreateAdWithLocalBanner} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-white mb-1">
                        Pilih Posisi Slot:
                      </label>
                      <select
                        value={adSlotPosition}
                        onChange={(e) => setAdSlotPosition(e.target.value as AdSlot['position'])}
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-700 bg-[#071933] text-white font-bold focus:outline-none focus:border-amber-400"
                      >
                        <option value="sidebar_rectangle" className="bg-[#071933] text-white">
                          Ruang Iklan Sidebar Kanan (300×250 px - MREC Standar)
                        </option>
                        <option value="header_leaderboard" className="bg-[#071933] text-white">
                          Banner Utama Atas (Leaderboard 728×90 px)
                        </option>
                        <option value="infeed_native" className="bg-[#071933] text-white">
                          Banner In-Feed Native (Antara Berita 600×120 px)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-white mb-1">
                        Nama Perusahaan / Brand Pengiklan:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bank BNI / Astra Agro"
                        value={adBrandName}
                        onChange={(e) => setAdBrandName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-white mb-1">
                        File Banner dari Komputer Lokal:
                      </label>
                      <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-amber-400/80 bg-blue-950 hover:bg-blue-900 transition-colors">
                        <Upload className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-300 font-semibold truncate">
                          {adBannerFileName || 'Pilih gambar banner (JPG, PNG)...'}
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
                        Link URL Tujuan / WhatsApp:
                      </label>
                      <input
                        type="url"
                        placeholder="https://mitra-iklan.com"
                        value={adTargetUrl}
                        onChange={(e) => setAdTargetUrl(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Pasang Banner ke Slot Iklan</span>
                  </button>
                </form>
              </div>

              {/* Slot Status List */}
              <div className="space-y-3">
                <h4 className="font-black text-xs text-amber-400 uppercase tracking-wider">
                  Status Seluruh Slot Iklan Portal:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adSlots.map((slot) => (
                    <div key={slot.id} className="p-4 rounded-xl bg-blue-950/80 border border-blue-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-white">{slot.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {slot.dimensions}
                        </span>
                      </div>
                      {slot.currentSponsor ? (
                        <div className="text-xs text-blue-200">
                          <span className="text-emerald-400 font-bold">✓ Aktif: {slot.currentSponsor.brandName}</span>
                          <p className="text-[10px] text-blue-300">Kedaluwarsa: {slot.currentSponsor.expiredAt}</p>
                        </div>
                      ) : (
                        <div className="text-xs text-blue-300 italic">Slot kosong (menampilkan CTA pasang iklan)</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: JAJAK PENDAPAT PUBLIK (SUARA PEMBACA) */}
          {activeTab === 'poll' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
              <div className="pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Vote className="w-4 h-4 text-amber-400" />
                  <span>Manajemen Jajak Pendapat Publik</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Suara Pembaca Arun News: Survei & Tabulasi Pendapat Warga
                </h3>
                <p className="text-xs text-blue-200">
                  Pantau respons partisipasi publik terhadap topik-topik krusial kebangsaan dan kebijakan publik.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0a2142] border border-blue-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Survei Aktif Saat Ini
                  </span>
                  <span className="text-xs font-bold text-amber-400">14.280+ Total Responden Warga</span>
                </div>

                <h4 className="text-sm font-black text-white leading-snug">
                  "Bagaimana penilaian Anda terhadap akselerasi hilirisasi industri nasional dan perlindungan hak-hak masyarakat daerah lingkar tambang saat ini?"
                </h4>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-950 border border-blue-800">
                    <span>1. Sangat Berdampak Nyata & Tepat Sasaran</span>
                    <span className="font-black text-amber-300">52% (7.840 Suara)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-950 border border-blue-800">
                    <span>2. Cukup Positif Namun Butuh Pengawasan Ketat</span>
                    <span className="font-black text-amber-300">27% (4.120 Suara)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-950 border border-blue-800">
                    <span>3. Belum Merata Dirasakan Masyarakat Bawah</span>
                    <span className="font-black text-amber-300">14% (2.150 Suara)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-950 border border-blue-800">
                    <span>4. Masih Memerlukan Evaluasi Regulasi Menyeluruh</span>
                    <span className="font-black text-amber-300">7% (890 Suara)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: LANGGANAN NEWSLETTER HARIAN */}
          {activeTab === 'newsletter' && (
            <div className="p-5 rounded-xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
              <div className="pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Daftar Langganan Newsletter Harian</span>
                </div>
                <h3 className="font-extrabold text-base text-white">
                  Pembaca Terdaftar Buletin Pagi (06:00 WIB) & Sore (17:00 WIB)
                </h3>
                <p className="text-xs text-blue-200">
                  Kelola dan pantau pertumbuhan pelanggan buletin berita investigasi Arun News.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-300">Total Pelanggan Terdaftar</div>
                  <div className="text-2xl font-black text-amber-400">34.824 Pembaca</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  +142 Minggu Ini
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-xs text-amber-400 uppercase tracking-wider">
                  Daftar Email Pelanggan Terkini:
                </h4>
                <div className="divide-y divide-blue-800 rounded-xl bg-blue-950/50 border border-blue-800 overflow-hidden">
                  {newsletterSubs.map((sub, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">{sub.email}</span>
                        <span className="text-[10px] text-blue-300 block">
                          Edisi: {sub.edition === 'pagi' ? 'Pagi (06:00 WIB)' : sub.edition === 'sore' ? 'Sore (17:00 WIB)' : 'Lengkap (Pagi & Sore)'}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                        Aktif
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CITIZEN REPORTS */}
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

          {/* TAB 8: COFFEE TIPS */}
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

          {/* TAB 9: SETTINGS & LOGO */}
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
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-sm font-bold text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-sm font-bold text-amber-400 focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">
                    Alamat Kantor Redaksi & Usaha:
                  </label>
                  <input
                    type="text"
                    value={editorialAddress}
                    onChange={(e) => setEditorialAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
                  />
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
                  placeholder="Ketik judul berita yang akurat dan menarik..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-blue-700 bg-[#071933] text-white font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white mb-1">
                    Kategori Berita:
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as NewsCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white font-bold focus:outline-none focus:border-amber-400"
                  >
                    <option value="Politik" className="bg-[#071933]">Politik</option>
                    <option value="Daerah" className="bg-[#071933]">Daerah</option>
                    <option value="Kriminal" className="bg-[#071933]">Kriminal</option>
                    <option value="Ekonomi" className="bg-[#071933]">Ekonomi</option>
                    <option value="Olahraga" className="bg-[#071933]">Olahraga</option>
                    <option value="Legalitas" className="bg-[#071933]">Legalitas</option>
                    <option value="Lain-lain" className="bg-[#071933]">Lain-lain</option>
                    <option value="Lapor Warga" className="bg-[#071933]">Lapor Warga</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-white mb-1">
                    Nama Penulis / Wartawan:
                  </label>
                  <input
                    type="text"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-white mb-1">
                  Ringkasan Eksekutif (Lead Berita):
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan singkat inti berita untuk cuplikan pembaca..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">
                  Naskah Berita Lengkap (Pisahkan paragraf dengan baris baru):
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Tuliskan naskah berita lengkap di sini..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-blue-700 bg-[#071933] text-white leading-relaxed focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Upload Foto & Upload Video dari Lokal */}
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-800 space-y-3">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Unggah Media dari Komputer / HP Lokal:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Foto Lokal */}
                  <div>
                    <label className="block font-bold text-white mb-1 text-[11px]">
                      Foto Utama Berita (Lokal):
                    </label>
                    <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-blue-600 bg-[#071933] hover:bg-blue-900 transition-colors">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 font-semibold truncate text-[11px]">
                        {imageFileName || 'Pilih foto lokal...'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Video Lokal */}
                  <div>
                    <label className="block font-bold text-white mb-1 text-[11px]">
                      Video Berita (Lokal - MP4, WebM):
                    </label>
                    <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-rose-500/80 bg-[#071933] hover:bg-rose-950/40 transition-colors">
                      <Film className="w-4 h-4 text-rose-400" />
                      <span className="text-rose-300 font-semibold truncate text-[11px]">
                        {videoFileName || 'Pilih video lokal...'}
                      </span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime,video/*"
                        onChange={handleVideoFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Video Checkbox & Status */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="is-video-check"
                    checked={formIsVideo}
                    onChange={(e) => setFormIsVideo(e.target.checked)}
                    className="w-4 h-4 text-rose-500 rounded accent-rose-500 cursor-pointer"
                  />
                  <label htmlFor="is-video-check" className="text-xs font-bold text-blue-100 cursor-pointer">
                    Tandai artikel ini sebagai Warta Video (akan tayang di blok video)
                  </label>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                  <input
                    type="checkbox"
                    checked={formIsHeadline}
                    onChange={(e) => setFormIsHeadline(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded accent-amber-400"
                  />
                  <span>Jadikan Headline Utama</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                  <input
                    type="checkbox"
                    checked={formIsBreaking}
                    onChange={(e) => setFormIsBreaking(e.target.checked)}
                    className="w-4 h-4 text-rose-500 rounded accent-rose-500"
                  />
                  <span>Breaking News Ticker</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-blue-800">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-blue-900 text-blue-200 font-bold hover:bg-blue-800 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition-colors shadow-md"
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
