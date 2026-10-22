import { useState } from 'react';
import { Flame, MessageSquare, Eye, Share2, TrendingUp, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { Article } from '../data/newsData';

interface PopularAndTrendingSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export default function PopularAndTrendingSection({
  articles,
  onSelectArticle,
  darkMode
}: PopularAndTrendingSectionProps) {
  const [tab, setTab] = useState<'popular' | 'discussed'>('popular');

  // Top 5 by Views (Terpopuler 24 Jam)
  const popularList = [...articles]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 5);

  // Top 5 by Discussion (Paling Banyak Dibahas: Komentar + Shares)
  const discussedList = [...articles]
    .sort((a, b) => {
      const scoreA = (a.comments?.length || 0) * 10 + (a.sharesCount || 0);
      const scoreB = (b.comments?.length || 0) * 10 + (b.sharesCount || 0);
      return scoreB - scoreA;
    })
    .slice(0, 5);

  const displayList = tab === 'popular' ? popularList : discussedList;

  // Podium color styling
  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return {
          bg: 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-amber-500/30 shadow-lg',
          border: 'border-amber-300',
          label: '#01',
          crown: true
        };
      case 1:
        return {
          bg: 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-900 shadow-slate-400/20 shadow-md',
          border: 'border-slate-300',
          label: '#02',
          crown: false
        };
      case 2:
        return {
          bg: 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-100 shadow-amber-800/20 shadow-md',
          border: 'border-amber-600',
          label: '#03',
          crown: false
        };
      default:
        return {
          bg: 'bg-blue-900/80 text-blue-200 border border-blue-700',
          border: 'border-blue-700',
          label: `#0${index + 1}`,
          crown: false
        };
    }
  };

  return (
    <section className="mb-10 w-full">
      <div
        className={`p-5 sm:p-7 rounded-2xl border transition-all ${
          darkMode
            ? 'bg-gradient-to-br from-[#06172e] via-[#092244] to-[#071933] border-blue-900/80 shadow-2xl text-white'
            : 'bg-gradient-to-br from-[#081f3d] via-[#0c2a52] to-[#081e3a] border-blue-700/70 shadow-2xl text-white'
        }`}
      >
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blue-800/80 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Flame className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>24 Jam Terakhir</span>
                </span>
                <span className="text-[11px] text-blue-200 font-semibold hidden md:inline">
                  Peringkat Artikel Interaksi Tertinggi
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase mt-0.5">
                Terpopuler & Paling Banyak Dibahas
              </h2>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center bg-blue-950/80 p-1.5 rounded-xl border border-blue-700/80 self-start sm:self-auto">
            <button
              onClick={() => setTab('popular')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                tab === 'popular'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Terpopuler</span>
            </button>
            <button
              onClick={() => setTab('discussed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                tab === 'discussed'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Paling Banyak Dibahas</span>
            </button>
          </div>
        </div>

        {/* 5-Column or Grid Ranking Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {displayList.map((art, idx) => {
            const rank = getRankBadge(idx);
            return (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="group relative p-4 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/80 hover:border-amber-400/80 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-md hover:-translate-y-1"
              >
                <div>
                  {/* Top: Rank badge + category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 ${rank.bg} ${rank.border}`}
                    >
                      {rank.crown && <span>👑</span>}
                      <span>{rank.label}</span>
                    </span>

                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-blue-900/80 px-2 py-0.5 rounded border border-amber-400/30 truncate max-w-[110px]">
                      {art.category}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-blue-950">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-semibold text-blue-200 backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-amber-400" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-3 leading-snug">
                    {art.title}
                  </h3>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 mt-3 border-t border-blue-900/80 flex items-center justify-between text-[11px] text-blue-200 font-semibold">
                  <div className="flex items-center gap-1 text-amber-300 tabular-nums">
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span>{(art.viewsCount / 1000).toFixed(1)}k</span>
                  </div>

                  <div className="flex items-center gap-1 text-blue-300 tabular-nums">
                    <MessageSquare className="w-3 h-3 text-emerald-400" />
                    <span>{art.comments?.length || 0} diskusi</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
