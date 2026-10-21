import { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Printer,
  FileDown,
  FileText,
  Sparkles,
  Check,
  CheckCircle,
  ThumbsUp,
  Send,
  ArrowLeft,
  MessageSquare,
  Coffee,
  Video,
  Play
} from 'lucide-react';
import { Article, CommentItem } from '../data/newsData';
import WhatsAppShareModal from './WhatsAppShareModal';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  relatedArticles: Article[];
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  onAddComment: (articleId: string, comment: CommentItem) => void;
  onOpenSawerKopi: (articleTitle?: string) => void;
  darkMode: boolean;
}

export default function ArticleModal({
  article,
  onClose,
  onSelectArticle,
  relatedArticles,
  onToggleBookmark,
  isBookmarked,
  onAddComment,
  onOpenSawerKopi,
  darkMode
}: ArticleModalProps) {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [copiedLink, setCopiedLink] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [localLikes, setLocalLikes] = useState<{ [commentId: string]: number }>({});

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      // Sync URL hash for deep linking
      window.location.hash = `article-${article.id}`;
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  // Build the exact requested WhatsApp share message with Image + Text + Direct Deep Link
  const getArticleDeepLink = () => {
    const origin = window.location.origin;
    const path = window.location.pathname;
    return `${origin}${path}#article-${article.id}`;
  };

  const getFullShareMessage = () => {
    const deepLink = getArticleDeepLink();
    return `📰 *${article.title}*\n\n_${article.summary}_\n\n📸 *Foto Berita:* ${article.imageUrl.startsWith('http') ? article.imageUrl : window.location.origin + article.imageUrl}\n\n🔗 *Baca Selengkapnya di ARUN NEWS:*\n${deepLink}`;
  };

  const handleShareWhatsApp = () => {
    setIsWhatsAppModalOpen(true);
  };

  const handleCopyLink = () => {
    const deepLink = getArticleDeepLink();
    navigator.clipboard.writeText(deepLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyFullFormat = () => {
    const fullText = getFullShareMessage();
    navigator.clipboard.writeText(fullText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadPDF = () => {
    setActionToast('Menyiapkan naskah berita PDF... Silakan pilih opsi "Simpan sebagai PDF" (Save as PDF) pada jendela cetak.');
    setTimeout(() => {
      window.print();
    }, 300);
    setTimeout(() => setActionToast(null), 4000);
  };

  const handlePrint = () => {
    setActionToast('Membuka tata letak naskah resmi redaksi untuk dicetak...');
    setTimeout(() => {
      window.print();
    }, 300);
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleLikeComment = (cId: string, currentLikes: number) => {
    setLocalLikes((prev) => ({
      ...prev,
      [cId]: (prev[cId] !== undefined ? prev[cId] : currentLikes) + 1
    }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      author: commentName.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      timeAgo: 'Baru saja',
      content: commentText.trim(),
      likes: 0
    };

    onAddComment(article.id, newComment);
    setCommentName('');
    setCommentText('');
    setActionToast('Komentar Anda berhasil dikirim ke ruang tanggapan pembaca!');
    setTimeout(() => setActionToast(null), 3500);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm sm:text-base leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-xl leading-loose';
      case 'base':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-2xl border flex flex-col shadow-2xl overflow-hidden my-auto relative ${
          darkMode
            ? 'bg-[#081a33] border-blue-900/80 text-white'
            : 'bg-[#0a2142] border-blue-700/70 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header inside Modal */}
        <div
          className={`sticky top-0 z-20 px-4 sm:px-6 py-3 border-b flex items-center justify-between backdrop-blur-md ${
            darkMode ? 'bg-[#061426]/95 border-blue-900/80' : 'bg-[#071933]/95 border-blue-800/80 text-white'
          }`}
        >
          {/* Breadcrumb / Back */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onClose}
              className="flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
            <span className="text-blue-400" aria-hidden="true">/</span>
            <span className="text-blue-200 font-bold">{article.category}</span>
          </div>

          {/* Reading Actions & Adjusters */}
          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-blue-950 border border-blue-800 rounded-lg p-0.5 text-xs font-bold text-blue-200">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'sm' ? 'bg-amber-400 text-slate-950 font-black shadow-xs' : 'text-blue-200 hover:text-white'}`}
                title="Ukuran Teks Kecil"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'base' ? 'bg-amber-400 text-slate-950 font-black shadow-xs' : 'text-blue-200 hover:text-white'}`}
                title="Ukuran Teks Standar"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'lg' ? 'bg-amber-400 text-slate-950 font-black shadow-xs' : 'text-blue-200 hover:text-white'}`}
                title="Ukuran Teks Besar"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'border-blue-800 bg-blue-950 text-blue-200 hover:text-white hover:bg-blue-900'
              }`}
              title="Simpan Berita"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-950' : ''}`} />
            </button>

            {/* Unduh PDF Button */}
            <button
              onClick={handleDownloadPDF}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              title="Unduh Naskah Berita Format PDF"
            >
              <FileDown className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Unduh PDF</span>
            </button>

            {/* Cetak Naskah Berita Button */}
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-blue-700 bg-blue-900/90 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              title="Cetak Naskah Berita"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Cetak Naskah</span>
            </button>

            {/* WhatsApp Direct Share Button */}
            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
              title="Bagikan ke WhatsApp (Format Gambar + Teks + Link)"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg border border-blue-800 bg-blue-950 text-blue-200 hover:text-white hover:bg-blue-900 transition-colors"
              title="Salin Tautan Langsung"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-blue-900 transition-colors"
              aria-label="Tutup artikel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copy toast indicator */}
        {copiedLink && (
          <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center font-bold animate-in fade-in">
            ✓ Tautan langsung dan format berita berhasil disalin ke papan klip!
          </div>
        )}

        {/* Action toast indicator (PDF, Cetak, Komentar) */}
        {actionToast && (
          <div className="bg-blue-900 text-amber-300 text-xs py-1.5 px-4 text-center font-bold border-b border-amber-400/30 flex items-center justify-center gap-1.5 animate-in fade-in">
            <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{actionToast}</span>
          </div>
        )}

        {/* Scrollable Article Body with high contrast black typography */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 print-article-container">
          {/* OFFICIAL DOCUMENT LETTERHEAD (PRINT / PDF ONLY) */}
          <div className="hidden print:block pb-4 mb-4 border-b-2 border-black">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-black tracking-tight">ARUN NEWS</h1>
                <p className="text-xs uppercase font-extrabold tracking-wider text-gray-700">Jembatan Media Nusantara</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Terverifikasi Faktual Dewan Pers RI · SK Kemenkumham: AHU-0029182.AH.01.01.TAHUN 2024</p>
              </div>
              <div className="text-right text-[10px] text-gray-700 leading-tight">
                <p className="font-bold">KANTOR REDAKSI:</p>
                <p>Gg Gaya, Pasar minggu, kec, Pasar minggu</p>
                <p>Jakarta Selatan, DKI JAKARTA, Indonesia</p>
                <p className="font-bold text-black mt-1">Hotline Redaksi: 0895626941900</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-dashed border-gray-400 flex justify-between text-[10px] text-gray-600">
              <span>DOKUMEN NASKAH RESMI PERS · ARSIP DIGITAL</span>
              <span>Kanal: {article.category} · Tanggal Rilis: {article.publishedAt}</span>
            </div>
          </div>
          {/* Category & Status Header */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-blue-900 text-amber-400 font-black text-xs tracking-wider uppercase rounded shadow-xs">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[11px] uppercase rounded">
                TERKINI
              </span>
            )}
          </div>

          {/* Primary Editorial Headline in sharp white */}
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial tracking-tight text-white leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          {/* Byline & Metadata Card */}
          <div className="flex items-center justify-between pb-4 border-b border-blue-800/80 text-xs">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <div className="font-black text-white text-sm">
                  {article.author.name}
                </div>
                <div className="text-blue-200 font-semibold">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="text-right text-blue-200 space-y-1 font-semibold">
              <div>{article.publishedAt}</div>
              <div className="flex items-center justify-end gap-2 tabular-nums">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {article.readTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-amber-400" />
                  {article.viewsCount.toLocaleString('id-ID')} views
                </span>
              </div>
            </div>
          </div>

          {/* Key takeaways box */}
          {article.keyPoints && article.keyPoints.length > 0 && (
            <div className="p-4 rounded-2xl bg-blue-950/90 border border-blue-700/80 text-blue-100">
              <div className="flex items-center gap-1.5 font-black text-amber-400 text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 fill-amber-400" />
                <span>Ringkasan Kilat Redaksi Arun News</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-blue-100 font-medium">
                {article.keyPoints.map((point, index) => (
                  <li key={index} className="leading-snug">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Featured Article Video or Photo */}
          {article.videoUrl ? (
            <div className="space-y-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black border-2 border-amber-400/80 shadow-2xl">
                <video
                  src={article.videoUrl}
                  controls
                  playsInline
                  poster={article.imageUrl}
                  className="w-full h-full object-contain"
                >
                  Browser Anda tidak mendukung pemutar video HTML5.
                </video>
              </div>
              <p className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                <Video className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Tayangan Video Berita Resmi Arun News: {article.imageCaption || article.title}</span>
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-900 border border-blue-700/60 shadow-xl">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-blue-300 italic font-medium">
                {article.imageCaption} (Foto: Dokumentasi Jurnalistik Arun News)
              </p>
            </div>
          )}

          {/* Article Prose with Drop-cap */}
          <div className={`space-y-5 text-blue-50 max-w-prose mx-auto font-normal ${getFontSizeClass()}`}>
            {article.content.map((paragraph, idx) => {
              if (idx === 0) {
                return (
                  <p
                    key={idx}
                    className="first-letter:text-5xl first-letter:font-editorial first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-400"
                  >
                    {paragraph}
                  </p>
                );
              }

              if (idx === 2) {
                return (
                  <div key={idx} className="space-y-4">
                    <blockquote className="my-6 py-4 px-6 border-y-2 border-amber-400 bg-blue-950/70 text-center rounded-xl">
                      <p className="font-editorial italic text-lg sm:text-xl text-amber-200 font-bold">
                        "{paragraph.slice(0, 110)}..."
                      </p>
                      <cite className="block text-xs uppercase tracking-wider text-blue-300 mt-2 not-italic font-sans font-bold">
                        — Laporan Liputan Redaksi Arun News
                      </cite>
                    </blockquote>
                    <p>{paragraph}</p>
                  </div>
                );
              }

              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Quick Actions Bar: Unduh PDF & Cetak Naskah Berita */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-[#0a2347] to-blue-950 border border-blue-700/80 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-black text-sm text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Dokumentasi Resmi & Publikasi Berita</span>
                </h4>
                <p className="text-xs text-blue-200">
                  Unduh naskah berita dalam format PDF arsip atau cetak naskah langsung untuk referensi dan arsip redaksi.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadPDF}
                  className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  title="Unduh format PDF dokumen berita"
                >
                  <FileDown className="w-3.5 h-3.5 text-slate-950" />
                  <span>Unduh PDF</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs border border-blue-700 flex items-center gap-1.5 transition-colors shadow-xs"
                  title="Cetak lembar naskah berita resmi"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>Cetak Naskah</span>
                </button>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Share Bar with requested format */}
          <div className="p-4 rounded-2xl bg-blue-950 border border-blue-700/80 space-y-3 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="font-black text-sm text-white flex items-center gap-2">
                  <span>Bagikan Berita Lengkap ke WhatsApp</span>
                </h4>
                <p className="text-xs text-blue-200">
                  Format otomatis mencakup Gambar, Teks Ringkasan, dan Link langsung yang dapat dibuka penerima.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Kirim ke WhatsApp</span>
                </button>
                <button
                  onClick={handleCopyFullFormat}
                  className="px-3 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl border border-blue-700 transition-colors"
                  title="Salin teks format WhatsApp"
                >
                  Salin Teks Format
                </button>
              </div>
            </div>

            {/* Direct Deep Link Display */}
            <div className="p-2.5 rounded-lg bg-[#071933] border border-blue-800 text-xs font-mono text-amber-400 truncate">
              {getArticleDeepLink()}
            </div>
          </div>

          {/* Kolom Komentar Setiap Berita */}
          <div className="pt-6 border-t border-blue-800/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-lg font-black text-white">
                    Kolom Komentar & Diskusi Publik ({article.comments.length})
                  </h3>
                  <p className="text-[11px] text-blue-300">
                    Sampaikan pandangan, masukan, dan tanggapan berimbang Anda atas liputan ini.
                  </p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900 text-amber-300 border border-amber-400/30 font-bold">
                Moderasi Aktif
              </span>
            </div>

            <form onSubmit={handleSubmitComment} className="mb-6 space-y-3">
              <input
                type="text"
                required
                placeholder="Nama Lengkap Anda"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
              <textarea
                required
                rows={3}
                placeholder="Sampaikan komentar Anda secara santun..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Komentar</span>
              </button>
            </form>

            <div className="space-y-3">
              {article.comments.map((comment) => {
                const likes = localLikes[comment.id] !== undefined ? localLikes[comment.id] : comment.likes;
                return (
                  <div
                    key={comment.id}
                    className="p-3.5 rounded-xl border border-blue-700/60 bg-[#0c2447] text-white"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-7 h-7 rounded-full object-cover border border-amber-400"
                        />
                        <span className="font-bold text-xs text-white">
                          {comment.author}
                        </span>
                      </div>
                      <span className="text-[11px] text-blue-300">{comment.timeAgo}</span>
                    </div>
                    <p className="text-xs text-blue-100 font-medium leading-relaxed mb-2">
                      {comment.content}
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleLikeComment(comment.id, comment.likes)}
                        className="flex items-center gap-1 text-[11px] font-bold text-blue-200 hover:text-amber-400 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3 text-amber-400" />
                        <span>{likes} Suka</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OFFICIAL PRINT & PDF FOOTER */}
          <div className="hidden print:block pt-4 mt-6 border-t-2 border-black text-[10px] text-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-black uppercase">PT ARUN MEDIA NUSANTARA · DILINDUNGI UNDANG-UNDANG</p>
                <p>Naskah ini merupakan salinan dokumen resmi berita yang dipublikasikan oleh Redaksi Arun News.</p>
                <p>Alamat: Gg Gaya, Pasar minggu, kec, Pasar minggu, Jakarta Selatan, DKI JAKARTA, Indonesia</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-black">Hotline Redaksi: 0895626941900</p>
                <p>Email: redaksi@arunnews.id · Portal: arunnews.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING SAWER KOPI BUTTON INSIDE READER MODAL (Requested) */}
        <div className="sticky bottom-4 right-4 self-end z-30 mr-4 mb-4 print:hidden">
          <button
            onClick={() => onOpenSawerKopi(article.title)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-full shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white ring-2 ring-amber-400/50"
            title="Traktir Kopi untuk Jurnalis Peliput"
          >
            <Coffee className="w-4 h-4 fill-slate-950 animate-bounce" />
            <span>Sawer Kopi Redaksi</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Smart Share Modal (Gambar + Teks + Link) */}
      <WhatsAppShareModal
        article={article}
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
