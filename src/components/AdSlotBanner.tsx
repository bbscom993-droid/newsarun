import { useState } from 'react';
import { Megaphone, ExternalLink, Sparkles, CheckCircle2, X } from 'lucide-react';
import { AdSlot } from '../data/newsData';

interface AdSlotBannerProps {
  slot: AdSlot;
  onSubscribe: (slotId: string, sponsorData: { brandName: string; bannerUrl: string; targetUrl: string; durationDays: number }) => void;
  darkMode: boolean;
}

export default function AdSlotBanner({ slot, onSubscribe, darkMode }: AdSlotBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [duration, setDuration] = useState<7 | 14 | 30>(7);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateTotal = () => {
    const base = slot.pricePerWeek;
    if (duration === 7) return base;
    if (duration === 14) return Math.round(base * 2 * 0.9); // 10% disc
    return Math.round(base * (30 / 7) * 0.8); // 20% disc
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    const finalBanner = bannerUrl.trim() || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80';
    const finalUrl = targetUrl.trim() || 'https://arunnews.id';

    onSubscribe(slot.id, {
      brandName: brandName.trim(),
      bannerUrl: finalBanner,
      targetUrl: finalUrl,
      durationDays: duration
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsModalOpen(false);
    setBrandName('');
    setTargetUrl('');
    setBannerUrl('');
  };

  // Rendering styles according to slot position
  const getContainerStyle = () => {
    switch (slot.position) {
      case 'header_leaderboard':
        return 'w-full max-w-4xl mx-auto my-3 min-h-[90px]';
      case 'sidebar_rectangle':
        return 'w-full min-h-[220px] my-4';
      case 'infeed_native':
        return 'w-full my-4 min-h-[100px]';
      case 'footer_banner':
        return 'w-full max-w-5xl mx-auto my-6 min-h-[90px]';
    }
  };

  return (
    <>
      <div
        className={`relative rounded-xl border overflow-hidden transition-all ${getContainerStyle()} ${
          darkMode ? 'bg-[#061426] border-blue-900/80 text-white' : 'bg-[#0e2a52] border-blue-700/70 text-white shadow-md'
        }`}
      >
        {slot.currentSponsor ? (
          /* Active Sponsor Banner */
          <div className="relative group w-full h-full flex flex-col justify-between overflow-hidden">
            <a
              href={slot.currentSponsor.targetUrl}
              target="_blank"
              rel="noreferrer"
              className="relative block w-full h-36 sm:h-28 overflow-hidden bg-slate-900"
            >
              <img
                src={slot.currentSponsor.bannerUrl}
                alt={slot.currentSponsor.brandName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                <span className="font-extrabold text-xs sm:text-sm drop-shadow-sm">
                  {slot.currentSponsor.brandName}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded shadow-xs">
                  <span>Kunjungi</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* Position info bar with subscribe trigger */}
            <div className="px-3 py-1.5 flex items-center justify-between text-[11px] bg-blue-950/90 border-t border-blue-800/80 text-blue-200">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  IKLAN RESMI
                </span>
                <span aria-hidden="true" className="text-blue-400">·</span>
                <span className="text-white font-semibold">{slot.name}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="font-bold text-amber-400 hover:text-amber-300 hover:underline"
              >
                Pasang di Pos Ini →
              </button>
            </div>
          </div>
        ) : (
          /* Empty / Available Ad Slot */
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left h-full text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/40">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  SLOT IKLAN TERSEDIA · {slot.dimensions}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {slot.name}
                </h4>
                <p className="text-[11px] text-blue-200">
                  Jangkau puluhan ribu pembaca aktif Arun News setiap hari.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-blue-200">Mulai dari</div>
                <div className="text-xs font-black text-amber-400 tabular-nums">
                  Rp {slot.pricePerWeek.toLocaleString('id-ID')} / mg
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-lg transition-colors shadow-xs"
              >
                Langganan Pos Iklan Ini
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ad Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex justify-center p-4 sm:p-6 animate-in fade-in duration-150">
          <div
            className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden my-auto ${
              darkMode ? 'bg-[#081a33] border-blue-900/80 text-white' : 'bg-[#0a203f] border-blue-800 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-blue-800/80 flex items-center justify-between bg-blue-950 text-white">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm">
                  Langganan Pos Iklan: {slot.name}
                </h3>
              </div>
              <button onClick={handleClose} className="p-1 text-blue-200 hover:text-amber-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-400/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-white">
                  Langganan Iklan Berhasil Dikonfirmasi!
                </h4>
                <p className="text-xs text-blue-200 max-w-sm mx-auto leading-relaxed">
                  Iklan dari <strong>{brandName}</strong> untuk posisi <strong>{slot.name}</strong> telah aktif selama {duration} hari di jaringan portal Arun News.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl"
                >
                  Selesai & Lihat Tayangan
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="p-5 sm:p-6 space-y-4 text-white">
                <div className="p-3 rounded-lg bg-blue-950/80 border border-blue-800 text-xs text-blue-200">
                  <div className="font-bold text-amber-400">
                    Spesifikasi Posisi: {slot.dimensions}
                  </div>
                  <div>Rata-rata impresi: 120.000+ tayangan per minggu di seluruh kanal Nusantara.</div>
                </div>

                {/* Duration Picker */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Pilih Durasi Penayangan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { days: 7 as const, label: '7 Hari', disc: 'Reguler' },
                      { days: 14 as const, label: '14 Hari', disc: 'Hemat 10%' },
                      { days: 30 as const, label: '30 Hari', disc: 'Hemat 20%' }
                    ].map((d) => (
                      <button
                        key={d.days}
                        type="button"
                        onClick={() => setDuration(d.days)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          duration === d.days
                            ? 'border-amber-400 bg-amber-400 text-slate-950 font-black shadow-xs'
                            : 'border-blue-800 bg-blue-950/60 text-blue-200 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{d.label}</div>
                        <div className={`text-[10px] ${duration === d.days ? 'text-slate-900 font-extrabold' : 'text-blue-300'}`}>
                          {d.disc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand name */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Nama Usaha / Brand Pengiklan:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: PT Nusantara Solusi Digital"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-blue-950 text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                  />
                </div>

                {/* Target URL */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Tautan / Website Tujuan:
                  </label>
                  <input
                    type="url"
                    placeholder="https://website-anda.com atau link WhatsApp bisnis"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-blue-950 text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                  />
                </div>

                {/* Banner Image URL (Preset / Custom) */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    URL Gambar Spanduk / Banner:
                  </label>
                  <input
                    type="url"
                    placeholder="https://... atau biarkan kosong untuk menggunakan template banner default"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-blue-950 text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                  />
                </div>

                {/* Price summary */}
                <div className="p-3 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-200">
                    Total Biaya Langganan ({duration} Hari):
                  </span>
                  <span className="text-base font-black text-amber-400 tabular-nums">
                    Rp {calculateTotal().toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Konfirmasi & Pasang Iklan Sekarang</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
