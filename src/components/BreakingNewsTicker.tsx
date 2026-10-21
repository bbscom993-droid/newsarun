import { useState, useEffect } from 'react';
import { Zap, ChevronLeft, ChevronRight, Pause, Play, Clock, Flame } from 'lucide-react';
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
  const [progressKey, setProgressKey] = useState(0);

  // Relaxed, calm reading interval: 8.5 seconds so users can read each headline comfortably
  const ROTATION_INTERVAL_MS = 8500;

  useEffect(() => {
    if (isPaused || headlineArticles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlineArticles.length);
      setProgressKey((prev) => prev + 1);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused, headlineArticles.length, ROTATION_INTERVAL_MS]);

  const handleManualPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + headlineArticles.length) % headlineArticles.length);
    setProgressKey((prev) => prev + 1);
  };

  const handleManualNext = () => {
    setCurrentIndex((prev) => (prev + 1) % headlineArticles.length);
    setProgressKey((prev) => prev + 1);
  };

  if (headlineArticles.length === 0) return null;

  const current = headlineArticles[currentIndex];

  return (
    <div
      className={`relative border-b transition-colors duration-200 overflow-hidden ${
        darkMode ? 'bg-[#051528] border-blue-900/90 text-slate-100' : 'bg-[#071d3a] text-white border-blue-800'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slow Paced Animated Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-blue-950/70 overflow-hidden z-20">
        <div
          key={progressKey}
          className={`h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 origin-left ${
            isPaused ? 'opacity-40' : 'animate-[tickerProgress_7.5s_linear_infinite]'
          }`}
          style={{
            animationDuration: `${ROTATION_INTERVAL_MS}ms`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-10 gap-2.5 sm:gap-3">
          {/* Badge: TERKINI (Updated from RUNNING HEADLINE as requested) */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-rose-600 via-amber-500 to-amber-400 text-slate-950 font-black text-[11px] sm:text-xs tracking-wider uppercase rounded-md shrink-0 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span className="font-black text-slate-950 tracking-wider">TERKINI</span>
          </div>

          {/* Category Tag */}
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-900/90 text-amber-300 font-extrabold text-[10px] uppercase shrink-0 border border-amber-400/20">
            {current.category}
          </span>

          {/* Smooth Slow Flowing Title Link */}
          <div className="flex-1 overflow-hidden relative h-6 flex items-center">
            <button
              key={current.id}
              onClick={() => onSelectArticle(current)}
              className="text-left text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-all truncate focus-visible:outline-none focus-visible:underline animate-in fade-in slide-in-from-right-4 duration-700 w-full flex items-center"
              title={current.title}
            >
              <span className="font-bold text-amber-300 mr-2 shrink-0 text-xs">
                [{currentIndex + 1}/{headlineArticles.length}]
              </span>
              <span className="truncate">{current.title}</span>
            </button>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-1 text-slate-300 shrink-0">
            <button
              onClick={handleManualPrev}
              className="p-1 hover:text-amber-400 rounded transition-colors"
              aria-label="Berita terkini sebelumnya"
              title="Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 hover:text-amber-400 rounded transition-colors"
              aria-label={isPaused ? 'Putar berita terkini' : 'Jeda berita terkini'}
              title={isPaused ? 'Putar' : 'Jeda'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleManualNext}
              className="p-1 hover:text-amber-400 rounded transition-colors"
              aria-label="Berita terkini selanjutnya"
              title="Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
