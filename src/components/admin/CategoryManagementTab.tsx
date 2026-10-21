import { useState } from 'react';
import {
  FolderPlus,
  Plus,
  Trash2,
  Tag,
  CheckCircle,
  AlertCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { CategoryItem, Article } from '../../data/newsData';

interface CategoryManagementTabProps {
  categories: CategoryItem[];
  onAddCategory: (category: CategoryItem) => void;
  onDeleteCategory: (categoryId: string) => void;
  articles: Article[];
}

const PRESET_COLORS = [
  { name: 'Biru Nusantara', hex: '#3b82f6' },
  { name: 'Hijau Zamrud', hex: '#10b981' },
  { name: 'Merah Marun', hex: '#ef4444' },
  { name: 'Emas Kemuliaan', hex: '#f59e0b' },
  { name: 'Ungu Kerajaan', hex: '#8b5cf6' },
  { name: 'Cyan Cakrawala', hex: '#06b6d4' },
  { name: 'Oranye Senja', hex: '#f97316' },
  { name: 'Rose Patriotik', hex: '#f43f5e' }
];

export default function CategoryManagementTab({
  categories,
  onAddCategory,
  onDeleteCategory,
  articles
}: CategoryManagementTabProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    // Check for duplicate name
    if (categories.some((c) => c.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrorMessage(`Kategori "${trimmedName}" sudah ada dalam daftar.`);
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    const slug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: trimmedName,
      slug: slug || `kanal-${Date.now()}`,
      color: selectedColor,
      description: description.trim() || `Kanal liputan khusus ${trimmedName} oleh tim redaksi Arun News.`,
      isSystem: false
    };

    onAddCategory(newCat);
    setName('');
    setDescription('');
    setSuccessMessage(`✓ Kategori "${trimmedName}" berhasil ditambahkan dan otomatis aktif di portal!`);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const getArticleCountForCategory = (catName: string) => {
    return articles.filter((a) => a.category === catName).length;
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <FolderPlus className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  Kanal Berita
                </span>
                <span className="text-xs text-blue-200">
                  Total {categories.length} Kategori Aktif
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight mt-0.5">
                Manajemen & Penambahan Kategori Berita
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-blue-200 mt-3 leading-relaxed">
          Tambahkan kategori baru secara dinamis. Setiap kategori yang ditambahkan akan otomatis muncul di navigasi header utama, menu kategori, form penulisan berita, dan filter pencarian.
        </p>

        {/* Feedback alerts */}
        {successMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Tambah Kategori Baru */}
        <form onSubmit={handleAddCategory} className="mt-6 p-4 sm:p-5 rounded-xl bg-[#06172d] border border-blue-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Plus className="w-4 h-4" />
            <span>Formulir Tambah Kategori Baru</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white mb-1.5">
                Nama Kategori Baru:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Pendidikan, Wisata, Maritim, Budaya..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/40 font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5">
                Warna Label / Badge:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-7 h-7 rounded-lg transition-transform ${
                      selectedColor === color.hex
                        ? 'ring-2 ring-white scale-110 shadow-md'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                <span className="text-[11px] font-mono text-blue-300 ml-2">
                  {selectedColor}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1.5">
              Deskripsi Singkat Kanal (Ditampilkan saat kanal dibuka pembaca):
            </label>
            <input
              type="text"
              placeholder="Contoh: Liputan komprehensif perkembangan pendidikan dan inovasi riset Nusantara..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/40 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Tambahkan Kategori Baru</span>
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Kategori Aktif Grid */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-blue-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h4 className="font-extrabold text-sm sm:text-base text-white">
              Daftar Kategori Aktif di Portal ({categories.length})
            </h4>
          </div>
          <span className="text-[11px] text-blue-300">
            Kategori sistem tidak dapat dihapus demi kepatuhan pers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {categories.map((cat) => {
            const count = getArticleCountForCategory(cat.name);
            return (
              <div
                key={cat.id}
                className="p-3.5 rounded-xl border border-blue-800 bg-[#0a2142] hover:bg-[#0c274e] transition-colors flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider text-slate-950 shadow-xs"
                      style={{ backgroundColor: cat.color || '#3b82f6' }}
                    >
                      {cat.name}
                    </span>
                    {cat.isSystem ? (
                      <span className="text-[10px] bg-blue-900 text-blue-300 px-1.5 py-0.5 rounded font-bold border border-blue-700/60">
                        Kategori Pers
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/50 px-1.5 py-0.5 rounded font-bold">
                        Kategori Kustom
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-blue-200 line-clamp-2 leading-relaxed">
                    {cat.description || `Liputan berita kategori ${cat.name} oleh tim redaksi.`}
                  </p>

                  <div className="text-[10px] text-amber-300/90 font-semibold flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-amber-400" />
                    <span>{count} Berita Terbit</span>
                    <span className="text-blue-500">·</span>
                    <span className="font-mono text-blue-300">/{cat.slug}</span>
                  </div>
                </div>

                {/* Action button: Delete if not system category */}
                {!cat.isSystem && (
                  <button
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus kategori "${cat.name}"?`)) {
                        onDeleteCategory(cat.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900/60 transition-colors"
                    title={`Hapus kategori ${cat.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
