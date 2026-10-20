import { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Scale,
  Users,
  FileText,
  Building,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Megaphone,
  Briefcase,
  HelpCircle,
  ExternalLink,
  Printer
} from 'lucide-react';

export type EditorialModalTab =
  | 'box_redaksi'
  | 'pedoman_siber'
  | 'kode_etik'
  | 'panduan_warga'
  | 'privasi'
  | 'syarat'
  | 'disclaimer'
  | 'iklan';

interface EditorialInfoModalProps {
  isOpen: boolean;
  initialTab: EditorialModalTab;
  onClose: () => void;
  onOpenLaporWarga: () => void;
  onOpenAdmin: () => void;
  darkMode: boolean;
}

export default function EditorialInfoModal({
  isOpen,
  initialTab,
  onClose,
  onOpenLaporWarga,
  onOpenAdmin,
  darkMode
}: EditorialInfoModalProps) {
  const [activeTab, setActiveTab] = useState<EditorialModalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
          darkMode
            ? 'bg-[#071932] border-blue-800 text-white'
            : 'bg-[#0a2347] border-blue-700 text-white shadow-2xl'
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-blue-800 flex items-center justify-between bg-blue-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Scale className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-900 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Transparansi & Akuntabilitas Publik
                </span>
                <span className="text-xs text-blue-300 font-semibold hidden sm:inline">
                  PT Arun Media Nusantara
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                Dokumen Resmi Redaksi & Standar Jurnalistik
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-blue-900/80 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors hidden sm:flex items-center gap-1 text-xs font-bold"
              title="Cetak Dokumen"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-blue-900/80 hover:bg-rose-600 text-slate-200 hover:text-white transition-colors"
              aria-label="Tutup jendela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center gap-1.5 p-2 sm:px-6 bg-blue-950/90 border-b border-blue-800/80 overflow-x-auto no-scrollbar shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('box_redaksi')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'box_redaksi'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Susunan Box Redaksi</span>
          </button>

          <button
            onClick={() => setActiveTab('pedoman_siber')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'pedoman_siber'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pedoman Media Siber</span>
          </button>

          <button
            onClick={() => setActiveTab('kode_etik')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'kode_etik'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kode Etik Jurnalistik</span>
          </button>

          <button
            onClick={() => setActiveTab('panduan_warga')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'panduan_warga'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Panduan Jurnalisme Warga</span>
          </button>

          <button
            onClick={() => setActiveTab('privasi')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'privasi'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <span>Kebijakan Privasi</span>
          </button>

          <button
            onClick={() => setActiveTab('syarat')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'syarat'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <span>Syarat & Ketentuan</span>
          </button>

          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'disclaimer'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <span>Disclaimer</span>
          </button>

          <button
            onClick={() => setActiveTab('iklan')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'iklan'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Iklan & Kemitraan</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-sm text-blue-100 leading-relaxed">
          {/* TAB 1: SUSUNAN PENGELOLA & BOX REDAKSI */}
          {activeTab === 'box_redaksi' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80 flex items-start gap-3">
                <Building className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-black text-white">
                    Penerbit & Badan Hukum Perusahaan Pers
                  </h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    <strong>PT ARUN MEDIA NUSANTARA</strong> · SK Menkumham RI No. AHU-0048291.AH.01.01.TAHUN 2024 · NIB: 1910240058291 · KBLI 63122 (Aktivitas Portal Web & Platform Digital) · Terverifikasi Faktual Dewan Pers No. 849/DP-Terverifikasi/Faktual/X/2024.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800 space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-blue-800 pb-1.5">
                    Dewan Komisaris & Direksi
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-blue-300 block">Komisaris Utama:</span>
                      <strong className="text-white text-sm">Dr. Ir. H. Bambang Soewardi, M.Sc.</strong>
                    </div>
                    <div>
                      <span className="text-blue-300 block">Komisaris:</span>
                      <strong className="text-white">Dra. Ratna Indrayani</strong>
                    </div>
                    <div>
                      <span className="text-blue-300 block">Direktur Utama:</span>
                      <strong className="text-white text-sm">M. Rizky Pratama, S.E., M.M.</strong>
                    </div>
                    <div>
                      <span className="text-blue-300 block">Direktur Operasional & Bisnis:</span>
                      <strong className="text-white">Nadia Safitri, S.I.Kom.</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800 space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-blue-800 pb-1.5">
                    Pimpinan Redaksi & Penanggung Jawab
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-blue-300 block">Pemimpin Redaksi / Penanggung Jawab:</span>
                      <strong className="text-white text-sm">Dr. H. Bagus Setyawan, M.I.Kom.</strong>
                      <span className="text-[11px] text-amber-300 block mt-0.5">
                        (Sertifikat Wartawan Utama Dewan Pers No. 1294/DP/WU/2019)
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-300 block">Redaktur Pelaksana:</span>
                      <strong className="text-white">Hendro Gunawan & Bagus Setyawan</strong>
                    </div>
                    <div>
                      <span className="text-blue-300 block">Koordinator Investigasi & Hukum:</span>
                      <strong className="text-white">Rian Hidayat, S.H.</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redaktur Kompartemen */}
              <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-blue-800 pb-1.5">
                  Redaktur Kompartemen & Jurnalis Lapangan
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-amber-300 font-bold block">Politik & Parlemen:</span>
                    <span>Bagus Setyawan, Aditya Permadi</span>
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold block">Ekonomi & Pasar Modal:</span>
                    <span>Rendra Mahendra, Dewi Lestari</span>
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold block">Hukum & Kriminal:</span>
                    <span>Rian Hidayat, Dimas Prasetya</span>
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold block">Daerah & Liputan Khusus:</span>
                    <span>Hasan Basri, Made Sukadana</span>
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold block">Olahraga:</span>
                    <span>Dimas Kurniawan, Fajar Ramadhan</span>
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold block">Foto & Multimedia:</span>
                    <span>Yudha Pratama, Sekar Melati</span>
                  </div>
                </div>
              </div>

              {/* Notice to Public */}
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/40 text-xs text-amber-200">
                <strong>Catatan Resmi Dewan Redaksi:</strong> Seluruh wartawan dan koresponden Arun News dibekali Surat Tugas resmi dan Kartu Tanda Anggota (KTA) bertanda tangan Pemimpin Redaksi serta tercantum dalam Box Redaksi. Jurnalis Arun News DILARANG KERAS menerima imbalan, uang suap, atau gratifikasi dalam bentuk apa pun terkait pemberitaan.
              </div>
            </div>
          )}

          {/* TAB 2: PEDOMAN MEDIA SIBER */}
          {activeTab === 'pedoman_siber' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80">
                <h3 className="text-base font-black text-white">
                  Pedoman Pemberitaan Media Siber (PPMS)
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Surat Keputusan Dewan Pers Nomor 03/SK-DP/III/2012 tertanggal 3 Februari 2012 yang dipatuhi seutuhnya oleh Arun News.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">1. Ruang Lingkup</h4>
                  <p>Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">2. Verifikasi dan Keberimbangan Berita</h4>
                  <p>Pada prinsipnya setiap berita harus melalui verifikasi. Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan (cover both sides).</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">3. Isi Buatan Pengguna (User Generated Content / Lapor Warga)</h4>
                  <p>Arun News memuat syarat dan ketentuan mengenai Isi Buatan Pengguna yang tidak bertentangan dengan UU Pers dan Kode Etik Jurnalistik, mewajibkan pendaftaran pengguna, serta menyediakan mekanisme koreksi dan pengaduan publik.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">4. Ralat, Koreksi, dan Hak Jawab</h4>
                  <p>Ralat, koreksi, dan hak jawab mengacu pada UU Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab. Ditautkan langsung pada berita yang diralat dan diberikan proporsi ruang yang setara tanpa dipungut biaya.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">5. Pencabutan Berita</h4>
                  <p>Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait masalah SARA, kesusilaan, masa depan anak, atau putusan pengadilan yang telah berkekuatan hukum tetap.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KODE ETIK JURNALISTIK */}
          {activeTab === 'kode_etik' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80">
                <h3 className="text-base font-black text-white">
                  Kode Etik Jurnalistik (KEJ) Wartawan Indonesia
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Landasan moral dan etika profesi yang ditegakkan oleh seluruh jajaran wartawan Arun News sesuai Keputusan Dewan Pers No. 03/SK-DP/III/2006.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 1</strong>
                  <span>Wartawan Indonesia bersikap independen, menghasilkan berita yang akurat, berimbang, dan tidak beriktikad buruk.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 2</strong>
                  <span>Wartawan Indonesia menempuh cara-cara yang profesional dalam melaksanakan tugas jurnalistik.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 3</strong>
                  <span>Wartawan Indonesia selalu menguji informasi, memberitakan secara berimbang, tidak mencampurkan fakta dan opini yang menghakimi, serta menerapkan asas praduga tak bersalah.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 4</strong>
                  <span>Wartawan Indonesia tidak membuat berita bohong, fitnah, sadis, dan cabul.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 5</strong>
                  <span>Wartawan Indonesia tidak menyebutkan dan menyiarkan identitas korban kejahatan susila dan tidak menyebutkan identitas anak yang menjadi pelaku kejahatan.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 6</strong>
                  <span>Wartawan Indonesia tidak menyalahgunakan profesi dan tidak menerima suap.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 7</strong>
                  <span>Wartawan Indonesia memiliki hak tolak untuk melindungi narasumber yang tidak bersedia diketahui identitas maupun keberadaannya.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-400 block mb-0.5">Pasal 10 & 11</strong>
                  <span>Wartawan Indonesia segera mencabut, meralat, dan memperbaiki berita yang keliru disertai permintaan maaf serta melayani hak jawab dan hak koreksi.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PANDUAN JURNALISME WARGA */}
          {activeTab === 'panduan_warga' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white">
                    Panduan Partisipasi Kanal Lapor Warga
                  </h3>
                  <p className="text-xs text-blue-200 mt-1">
                    Kanal aspirasi publik dan jurnalisme warga untuk menyuarakan fakta lapangan di lingkungan sekitar Anda.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenLaporWarga();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-colors shadow-xs shrink-0"
                >
                  Kirim Laporan
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 mb-1">1. Prinsip Fakta & Kejujuran</h4>
                  <p>Laporan yang dikirimkan harus merupakan peristiwa nyata yang disaksikan langsung oleh pelapor di tempat kejadian. Dilarang keras mengirimkan laporan fiktif, rumor yang belum terverifikasi, atau fitnah.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 mb-1">2. Bukti Visual yang Autentik</h4>
                  <p>Sertakan foto atau video dokumentasi lapangan dengan waktu dan lokasi yang jelas. Hindari foto hasil manipulasi digital atau gambar milik orang lain tanpa izin.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 mb-1">3. Larangan Konten Berbahaya</h4>
                  <p>Redaksi menolak secara tegas laporan yang mengandung ujaran kebencian, diskriminasi SARA, pornografi, ancaman kekerasan, pencemaran nama baik, atau promosi komersial terselubung.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800">
                  <h4 className="font-bold text-amber-300 mb-1">4. Perlindungan Identitas & Hak Privasi</h4>
                  <p>Pelapor dapat meminta identitasnya dirahasiakan (anonim) demi keamanan dan keselamatan jika menyangkut kepentingan umum dan pelaporan dugaan pelanggaran hukum.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KEBIJAKAN PRIVASI */}
          {activeTab === 'privasi' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80">
                <h3 className="text-base font-black text-white">
                  Kebijakan Privasi Arun News
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Kepatuhan penuh terhadap Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP).
                </p>
              </div>

              <div className="space-y-3 text-xs text-blue-100">
                <p>
                  PT Arun Media Nusantara menghargai dan melindungi kerahasiaan data pribadi setiap pengunjung dan kontributor portal berita kami.
                </p>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800 space-y-2">
                  <strong className="text-amber-300 block">Data yang Kami Kumpulkan:</strong>
                  <ul className="list-disc list-inside space-y-1 text-blue-200">
                    <li>Informasi kontak saat mengirimkan Laporan Warga atau komentar (Nama, Email, Nomor Telepon/WhatsApp).</li>
                    <li>Data teknis perangkat dan peramban untuk keperluan analitik kunjungan dan penyesuaian tampilan.</li>
                    <li>Data donasi Sawer Kopi yang diproses melalui gateway pembayaran resmi berlisensi Bank Indonesia.</li>
                  </ul>
                </div>
                <p>
                  Kami tidak pernah menjual, menyewakan, atau memberikan data pribadi pengguna kepada pihak ketiga mana pun tanpa persetujuan eksplisit pemilik data, kecuali diwajibkan oleh putusan pengadilan Republik Indonesia.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: SYARAT & KETENTUAN */}
          {activeTab === 'syarat' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80">
                <h3 className="text-base font-black text-white">
                  Syarat & Ketentuan Penggunaan Portal
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Aturan penggunaan hak kekayaan intelektual dan etika interaksi pembaca di portal Arun News.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-300 block mb-0.5">1. Hak Cipta Karya Jurnalistik</strong>
                  <span>Seluruh materi berita, teks, foto, infografis, dan video di situs ini dilindungi Undang-Undang Hak Cipta No. 28 Tahun 2014. Pengutipan diperkenankan maksimal 250 karakter dengan mencantumkan tautan aktif ke sumber berita asli Arun News.</span>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/50 border border-blue-800">
                  <strong className="text-amber-300 block mb-0.5">2. Kolom Komentar Pembaca</strong>
                  <span>Komentar adalah tanggung jawab pribadi penulisnya. Redaksi berhak menyunting atau menghapus komentar yang melanggar hukum, menyerang personal, atau mengandung unsur SARA.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80">
                <h3 className="text-base font-black text-white">
                  Sanggahan / Disclaimer Redaksi
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Batasan tanggung jawab hukum sesuai ketentuan UU Pers No. 40 Tahun 1999 dan UU ITE No. 1 Tahun 2024.
                </p>
              </div>

              <div className="space-y-2.5">
                <p>
                  1. Seluruh informasi yang disajikan di portal Arun News ditujukan semata-mata untuk tujuan penyampaian informasi publik, edukasi jurnalistik, dan kontrol sosial masyarakat.
                </p>
                <p>
                  2. Redaksi tidak bertanggung jawab atas segala kerugian finansial atau materiil yang timbul akibat keputusan investasi, perdagangan saham, valuta asing, atau transaksi bisnis yang diambil berdasarkan data pasar di portal ini.
                </p>
                <p>
                  3. Pihak yang merasa dirugikan oleh suatu pemberitaan memiliki hak jawab dan hak koreksi yang diatur dalam Pasal 5 UU Pers No. 40/1999 dan dapat menghubungi Dewan Redaksi melalui email: <strong>redaksi@arunnews.id</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 8: PEMASANGAN IKLAN & KEMITRAAN */}
          {activeTab === 'iklan' && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-700/80 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-white">
                    Pemasangan Iklan & Kemitraan Media Nusantara
                  </h3>
                  <p className="text-xs text-blue-200 mt-1">
                    Jangkau jutaan pembaca cerdas di seluruh Indonesia dengan tarif transparan dan penempatan strategis.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800 space-y-2">
                  <div className="text-xs font-black uppercase text-amber-400">Banner Leaderboard</div>
                  <div className="text-lg font-black text-white">Rp 1.500.000 <span className="text-[10px] text-blue-300 font-normal">/ minggu</span></div>
                  <p className="text-[11px] text-blue-200">Ukuran 728×90 px di bagian atas halaman depan, impression tertinggi.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800 space-y-2">
                  <div className="text-xs font-black uppercase text-amber-400">Sidebar Rectangle</div>
                  <div className="text-lg font-black text-white">Rp 950.000 <span className="text-[10px] text-blue-300 font-normal">/ minggu</span></div>
                  <p className="text-[11px] text-blue-200">Ukuran 300×250 px tampil di setiap halaman berita dan samping live update.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800 space-y-2">
                  <div className="text-xs font-black uppercase text-amber-400">Advertorial & Video</div>
                  <div className="text-lg font-black text-white">Rp 3.500.000 <span className="text-[10px] text-blue-300 font-normal">/ tayang</span></div>
                  <p className="text-[11px] text-blue-200">Artikel ulasan brand mendalam dan tayangan video dokumenter liputan khusus.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-900/60 border border-blue-700 space-y-2">
                <div className="font-bold text-white text-sm">Hubungi Divisi Kerjasama & Bisnis:</div>
                <div className="flex flex-wrap items-center gap-4 text-blue-200 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>marketing@arunnews.id</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>WhatsApp Bisnis: +62 812-9988-7711</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Strip */}
        <div className="p-3.5 sm:px-6 border-t border-blue-800/80 bg-blue-950/80 flex items-center justify-between text-xs text-blue-300 shrink-0">
          <span>Dewan Pers & Undang-Undang Pers No. 40 Tahun 1999</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors"
          >
            Tutup Dokumen
          </button>
        </div>
      </div>
    </div>
  );
}
