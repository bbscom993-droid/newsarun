import { useState } from 'react';
import { Feather, BookOpen, Quote, Clock, Sparkles, ChevronRight, UserCheck } from 'lucide-react';
import { Article } from '../data/newsData';

export interface OpiniEssayItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  fullEssay: string[];
  author: {
    name: string;
    role: string;
    institution: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export const INITIAL_ESSAYS: OpiniEssayItem[] = [
  {
    id: 'opini-1',
    title: 'Menjaga Marwah Independensi Pers di Era Turbulensi Disinformasi & Algoritma Digital',
    slug: 'menjaga-marwah-independensi-pers-era-disinformasi',
    excerpt: 'Pers bukan sekadar transmisi informasi, melainkan benteng pertahanan akal sehat publik saat gelombang hoaks dan fabrikasi opini mengancam kohesi kebangsaan.',
    fullEssay: [
      'Ketika revolusi digital mengaburkan batas antara fakta terverifikasi dan opini pesanan, fungsi pers sebagai pilar keempat demokrasi justru menghadapi ujian paling eksistensial sejak era reformasi.',
      'Algoritma media sosial yang dirancang memprioritaskan keterlibatan emosional (emotional engagement) kerap kali mempromosikan polarisasi di atas kebenaran faktual. Dalam lanskap ini, jurnalisme investigatif yang memegang teguh asas perimbangan dan etika verifikasi adalah oksigen bagi nalar publik.',
      'Negara wajib menjamin kemerdekaan pers dari segala bentuk represi hukum maupun serangan siber, sementara ruang redaksi wajib membuktikan independensinya dengan menolak intervensi kepentingan modal oligarki maupun kekuasaan politik jangka pendek.',
      'Masyarakat terdidik Nusantara berhak atas jurnalisme yang berani bersuara jernih, mendalam, dan membela kepentingan publik tanpa kompromi.'
    ],
    author: {
      name: 'Prof. Dr. Hendra Gunawan, S.H., LL.M.',
      role: 'Guru Besar Hukum Tata Negara & Etika Media',
      institution: 'Universitas Indonesia',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
    },
    publishedAt: '22 Okt 2026',
    readTime: '5 mnt baca',
    tags: ['Etika Pers', 'Demokrasi', 'Hukum Media', 'Disinformasi']
  },
  {
    id: 'opini-2',
    title: 'Kemandirian Industri Daerah: Memastikan Buah Manis Hilirisasi Mengalir Nyata ke Rakyat 3T',
    slug: 'kemandirian-industri-daerah-hilirisasi-rakyat-3t',
    excerpt: 'Pabrik pengolahan megah di pelosok pulau tidak boleh menjadi pulau kekayaan yang terisolasi dari masyarakat desa di lingkar tambang.',
    fullEssay: [
      'Kebijakan hilirisasi sumber daya mineral dan energi baru terbarukan telah mencatatkan lompatan devisa spektakuler bagi neraca perdagangan nasional.',
      'Namun keberhasilan makroekonomi ini harus diuji dengan indikator yang lebih substansial: seberapa banyak anak-anak muda daerah 3T (terdepan, terluar, tertinggal) yang mendapatkan alih teknologi dan posisi manajerial terhormat?',
      'Kemitraan strategis antara konglomerasi industri hilir dengan koperasi lokal dan UMKM masyarakat adat harus menjadi syarat mutlak perizinan amdal dan insentif fiskal.',
      'Hilirisasi sejati adalah hilirisasi yang memerdekakan ekonomi rakyat daerah dari jerat kemiskinan antargenerasi.'
    ],
    author: {
      name: 'Dr. Siti Nurhaliza, M.Sc.',
      role: 'Peneliti Senior Kebijakan Ekonomi & Pembangunan Hijau',
      institution: 'Pusat Studi Ekonomi Pembangunan Nusantara',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
    },
    publishedAt: '21 Okt 2026',
    readTime: '4 mnt baca',
    tags: ['Ekonomi Daerah', 'Hilirisasi', 'Keadilan Sosial', 'UMKM']
  },
  {
    id: 'opini-3',
    title: 'Poros Maritim Nusantara: Menghidupkan Kembali Jiwa Bahari Generasi Emas Indonesia',
    slug: 'poros-maritim-menghidupkan-kembali-jiwa-bahari-generasi-emas',
    excerpt: 'Leluhur kita memandang laut bukan sebagai pemisah daratan, melainkan jembatan peradaban yang menyatukan ribuan tradisi kepulauan.',
    fullEssay: [
      'Dua pertiga kedaulatan tanah air kita adalah hamparan samudera yang kaya akan keanekaragaman hayati dan jalur perdagangan dunia.',
      'Pendidikan nasional harus berani merombak kurikulum yang selama ini terlalu kontinental (berorientasi daratan) menuju kesadaran maritim yang menyeluruh.',
      'Dari industri galangan kapal rakyat, teknologi navigasi modern, hingga riset bioteknologi laut, masa depan kejayaan Nusantara berada di atas buih ombak samuderanya.'
    ],
    author: {
      name: 'Raden Mas Suryo Putro',
      role: 'Budayawan Bahari & Pemerhati Sejarah Nusantara',
      institution: 'Lembaga Kebudayaan Maritim Nusantara',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80'
    },
    publishedAt: '20 Okt 2026',
    readTime: '4 mnt baca',
    tags: ['Budaya Bahari', 'Poros Maritim', 'Pendidikan Nasional']
  }
];

interface OpiniEsaiSectionProps {
  onSelectArticle?: (article: Article) => void;
  darkMode: boolean;
}

export default function OpiniEsaiSection({
  onSelectArticle,
  darkMode
}: OpiniEsaiSectionProps) {
  const [selectedEssay, setSelectedEssay] = useState<OpiniEssayItem | null>(null);

  const handleOpenEssayAsArticle = (essay: OpiniEssayItem) => {
    // If onSelectArticle provided, convert to Article structure and open ArticleModal
    if (onSelectArticle) {
      const art: Article = {
        id: essay.id,
        title: essay.title,
        slug: essay.slug,
        category: 'Opini & Esai',
        summary: essay.excerpt,
        content: essay.fullEssay,
        keyPoints: [
          `Gagasan oleh ${essay.author.name} (${essay.author.institution})`,
          'Pandangan kritis independen untuk pencerahan publik dan perumusan kebijakan.',
          'Diterbitkan di Kolom Opini Resmi Arun News: Jembatan Media Nusantara.'
        ],
        author: {
          name: essay.author.name,
          role: `${essay.author.role} - ${essay.author.institution}`,
          avatar: essay.author.avatar
        },
        publishedAt: `${essay.publishedAt}, 09:00 WIB`,
        readTime: essay.readTime,
        imageUrl: essay.author.avatar,
        imageCaption: `Foto penulis esai: ${essay.author.name}`,
        viewsCount: 28400,
        sharesCount: 2150,
        tags: essay.tags,
        comments: [
          {
            id: 'c-opini-1',
            author: 'Bambang Sudiro',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
            timeAgo: '1 jam lalu',
            content: 'Esai yang sangat tajam dan reflektif. Sangat relevan dengan kondisi bangsa saat ini.',
            likes: 28
          }
        ]
      };
      onSelectArticle(art);
    } else {
      setSelectedEssay(essay);
    }
  };

  return (
    <section className="mb-10 w-full">
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          darkMode
            ? 'bg-gradient-to-br from-[#06182e] via-[#0a2347] to-[#071b36] border-blue-900/80 text-white shadow-2xl'
            : 'bg-gradient-to-br from-[#081f40] via-[#0c2a55] to-[#081e3a] border-blue-700/80 text-white shadow-2xl'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blue-800/80 gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Feather className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase bg-blue-900 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Ruang Gagasan Intelektual
                </span>
                <span className="text-[11px] text-blue-200 font-semibold hidden sm:inline">
                  Pemikiran Bernas Tokoh & Cendekiawan Nusantara
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mt-0.5">
                Kolom Opini & Esai
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>3 Esai Pilihan Minggu Ini</span>
          </div>
        </div>

        {/* 3 Featured Opinion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_ESSAYS.map((essay) => (
            <article
              key={essay.id}
              onClick={() => handleOpenEssayAsArticle(essay)}
              className="group p-5 rounded-xl bg-blue-950/70 hover:bg-blue-900/70 border border-blue-800/80 hover:border-amber-400/80 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-2 right-3 text-blue-800/40 group-hover:text-amber-400/20 transition-colors pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              <div>
                {/* Author Info Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={essay.author.avatar}
                    alt={essay.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                      {essay.author.name}
                    </h4>
                    <p className="text-[10px] text-blue-300 leading-tight">
                      {essay.author.role}
                    </p>
                    <p className="text-[9px] text-amber-400 font-semibold">
                      {essay.author.institution}
                    </p>
                  </div>
                </div>

                {/* Essay Title */}
                <h3 className="text-sm sm:text-base font-black text-white group-hover:text-amber-300 transition-colors leading-snug mb-2.5">
                  "{essay.title}"
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-blue-200/90 leading-relaxed line-clamp-3 italic mb-4">
                  "{essay.excerpt}"
                </p>
              </div>

              {/* Read button & Time */}
              <div className="pt-3 border-t border-blue-900/80 flex items-center justify-between text-xs">
                <span className="text-[10px] text-blue-300 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{essay.readTime}</span>
                </span>

                <span className="font-black text-amber-400 group-hover:text-amber-300 flex items-center gap-1 text-[11px]">
                  <span>Baca Esai</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
