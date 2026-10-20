import { Camera, ChevronRight } from 'lucide-react';
import { Article } from '../data/newsData';

interface MultimediaGalleryProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export default function MultimediaGallery({
  articles,
  onSelectArticle,
  darkMode
}: MultimediaGalleryProps) {
  const photoArticles = articles.slice(0, 4);

  return (
    <section className="my-10">
      <div
        className={`p-6 rounded-2xl border transition-colors ${
          darkMode
            ? 'bg-[#06172e] border-blue-900/80 text-white'
            : 'bg-[#0a203f] text-white border-blue-800/80 shadow-xl'
        }`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-800/60 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white uppercase">
                GALERI FOTO & KILAS VISUAL
              </h2>
              <p className="text-xs text-blue-200">
                Jurnalisme visual menghadirkan realitas Nusantara dari lensa fotografer profesional
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex text-xs font-semibold text-amber-400 items-center gap-1">
            <span>Liputan Gambar Pilihan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* 4-Item Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photoArticles.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-xl bg-[#0e2a52] border border-blue-700/60 hover:border-amber-400 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Photo Count Tag */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/90 backdrop-blur-xs text-[10px] font-bold text-amber-400 border border-amber-400/30">
                  <Camera className="w-3 h-3" />
                  <span>{4 + idx * 3} FOTO</span>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <div className="text-[10px] text-blue-200/80 mt-2">
                  {item.imageCaption.slice(0, 50)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
