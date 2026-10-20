import { Search, Bookmark, Moon, Sun, Menu, X, Megaphone } from 'lucide-react';
import { useState } from 'react';
import { NewsCategory } from '../data/newsData';

interface HeaderProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  onOpenLaporWarga: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  customLogoUrl?: string;
}

export const CATEGORIES: (string | NewsCategory)[] = [
  'Semua',
  'Politik',
  'Daerah',
  'Kriminal',
  'Lain-lain',
  'Olahraga',
  'Legalitas',
  'Ekonomi'
];

export default function Header({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenSaved,
  savedCount,
  onOpenLaporWarga,
  darkMode,
  onToggleDarkMode,
  customLogoUrl
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${
        darkMode
          ? 'bg-[#081830]/95 border-blue-900/80 text-slate-100'
          : 'bg-[#0a1e3b]/95 border-blue-800/80 text-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: 3D Brand Wordmark: ARUN NEWS - Jembatan Media Nusantara */}
          <button
            onClick={() => onSelectCategory('Semua')}
            className="flex items-center gap-2.5 text-left group brand-3d-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md shrink-0 transition-transform"
            aria-label="Kembali ke halaman utama Arun News"
          >
            {customLogoUrl ? (
              <div className="h-10 max-w-[120px] rounded-xl overflow-hidden border border-amber-400/60 shadow-lg bg-[#071933] flex items-center justify-center p-0.5">
                <img
                  src={customLogoUrl}
                  alt="Logo Arun News"
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center text-amber-400 font-black text-2xl shadow-lg group-hover:scale-105 transition-all border-2 border-amber-400/60 shadow-amber-400/10">
                <span className="tracking-tighter drop-shadow-md">A</span>
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="text-2xl font-black tracking-tight text-3d-arun">
                  ARUN
                </span>
                <span className="text-2xl font-black tracking-tight ml-1.5 text-3d-news">
                  NEWS
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-1.5 mb-1 shadow-sm shadow-amber-400 animate-pulse" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-3d-tagline -mt-0.5 hidden sm:block">
                Jembatan Media Nusantara
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links for requested categories */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                      : 'text-blue-100 hover:text-white hover:bg-blue-800/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Functional Action Zone (Search, Saved, Lapor Warga, Admin & Theme) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Lapor Warga Action Button */}
            <button
              onClick={onOpenLaporWarga}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs"
              title="Kirim Laporan Warga"
            >
              <Megaphone className="w-3.5 h-3.5 fill-slate-950" />
              <span>Lapor Warga</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-colors border border-blue-700/80 bg-blue-950/80 text-blue-100 hover:text-white hover:bg-blue-900 flex items-center gap-1.5"
              title="Cari Berita"
              aria-label="Cari berita"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Cari</span>
            </button>

            {/* Saved Articles */}
            <button
              onClick={onOpenSaved}
              className="relative p-2 rounded-lg text-xs font-bold transition-colors border border-blue-700/80 bg-blue-950/80 text-blue-100 hover:text-white hover:bg-blue-900"
              title="Koleksi Tersimpan"
              aria-label={`Koleksi tersimpan (${savedCount})`}
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-black text-slate-950 bg-amber-400 rounded-full px-1 shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-xs font-bold transition-colors border border-blue-700/80 bg-blue-950/80 text-amber-400 hover:bg-blue-900"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label="Ganti mode tampilan"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-blue-900 border border-blue-700/60"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-bar on Mobile / Tablet */}
      <div
        className={`border-t py-1.5 px-4 overflow-x-auto no-scrollbar lg:hidden ${
          darkMode ? 'border-blue-900/80 bg-[#061426]' : 'border-blue-800 bg-[#071933]'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 text-xs font-bold whitespace-nowrap rounded-md transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 py-4 space-y-3 ${
            darkMode ? 'bg-[#081a33] border-blue-900/80 text-white' : 'bg-[#091f3d] border-blue-800 text-white shadow-xl'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-blue-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Kanal Berita Arun News
            </span>
            <button
              onClick={() => {
                onOpenLaporWarga();
                setMobileMenuOpen(false);
              }}
              className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1"
            >
              <Megaphone className="w-3 h-3 fill-slate-950" />
              <span>Lapor Warga</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-xs font-bold text-left transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'bg-[#0e2a52] text-white hover:bg-[#123567] border border-blue-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
