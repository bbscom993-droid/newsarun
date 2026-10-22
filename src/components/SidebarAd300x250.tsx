import { useState } from 'react';
import { Megaphone, ExternalLink, Sparkles, MessageCircle, Info } from 'lucide-react';
import { AdSlot } from '../data/newsData';

interface SidebarAd300x250Props {
  slot?: AdSlot;
  onSubscribeAdSlot?: (
    slotId: string,
    data: { brandName: string; bannerUrl: string; targetUrl: string; durationDays: number }
  ) => void;
  darkMode: boolean;
}

export default function SidebarAd300x250({
  slot,
  onSubscribeAdSlot,
  darkMode
}: SidebarAd300x250Props) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');

  const hotlinePhone = '0895626941900';
  const waAdUrl = `https://wa.me/62${hotlinePhone.replace(/^0/, '')}?text=Halo%20Divisi%20Iklan%20Arun%20News%2C%20saya%20tertarik%20memasang%20Iklan%20Sidebar%20300x250%20px`;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !bannerUrl.trim()) return;

    if (slot && onSubscribeAdSlot) {
      onSubscribeAdSlot(slot.id, {
        brandName,
        bannerUrl,
        targetUrl: targetUrl || '#',
        durationDays: 30
      });
    }
    setIsBookingOpen(false);
  };

  const isActive = !!slot?.currentSponsor?.bannerUrl;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Dimension Label */}
      <div className="w-[300px] flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-amber-400 mb-1.5 px-1">
        <span className="flex items-center gap-1">
          <Megaphone className="w-3 h-3 text-amber-400" />
          <span>Iklan Resmi Mitra (300 x 250 px)</span>
        </span>
        <span className="text-blue-300 font-mono">MREC IAB</span>
      </div>

      {/* Main 300x250 Container */}
      <div
        className={`w-[300px] h-[250px] rounded-xl overflow-hidden relative border shadow-xl flex flex-col justify-between transition-all ${
          darkMode
            ? 'bg-[#081b33] border-blue-800'
            : 'bg-[#0a2347] border-blue-700/80 shadow-2xl'
        }`}
      >
        {isActive && slot?.currentSponsor ? (
          // Active Ad Banner
          <a
            href={slot.currentSponsor.targetUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full relative group block"
          >
            <img
              src={slot.currentSponsor.bannerUrl}
              alt={slot.currentSponsor.brandName || 'Iklan Mitra Arun News'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white">
              <span className="text-xs font-black truncate max-w-[200px] bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                {slot.currentSponsor.brandName}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black flex items-center gap-1 shadow-xs">
                <span>Kunjungi</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          </a>
        ) : (
          // Vacant / Available Ad Slot
          <div className="w-full h-full p-4 flex flex-col justify-between text-white bg-gradient-to-br from-[#0c2448] via-[#0f2e5a] to-[#0c2448]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-blue-900/90 text-amber-300 text-[10px] font-black uppercase border border-amber-400/40">
                  Slot Tersedia
                </span>
                <span className="text-[10px] font-semibold text-blue-300">
                  300 x 250 px
                </span>
              </div>

              <h4 className="text-sm font-black text-white leading-tight mb-1.5">
                Ruang Iklan Sidebar Eksklusif
              </h4>

              <p className="text-[11px] text-blue-200 leading-relaxed">
                Tampilkan produk atau institusi Anda di hadapan <strong>250.000+ pembaca</strong> kritis dan pengambil keputusan setiap hari.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-blue-800/80">
              <a
                href={waAdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pesan via WhatsApp (Marketing)</span>
              </a>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-1.5 px-3 rounded-lg bg-blue-950 hover:bg-blue-900 text-amber-300 border border-amber-400/40 font-bold text-[11px] transition-colors"
              >
                Pasang Cepat di Sini
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Quick Booking */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a2347] border border-amber-400/60 rounded-2xl p-6 text-white shadow-2xl">
            <h3 className="text-base font-black uppercase text-amber-400 mb-1 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-400" />
              <span>Pasang Iklan Sidebar 300 x 250 px</span>
            </h3>
            <p className="text-xs text-blue-200 mb-4">
              Masukkan nama brand/instansi dan link materi banner untuk ditayangkan pada slot sidebar berita utama.
            </p>

            <form onSubmit={handleSubmitBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-blue-200">Nama Perusahaan / Brand:</label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Contoh: Bank BNI / Astra Agro / UMKM Juara"
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
                  placeholder="https://images.unsplash.com/... atau URL banner"
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
    </div>
  );
}
