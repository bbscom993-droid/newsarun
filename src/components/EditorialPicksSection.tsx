import { Award, Clock, Bookmark, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { Article } from '../data/newsData';

interface EditorialPicksSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  darkMode: boolean;
}

export default function EditorialPicksSection({
  articles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  darkMode
}: EditorialPicksSectionProps) {
  // Articles flagged with isEditorPick
  const editorPicks = articles.filter((a) => a.isEditorPick);
  if (editorPicks.length === 0) return null;

  const leadPick = editorPicks[0];
  const sidePicks = editorPicks.slice(1, 4);

  return (
    <section className="mb-10 w-full">
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-colors shadow-xl ${
          darkMode
            ? 'bg-[#071932] border-blue-900/80 text-white'
            : 'bg-[#0a2347] border-blue-800 text-white shadow-2xl'
        }`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Award className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase bg-blue-900 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Kurasi Meja Redaksi
                </span>
                <span className="text-[11px] text-blue-300 font-semibold hidden sm:inline">
                  Investigasi & Analisis Mendalam
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5 uppercase">
                Berita Pilihan Redaksi
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Liputan Khusus & Berbobot</span>
          </div>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lead Pick (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-[#0e2c56] border border-blue-700/60 overflow-hidden group hover:border-amber-400 transition-all duration-300">
            <div
              onClick={() => onSelectArticle(leadPick)}
              className="cursor-pointer relative aspect-[16/9] overflow-hidden bg-slate-900"
            >
              <img
                src={leadPick.imageUrl}
                alt={leadPick.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] uppercase shadow-md flex items-center gap-1">
                  <Award className="w-3 h-3 fill-slate-950" />
                  <span>Pilihan Utama Redaksi</span>
                </span>
                <span className="px-2 py-1 rounded-md bg-blue-950/80 backdrop-blur-xs text-amber-300 font-bold text-[10px] uppercase border border-amber-400/30">
                  {leadPick.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-base sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug drop-shadow-md">
                  {leadPick.title}
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed line-clamp-3 mb-4">
                {leadPick.summary}
              </p>

              {/* Key takeaways */}
              {leadPick.keyPoints && leadPick.keyPoints.length > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-blue-950/70 border border-blue-800 text-xs space-y-1.5">
                  <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    Poin Utama Investigasi:
                  </div>
                  {leadPick.keyPoints.slice(0, 2).map((kp, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-blue-200 text-[11px]">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Author & Actions footer */}
              <div className="flex items-center justify-between pt-3 border-t border-blue-800/80 text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={leadPick.author.avatar}
                    alt={leadPick.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-amber-400/60"
                  />
                  <div>
                    <span className="font-bold text-white block text-xs">{leadPick.author.name}</span>
                    <span className="text-[10px] text-blue-300">{leadPick.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-blue-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{leadPick.readTime}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(leadPick.id);
                    }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isBookmarked(leadPick.id)
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-blue-950 text-blue-200 border-blue-800 hover:text-white'
                    }`}
                    title={isBookmarked(leadPick.id) ? 'Hapus Simpan' : 'Simpan Berita'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectArticle(leadPick)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Baca</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Picks List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {sidePicks.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="group cursor-pointer p-3 sm:p-3.5 rounded-xl bg-[#0e2c56] border border-blue-700/60 hover:border-amber-400 transition-all flex gap-3.5 items-center"
              >
                <div className="relative w-24 sm:w-28 h-20 sm:h-24 shrink-0 overflow-hidden rounded-lg bg-slate-900">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-108"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-blue-950/90 text-[9px] font-black text-amber-400 border border-amber-400/30 uppercase">
                    {art.category}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] text-blue-300 mb-1">
                      <span className="font-semibold text-amber-400">{art.author.name}</span>
                      <span>·</span>
                      <span>{art.publishedAt.split(',')[0]}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-800/60 text-[10px] text-blue-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{art.readTime}</span>
                    </span>
                    <span className="font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                      <span>Selengkapnya</span>
                      <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
