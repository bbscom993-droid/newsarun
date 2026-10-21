import { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Award,
  Building2,
  Scale,
  CheckCircle2,
  ExternalLink,
  Download,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { ARUN_LEGAL_DATA, Article } from '../data/newsData';

interface LegalitasSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export default function LegalitasSection({
  articles,
  onSelectArticle,
  darkMode
}: LegalitasSectionProps) {
  const [activeTab, setActiveTab] = useState<'badan-hukum' | 'dewan-pers' | 'pedoman-siber' | 'kode-etik' | 'hak-jawab'>('badan-hukum');
  const legalArticles = articles.filter((a) => a.category === 'Legalitas');

  return (
    <section className="space-y-8 animate-in fade-in duration-200">
      {/* Official Legal Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071933] via-[#0b2447] to-[#071933] border-2 border-amber-400/80 p-6 sm:p-8 shadow-2xl text-white">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Transparansi & Kepatuhan Hukum Perusahaan Pers</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>Legalitas Resmi</span>
              <span className="text-amber-400">{ARUN_LEGAL_DATA.companyName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
              Arun News adalah media siber berbadan hukum pers resmi yang tunduk pada Undang-Undang Pers Nomor 40 Tahun 1999, terverifikasi faktual oleh Dewan Pers Republik Indonesia, serta memegang teguh Kode Etik Jurnalistik.
            </p>
          </div>

          {/* Dewan Pers Verification Badge */}
          <div className="shrink-0 p-4 rounded-xl bg-blue-950/90 border border-amber-400/50 shadow-xl flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-xs">
              <Award className="w-7 h-7 fill-slate-950" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                Verifikasi Faktual
              </div>
              <div className="text-sm font-black text-white">
                Dewan Pers Terdaftar
              </div>
              <div className="text-[11px] text-blue-300 font-mono">
                No: 849/DP-Faktual/2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs for Legal Documents */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-blue-800">
        <button
          onClick={() => setActiveTab('badan-hukum')}
          className={`px-4 py-2 text-xs font-black rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'badan-hukum'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Badan Hukum & Perizinan</span>
        </button>

        <button
          onClick={() => setActiveTab('dewan-pers')}
          className={`px-4 py-2 text-xs font-black rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'dewan-pers'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Verifikasi Dewan Pers</span>
        </button>

        <button
          onClick={() => setActiveTab('pedoman-siber')}
          className={`px-4 py-2 text-xs font-black rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'pedoman-siber'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pedoman Media Siber (PPMS)</span>
        </button>

        <button
          onClick={() => setActiveTab('kode-etik')}
          className={`px-4 py-2 text-xs font-black rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'kode-etik'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Kode Etik Jurnalistik</span>
        </button>

        <button
          onClick={() => setActiveTab('hak-jawab')}
          className={`px-4 py-2 text-xs font-black rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'hak-jawab'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Hak Jawab & Koreksi</span>
        </button>
      </div>

      {/* Tab 1: Badan Hukum & Perizinan */}
      {activeTab === 'badan-hukum' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-150">
          <div className="p-5 rounded-2xl bg-[#091f3d] border border-blue-700/60 text-white space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-blue-800">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-sm text-white uppercase tracking-wider">
                Identitas Korporasi Pers
              </h3>
            </div>
            
            <dl className="space-y-3 text-xs">
              <div>
                <dt className="text-blue-300 font-semibold">Nama Badan Hukum:</dt>
                <dd className="font-black text-white text-sm">{ARUN_LEGAL_DATA.companyName}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Nama Merek Terdaftar:</dt>
                <dd className="font-bold text-amber-300">{ARUN_LEGAL_DATA.brandName}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">SK Pengesahan Kemenkumham RI:</dt>
                <dd className="font-mono font-bold text-emerald-400">{ARUN_LEGAL_DATA.skKemenkumham}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Nomor Induk Berusaha (NIB):</dt>
                <dd className="font-mono font-bold text-white">{ARUN_LEGAL_DATA.nib}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Klasifikasi KBLI:</dt>
                <dd className="text-blue-100">{ARUN_LEGAL_DATA.kbli}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">NPWP Perusahaan:</dt>
                <dd className="font-mono font-bold text-amber-400">{ARUN_LEGAL_DATA.npwp}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Akta Pendirian Notaris:</dt>
                <dd className="text-blue-100">{ARUN_LEGAL_DATA.notaris}</dd>
              </div>
            </dl>
          </div>

          <div className="p-5 rounded-2xl bg-[#091f3d] border border-blue-700/60 text-white space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-blue-800">
              <UserCheck className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-sm text-white uppercase tracking-wider">
                Penanggung Jawab & Dewan Redaksi
              </h3>
            </div>

            <dl className="space-y-3 text-xs">
              <div>
                <dt className="text-blue-300 font-semibold">Penanggung Jawab / Pemimpin Redaksi:</dt>
                <dd className="font-black text-white text-sm">{ARUN_LEGAL_DATA.penanggungJawab}</dd>
                <dd className="text-[11px] text-amber-300 font-semibold mt-0.5">{ARUN_LEGAL_DATA.wartawanUtamaNo}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Redaktur Eksekutif:</dt>
                <dd className="font-bold text-white">{ARUN_LEGAL_DATA.redakturEksekutif}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Kuasa Hukum & Advokat:</dt>
                <dd className="font-bold text-blue-100">{ARUN_LEGAL_DATA.kuasaHukum}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Sertifikasi Merek HKI:</dt>
                <dd className="text-blue-100 font-mono text-[11px]">{ARUN_LEGAL_DATA.merekDaftarHki}</dd>
              </div>
              <div>
                <dt className="text-blue-300 font-semibold">Alamat Kantor Pusat Redaksi:</dt>
                <dd className="text-blue-100 leading-relaxed">{ARUN_LEGAL_DATA.alamatKantor}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Tab 2: Dewan Pers */}
      {activeTab === 'dewan-pers' && (
        <div className="p-6 rounded-2xl bg-[#091f3d] border border-blue-700/60 text-white space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-blue-800">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-black text-base text-white">
                Status Verifikasi Faktual Dewan Pers Republik Indonesia
              </h3>
              <p className="text-xs text-blue-200">
                Memenuhi seluruh ketentuan Standar Perusahaan Pers yang ditetapkan Dewan Pers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
            <div className="p-4 rounded-xl bg-blue-950 border border-blue-800">
              <div className="text-[10px] font-bold text-amber-400 uppercase">Status Verifikasi</div>
              <div className="text-sm font-black text-emerald-400 mt-1">Lolos Verifikasi Faktual</div>
              <div className="text-[11px] text-blue-300 mt-0.5">Sertifikat No: 849/DP-Faktual/X/2024</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-950 border border-blue-800">
              <div className="text-[10px] font-bold text-amber-400 uppercase">Kualifikasi Pemred</div>
              <div className="text-sm font-black text-white mt-1">Wartawan Utama</div>
              <div className="text-[11px] text-blue-300 mt-0.5">Kompetensi Dewan Pers RI</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-950 border border-blue-800">
              <div className="text-[10px] font-bold text-amber-400 uppercase">Perlindungan Wartawan</div>
              <div className="text-sm font-black text-amber-300 mt-1">SOP Standar Dewan Pers</div>
              <div className="text-[11px] text-blue-300 mt-0.5">Asuransi & Jaminan Hukum</div>
            </div>
          </div>

          <p className="text-xs text-blue-100 leading-relaxed">
            Arun News telah menjalani verifikasi komprehensif oleh Tim Dewan Pers meliputi keabsahan modal kerja berbadan hukum pers murni (PT), kepemilikan kantor redaksi tetap, sistem upah jurnalis di atas UMR, jaminan kesehatan dan ketenagakerjaan, serta kepatuhan ruang redaksi terhadap Kode Etik Jurnalistik.
          </p>
        </div>
      )}

      {/* Tab 3: Pedoman Media Siber */}
      {activeTab === 'pedoman-siber' && (
        <div className="p-6 rounded-2xl bg-[#091f3d] border border-blue-700/60 text-white space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-blue-800">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-black text-base text-white">
                Pedoman Pemberitaan Media Siber (PPMS) Arun News
              </h3>
              <p className="text-xs text-blue-200">
                Penerapan Peraturan Dewan Pers Nomor: 1/Peraturan-DP/III/2012
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-blue-100 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-blue-950 border border-blue-800">
              <strong className="text-amber-400 block mb-1">1. Ruang Lingkup dan Verifikasi Berita</strong>
              Setiap berita yang dipublikasikan oleh Arun News wajib melalui verifikasi fakta sekurang-kurangnya dua sumber independen, mengedepankan asas keberimbangan, serta tidak memuat prasangka atau diskriminasi SARA.
            </div>
            <div className="p-3.5 rounded-xl bg-blue-950 border border-blue-800">
              <strong className="text-amber-400 block mb-1">2. Konten Buatan Pengguna (User Generated Content / Lapor Warga)</strong>
              Arun News menyediakan kanal Lapor Warga dengan moderasi berkala. Redaksi berhak menyunting dan memverifikasi laporan masyarakat sebelum ditayangkan demi menjaga objektivitas dan kepatuhan hukum.
            </div>
            <div className="p-3.5 rounded-xl bg-blue-950 border border-blue-800">
              <strong className="text-amber-400 block mb-1">3. Ralat, Koreksi, dan Hak Jawab</strong>
              Ralat, koreksi, dan hak jawab ditautkan langsung pada berita terkait dengan mencantumkan waktu ralat. Pembaca berhak menyampaikan keberatan berita melalui saluran resmi redaksi tanpa dipungut biaya.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Kode Etik Jurnalistik */}
      {activeTab === 'kode-etik' && (
        <div className="p-6 rounded-2xl bg-[#091f3d] border border-blue-700/60 text-white space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-blue-800">
            <Scale className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-black text-base text-white">
                11 Pasal Kode Etik Jurnalistik (KEJ)
              </h3>
              <p className="text-xs text-blue-200">
                Komitmen profesional seluruh reporter dan editor Arun News
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-blue-950 border border-blue-800">
              <span className="font-bold text-amber-400">Pasal 1:</span> Wartawan Indonesia bersikap independen, menghasilkan berita yang akurat, berimbang, dan tidak beritikad buruk.
            </div>
            <div className="p-3 rounded-lg bg-blue-950 border border-blue-800">
              <span className="font-bold text-amber-400">Pasal 2:</span> Wartawan Indonesia menempuh cara-cara yang profesional dalam melaksanakan tugas jurnalistik.
            </div>
            <div className="p-3 rounded-lg bg-blue-950 border border-blue-800">
              <span className="font-bold text-amber-400">Pasal 3:</span> Wartawan Indonesia selalu menguji informasi, memberitakan secara berimbang, tidak mencampurkan fakta dan opini yang menghakimi.
            </div>
            <div className="p-3 rounded-lg bg-blue-950 border border-blue-800">
              <span className="font-bold text-amber-400">Pasal 4:</span> Wartawan Indonesia tidak membuat berita bohong, fitnah, sadis, dan cabul.
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Hak Jawab & Kontak Hukum */}
      {activeTab === 'hak-jawab' && (
        <div className="p-6 rounded-2xl bg-[#091f3d] border border-blue-700/60 text-white space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-blue-800">
            <FileText className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-black text-base text-white">
                Layanan Hak Jawab, Ralat & Hak Koreksi
              </h3>
              <p className="text-xs text-blue-200">
                Sesuai Pasal 5 Ayat (2) dan (3) Undang-Undang Nomor 40 Tahun 1999 tentang Pers
              </p>
            </div>
          </div>

          <p className="text-xs text-blue-100 leading-relaxed">
            Jika terdapat pemberitaan Arun News yang merugikan nama baik Anda atau mengandung kekeliruan data, Anda berhak mengajukan Hak Jawab atau Hak Koreksi kepada kami. Redaksi akan menindaklanjuti dalam waktu selambat-lambatnya 1x24 jam setelah bukti sanggahan diterima.
          </p>

          <div className="p-4 rounded-xl bg-blue-950 border border-blue-800 space-y-2 text-xs">
            <div className="font-bold text-amber-300">Saluran Resmi Pengaduan Hak Jawab:</div>
            <div className="flex items-center gap-2 text-blue-100">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Email: <strong>hakjawab@arunnews.id</strong> / <strong>redaksi@arunnews.id</strong></span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Hotline Redaksi: <strong>(021) 388-7200</strong></span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Alamat Fisik Kantor: Gg Gaya, Pasar minggu, kec, Pasar minggu, Jakarta Selatan, DKI JAKARTA, Indonesia</span>
            </div>
          </div>
        </div>
      )}

      {/* Section: Berita & Dokumentasi Terkait Legalitas */}
      <div className="pt-4 space-y-4">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Arsip Dokumentasi & Rilis Legalitas Arun News</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {legalArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="group cursor-pointer p-4 rounded-xl bg-[#091f3d] border border-blue-700/60 hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                  <span>{art.category}</span>
                  <span className="text-blue-300">{art.publishedAt}</span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {art.title}
                </h4>
                <p className="text-xs text-blue-200 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-blue-800/80 flex items-center justify-between text-xs text-amber-400 font-bold">
                <span>Baca Selengkapnya</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
