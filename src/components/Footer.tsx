import { Mail, Phone, MapPin, Coffee } from 'lucide-react';
import { CATEGORIES } from './Header';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenSawerKopi: () => void;
  darkMode: boolean;
  customLogoUrl?: string;
}

export default function Footer({ onSelectCategory, onOpenSawerKopi, darkMode, customLogoUrl }: FooterProps) {
  return (
    <footer
      className={`border-t transition-colors mt-16 ${
        darkMode
          ? 'bg-[#06152a] text-blue-200 border-blue-900/80'
          : 'bg-[#081a38] text-blue-100 border-blue-800/80 shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-blue-900/80">
          {/* Brand & Slogan (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
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

            <p className="text-xs text-blue-200 leading-relaxed max-w-md">
              Arun News adalah jembatan media nusantara independen yang menyajikan informasi terkini secara cepat, akurat, dan tepercaya setiap hari dari Sabang hingga Merauke.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenSawerKopi}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-xs"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Sawer Kopi Redaksi</span>
              </button>
            </div>
          </div>

          {/* Kanal Kategori (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Kanal Berita
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-blue-200 hover:text-white transition-colors py-1 flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-amber-400 transition-colors" />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Redaksi & Kontak (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs text-blue-200">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Kantor Redaksi
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Gedung Graha Nusantara Lt. 5, Jl. Medan Merdeka Barat No. 12, Gambir, Jakarta Pusat 10110</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>(021) 388-7200 / 388-7201</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>redaksi@arunnews.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200">
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-white cursor-pointer">Tentang Arun News</span>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <span className="hover:text-white cursor-pointer">Pedoman Media Siber</span>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <span className="hover:text-white cursor-pointer">Kode Etik Jurnalistik</span>
            <span aria-hidden="true" className="text-blue-500">·</span>
            <span className="hover:text-white cursor-pointer">Kebijakan Privasi & Disclaimer</span>
          </div>

          <div className="flex items-center gap-2 text-blue-300 font-semibold">
            <span>ARUN NEWS · Jembatan Media Nusantara</span>
          </div>
        </div>

        <div className="pt-6 border-t border-blue-900/80 text-center text-xs text-blue-300/80">
          © 2026 PT Arun Media Nusantara. Hak Cipta Dilindungi Undang-Undang. Seluruh artikel dan grafis dilindungi hak cipta jurnalistik.
        </div>
      </div>
    </footer>
  );
}
