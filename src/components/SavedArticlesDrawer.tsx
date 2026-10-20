import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../data/newsData';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
  darkMode: boolean;
}

export default function SavedArticlesDrawer({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
  darkMode
}: SavedArticlesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l transition-transform animate-in slide-in-from-right duration-300 ${
          darkMode ? 'bg-[#081a33] border-blue-900/80 text-white' : 'bg-[#0a2142] border-blue-700/70 text-white'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-blue-800/80 flex items-center justify-between bg-blue-950 text-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h3 className="font-bold text-sm text-white">
              Koleksi Berita Tersimpan
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black tabular-nums">
              {savedArticles.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {savedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold px-2 py-1 rounded hover:bg-rose-950/40 transition-colors"
                title="Hapus semua simpanan"
              >
                Hapus Semua
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900 transition-colors"
              aria-label="Tutup koleksi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 px-4 bg-blue-950/40 rounded-2xl border border-blue-800/60 my-6">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-white mb-1">
                Belum ada berita tersimpan
              </h4>
              <p className="text-xs text-blue-200 leading-relaxed max-w-xs mx-auto">
                Tandai artikel menarik dengan menekan ikon bookmark untuk dibaca nanti secara offline atau santai.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="p-3 rounded-xl border border-blue-700/60 bg-[#0c2447] hover:border-amber-400 flex gap-3 group transition-all text-white shadow-xs"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-blue-800">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">
                      {art.category}
                    </span>
                    <h4
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="text-xs font-bold leading-snug line-clamp-2 cursor-pointer hover:text-amber-300 transition-colors text-white"
                    >
                      {art.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-blue-800/80 text-[11px]">
                    <button
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-0.5 hover:underline"
                    >
                      <span>Baca</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      className="text-blue-300 hover:text-rose-400 transition-colors p-0.5"
                      title="Hapus dari simpanan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
