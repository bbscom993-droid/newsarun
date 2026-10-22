import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../data/newsData';
import { CATEGORIES } from './Header';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export default function SearchModal({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  darkMode
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedFilter('Semua');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = CATEGORIES;

  const filtered = articles.filter((art) => {
    const matchesCategory = selectedFilter === 'Semua' || art.category === selectedFilter;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q)) ||
      art.author.name.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden my-auto ${
          darkMode ? 'bg-[#081a33] border-blue-900/80 text-white' : 'bg-[#0a2142] border-blue-700/70 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 sm:p-5 border-b border-blue-800/80 flex items-center gap-3 bg-blue-950">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari isu politik, ekonomi, daerah, kriminal, olahraga, legalitas..."
            className="flex-1 text-sm sm:text-base font-medium bg-transparent focus-visible:outline-none placeholder-blue-300/50 text-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-blue-300 hover:text-white"
              title="Hapus kata kunci"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900"
            aria-label="Tutup pencarian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#071933] border-b border-blue-800/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider shrink-0 mr-1">
            Kanal:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                selectedFilter === cat
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-blue-200 mb-1">
                Tidak ada berita yang cocok dengan kata kunci "{query}"
              </p>
              <p className="text-xs text-blue-400">
                Cobalah menggunakan kata kunci umum seperti "kebijakan", "daerah", "timnas", atau "hukum".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Menemukan {filtered.length} Berita
              </div>
              {filtered.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-blue-700/60 bg-[#0c2447] hover:border-amber-400 hover:bg-[#103058] flex gap-3.5 group cursor-pointer transition-all text-white shadow-xs"
                >
                  <div className="w-24 h-20 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-blue-800">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-blue-300 mb-1">
                        <span className="font-bold text-amber-400 uppercase">{art.category}</span>
                        <span>·</span>
                        <span>{art.publishedAt}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 line-clamp-2 leading-snug">
                        {art.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-blue-300 font-semibold">
                      <span className="text-blue-300 flex items-center gap-1 text-[10px]">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {art.readTime}
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-400 group-hover:translate-x-1 transition-transform font-bold">
                        <span>Baca Berita</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
