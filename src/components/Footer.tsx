import { Mail, Phone, MapPin, Coffee, Users, ShieldCheck, Megaphone, Settings, FileText, Scale, Briefcase } from 'lucide-react';
import { CATEGORIES } from './Header';
import { EditorialModalTab } from './EditorialInfoModal';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenSawerKopi: () => void;
  onOpenLaporWarga: () => void;
  onOpenAdmin: () => void;
  onOpenEditorialInfo: (tab: EditorialModalTab) => void;
  darkMode: boolean;
  customLogoUrl?: string;
}

export default function Footer({
  onSelectCategory,
  onOpenSawerKopi,
  onOpenLaporWarga,
  onOpenAdmin,
  onOpenEditorialInfo,
  darkMode,
  customLogoUrl
}: FooterProps) {
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
          {/* Brand & Slogan (4 cols) */}
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

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={onOpenSawerKopi}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-xs"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Sawer Kopi Redaksi</span>
              </button>
            </div>

            {/* Kantor Redaksi info */}
            <div className="pt-2 text-[11px] text-blue-300 space-y-1">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong>Kantor Redaksi:</strong> Gg Gaya, Pasar minggu, kec, Pasar minggu, Jakarta Selatan, DKI JAKARTA, Indonesia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                <span>redaksi@arunnews.id · (021) 788-3400</span>
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
                className="text-left text-blue-200 hover:text-amber-300 transition-colors py-1 flex items-center gap-2 group"
              >
                <Settings className="w-3.5 h-3.5 text-blue-400 group-hover:text-amber-400 transition-colors" />
                <span>Pengaturan Admin</span>
              </button>

              <button
                onClick={() => onOpenEditorialInfo('panduan_warga')}
                className="text-left text-blue-200 hover:text-amber-300 transition-colors py-1 flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span className="font-semibold text-amber-200">Panduan Jurnalisme Warga</span>
              </button>
            </div>
          </div>

          {/* Kolom 3: Pedoman & Kode Etik Pers (2 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pedoman & Kode Etik</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
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
            </div>
          </div>

          {/* Kolom 4: Kemitraan & Kanal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Bisnis & Hukum</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
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
                <span>Pemasangan Iklan & Kemitraan</span>
              </button>

              <button
                onClick={() => {
                  onSelectCategory('Legalitas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                <span>Legalitas Perusahaan Pers</span>
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
        </div>

        {/* Footer Bottom Row */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2">
            <button onClick={() => onOpenEditorialInfo('box_redaksi')} className="hover:text-amber-300 transition-colors font-semibold">
              Tentang Kami & Partisipasi
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={onOpenLaporWarga} className="hover:text-amber-300 transition-colors font-semibold text-amber-300">
              Lapor Warga
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('box_redaksi')} className="hover:text-amber-300 transition-colors">
              Susunan Pengelola & Box Redaksi
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('pedoman_siber')} className="hover:text-amber-300 transition-colors">
              Pedoman Media Siber
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('kode_etik')} className="hover:text-amber-300 transition-colors">
              Kode Etik Jurnalistik
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('privasi')} className="hover:text-amber-300 transition-colors">
              Kebijakan Privasi
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('panduan_warga')} className="hover:text-amber-300 transition-colors text-amber-200">
              Panduan Jurnalisme Warga
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('syarat')} className="hover:text-amber-300 transition-colors">
              Syarat & Ketentuan
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('disclaimer')} className="hover:text-amber-300 transition-colors">
              Disclaimer
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={() => onOpenEditorialInfo('iklan')} className="hover:text-amber-300 transition-colors font-bold text-amber-400">
              Pemasangan Iklan & Kemitraan
            </button>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <button onClick={onOpenAdmin} className="hover:text-amber-300 transition-colors text-blue-300">
              Pengaturan Admin
            </button>
          </div>

          <div className="flex items-center gap-2 text-blue-300 font-bold shrink-0">
            <span>ARUN NEWS · Jembatan Media Nusantara</span>
          </div>
        </div>

        <div className="pt-6 border-t border-blue-900/80 text-center text-xs text-blue-300/80">
          © 2026 PT Arun Media Nusantara. Hak Cipta Dilindungi Undang-Undang. Terverifikasi Faktual Dewan Pers Republik Indonesia.
        </div>
      </div>
    </footer>
  );
}
