export type NewsCategory = 
  | 'Politik' 
  | 'Daerah' 
  | 'Kriminal' 
  | 'Lain-lain' 
  | 'Olahraga' 
  | 'Legalitas' 
  | 'Ekonomi'
  | 'Lapor Warga';

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
}

export interface LiveUpdate {
  time: string;
  title: string;
  body: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  summary: string;
  content: string[];
  keyPoints: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  imageCaption: string;
  viewsCount: number;
  sharesCount: number;
  isBreaking?: boolean;
  isEditorPick?: boolean;
  isHeadline?: boolean;
  isVideo?: boolean;
  videoUrl?: string;
  tags: string[];
  comments: CommentItem[];
  liveUpdates?: LiveUpdate[];
}

export interface LaporWargaConfig {
  hotlineWA: string;
  emailAdvokasi: string;
  operatingHours: string;
  autoApprove: boolean;
  guidelines: string;
  categories: string[];
}

export interface PortalBrandConfig {
  logoUrl?: string;
  portalName: string;
  portalSlogan: string;
  editorialEmail: string;
  editorialPhone: string;
  address: string;
}

export const DEFAULT_LAPOR_WARGA_CONFIG: LaporWargaConfig = {
  hotlineWA: '0812-3888-7200',
  emailAdvokasi: 'lapor@arunnews.id',
  operatingHours: '24 Jam Nonstop Siaga Publik',
  autoApprove: false,
  guidelines: 'Kirimkan fakta kejadian yang jelas, sertakan lokasi presisi (nama jalan/desa/kecamatan), kronologi singkat, dan foto/video bukti autentik. Arun News menjamin kerahasiaan identitas saksi pelapor sesuai UU Perlindungan Saksi dan Korban.',
  categories: [
    'Infrastruktur & Jalan Rusak',
    'Korupsi & Pungutan Liar (Pungli)',
    'Bencana Alam & Tanggap Darurat',
    'Pelayanan Publik & Fasilitas Kesehatan',
    'Keamanan & Gangguan Ketertiban',
    'Lingkungan Hidup & Sampah'
  ]
};

export const DEFAULT_PORTAL_CONFIG: PortalBrandConfig = {
  portalName: 'ARUN NEWS',
  portalSlogan: 'Jembatan Media Nusantara',
  editorialEmail: 'redaksi@arunnews.id',
  editorialPhone: '(021) 388-7200',
  address: 'Gedung Graha Media Nusantara Lt. 4, Jl. M.H. Thamrin No. 88, Jakarta Pusat 10350'
};

export const ARUN_LEGAL_DATA = {
  companyName: 'PT ARUN MEDIA NUSANTARA',
  brandName: 'Arun News - Jembatan Media Nusantara',
  skKemenkumham: 'AHU-0048291.AH.01.01.TAHUN 2024',
  nib: '1910240058291',
  kbli: '63122 (Aktivitas Portal Web dan/atau Platform Digital Komersial)',
  npwp: '42.891.304.8-013.000',
  dewanPersStatus: 'Terverifikasi Administratif & Faktual Dewan Pers',
  dewanPersNo: 'Sertifikat Dewan Pers No: 849/DP-Terverifikasi/Faktual/X/2024',
  penanggungJawab: 'Dr. H. Bagus Setyawan, M.I.Kom',
  wartawanUtamaNo: 'Sertifikat Kompetensi Wartawan Utama No. 1294/DP/WU/2019',
  pemimpinRedaksi: 'Dr. H. Bagus Setyawan, M.I.Kom',
  redakturEksekutif: 'Rian Hidayat, M.Si',
  kuasaHukum: 'Adv. Hendra Wijaya, S.H., M.H. & Partners (Advokat & Konsultan Hukum Media Siber)',
  alamatKantor: 'Gedung Graha Media Nusantara Lt. 4, Jl. M.H. Thamrin No. 88, Jakarta Pusat 10350',
  notaris: 'Dra. Hj. Nurjanah Sasmita, S.H., M.Kn (Akta No. 24 Tanggal 15 Januari 2024)',
  merekDaftarHki: 'Kemenkumham Ditjen HKI Sertifikat Merek Kelas 38 & 41 No. IDM000984123',
  pedomanMediaSiber: 'Kepatuhan penuh pada Standar Peraturan Dewan Pers No. 1/Peraturan-DP/III/2012'
};

export interface AdSlot {
  id: string;
  position: 'header_leaderboard' | 'sidebar_rectangle' | 'infeed_native' | 'footer_banner';
  name: string;
  dimensions: string;
  pricePerWeek: number;
  currentSponsor?: {
    brandName: string;
    bannerUrl: string;
    targetUrl: string;
    expiredAt: string;
  };
}

export interface CitizenReport {
  id: string;
  reporterName: string;
  reporterContact: string;
  location: string;
  title: string;
  description: string;
  category: NewsCategory;
  timestamp: string;
  status: 'pending' | 'verified' | 'published';
  photoUrl?: string;
}

export interface CoffeeTip {
  id: string;
  supporterName: string;
  amount: number;
  message: string;
  timestamp: string;
  paymentMethod: string;
}

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Sidang Paripurna DPR Sahkan RUU Pemilihan Kepala Daerah & Penataan Birokrasi Daerah Terpadu',
    slug: 'sidang-paripurna-dpr-sahkan-ruu-pilkada-birokrasi',
    category: 'Politik',
    summary: 'Rapat paripurna menyepakati penguatan integritas penyelenggaraan pemilihan serentak dengan efisiensi anggaran daerah dan digitalisasi audit suara publik.',
    content: [
      'Dewan Perwakilan Rakyat (DPR) RI resmi mengesahkan Rancangan Undang-Undang tentang Penyelenggaraan Pemilihan Kepala Daerah dan Reformasi Tata Kelola Pemerintahan Daerah dalam Rapat Paripurna di Kompleks Parlemen, Senayan, Jakarta.',
      'Ketua Sidang menegaskan bahwa beleid terbaru ini memberikan kepastian hukum terhadap transparansi dana kampanye, larangan tegas politik uang bermotif sembako digital, serta simplifikasi administrasi birokrasi di 38 provinsi di seluruh Nusantara.',
      '"Regulasi ini lahir dari evaluasi mendalam untuk mengembalikan hakikat kepemimpinan daerah yang bersih, akuntabel, dan mengutamakan pembangunan ekonomi rakyat kecil," ungkap pimpinan sidang sebelum mengetok palu pengesahan.',
      'Seluruh fraksi di parlemen menyetujui poin penguatan peran inspektorat daerah agar memiliki independensi struktural dalam mengawasi APBD tanpa intervensi kepala daerah.'
    ],
    keyPoints: [
      'Pengesahan RUU Pilkada serentak dengan sistem pengawasan dana kampanye berbasis rekening digital terpusat.',
      'Independensi inspektorat daerah diperkuat langsung di bawah koordinasi Badan Pengawasan Nasional.',
      'Digitalisasi rekapitulasi suara untuk menjamin kecepatan dan keakuratan penghitungan publik.'
    ],
    author: {
      name: 'Bagus Setyawan',
      role: 'Redaktur Politik & Parlemen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 14:15 WIB',
    readTime: '4 mnt baca',
    imageUrl: '/src/assets/images/hero_headline_summit_1792424745951.jpg',
    imageCaption: 'Pimpinan dan anggota parlemen dalam sidang paripurna pengambilan keputusan tingkat dua di Senayan.',
    viewsCount: 74200,
    sharesCount: 3820,
    isHeadline: true,
    isEditorPick: true,
    isBreaking: true,
    tags: ['Politik Nasional', 'DPR RI', 'Sidang Paripurna', 'Pilkada Serentak', 'Hukum & Tata Kelola'],
    comments: [
      {
        id: 'c1',
        author: 'Ahmad Faisal',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        timeAgo: '20 menit lalu',
        content: 'Harus benar-benar ditegakkan aturan larangan politik uang ini di pelosok daerah, jangan hanya formalitas.',
        likes: 45
      }
    ],
    liveUpdates: [
      {
        time: '14:20 WIB',
        title: 'Pengetokan Palu Pengesahan',
        body: 'Ketua Sidang resmi mengetok palu pengesahan disaksikan oleh menteri terkait dan 480 anggota parlemen yang hadir.'
      },
      {
        time: '13:30 WIB',
        title: 'Pandangan Akhir Pemerintah',
        body: 'Menteri Dalam Negeri menyampaikan apresiasi atas konsensus politik seluruh fraksi demi kemajuan daerah.'
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Polda Metro Jaya Bongkar Jaringan Sindikat Judi Online Antarnegara Bermodus Server Game Edukasi',
    slug: 'polda-metro-bongkar-sindikat-judi-online-antarnegara',
    category: 'Kriminal',
    summary: 'Tim Siber mengamankan 24 tersangka di kompleks perumahan elite dengan barang bukti 180 unit komputer berspesifikasi tinggi dan aset kripto senilai Rp 85 miliar.',
    content: [
      'Subdit Siber Direktorat Reserse Kriminal Khusus Polda Metro Jaya berhasil menggerebek sebuah markas operasional sindikat kejahatan siber perjudian daring antarnegara di kawasan Jakarta Barat.',
      'Para pelaku mengelabui otoritas dan penyedia jasa internet dengan mendaftarkan alamat protokol internet mereka sebagai penyedia layanan aplikasi permainan edukasi anak-anak.',
      'Dalam penggerebekan tersebut, penyidik menyita 180 unit server komputer berkecepatan tinggi, ratusan kartu SIM teregistrasi nomor identitas palsu, buku rekening tampungan perbankan, serta dompet mata uang kripto dengan total nilai transaksi mencapai Rp 85 miliar.',
      'Kapolda menegaskan tidak ada ruang bagi kompromi terhadap sindikat yang merusak tatanan ekonomi masyarakat kecil. "Kami melacak aliran transaksi hingga ke lapisan rekening penerima akhir termasuk tindak pidana pencucian uang (TPPU)," tegasnya.'
    ],
    keyPoints: [
      'Penggerebekan markas operator judi daring yang berkedok server aplikasi edukasi anak.',
      'Penyitaan aset komputer, rekening tampungan, dan aset kripto senilai Rp 85 miliar.',
      'Penetapan 24 tersangka dengan jeratan pasal berlapis UU ITE dan UU Tindak Pidana Pencucian Uang.'
    ],
    author: {
      name: 'Rian Hidayat',
      role: 'Wartawan Investigasi Kriminal',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 13:40 WIB',
    readTime: '3 mnt baca',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Petugas kepolisian mengamankan perangkat keras komputer dan kartu server di tempat kejadian perkara.',
    viewsCount: 89100,
    sharesCount: 5120,
    isBreaking: true,
    isEditorPick: true,
    tags: ['Kriminal', 'Polda Metro Jaya', 'Siber', 'Judi Online', 'Hukum'],
    comments: [
      {
        id: 'c2',
        author: 'Dian Permana',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        timeAgo: '40 menit lalu',
        content: 'Bagus sekali tindak tegas para bandar sampai ke akar-akarnya! Sudah banyak keluarga hancur karena judi online.',
        likes: 82
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Pembangunan Jembatan Bahari Penghubung Pulau Terluar Maluku Tuntas 100%, Pangkas Waktu Tempuh Warga',
    slug: 'pembangunan-jembatan-bahari-pulau-terluar-maluku-tuntas',
    category: 'Daerah',
    summary: 'Akses logistik dan layanan kesehatan yang sebelumnya memakan waktu pelayaran 6 jam kini dapat dijangkau dalam tempo 25 menit perjalanan darat.',
    content: [
      'Kementerian Pekerjaan Umum dan Perumahan Rakyat bersama Pemerintah Provinsi Maluku meresmikan selesainya pembangunan Jembatan Bahari Nusantara sepanjang 2,8 kilometer yang menghubungkan dua pulau terluar.',
      'Sebelum jembatan ini berdiri kokoh, ribuan warga di pulau seberang harus bergantung pada perahu motor tradisional yang kerap terhenti bila gelombang laut sedang tinggi.',
      'Kini, hasil tangkapan nelayan berupa ikan tuna dan rumput laut segar dapat langsung diangkut ke pelabuhan kontainer dingin dengan biaya transportasi yang merosot hingga 70%.',
      '"Ini bukan sekadar beton dan baja jembatan, melainkan urat nadi kemakmuran dan keadilan pembangunan bagi saudara-saudara kita di kepulauan timur Indonesia," ujar Gubernur Maluku saat peresmian.'
    ],
    keyPoints: [
      'Panjang bentang jembatan mencapai 2,8 kilometer dengan konstruksi tahan gempa 8,5 SR.',
      'Waktu tempuh antarwilayah terpangkas dari 6 jam via laut menjadi 25 menit via darat.',
      'Membuka akses langsung bagi anak sekolah, ambulans rujukan, serta logistik perikanan lokal.'
    ],
    author: {
      name: 'Eko Prabowo',
      role: 'Koresponden Wilayah Indonesia Timur',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 12:20 WIB',
    readTime: '3 mnt baca',
    imageUrl: '/src/assets/images/news_green_energy_transit_1792424746923.jpg',
    imageCaption: 'Struktur megah jembatan penghubung pulau di Maluku dengan panorama laut biru nusantara.',
    viewsCount: 51300,
    sharesCount: 2940,
    isEditorPick: true,
    tags: ['Daerah', 'Infrastruktur', 'Maluku', 'Konektivitas Bahari', 'Ekonomi Rakyat'],
    comments: []
  },
  {
    id: 'art-4',
    title: 'Timnas Sepak Bola Indonesia Tembus 100 Besar Peringkat FIFA Usai Rentetan Kemenangan Gemilang di GBK',
    slug: 'timnas-indonesia-tembus-100-besar-fifa',
    category: 'Olahraga',
    summary: 'Kemenangan bersejarah atas tim-tim papan atas benua mendongkrak posisi Garuda ke peringkat 98 dunia, lompatan tertinggi dalam dua dekade terakhir.',
    content: [
      'Federasi Sepak Bola Internasional (FIFA) resmi memperbarui rilis peringkat dunia edisi Oktober 2026. Tim Nasional Indonesia mencatat lonjakan spektakuler dengan menembus posisi 98 dunia.',
      'Pencapaian bersejarah ini diraih berkat performa konsisten skuad Garuda di babak Kualifikasi Piala Dunia zona Asia dengan menumbangkan lawan-lawan tangguh di Stadion Gelora Bung Karno Jakarta.',
      'Ketua Umum PSSI mengapresiasi kerja keras para pemain, pelatih, staf medis, serta dukungan fanatik suporter tanah air yang senantiasa memenuhi stadion.',
      '"Ini bukti nyata bahwa program pembinaan usia muda berkesinambungan dan modernisasi taktik sepak bola kita berada di jalur yang tepat," tegasnya.'
    ],
    keyPoints: [
      'Indonesia naik 14 peringkat dan resmi berada di peringkat 98 dunia FIFA.',
      'Menjadi tim dengan persentase perolehan poin ranking tertinggi di kawasan Asia bulan ini.',
      'Fokus persiapan berlanjut ke laga tandang kualifikasi akhir bulan mendatang.'
    ],
    author: {
      name: 'Dimas Kurniawan',
      role: 'Redaktur Olahraga Arun News',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 11:10 WIB',
    readTime: '3 mnt baca',
    imageUrl: '/src/assets/images/news_sports_timnas_1792424747238.jpg',
    imageCaption: 'Keluarga besar pemain Timnas Garuda merayakan kemenangan bersama suporter Gelora Bung Karno.',
    viewsCount: 96400,
    sharesCount: 7800,
    isBreaking: false,
    isEditorPick: true,
    tags: ['Olahraga', 'Timnas Indonesia', 'FIFA Ranking', 'Garuda Mendunia', 'GBK'],
    comments: [
      {
        id: 'c3',
        author: 'Fajar Nugraha',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        timeAgo: '1 jam lalu',
        content: 'Bangga luar biasa! Semoga konsisten hingga berhasil lolos ke panggung Piala Dunia.',
        likes: 67
      }
    ]
  },
  {
    id: 'art-5',
    title: 'Legalitas Resmi PT Arun Media Nusantara: SK Kemenkumham, NIB Perusahaan Pers & Sertifikasi Dewan Pers',
    slug: 'legalitas-resmi-pt-arun-media-nusantara-sk-kemenkumham-dewan-pers',
    category: 'Legalitas',
    summary: 'Komitmen transparansi dan integritas pers: Arun News beroperasi di bawah PT Arun Media Nusantara dengan pengesahan resmi Kemenkumham RI, NIB KBLI 63122, dan terverifikasi faktual Dewan Pers.',
    content: [
      'Sebagai pilar keempat demokrasi dan jembatan media nusantara tepercaya, Arun News (beroperasi di bawah naungan PT ARUN MEDIA NUSANTARA) menjunjung tinggi kepatuhan hukum Republik Indonesia dan Undang-Undang Pers Nomor 40 Tahun 1999.',
      'Perusahaan pers ini telah mendapatkan pengesahan resmi dari Menteri Hukum dan Hak Asasi Manusia Republik Indonesia melalui Surat Keputusan Nomor AHU-0048291.AH.01.01.TAHUN 2024 serta Nomor Induk Berusaha (NIB) 1910240058291 dengan Klasifikasi Baku Lapangan Usaha Indonesia (KBLI) 63122 (Aktivitas Portal Web dan Platform Digital).',
      'Dalam operasional redaksi harian, seluruh wartawan dan jurnalis Arun News dibekali kartu pers resmi dan bekerja di bawah arahan Pemimpin Redaksi/Penanggung Jawab yang telah mengantongi Sertifikat Kompetensi Wartawan Utama Dewan Pers Nomor 1294/DP/WU/2019.',
      'Arun News senantiasa taat pada Pedoman Pemberitaan Media Siber (PPMS) yang ditetapkan Dewan Pers, menerapkan asas praduga tak bersalah, perimbangan narasumber (cover both sides), serta memberikan hak jawab dan hak koreksi secara cuma-cuma dan terbuka bagi masyarakat luas.'
    ],
    keyPoints: [
      'Badan Hukum Resmi: PT Arun Media Nusantara, Akta Notaris Dra. Hj. Nurjanah Sasmita, S.H., M.Kn No. 24.',
      'SK Kemenkumham RI: AHU-0048291.AH.01.01.TAHUN 2024 & NIB 1910240058291.',
      'NPWP Perusahaan Pers: 42.891.304.8-013.000 & Terverifikasi Faktual Dewan Pers No. 849/DP-Terverifikasi/Faktual/X/2024.',
      'Penanggung Jawab & Pemred: Dr. H. Bagus Setyawan, M.I.Kom (Wartawan Utama Dewan Pers).'
    ],
    author: {
      name: 'Tim Legalitas & Kepatuhan Pers',
      role: 'Divisi Hukum PT Arun Media Nusantara',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 08:00 WIB',
    readTime: '4 mnt baca',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Dokumen legalitas, sertifikasi pers, dan komitmen etika jurnalistik PT Arun Media Nusantara.',
    viewsCount: 68400,
    sharesCount: 4120,
    isEditorPick: true,
    tags: ['Legalitas', 'PT Arun Media Nusantara', 'SK Kemenkumham', 'Dewan Pers', 'UU Pers No 40 Tahun 1999', 'Transparansi Media'],
    comments: [
      {
        id: 'c-leg-1',
        author: 'Bambang Sulistyo, S.H.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        timeAgo: '3 jam lalu',
        content: 'Salut atas keterbukaan legalitas dan transparansi izin perusahaan pers Arun News. Patut jadi percontohan media siber nasional.',
        likes: 54
      }
    ]
  },
  {
    id: 'art-6',
    title: 'Lapor Warga: Jalan Poros Antardesa di Kulon Progo Rusak Parah Tertimbun Longsor, Warga Buat Jembatan Darurat Bambu',
    slug: 'lapor-warga-jalan-poros-kulon-progo-rusak-longsor',
    category: 'Lapor Warga',
    summary: 'Aspirasi warga melaporkan terputusnya akses penghubung dua kecamatan akibat hujan deras berkepanjangan; membutuhkan alat berat dan bantuan tanggap darurat segera.',
    content: [
      'Laporan langsung dari perwakilan Paguyuban Warga Girimulyo, Kulon Progo, Yogyakarta, mengabarkan jalur transportasi vital yang menghubungkan dua desa tertutup longsoran tanah tebing sepanjang 40 meter sejak malam tadi.',
      'Kondisi ini mengakibatkan anak-anak sekolah dan petani pengangkut hasil bumi terpaksa memutar sejauh 18 kilometer melewati bukit berbatu yang rawan tergelincir.',
      'Secara bergotong royong, warga setempat membangun titian jembatan bambu darurat untuk pejalan kaki dan sepeda motor roda dua secara bergantian dengan pengawasan ketat.',
      '"Kami memohon dinas terkait dan BPBD segera menerjunkan unit alat berat pembersih tanah agar perekonomian warga tidak lumpuh," tutur Suratman, perwakilan warga pelapor.'
    ],
    keyPoints: [
      'Longsor sepanjang 40 meter menutup jalan poros kecamatan di Girimulyo, Kulon Progo.',
      'Warga berinisiatif membangun jembatan darurat bambu untuk akses darurat anak sekolah.',
      'Permohonan bantuan alat berat dan beronjong pengaman tebing kepada dinas terkait.'
    ],
    author: {
      name: 'Tim Lapor Warga Arun News',
      role: 'Kanal Jurnalisme Warga Nusantara',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 09:30 WIB',
    readTime: '2 mnt baca',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Foto kiriman warga memperlihatkan kondisi tebing longsor yang menutupi badan jalan poros desa.',
    viewsCount: 38400,
    sharesCount: 1980,
    tags: ['Lapor Warga', 'Bencana Daerah', 'Kulon Progo', 'Gotong Royong', 'Aspirasi Publik'],
    comments: [
      {
        id: 'c4',
        author: 'Siti Rahmawati',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        timeAgo: '2 jam lalu',
        content: 'Semoga segera ditindaklanjuti BPBD. Redaksi Arun News terima kasih sudah mengangkat suara warga kami.',
        likes: 34
      }
    ]
  },
  {
    id: 'art-7',
    title: 'Lain-lain: Tradisi Balap Perahu Sandeq Mandar Kembali Ramaikan Festival Bahari Nusantara di Selat Makassar',
    slug: 'tradisi-balap-perahu-sandeq-mandar-festival-bahari-nusantara',
    category: 'Lain-lain',
    summary: 'Puluhan mahakarya perahu layar tradisional tercepat warisan leluhur Mandar membelah ombak sejauh ratusan mil laut tanpa mesin, hanya mengandalkan keahlian angin.',
    content: [
      'Pesisir barat Sulawesi kembali dipenuhi warna-warni layar megah perahu Sandeq dalam rangkaian tahunan Festival Bahari Nusantara.',
      'Perahu bercadik khas suku Mandar ini dikenal luas oleh komunitas maritim internasional sebagai perahu layar kayu tradisional tercepat di dunia yang mampu melaju hingga 20 knot hanya dengan hembusan angin laut.',
      'Sebanyak 35 perahu Sandeq yang diawaki oleh para pelaut tangguh (Passandeq) berlaga menempuh rute pelayaran ratusan mil laut melintasi Selat Makassar hingga dermaga tujuan.',
      'Antusiasme ribuan wisatawan domestik dan fotografer dunia menyemarakkan pantai sejak fajar menyingsing untuk menyaksikan keterampilan para nakhoda membaca arah mata angin.'
    ],
    keyPoints: [
      '35 perahu Sandeq bertarung menaklukkan rute pelayaran tradisional di Selat Makassar.',
      'Pelestarian warisan budaya maritim Nusantara yang telah berusia ratusan tahun.',
      'Peningkatan kunjungan wisatawan budaya dan ekonomi kerajinan tangan pesisir.'
    ],
    author: {
      name: 'Sekar Melati',
      role: 'Wartawan Ragam Budaya & Humaniora',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 08:45 WIB',
    readTime: '3 mnt baca',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Deretan layar perahu Sandeq terkembang gagah di bawah siraman cahaya fajar Selat Makassar.',
    viewsCount: 29800,
    sharesCount: 1640,
    tags: ['Lain-lain', 'Budaya Nusantara', 'Perahu Sandeq', 'Sulawesi Barat', 'Pariwisata Bahari'],
    comments: []
  },
  {
    id: 'art-8',
    title: 'Pemerintah Daerah Bali & NTB Luncurkan Koridor Terpadu Penanganan Sampah Pesisir Berbasis Komunitas',
    slug: 'pemda-bali-ntb-koridor-penanganan-sampah-pesisir',
    category: 'Daerah',
    summary: 'Kolaborasi lintas provinsi memberdayakan 150 bank sampah pesisir dan kapal pembersih bertenaga surya untuk menjaga kebersihan destinasi wisata bahari.',
    content: [
      'Pemerintah Provinsi Bali dan Nusa Tenggara Barat resmi menyepakati protokol aksi bersama pengelolaan lingkungan perairan Selat Lombok dan kawasan pesisir.',
      'Inisiatif ini mengintegrasikan peran kelompok nelayan lokal, pelaku industri perhotelan, dan armada kapal nirawak bertenaga surya untuk membersihkan sampah plastik di perairan terbuka.',
      'Setiap sampah plastik yang dikumpulkan oleh komunitas warga pesisir langsung ditukarkan dengan voucer listrik atau tabungan pendidikan lewat aplikasi terdesentralisasi.'
    ],
    keyPoints: [
      'Kerja sama antardaerah Bali-NTB untuk kebersihan kawasan wisata maritim kelas dunia.',
      'Pemberdayaan 150 bank sampah pesisir dengan insentif ekonomi riil bagi warga.',
      'Penggunaan armada kapal pembersih surya tanpa emisi karbon.'
    ],
    author: {
      name: 'Bagus Setyawan',
      role: 'Koresponden Bali & Nusa Tenggara',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 07:50 WIB',
    readTime: '3 mnt baca',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Aktivitas relawan dan nelayan mengoperasikan kapal bertenaga surya pembersih perairan pesisir.',
    viewsCount: 31200,
    sharesCount: 1420,
    tags: ['Daerah', 'Lingkungan Hidup', 'Bali', 'NTB', 'Pariwisata Bersih'],
    comments: []
  },
  {
    id: 'art-9',
    title: 'Liputan Video: Sidang Verifikasi Faktual Dewan Pers Nyatakan Arun News Lulus Standar Perusahaan Pers Nasional',
    slug: 'liputan-video-sidang-verifikasi-dewan-pers-arun-news',
    category: 'Legalitas',
    summary: 'Saksikan liputan dokumentasi verifikasi faktual tim Dewan Pers RI di kantor redaksi PT Arun Media Nusantara, menetapkan legalitas jurnalistik dan perlindungan wartawan.',
    content: [
      'Dewan Pers Republik Indonesia melakukan verifikasi faktual secara langsung ke kantor redaksi PT Arun Media Nusantara di Jakarta Pusat.',
      'Dalam kunjungan visitasi ini, tim penilai Dewan Pers memeriksa keabsahan akta pendirian berbadan hukum pers (PT), sertifikat kompetensi wartawan utama pemimpin redaksi, sistem penggajian standar upah layak, serta kepatuhan ruang redaksi terhadap Kode Etik Jurnalistik.',
      'Ketua Komisi Hukum dan Perundang-undangan Dewan Pers menyampaikan bahwa Arun News telah memenuhi seluruh 17 pasal standar perusahaan pers dan resmi memperoleh sertifikat verifikasi faktual.',
      '"Kami mengapresiasi Arun News yang secara konsisten menjaga marwah pers yang independen, menolak penyebaran hoaks, dan mengedepankan hak publik atas kebenaran," ujarnya dalam sesi wawancara video resmi.'
    ],
    keyPoints: [
      'Pemeriksaan faktual kelengkapan hukum PT Arun Media Nusantara dan standar ruang redaksi.',
      'Penetapan sertifikasi verifikasi faktual Dewan Pers dengan nomor register resmi.',
      'Penegasan komitmen penolakan berita bohong dan perlindungan hukum bagi jurnalis bertugas.'
    ],
    author: {
      name: 'Tim Liputan Video Arun News',
      role: 'Divisi Multimedia & Penyiaran',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 15:00 WIB',
    readTime: 'Video 3:20 mnt',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Dokumentasi penyerahan hasil verifikasi faktual Dewan Pers kepada jajaran direksi PT Arun Media Nusantara.',
    viewsCount: 54100,
    sharesCount: 3950,
    isVideo: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['Video Berita', 'Legalitas', 'Dewan Pers', 'PT Arun Media Nusantara', 'Liputan Khusus'],
    comments: []
  },
  {
    id: 'art-ekonomi-1',
    title: 'IHSG Tembus Rekor Baru 8.120: Investasi Manufaktur Hijau Rp 45 Triliun Mengalir Deras ke Koridor Industri Nusantara',
    slug: 'ihsg-rekor-baru-investasi-manufaktur-hijau-nusantara',
    category: 'Ekonomi',
    summary: 'Pasar modal Indonesia mencatat rekor tertinggi sepanjang sejarah didorong surplus neraca perdagangan dan masuknya investor global di sektor ekosistem baterai dan energi terbarukan.',
    content: [
      'Indeks Harga Saham Gabungan (IHSG) Bursa Efek Indonesia kembali mencetak rekor penutupan tertinggi (all-time high) di level 8.120,45 dengan nilai transaksi harian melampaui Rp 19,8 triliun.',
      'Lonjakan ini ditopang oleh aksi beli bersih investor asing (net foreign buy) yang mengalir deras ke saham-saham sektor perbankan buku IV, infrastruktur energi hijau, dan manufaktur teknologi.',
      'Menteri Koordinator Bidang Perekonomian menyatakan bahwa realisasi investasi triwulan ini mencatatkan rekor Rp 45 triliun untuk proyek hilirisasi nikel, pabrik anoda baterai kendaraan listrik, dan pembangkit listrik tenaga surya terapung di Jawa Barat dan Maluku Utara.',
      'Bank Dunia dan IMF memproyeksikan pertumbuhan ekonomi Indonesia tetap tangguh di kisaran 5,2 persen di tengah ketidakpastian geopolitik global berkat kuatnya konsumsi domestik dan inflasi yang terkendali di 2,4 persen.'
    ],
    keyPoints: [
      'IHSG menembus rekor 8.120 dengan total transaksi harian Rp 19,8 triliun.',
      'Net buy investor asing menyentuh Rp 3,2 triliun dalam sepekan terakhir.',
      'Investasi hijau Rp 45 triliun mengalir ke hilirisasi baterai dan energi baru terbarukan.'
    ],
    author: {
      name: 'Rendra Mahendra, S.E.',
      role: 'Redaktur Ekonomi & Pasar Modal',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 16:00 WIB',
    readTime: '4 mnt baca',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Layar pergerakan grafik bursa saham di gedung Bursa Efek Indonesia, SCBD Jakarta.',
    viewsCount: 42100,
    sharesCount: 2890,
    isEditorPick: true,
    tags: ['Ekonomi', 'IHSG', 'Bursa Efek Indonesia', 'Investasi Hijau', 'Pasar Modal'],
    comments: [
      {
        id: 'c-eko-1',
        author: 'Hendro Gunawan',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        timeAgo: '15 menit lalu',
        content: 'Fundamental emiten perbankan dan energi kita memang solid. Harapan besar ekonomi riil dan UMKM juga kian terangkat.',
        likes: 31
      }
    ]
  },
  {
    id: 'art-ekonomi-2',
    title: 'Penyaluran KUR Digital UMKM Tembus Rp 280 Triliun, Bank Indonesia Pertahankan BI-Rate 6% Jaga Stabilitas Rupiah',
    slug: 'penyaluran-kur-digital-umkm-tembus-280-triliun-bi-rate',
    category: 'Ekonomi',
    summary: 'Akses pembiayaan mikro berbasis QRIS dan skor kredit digital melesat pesat menjangkau 4,8 juta pelaku usaha mikro dari pelosok desa hingga perkotaan.',
    content: [
      'Rapat Dewan Gubernur Bank Indonesia (RDG BI) memutuskan untuk mempertahankan BI-Rate pada level 6,00 persen demi memperkuat stabilitas nilai tukar Rupiah terhadap Dolar AS.',
      'Di sisi lain, akselerasi kredit produktif mencatat lonjakan signifikan. Penyaluran Kredit Usaha Rakyat (KUR) berplatform digital terintegrasi telah mencapai Rp 280 triliun hingga kuartal ketiga.',
      'Skema penilaian kredit alternatif (alternative credit scoring) berbasis histori transaksi dompet digital dan e-commerce berhasil membuka akses pembiayaan berbunga rendah 6% bagi 4,8 juta wirausaha perempuan dan petani milenial.',
      'Gubernur Bank Indonesia menegaskan digitalisasi sistem pembayaran seperti perluasan QRIS Antarnegara kini telah efektif di lima negara ASEAN dan mempermudah devisa pedagang lokal.'
    ],
    keyPoints: [
      'BI-Rate dipertahankan di 6,00% untuk menjaga inflasi dan daya tahan nilai tukar Rupiah.',
      'Realisasi KUR Digital tembus Rp 280 triliun dengan NPL terjaga di bawah 1,5%.',
      'Ekspansi QRIS Antarnegara memudahkan UMKM menerima pembayaran wisatawan mancanegara.'
    ],
    author: {
      name: 'Dewi Lestari, M.Si.',
      role: 'Wartawan Makroekonomi & Perbankan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 12:15 WIB',
    readTime: '3 mnt baca',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Pedagang pasar tradisional melayani transaksi pembeli menggunakan kode QRIS perbankan nasional.',
    viewsCount: 35800,
    sharesCount: 2100,
    isHeadline: false,
    tags: ['Ekonomi', 'UMKM', 'Bank Indonesia', 'KUR Digital', 'QRIS'],
    comments: []
  },
  {
    id: 'art-video-2',
    title: 'Warta Video: Mengintip Uji Dinamis Kereta Cepat Whoosh Tahap Lanjutan Menembus Jalur Trans-Jawa',
    slug: 'warta-video-uji-dinamis-kereta-cepat-whoosh-trans-jawa',
    category: 'Daerah',
    summary: 'Liputan eksklusif Arun News menaiki kabin masinis pengujian rangkaian KCIC generasi baru melaju 350 km/jam menghubungkan sentra pertumbuhan ekonomi antarkota.',
    content: [
      'Tim multimedia Arun News berkesempatan mengikuti uji coba dinamis komprehensif (dynamic testing) rangkaian kereta cepat generasi teranyar.',
      'Dengan kecepatan operasi mencapai 350 km per jam, kereta bergerak mulus melintasi terowongan panjang dan jembatan beton raksasa yang membentang di atas hamparan perbukitan hijau.',
      'Sistem kendali persinyalan otomatis CTCS-3 dan sensor seismik canggih memastikan keamanan maksimal bahkan saat menghadapi getaran gempa bumi bumi tektonik.',
      'Integrasi stasiun kereta cepat dengan moda lanjutan seperti LRT, bus antarkota, dan taksi ramah lingkungan menciptakan simpul konektivitas modern kebanggaan Nusantara.'
    ],
    keyPoints: [
      'Kecepatan tempuh stabil 350 km/jam dengan vibrasi sangat rendah.',
      'Dilengkapi teknologi mitigasi gempa dan pengereman otomatis berpresisi milidetik.',
      'Konektivitas antarmoda di stasiun transit mendukung mobilitas warga dan pariwisata.'
    ],
    author: {
      name: 'Tim Liputan Video Arun News',
      role: 'Divisi Multimedia & Penyiaran',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: '19 Okt 2026, 17:30 WIB',
    readTime: 'Video 4:10 mnt',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Rangkaian kereta cepat berdesain aerodinamis melaju kencang di jalur layang perbukitan.',
    viewsCount: 62700,
    sharesCount: 4890,
    isVideo: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    tags: ['Warta Video', 'Kereta Cepat', 'Whoosh', 'Transportasi Modern', 'Infrastruktur'],
    comments: []
  }
];

export const INITIAL_AD_SLOTS: AdSlot[] = [
  {
    id: 'slot-header',
    position: 'header_leaderboard',
    name: 'Banner Utama Atas (Leaderboard 728x90)',
    dimensions: '728 × 90 px',
    pricePerWeek: 1500000,
    currentSponsor: {
      brandName: 'Bank Nusantara Prioritas',
      bannerUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
      targetUrl: 'https://example.com/bank-nusantara',
      expiredAt: '25 Okt 2026'
    }
  },
  {
    id: 'slot-sidebar',
    position: 'sidebar_rectangle',
    name: 'Slot Sidebar Kanan (Medium Rectangle 300x250)',
    dimensions: '300 × 250 px',
    pricePerWeek: 750000,
    currentSponsor: {
      brandName: 'Kopi Kapal Rimba Gayo',
      bannerUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
      targetUrl: 'https://example.com/kopi-gayo',
      expiredAt: '22 Okt 2026'
    }
  },
  {
    id: 'slot-infeed',
    position: 'infeed_native',
    name: 'Native In-Feed Stream (Responsive 750x120)',
    dimensions: '750 × 120 px',
    pricePerWeek: 500000
  },
  {
    id: 'slot-footer',
    position: 'footer_banner',
    name: 'Banner Footer Bawah (Billboard 970x90)',
    dimensions: '970 × 90 px',
    pricePerWeek: 600000
  }
];

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'rep-1',
    reporterName: 'Suratman',
    reporterContact: '0812-9876-5432',
    location: 'Kec. Girimulyo, Kulon Progo, DIY',
    title: 'Jalan Poros Antardesa Tertimbun Longsor 40 Meter',
    description: 'Tebing longsor menutupi seluruh badan jalan desa sejak pukul 02.00 dini hari. Warga gotong royong buat titian bambu.',
    category: 'Lapor Warga',
    timestamp: '19 Okt 2026, 06:15 WIB',
    status: 'published',
    photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'rep-2',
    reporterName: 'Nurul Hidayah',
    reporterContact: '0857-1122-3344',
    location: 'Kel. Sukamaju, Kec. Cilodong, Depok',
    title: 'Lampu Penerangan Jalan Umum Padam di Jalur Rawan Kejahatan',
    description: 'Sudah 3 minggu 6 titik lampu penerangan jalan utama mati total, sering terjadi upaya pembegalan sepeda motor di malam hari.',
    category: 'Lapor Warga',
    timestamp: '19 Okt 2026, 08:30 WIB',
    status: 'verified'
  },
  {
    id: 'rep-3',
    reporterName: 'I Made Sudarta',
    reporterContact: '0813-4455-6677',
    location: 'Pantai Kedonganan, Jimbaran, Bali',
    title: 'Tumpukan Sampah Kiriman Angin Barat di Muara Nelayan',
    description: 'Volume sampah plastik kiriman gelombang pasang menumpuk di dermaga tambat perahu nelayan tradisional, butuh pengerukan.',
    category: 'Lapor Warga',
    timestamp: '19 Okt 2026, 10:00 WIB',
    status: 'pending'
  }
];

export const INITIAL_COFFEE_TIPS: CoffeeTip[] = [
  {
    id: 'tip-1',
    supporterName: 'Hendra Gunawan',
    amount: 50000,
    message: 'Semangat terus jurnalis Arun News! Liputannya selalu tajam dan berimbang.',
    timestamp: '19 Okt 2026, 11:20 WIB',
    paymentMethod: 'QRIS'
  },
  {
    id: 'tip-2',
    supporterName: 'Warga Peduli Hukum',
    amount: 100000,
    message: 'Terima kasih atas liputan investigasi dan ulasan legalitasnya. Kopi untuk ruang redaksi!',
    timestamp: '19 Okt 2026, 12:45 WIB',
    paymentMethod: 'Dana'
  },
  {
    id: 'tip-3',
    supporterName: 'Anonim Jakarta',
    amount: 25000,
    message: 'Dukung terus media independen.',
    timestamp: '19 Okt 2026, 13:10 WIB',
    paymentMethod: 'GoPay'
  }
];

export interface MarketTickerItem {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export const MARKET_DATA: MarketTickerItem[] = [
  { name: 'IHSG', value: '7.842,50', change: '+0,84%', isPositive: true },
  { name: 'USD / IDR', value: 'Rp 15.620', change: '-15 pt', isPositive: true },
  { name: 'Emas Antam', value: 'Rp 1.485.000 / gr', change: '+Rp 8.000', isPositive: true },
  { name: 'Minyak Brent', value: '$74,20 / bbl', change: '-0,35%', isPositive: false }
];

export interface WeatherCity {
  city: string;
  temp: number;
  condition: string;
  icon: 'sun' | 'cloud' | 'rain' | 'cloud-sun';
}

export const INDONESIA_WEATHER: WeatherCity[] = [
  { city: 'Jakarta', temp: 31, condition: 'Cerah Berawan', icon: 'cloud-sun' },
  { city: 'Surabaya', temp: 33, condition: 'Cerah', icon: 'sun' },
  { city: 'Bandung', temp: 24, condition: 'Hujan Ringan', icon: 'rain' },
  { city: 'Medan', temp: 30, condition: 'Berawan', icon: 'cloud' },
  { city: 'Makassar', temp: 32, condition: 'Cerah', icon: 'sun' },
  { city: 'IKN Nusantara', temp: 28, condition: 'Berawan Sejuk', icon: 'cloud-sun' }
];

export const TRENDING_TAGS = [
  '#SidangParipurnaDPR',
  '#Timnas100BesarFIFA',
  '#JudiOnlineSiber',
  '#JembatanBahariMaluku',
  '#LegalitasHakCiptaAI',
  '#LaporWargaLongsor',
  '#SandeqMandar2026',
  '#IHSGRekor8120'
];

export interface DetailedWeatherItem {
  id: string;
  city: string;
  region: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  aqi: number;
  aqiLevel: 'Baik' | 'Sedang' | 'Tidak Sehat';
  icon: 'sun' | 'cloud' | 'rain' | 'cloud-sun' | 'cloud-lightning';
  forecastDays: {
    day: string;
    tempMin: number;
    tempMax: number;
    condition: string;
    icon: 'sun' | 'cloud' | 'rain' | 'cloud-sun';
  }[];
}

export const DETAILED_WEATHER_DATA: DetailedWeatherItem[] = [
  {
    id: 'w-jkt',
    city: 'DKI Jakarta',
    region: 'Jabodetabek',
    temp: 31,
    condition: 'Cerah Berawan',
    humidity: 72,
    windSpeed: 14,
    aqi: 74,
    aqiLevel: 'Sedang',
    icon: 'cloud-sun',
    forecastDays: [
      { day: 'Besok', tempMin: 25, tempMax: 32, condition: 'Hujan Ringan', icon: 'rain' },
      { day: 'Lusa', tempMin: 24, tempMax: 33, condition: 'Cerah Berawan', icon: 'cloud-sun' },
      { day: 'Rabu', tempMin: 25, tempMax: 31, condition: 'Berawan', icon: 'cloud' }
    ]
  },
  {
    id: 'w-sby',
    city: 'Surabaya',
    region: 'Jawa Timur',
    temp: 34,
    condition: 'Cerah Terik',
    humidity: 60,
    windSpeed: 18,
    aqi: 58,
    aqiLevel: 'Sedang',
    icon: 'sun',
    forecastDays: [
      { day: 'Besok', tempMin: 26, tempMax: 34, condition: 'Cerah', icon: 'sun' },
      { day: 'Lusa', tempMin: 26, tempMax: 35, condition: 'Cerah', icon: 'sun' },
      { day: 'Rabu', tempMin: 25, tempMax: 33, condition: 'Cerah Berawan', icon: 'cloud-sun' }
    ]
  },
  {
    id: 'w-bdg',
    city: 'Bandung',
    region: 'Jawa Barat',
    temp: 24,
    condition: 'Hujan Ringan Sore',
    humidity: 84,
    windSpeed: 11,
    aqi: 38,
    aqiLevel: 'Baik',
    icon: 'rain',
    forecastDays: [
      { day: 'Besok', tempMin: 20, tempMax: 26, condition: 'Hujan Sedang', icon: 'rain' },
      { day: 'Lusa', tempMin: 19, tempMax: 25, condition: 'Berawan', icon: 'cloud' },
      { day: 'Rabu', tempMin: 20, tempMax: 27, condition: 'Cerah Berawan', icon: 'cloud-sun' }
    ]
  },
  {
    id: 'w-ikn',
    city: 'IKN Nusantara',
    region: 'Kalimantan Timur',
    temp: 28,
    condition: 'Berawan Sejuk',
    humidity: 78,
    windSpeed: 12,
    aqi: 22,
    aqiLevel: 'Baik',
    icon: 'cloud-sun',
    forecastDays: [
      { day: 'Besok', tempMin: 23, tempMax: 29, condition: 'Hujan Lokal', icon: 'rain' },
      { day: 'Lusa', tempMin: 22, tempMax: 30, condition: 'Cerah Berawan', icon: 'cloud-sun' },
      { day: 'Rabu', tempMin: 23, tempMax: 29, condition: 'Berawan', icon: 'cloud' }
    ]
  },
  {
    id: 'w-mdn',
    city: 'Medan',
    region: 'Sumatera Utara',
    temp: 30,
    condition: 'Berawan Lembap',
    humidity: 80,
    windSpeed: 13,
    aqi: 62,
    aqiLevel: 'Sedang',
    icon: 'cloud',
    forecastDays: [
      { day: 'Besok', tempMin: 24, tempMax: 31, condition: 'Hujan Petir', icon: 'rain' },
      { day: 'Lusa', tempMin: 23, tempMax: 30, condition: 'Berawan', icon: 'cloud' },
      { day: 'Rabu', tempMin: 24, tempMax: 31, condition: 'Cerah Berawan', icon: 'cloud-sun' }
    ]
  },
  {
    id: 'w-mks',
    city: 'Makassar',
    region: 'Sulawesi Selatan',
    temp: 32,
    condition: 'Cerah',
    humidity: 68,
    windSpeed: 16,
    aqi: 45,
    aqiLevel: 'Baik',
    icon: 'sun',
    forecastDays: [
      { day: 'Besok', tempMin: 24, tempMax: 33, condition: 'Cerah Berawan', icon: 'cloud-sun' },
      { day: 'Lusa', tempMin: 25, tempMax: 33, condition: 'Cerah', icon: 'sun' },
      { day: 'Rabu', tempMin: 24, tempMax: 32, condition: 'Cerah Berawan', icon: 'cloud-sun' }
    ]
  },
  {
    id: 'w-dps',
    city: 'Denpasar',
    region: 'Bali',
    temp: 31,
    condition: 'Cerah Berangin',
    humidity: 65,
    windSpeed: 21,
    aqi: 32,
    aqiLevel: 'Baik',
    icon: 'cloud-sun',
    forecastDays: [
      { day: 'Besok', tempMin: 24, tempMax: 31, condition: 'Cerah', icon: 'sun' },
      { day: 'Lusa', tempMin: 25, tempMax: 32, condition: 'Cerah Berawan', icon: 'cloud-sun' },
      { day: 'Rabu', tempMin: 24, tempMax: 31, condition: 'Cerah', icon: 'sun' }
    ]
  },
  {
    id: 'w-aceh',
    city: 'Banda Aceh',
    region: 'Aceh',
    temp: 29,
    condition: 'Cerah Berawan',
    humidity: 76,
    windSpeed: 15,
    aqi: 28,
    aqiLevel: 'Baik',
    icon: 'cloud-sun',
    forecastDays: [
      { day: 'Besok', tempMin: 23, tempMax: 30, condition: 'Berawan', icon: 'cloud' },
      { day: 'Lusa', tempMin: 23, tempMax: 30, condition: 'Hujan Ringan', icon: 'rain' },
      { day: 'Rabu', tempMin: 24, tempMax: 31, condition: 'Cerah Berawan', icon: 'cloud-sun' }
    ]
  }
];

export type TransportMode = 'kereta' | 'pesawat' | 'kapal' | 'bus';

export interface TransportScheduleItem {
  id: string;
  mode: TransportMode;
  operator: string;
  code: string;
  routeFrom: string;
  routeTo: string;
  depTime: string;
  arrTime: string;
  terminalGate: string;
  status: 'Tepat Waktu' | 'Boarding' | 'Tunda' | 'Tiba';
  price?: string;
}

export const TRANSPORT_SCHEDULE_DATA: TransportScheduleItem[] = [
  // Kereta
  {
    id: 'tr-1',
    mode: 'kereta',
    operator: 'Whoosh KCIC',
    code: 'G1218',
    routeFrom: 'Halim Jakarta',
    routeTo: 'Tegalluar Bandung',
    depTime: '16:45 WIB',
    arrTime: '17:30 WIB',
    terminalGate: 'Peron 2',
    status: 'Boarding'
  },
  {
    id: 'tr-2',
    mode: 'kereta',
    operator: 'KAI Eksekutif',
    code: 'KA-1 Argo Bromo Anggrek',
    routeFrom: 'Stasiun Gambir',
    routeTo: 'Surabaya Pasarturi',
    depTime: '17:10 WIB',
    arrTime: '01:25 WIB',
    terminalGate: 'Jalur 3',
    status: 'Tepat Waktu'
  },
  {
    id: 'tr-3',
    mode: 'kereta',
    operator: 'KAI Argo Parahyangan',
    code: 'KA-38',
    routeFrom: 'Stasiun Gambir',
    routeTo: 'Stasiun Bandung',
    depTime: '18:30 WIB',
    arrTime: '21:15 WIB',
    terminalGate: 'Jalur 4',
    status: 'Tepat Waktu'
  },
  // Pesawat
  {
    id: 'tr-4',
    mode: 'pesawat',
    operator: 'Garuda Indonesia',
    code: 'GA-402',
    routeFrom: 'Jakarta (CGK T3)',
    routeTo: 'Denpasar (DPS)',
    depTime: '16:50 WIB',
    arrTime: '19:40 WITA',
    terminalGate: 'Gate 14',
    status: 'Boarding'
  },
  {
    id: 'tr-5',
    mode: 'pesawat',
    operator: 'Citilink',
    code: 'QG-110',
    routeFrom: 'Jakarta (HLP)',
    routeTo: 'Surabaya (SUB)',
    depTime: '17:25 WIB',
    arrTime: '18:55 WIB',
    terminalGate: 'Gate 2',
    status: 'Tepat Waktu'
  },
  {
    id: 'tr-6',
    mode: 'pesawat',
    operator: 'Batik Air',
    code: 'ID-6250',
    routeFrom: 'Jakarta (CGK T2)',
    routeTo: 'Balikpapan (BPN/IKN)',
    depTime: '18:00 WIB',
    arrTime: '21:10 WITA',
    terminalGate: 'Gate 22',
    status: 'Tunda'
  },
  // Kapal
  {
    id: 'tr-7',
    mode: 'kapal',
    operator: 'ASDP Ferry Indonesia',
    code: 'KMP Portlink III',
    routeFrom: 'Pelabuhan Merak',
    routeTo: 'Pelabuhan Bakauheni',
    depTime: '17:00 WIB',
    arrTime: '18:45 WIB',
    terminalGate: 'Dermaga Eksekutif',
    status: 'Boarding'
  },
  {
    id: 'tr-8',
    mode: 'kapal',
    operator: 'PT PELNI (Persero)',
    code: 'KM Kelud',
    routeFrom: 'Tj. Priok Jakarta',
    routeTo: 'Batu Ampar Batam',
    depTime: '20:00 WIB',
    arrTime: '11:00 WIB (+1)',
    terminalGate: 'Dermaga Nusantara',
    status: 'Tepat Waktu'
  },
  // Bus
  {
    id: 'tr-9',
    mode: 'bus',
    operator: 'PO Sinar Jaya Suites',
    code: 'SJ-Sleeper 88',
    routeFrom: 'Pulo Gebang Jakarta',
    routeTo: 'Yogyakarta - Solo',
    depTime: '18:00 WIB',
    arrTime: '02:30 WIB',
    terminalGate: 'Jalur Keberangkatan B2',
    status: 'Tepat Waktu'
  },
  {
    id: 'tr-10',
    mode: 'bus',
    operator: 'DAMRI Royal Class',
    code: 'DM-TransJawa',
    routeFrom: 'Kemayoran Jakarta',
    routeTo: 'Bungurasih Surabaya',
    depTime: '19:15 WIB',
    arrTime: '05:30 WIB',
    terminalGate: 'Jalur Keberangkatan A1',
    status: 'Tepat Waktu'
  }
];

