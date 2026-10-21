import {
  Mail,
  Phone,
  MapPin,
  Coffee,
  Users,
  ShieldCheck,
  Megaphone,
  Settings,
  FileText,
  Scale,
  Briefcase,
  Video,
  Navigation,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { CATEGORIES } from './Header';
import { EditorialModalTab } from './EditorialInfoModal';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenSawerKopi: () => void;
  onOpenLaporWarga: () => void;
  onOpenAdmin: () => void;
  onOpenEditorialInfo: (tab: EditorialModalTab) => void;
  onScrollToVideo?: () => void;
  darkMode: boolean;
  customLogoUrl?: string;
}

export default function Footer({
  onSelectCategory,
  onOpenSawerKopi,
  onOpenLaporWarga,
  onOpenAdmin,
  onOpenEditorialInfo,
  onScrollToVideo,
  darkMode,
  customLogoUrl
}: FooterProps) {
  const editorialAddress = 'Gg Gaya, Pasar minggu, kec, Pasar minggu, Jakarta Selatan, DKI JAKARTA, Indonesia';
  const hotlinePhone = '0895626941900';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(editorialAddress)}`;
  const waUrl = `https://wa.me/62${hotlinePhone.replace(/^0/, '')}?text=Halo%20Redaksi%20Arun%20News%2C%20saya%20ingin%20menyampaikan%20informasi%2Fpertanyaan`;

  return (
    <footer
      className={`border-t transition-colors mt-16 ${
        darkMode
          ? 'bg-[#051426] text-blue-200 border-blue-900/80'
          : 'bg-[#071933] text-blue-100 border-blue-800/80 shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-blue-900/80">
          {/* Brand, Slogan & Fast Action Buttons (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 brand-3d-container">
              {customLogoUrl ? (
                <div className="h-10 max-w-[120px] rounded-xl overflow-hidden border border-amber-400/60 shadow-lg bg-[#071933] flex items-center justify-center p-0.5">
                  <img
                    src={customLogoUrl}
                    alt="Logo Arun News"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center text-amber-400 font-black text-2xl shadow-lg border-2 border-amber-400/60 shadow-amber-400/10">
                  <span className="tracking-tighter drop-shadow-md">A</span>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center leading-none">
                  <span className="text-2xl font-black tracking-tight text-3d-arun">ARUN</span>
                  <span className="text-2xl font-black tracking-tight ml-1.5 text-3d-news">NEWS</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-1.5 mb-1 shadow-sm shadow-amber-400 animate-pulse" />
                </div>
                <span className="text-[11px] uppercase font-black tracking-wider text-3d-tagline -mt-0.5">
                  Jembatan Media Nusantara
                </span>
              </div>
            </div>

            <p className="text-xs text-blue-200 leading-relaxed">
              Arun News adalah jembatan media nusantara independen yang menyajikan informasi terkini secara cepat, akurat, dan tepercaya setiap hari dari Sabang hingga Merauke.
            </p>

            {/* Quick Action Buttons in Footer: Sawer Kopi, Video Berita & Pengaturan Admin */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={onOpenSawerKopi}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-xs"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Sawer Kopi Redaksi</span>
              </button>

              {onScrollToVideo && (
                <button
                  onClick={onScrollToVideo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-colors shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Warta Video</span>
                </button>
              )}

              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/90 hover:bg-blue-800 text-amber-300 border border-amber-400/40 font-bold text-xs transition-colors shadow-xs"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Pengaturan Admin</span>
              </button>
            </div>

            {/* Hotline & Kontak Redaksi Card */}
            <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-700/80 text-xs space-y-1.5">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Hotline Redaksi Resmi:
              </div>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`tel:${hotlinePhone}`}
                  className="font-black text-white hover:text-amber-400 transition-colors flex items-center gap-1.5 text-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{hotlinePhone}</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="text-[11px] text-blue-300 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                <span>redaksi@arunnews.id</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Tentang Kami & Partisipasi (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Tentang Kami & Partisipasi</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button
                onClick={onOpenLaporWarga}
                className="text-left text-blue-200 hover:text-amber-300 transition-colors py-1 flex items-center gap-2 group"
              >
                <Megaphone className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Lapor Warga</span>
              </button>

              <button
                onClick={() => onOpenEditorialInfo('box_redaksi')}
                className="text-left text-blue-200 hover:text-amber-300 transition-colors py-1 flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Susunan Pengelola & Box Redaksi</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="text-left text-blue-200 hover:text-amber-300 transition-colors py-1 flex items-center gap-2 group font-semibold text-amber-300"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
                <span>Pengaturan Admin Portal</span>
              </button>

              {onScrollToVideo && (
                <button
                  onClick={onScrollToVideo}
                  className="text-left text-blue-200 hover:text-rose-300 transition-colors py-1 flex items-center gap-2 group"
                >
                  <Video className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span>Warta Video & Liputan Khusus</span>
                </button>
              )}

              <button
                onClick={() => onOpenEditorialInfo('panduan_warga')}
                className="text-left text-blue-200 hover:text-amber-300 transition-colors py-1 flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span className="font-semibold text-amber-200">Panduan Jurnalisme Warga</span>
              </button>

              <button
                onClick={() => onOpenEditorialInfo('pedoman_siber')}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Pedoman Media Siber</span>
              </button>

              <button
                onClick={() => onOpenEditorialInfo('kode_etik')}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Kode Etik Jurnalistik</span>
              </button>
            </div>
          </div>

          {/* Kolom 3: Ketentuan Hukum & Bisnis (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Hukum & Kemitraan</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button
                onClick={() => onOpenEditorialInfo('privasi')}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Kebijakan Privasi</span>
              </button>

              <button
                onClick={() => onOpenEditorialInfo('syarat')}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Syarat & Ketentuan</span>
              </button>

              <button
                onClick={() => onOpenEditorialInfo('disclaimer')}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Disclaimer</span>
              </button>

              <button
                onClick={() => onOpenEditorialInfo('iklan')}
                className="text-left text-blue-200 hover:text-amber-300 font-bold transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 transition-colors" />
                <span>Pemasangan Iklan</span>
              </button>

              <button
                onClick={() => {
                  onSelectCategory('Legalitas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Legalitas Pers</span>
              </button>

              <button
                onClick={() => {
                  onSelectCategory('Ekonomi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Kanal Ekonomi</span>
              </button>
            </div>
          </div>

          {/* Kolom 4: Lokasi Kantor Redaksi (Peta Interaktif) & Buka Maps (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Lokasi Kantor Redaksi (Peta Interaktif)</span>
            </h4>

            {/* Interactive Map Box */}
            <div className="rounded-xl overflow-hidden border border-blue-700/80 bg-[#06172d] shadow-md flex flex-col">
              {/* Stylized Interactive Map Preview */}
              <div className="relative h-28 w-full bg-slate-900 overflow-hidden group">
                <iframe
                  title="Peta Lokasi Kantor Redaksi Arun News"
                  className="w-full h-full border-0 filter contrast-125 opacity-85 hover:opacity-100 transition-opacity"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=106.8300%2C-6.2900%2C106.8500%2C-6.2750&layer=mapnik&marker=-6.2825%2C106.8400"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-950/90 text-[10px] font-black text-amber-300 border border-amber-400/30 flex items-center gap-1 shadow-md">
                  <MapPin className="w-2.5 h-2.5 text-rose-400" />
                  <span>Pasar Minggu</span>
                </div>
              </div>

              {/* Address details & Buka Maps Action */}
              <div className="p-3 text-xs space-y-2 bg-blue-950/90">
                <p className="text-[11px] text-white leading-snug font-medium">
                  {editorialAddress}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-[11px] text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Navigation className="w-3 h-3 fill-slate-950" />
                    <span>Buka Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>

                  <a
                    href={`tel:${hotlinePhone}`}
                    className="p-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-amber-300 border border-blue-700 transition-colors"
                    title={`Hubungi Hotline Redaksi: ${hotlinePhone}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200">
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => onOpenEditorialInfo('pedoman_siber')} className="hover:text-amber-300 transition-colors">
              Pedoman Media Siber
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('kode_etik')} className="hover:text-amber-300 transition-colors">
              Kode Etik Jurnalistik
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('panduan_warga')} className="hover:text-amber-300 transition-colors">
              Panduan Jurnalisme Warga
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('privasi')} className="hover:text-amber-300 transition-colors">
              Kebijakan Privasi
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('disclaimer')} className="hover:text-amber-300 transition-colors">
              Disclaimer
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('iklan')} className="hover:text-amber-300 transition-colors">
              Pemasangan Iklan & Kemitraan
            </button>
          </div>

          <div className="flex items-center gap-2 text-blue-300 font-bold">
            <span>ARUN NEWS · Jembatan Media Nusantara</span>
          </div>
        </div>

        <div className="pt-6 border-t border-blue-900/80 text-center text-xs text-blue-300/80">
          © 2026 PT Arun Media Nusantara. Hak Cipta Dilindungi Undang-Undang. Terverifikasi Faktual Dewan Pers Republik Indonesia. Hotline Redaksi: {hotlinePhone}.
        </div>
      </div>
    </footer>
  );
}
