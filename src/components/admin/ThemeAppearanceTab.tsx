import { useState } from 'react';
import {
  Palette,
  CheckCircle,
  Layout,
  Type,
  Sliders,
  Sparkles,
  Eye,
  RotateCcw
} from 'lucide-react';
import { PortalThemeConfig } from '../../data/newsData';

interface ThemeAppearanceTabProps {
  themeConfig: PortalThemeConfig;
  onUpdateThemeConfig: (config: PortalThemeConfig) => void;
}

const THEME_PRESETS = [
  {
    id: 'nusantara_navy' as const,
    name: 'Biru Nusantara & Emas',
    description: 'Palet resmi ARUN NEWS dengan navy blue kepulauan Indonesia dan aksen emas kemuliaan.',
    primaryBg: '#071d3a',
    cardBg: '#092348',
    accent: '#fbbf24',
    badge: 'Resmi Portal'
  },
  {
    id: 'emerald_garuda' as const,
    name: 'Zamrud Khatulistiwa',
    description: 'Nuansa hijau zamrud hutan tropis Nusantara berpadu keanggunan emas kebangsaan.',
    primaryBg: '#062820',
    cardBg: '#0a382e',
    accent: '#10b981',
    badge: 'Populer'
  },
  {
    id: 'maroon_merdeka' as const,
    name: 'Merah Marun Pers Merdeka',
    description: 'Merah marun patriotik khas semangat jurnalisme perjuangan kemerdekaan dan keadilan rakyat.',
    primaryBg: '#2a0812',
    cardBg: '#3d0e1c',
    accent: '#f43f5e',
    badge: 'Patriotik'
  },
  {
    id: 'deep_sapphire' as const,
    name: 'Deep Sapphire Modern',
    description: 'Safir gelap ultramodern dengan kontras tinggi untuk kenikmatan membaca berita digital malam hari.',
    primaryBg: '#051329',
    cardBg: '#081d3f',
    accent: '#38bdf8',
    badge: 'Modern'
  },
  {
    id: 'classic_press' as const,
    name: 'Monokrom Editorial Cetak',
    description: 'Tampilan klasik hitam-putih bersahaja yang membangkitkan nuansa koran cetak nasional legendaris.',
    primaryBg: '#111827',
    cardBg: '#1f2937',
    accent: '#f3f4f6',
    badge: 'Klasik'
  }
];

const ACCENT_COLORS = [
  { name: 'Kuning Emas Nusantara', hex: '#fbbf24' },
  { name: 'Biru Safir Langit', hex: '#38bdf8' },
  { name: 'Hijau Zamrud Alam', hex: '#34d399' },
  { name: 'Merah Rose Patriot', hex: '#f87171' },
  { name: 'Oranye Mentari', hex: '#fb923c' },
  { name: 'Ungu Bangsawan', hex: '#c084fc' }
];

export default function ThemeAppearanceTab({
  themeConfig,
  onUpdateThemeConfig
}: ThemeAppearanceTabProps) {
  const [selectedPreset, setSelectedPreset] = useState<PortalThemeConfig['presetTheme']>(themeConfig.presetTheme);
  const [selectedAccent, setSelectedAccent] = useState<string>(themeConfig.accentColor);
  const [selectedDensity, setSelectedDensity] = useState<PortalThemeConfig['layoutDensity']>(themeConfig.layoutDensity);
  const [selectedTemplate, setSelectedTemplate] = useState<PortalThemeConfig['templateStyle']>(themeConfig.templateStyle);
  const [selectedFont, setSelectedFont] = useState<PortalThemeConfig['primaryFont']>(themeConfig.primaryFont);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleApplyPreset = (presetId: PortalThemeConfig['presetTheme']) => {
    setSelectedPreset(presetId);
    const targetPreset = THEME_PRESETS.find((p) => p.id === presetId);
    if (targetPreset) {
      setSelectedAccent(targetPreset.accent);
    }
  };

  const handleSaveTheme = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PortalThemeConfig = {
      presetTheme: selectedPreset,
      accentColor: selectedAccent,
      layoutDensity: selectedDensity,
      templateStyle: selectedTemplate,
      primaryFont: selectedFont
    };
    onUpdateThemeConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    setSelectedPreset('nusantara_navy');
    setSelectedAccent('#fbbf24');
    setSelectedDensity('comfortable');
    setSelectedTemplate('modern_portal');
    setSelectedFont('sans');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Palette className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  Kustomisasi Portal
                </span>
                <span className="text-xs text-blue-200">
                  Desain & Tipografi Pers Nusantara
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight mt-0.5">
                Pengaturan Warna & Template Desain Portal
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-700 hover:bg-blue-900 text-blue-200 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Default</span>
          </button>
        </div>

        <p className="text-xs text-blue-200 mt-3 leading-relaxed">
          Pilih tema warna resmi, palet aksen kebangsaan, dan template layout visual portal ARUN NEWS. Semua perubahan tersimpan secara instan dan diterapkan ke seluruh kanal pembaca.
        </p>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>✓ Pengaturan warna dan template desain portal berhasil disimpan dan diterapkan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveTheme} className="space-y-6">
        {/* SECTION 1: PILIHAN TEMA PRESET PORTAL */}
        <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
          <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>1. Pilihan Tema Preset Visual Portal</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {THEME_PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-xs space-y-2.5 relative overflow-hidden ${
                    isSelected
                      ? 'border-amber-400 bg-[#0a2347] shadow-xl scale-[1.02]'
                      : 'border-blue-800 bg-[#071933] hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">
                      {preset.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider text-slate-950 bg-amber-400 shadow-xs">
                      {preset.badge}
                    </span>
                  </div>

                  {/* Visual Color Swatch Strip */}
                  <div className="flex items-center gap-1.5 h-6 rounded-lg overflow-hidden border border-white/20 p-1 bg-black/40">
                    <div className="flex-1 h-full rounded" style={{ backgroundColor: preset.primaryBg }} />
                    <div className="flex-1 h-full rounded" style={{ backgroundColor: preset.cardBg }} />
                    <div className="w-6 h-full rounded" style={{ backgroundColor: preset.accent }} />
                  </div>

                  <p className="text-[11px] text-blue-200 leading-snug">
                    {preset.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-blue-300">Aksen Bawaan:</span>
                    <span className="font-mono" style={{ color: preset.accent }}>
                      {preset.accent}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: WARNA AKSEN & TIPOGRAFI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Warna Aksen Dinamis */}
          <div className="p-5 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-3.5">
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>2. Warna Aksen Interaktif</span>
            </h4>
            <p className="text-xs text-blue-200">
              Digunakan untuk sorotan tombol, running teks, badge TERKINI, dan lencana berita.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {ACCENT_COLORS.map((accent) => {
                const isSelected = selectedAccent.toLowerCase() === accent.hex.toLowerCase();
                return (
                  <button
                    key={accent.hex}
                    type="button"
                    onClick={() => setSelectedAccent(accent.hex)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 text-xs ${
                      isSelected
                        ? 'border-white bg-blue-900 ring-2 ring-amber-400 shadow-md font-bold'
                        : 'border-blue-800 bg-[#071933] hover:bg-blue-900/60'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm border border-white/50"
                      style={{ backgroundColor: accent.hex }}
                    />
                    <span className="truncate text-[11px]">{accent.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gaya Tipografi & Tata Letak */}
          <div className="p-5 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-3.5">
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-amber-400" />
              <span>3. Tipografi & Gaya Template Portal</span>
            </h4>
            <p className="text-xs text-blue-200">
              Pilih karakter tipografi dan gaya visual naskah berita portal.
            </p>

            <div className="space-y-3 pt-1">
              {/* Font Family Selector */}
              <div>
                <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  Gaya Font Judul Berita:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFont('sans')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors ${
                      selectedFont === 'sans'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                        : 'bg-[#071933] border-blue-800 text-blue-200 hover:text-white'
                    }`}
                  >
                    Modern Sans-Serif
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFont('serif')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors font-editorial ${
                      selectedFont === 'serif'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                        : 'bg-[#071933] border-blue-800 text-blue-200 hover:text-white'
                    }`}
                  >
                    Klasik Serif Pers
                  </button>
                </div>
              </div>

              {/* Template Style */}
              <div>
                <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  Template Tata Letak:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('modern_portal')}
                    className={`py-2 px-2 text-center rounded-xl border text-[11px] font-bold transition-colors ${
                      selectedTemplate === 'modern_portal'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                        : 'bg-[#071933] border-blue-800 text-blue-200 hover:text-white'
                    }`}
                  >
                    Koran Modern
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('metro_editorial')}
                    className={`py-2 px-2 text-center rounded-xl border text-[11px] font-bold transition-colors ${
                      selectedTemplate === 'metro_editorial'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                        : 'bg-[#071933] border-blue-800 text-blue-200 hover:text-white'
                    }`}
                  >
                    Metro Padat
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('clean_magazine')}
                    className={`py-2 px-2 text-center rounded-xl border text-[11px] font-bold transition-colors ${
                      selectedTemplate === 'clean_magazine'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                        : 'bg-[#071933] border-blue-800 text-blue-200 hover:text-white'
                    }`}
                  >
                    Majalah Luas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PRATINJAU LANGSUNG KARTU BERITA */}
        <div className="p-5 sm:p-6 rounded-2xl border bg-[#06172d] border-blue-800 text-white shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-blue-800">
            <h4 className="font-extrabold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>Pratinjau Tampilan Header & Kartu Berita dengan Tema Aktif</span>
            </h4>
            <span className="text-[10px] text-blue-300">
              Tema Terpilih: {THEME_PRESETS.find((p) => p.id === selectedPreset)?.name}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-blue-700/60 bg-[#092244] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-slate-950"
                  style={{ backgroundColor: selectedAccent }}
                >
                  TERKINI
                </span>
                <span className="text-xs text-blue-200 font-bold">Politik Nusantara</span>
              </div>
              <h5
                className={`text-base sm:text-lg font-black text-white leading-snug ${
                  selectedFont === 'serif' ? 'font-editorial' : ''
                }`}
              >
                Parlemen Sahkan Kerangka Investasi Hilirisasi Industri Hijau Nasional
              </h5>
              <p className="text-xs text-blue-200">
                Dokumentasi eksklusif liputan terverifikasi redaksi Arun News.
              </p>
            </div>

            <button
              type="button"
              className="px-4 py-2 rounded-xl text-slate-950 font-black text-xs shrink-0 shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: selectedAccent }}
            >
              Baca Selengkapnya
            </button>
          </div>
        </div>

        {/* Action Button: Simpan */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-slate-950" />
            <span>Terapkan & Simpan Desain Portal</span>
          </button>
        </div>
      </form>
    </div>
  );
}
