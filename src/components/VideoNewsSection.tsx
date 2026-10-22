import { useState, useRef, useEffect } from 'react';
import {
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Eye,
  Clock,
  ChevronRight,
  Share2
} from 'lucide-react';
import { Article } from '../data/newsData';

interface VideoNewsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export default function VideoNewsSection({
  articles,
  onSelectArticle,
  darkMode
}: VideoNewsSectionProps) {
  // Filter articles that have video or isVideo flag or related video tags
  const videoArticles = articles.filter(
    (a) =>
      a.isVideo ||
      Boolean(a.videoUrl) ||
      a.tags.some((t) => t.toLowerCase().includes('video'))
  );

  const [activeVideoArticle, setActiveVideoArticle] = useState<Article>(
    videoArticles[0] || articles[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoArticles.length > 0) {
      if (!activeVideoArticle || !videoArticles.some((v) => v.id === activeVideoArticle.id)) {
        setActiveVideoArticle(videoArticles[0]);
      }
    }
  }, [videoArticles, activeVideoArticle]);

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeVideoArticle?.id]);

  if (videoArticles.length === 0) return null;

  const currentVideo = activeVideoArticle || videoArticles[0];

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleSelectVideo = (art: Article) => {
    setActiveVideoArticle(art);
    setIsPlaying(false);
  };

  return (
    <section className="mb-10 w-full">
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-colors shadow-xl ${
          darkMode
            ? 'bg-gradient-to-br from-[#06182e] via-[#092244] to-[#06182e] border-blue-900/80 text-white'
            : 'bg-gradient-to-br from-[#081e3a] via-[#0d2a50] to-[#081e3a] border-blue-800 text-white shadow-2xl'
        }`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center font-black shadow-md">
              <Video className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase bg-rose-600 text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>Warta Video</span>
                </span>
                <span className="text-[11px] text-blue-200 font-semibold hidden sm:inline">
                  Liputan Visual Eksklusif & Siaran Berita
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5 uppercase">
                Warta Video & Liputan Khusus
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{videoArticles.length} Video Berita</span>
          </div>
        </div>

        {/* Video Player + Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Video Player (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border-2 border-amber-400/60 shadow-2xl group">
              {currentVideo.videoUrl ? (
                <video
                  ref={videoRef}
                  src={currentVideo.videoUrl}
                  poster={currentVideo.imageUrl}
                  className="w-full h-full object-contain bg-black"
                  controls={false}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={currentVideo.imageUrl}
                    alt={currentVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">Video tidak tersedia</span>
                  </div>
                </div>
              )}

              {/* Center Big Play Button when paused */}
              {!isPlaying && currentVideo.videoUrl && (
                <button
                  onClick={handleTogglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl backdrop-blur-xs focus:outline-none"
                  aria-label="Putar video berita"
                >
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </button>
              )}

              {/* Bottom Custom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleTogglePlay}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title={isPlaying ? 'Jeda' : 'Putar'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={handleToggleMute}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title={isMuted ? 'Buka Suara' : 'Bisukan'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[11px] font-bold text-amber-300">
                    {currentVideo.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectArticle(currentVideo)}
                    className="px-2.5 py-1 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors"
                  >
                    Baca Berita Lengkap
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title="Layar Penuh"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Info under player */}
            <div className="p-4 rounded-xl bg-blue-950/70 border border-blue-800">
              <div className="flex items-center gap-2 mb-1.5 text-xs text-blue-300">
                <span className="px-2 py-0.5 rounded bg-blue-900 text-amber-300 font-extrabold text-[10px] uppercase border border-amber-400/30">
                  {currentVideo.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentVideo.publishedAt}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>{currentVideo.viewsCount.toLocaleString('id-ID')} tayangan</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {currentVideo.title}
              </h3>
              <p className="text-xs text-blue-200 mt-1.5 leading-relaxed">
                {currentVideo.summary}
              </p>
            </div>
          </div>

          {/* Video Playlist Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-800 text-xs">
              <span className="font-black uppercase tracking-wider text-amber-400">
                Daftar Tayangan Video
              </span>
              <span className="text-[11px] text-blue-300">Klik untuk putar</span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
              {videoArticles.map((art) => {
                const isSelected = art.id === currentVideo.id;
                return (
                  <div
                    key={art.id}
                    onClick={() => handleSelectVideo(art)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-[#0b2447] border-blue-800/80 hover:bg-blue-900/60 hover:border-blue-600'
                    }`}
                  >
                    <div className="relative w-28 h-18 rounded-lg overflow-hidden shrink-0 bg-black">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-black/70 text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-bold text-white">
                        {art.readTime.replace('Video ', '')}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-extrabold uppercase text-amber-400 block mb-0.5">
                        {art.category}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {art.title}
                      </h4>
                      <span className="text-[10px] text-blue-300 mt-1 block">
                        {art.author.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
