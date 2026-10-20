import { useState, useEffect } from 'react';
import { Zap, ChevronLeft, ChevronRight, Pause, Play, Flame } from 'lucide-react';
import { Article } from '../data/newsData';

interface BreakingNewsTickerProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export default function BreakingNewsTicker({
  articles,
  onSelectArticle,
  darkMode
}: BreakingNewsTickerProps) {
  const headlineArticles = articles.filter((a) => a.isBreaking || a.isHeadline || a.isEditorPick);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || headlineArticles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlineArticles.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, headlineArticles.length]);

  if (headlineArticles.length === 0) return null;

  const current = headlineArticles[currentIndex];

  return (
    <div
      className={`border-b transition-colors duration-200 ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-blue-950 text-white border-blue-900'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-10 gap-3">
          {/* Badge: RUNNING HEADLINE / FLASH NEWS */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-[11px] tracking-wider uppercase rounded shrink-0 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>RUNNING HEADLINE</span>
          </div>

          {/* Category Tag */}
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-900 text-amber-300 font-extrabold text-[10px] uppercase shrink-0">
            {current.category}
          </span>

          {/* Running Title Link */}
          <button
            onClick={() => onSelectArticle(current)}
            className="flex-1 text-left text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors truncate focus-visible:outline-none focus-visible:underline"
            title={current.title}
          >
            <span>{current.title}</span>
          </button>

          {/* Quick Controls */}
          <div className="flex items-center gap-1 text-slate-300 shrink-0">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + headlineArticles.length) % headlineArticles.length)}
              className="p-1 hover:text-amber-400 rounded transition-colors"
              aria-label="Headline sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 hover:text-amber-400 rounded transition-colors"
              aria-label={isPaused ? 'Putar running headline' : 'Jeda running headline'}
              title={isPaused ? 'Putar' : 'Jeda'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % headlineArticles.length)}
              className="p-1 hover:text-amber-400 rounded transition-colors"
              aria-label="Headline selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
