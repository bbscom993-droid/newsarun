import { useState } from 'react';
import {
  Camera,
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
  Sparkles,
  MapPin,
  User,
  Share2
} from 'lucide-react';
import { Article } from '../data/newsData';

interface MultimediaGalleryProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

interface PhotoStory {
  id: string;
  title: string;
  location: string;
  photographer: string;
  category: string;
  coverImage: string;
  photos: {
    url: string;
    caption: string;
  }[];
}

const PHOTO_STORIES: PhotoStory[] = [
  {
    id: 'ps-1',
    title: 'Menembus Kabut Fajar: Denyut Pelelangan Ikan Tradisional Pesisir Karangasem',
    location: 'Karangasem, Bali',
    photographer: 'Yudha Pratama (PFI Bali)',
    category: 'Humaniora & Bahari',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&auto=format&fit=crop&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
        caption: 'Para nelayan menarik jaring tangkapan tongkol saat mentari pertama menyinari pantai timur Bali.'
      },
      {
        url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80',
        caption: 'Pembersihan dan sortir hasil tangkapan laut segar sebelum dibawa ke pasar ikan induk.'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
        caption: 'Deretan jukung kayu tradisional bersandar rapi di sepanjang garis pantai berpasir hitam vulkanik.'
      }
    ]
  },
  {
    id: 'ps-2',
    title: 'Mahakarya Layar Sandeq: Warisan Leluhur Mandar Membelah Ombak Selat Makassar',
    location: 'Polewali Mandar, Sulbar',
    photographer: 'Andi Mappatunru',
    category: 'Budaya Bahari',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
        caption: 'Layar putih perahu Sandeq mengembang gagah didorong angin lepas pantai menuju garis finis.'
      },
      {
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80',
        caption: 'Kekompakan para passandeq menyeimbangkan cadik perahu kayu di atas riak gelombang kencang.'
      }
    ]
  },
  {
    id: 'ps-3',
    title: 'Harmoni di Atas Awan: Panen Raya Kopi Arabika Organik di Dataran Tinggi Gayo',
    location: 'Takengon, Aceh Tengah',
    photographer: 'Cut Mutia Sari',
    category: 'Agraria Nusantara',
    coverImage: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1000&auto=format&fit=crop&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1200&auto=format&fit=crop&q=80',
        caption: 'Petik merah buah kopi arabika unggulan di lereng pegunungan Gayo berketinggian 1.400 mdpl.'
      },
      {
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80',
        caption: 'Proses penjemuran biji kopi secara alami di atas para-para beralas terpal bersih.'
      }
    ]
  },
  {
    id: 'ps-4',
    title: 'Gemerlap Kota Masa Depan: Pembangunan Kawasan Inti Pusat Pemerintahan IKN',
    location: 'Penajam Paser Utara, Kaltim',
    photographer: 'Rizki Ramadhan',
    category: 'Infrastruktur',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
        caption: 'Arsitektur Istana Garuda yang megah berpadu dengan lanskap hutan tropis hijau Kalimantan.'
      },
      {
        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&auto=format&fit=crop&q=80',
        caption: 'Jalur transportasi modern dan koridor ekologis yang menghubungkan berbagai klaster cerdas.'
      }
    ]
  }
];

export default function MultimediaGallery({
  articles,
  onSelectArticle,
  darkMode
}: MultimediaGalleryProps) {
  const [activeStory, setActiveStory] = useState<PhotoStory | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const openLightbox = (story: PhotoStory, initialIdx = 0) => {
    setActiveStory(story);
    setActivePhotoIdx(initialIdx);
  };

  const closeLightbox = () => {
    setActiveStory(null);
    setActivePhotoIdx(0);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeStory) return;
    setActivePhotoIdx((prev) => (prev - 1 + activeStory.photos.length) % activeStory.photos.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeStory) return;
    setActivePhotoIdx((prev) => (prev + 1) % activeStory.photos.length);
  };

  return (
    <section className="my-10 w-full">
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-colors shadow-xl ${
          darkMode
            ? 'bg-[#06172e] border-blue-900/80 text-white'
            : 'bg-[#0a203f] text-white border-blue-800/80 shadow-2xl'
        }`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-800/60 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Camera className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase bg-blue-900 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Jurnalisme Visual
                </span>
                <span className="text-[11px] text-blue-300 font-semibold hidden sm:inline">
                  Potret Cerita Nusantara Melalui Lensa
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase mt-0.5">
                Galeri Lensa & Cerita Foto
              </h2>
            </div>
          </div>

          <span className="hidden sm:inline-flex text-xs font-bold text-amber-400 items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Koleksi Foto Terkurasi</span>
          </span>
        </div>

        {/* 4-Item Photo Story Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHOTO_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => openLightbox(story, 0)}
              className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-xl bg-[#0e2a52] border border-blue-700/60 hover:border-amber-400 transition-all duration-300 shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Photo Count Tag */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/90 backdrop-blur-xs text-[10px] font-bold text-amber-400 border border-amber-400/30">
                  <Camera className="w-3 h-3" />
                  <span>{story.photos.length} FOTO</span>
                </div>

                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-blue-300 mb-1">
                    <span className="font-bold text-amber-400 uppercase tracking-wider">
                      {story.category}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-amber-400" />
                      <span>{story.location}</span>
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {story.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-blue-800/60 text-[10px] text-blue-300">
                  <span className="flex items-center gap-1 text-slate-300">
                    <User className="w-2.5 h-2.5 text-amber-400" />
                    <span>{story.photographer}</span>
                  </span>
                  <span className="text-amber-400 font-bold group-hover:underline">
                    Buka Cerita →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immersive Photo Lightbox Modal */}
      {activeStory && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Lightbox Topbar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between text-white border-b border-slate-800 pb-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  Cerita Foto
                </span>
                <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{activeStory.location}</span>
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white mt-0.5">
                {activeStory.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold tabular-nums">
                {activePhotoIdx + 1} / {activeStory.photos.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                aria-label="Tutup Galeri Foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Picture + Nav Arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
          >
            {activeStory.photos.length > 1 && (
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white transition-all shadow-xl"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="max-h-[68vh] max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-slate-700/60 flex items-center justify-center bg-black">
              <img
                src={activeStory.photos[activePhotoIdx].url}
                alt={activeStory.photos[activePhotoIdx].caption}
                className="max-h-[68vh] w-auto object-contain transition-all duration-300"
              />
            </div>

            {activeStory.photos.length > 1 && (
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white transition-all shadow-xl"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl mx-auto w-full p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center text-xs text-slate-200"
          >
            <p className="text-sm font-medium text-white mb-1">
              "{activeStory.photos[activePhotoIdx].caption}"
            </p>
            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
              <span>Foto: <strong className="text-amber-400">{activeStory.photographer}</strong></span>
              <span>·</span>
              <span>Kategori: {activeStory.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
