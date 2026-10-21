import { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { Article } from '../data/newsData';

interface WhatsAppShareModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function WhatsAppShareModal({
  article,
  isOpen,
  onClose,
  darkMode
}: WhatsAppShareModalProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen || !article) return null;

  const origin = window.location.origin;
  const path = window.location.pathname;
  const deepLink = `${origin}${path}#article-${article.id}`;
  const fullImageUrl = article.imageUrl.startsWith('http')
    ? article.imageUrl
    : `${origin}${article.imageUrl}`;

  // Complete formatted WhatsApp message
  const shareMessage = `📰 *${article.title}*\n\n_${article.summary}_\n\n📸 *Foto Berita:* ${fullImageUrl}\n\n🔗 *Baca Selengkapnya di ARUN NEWS:*\n${deepLink}`;

  // 1. Direct Share (Supports attaching actual photo file on mobile & Web Share API)
  const handleShareDirect = async () => {
    setIsSharing(true);
    setStatusMessage('Menyiapkan gambar dan tautan berita...');

    // Try fetching the image to share as a real file attachment
    try {
      const response = await fetch(fullImageUrl, { mode: 'cors' });
      if (response.ok) {
        const blob = await response.blob();
        const file = new File(
          [blob],
          `${article.slug || 'arun-news-berita'}.jpg`,
          { type: blob.type || 'image/jpeg' }
        );

        // Check if Web Share API with files is supported
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: article.title,
            text: `📰 *${article.title}*\n\n_${article.summary}_\n\n🔗 *Baca Selengkapnya di ARUN NEWS:*\n${deepLink}`
          });
          setIsSharing(false);
          setStatusMessage('Berhasil dibagikan ke WhatsApp!');
          setTimeout(() => onClose(), 1500);
          return;
        }

        // Try copying image to clipboard for desktop WhatsApp Web
        if (navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ [blob.type || 'image/png']: blob })
            ]);
            setCopiedImage(true);
          } catch {
            // Ignore clipboard item failure
          }
        }
      }
    } catch (e) {
      console.log('File share fallback:', e);
    }

    // Fallback: Open WhatsApp directly with full formatted text including image URL & deep link
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank');
    setIsSharing(false);
    setStatusMessage('WhatsApp terbuka! Foto dan tautan telah disiapkan.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 2. Copy Image to Clipboard (For desktop Ctrl+V into WhatsApp Web)
  const handleCopyImageToClipboard = async () => {
    try {
      setStatusMessage('Menyalin foto berita...');
      const response = await fetch(fullImageUrl, { mode: 'cors' });
      const blob = await response.blob();

      // Convert to PNG if needed for clipboard
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = fullImageUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 450;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(async (pngBlob) => {
          if (pngBlob && navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': pngBlob })
            ]);
            setCopiedImage(true);
            setStatusMessage('✓ Foto berita berhasil disalin! Buka WhatsApp Web dan tekan Ctrl+V untuk menempelkan foto.');
            setTimeout(() => setCopiedImage(false), 3500);
          }
        }, 'image/png');
      }
    } catch {
      setStatusMessage('Gunakan tombol "Unduh Foto" untuk melampirkan secara manual di WhatsApp Web.');
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  // 3. Download Image
  const handleDownloadImage = async () => {
    try {
      setStatusMessage('Mengunduh foto berita...');
      const response = await fetch(fullImageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${article.slug || 'berita-arun-news'}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMessage('✓ Foto berhasil diunduh ke perangkat Anda!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      window.open(fullImageUrl, '_blank');
    }
  };

  // 4. Copy Full Text Format
  const handleCopyText = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopiedText(true);
    setStatusMessage('✓ Naskah lengkap & tautan berhasil disalin ke papan klip!');
    setTimeout(() => {
      setCopiedText(false);
      setStatusMessage(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden my-auto relative ${
          darkMode
            ? 'bg-[#081a33] border-blue-900 text-white'
            : 'bg-[#0a2142] border-blue-700/80 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-blue-800 bg-[#071933] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white">
                Bagikan ke WhatsApp
              </h3>
              <p className="text-[11px] text-emerald-300 font-semibold">
                Format Lengkap: Gambar + Teks Ringkasan + Link Berita
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-900 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Card Preview Berita */}
          <div className="rounded-xl overflow-hidden border border-blue-700/80 bg-[#06172d] shadow-lg">
            {/* Foto Berita */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img
                src={fullImageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white font-black text-[10px] uppercase shadow-md flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                <span>Foto Berita Siap Dikirim</span>
              </div>
            </div>

            {/* Info Teks Berita */}
            <div className="p-3.5 space-y-2">
              <span className="px-2 py-0.5 rounded bg-blue-900 text-amber-300 font-bold text-[10px] uppercase">
                {article.category}
              </span>
              <h4 className="font-extrabold text-sm text-white leading-snug">
                {article.title}
              </h4>
              <p className="text-blue-200 text-xs line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
              <div className="pt-2 border-t border-blue-800 text-[11px] font-mono text-amber-400 truncate flex items-center gap-1">
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="truncate">{deepLink}</span>
              </div>
            </div>
          </div>

          {/* Tips Info Box */}
          <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-700/60 text-blue-200 text-[11px] space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Cara Kerja Kirim Gambar + Teks ke WhatsApp:</span>
            </div>
            <p>
              • <strong>Di HP / Tablet:</strong> Mengirimkan langsung foto berita sebagai lampiran dengan judul, ringkasan, dan tautan di bagian takarir (*caption*).
            </p>
            <p>
              • <strong>Di Komputer / WhatsApp Web:</strong> Membuka WhatsApp Web dengan teks dan tautan gambar. Anda juga dapat menekan <strong>Salin Foto</strong> lalu langsung tekan <strong>Ctrl + V</strong> di kolom pesan WhatsApp.
            </p>
          </div>

          {/* Action Buttons Grid */}
          <div className="space-y-2 pt-1">
            {/* Main Action: Kirim ke WhatsApp */}
            <button
              onClick={handleShareDirect}
              disabled={isSharing}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 transform hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>
                {isSharing
                  ? 'Menyiapkan Pengiriman...'
                  : 'Kirim ke WhatsApp (Gambar + Teks + Link)'}
              </span>
            </button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Copy Image Button */}
              <button
                onClick={handleCopyImageToClipboard}
                className="py-2.5 px-3 rounded-xl bg-blue-900/90 hover:bg-blue-800 text-white border border-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                title="Salin foto untuk di-paste (Ctrl+V) langsung ke WhatsApp Web"
              >
                {copiedImage ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Salin Foto (Ctrl+V)</span>
              </button>

              {/* Download Image Button */}
              <button
                onClick={handleDownloadImage}
                className="py-2.5 px-3 rounded-xl bg-blue-900/90 hover:bg-blue-800 text-white border border-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                title="Unduh file foto berita resolusi tinggi"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Unduh Foto</span>
              </button>

              {/* Copy Text Button */}
              <button
                onClick={handleCopyText}
                className="py-2.5 px-3 rounded-xl bg-blue-900/90 hover:bg-blue-800 text-white border border-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                title="Salin teks judul, ringkasan, dan tautan lengkap"
              >
                {copiedText ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Salin Teks Lengkap</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
