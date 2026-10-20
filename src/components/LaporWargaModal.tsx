import { useState } from 'react';
import { Send, X, MapPin, CheckCircle2, Megaphone, Phone, Mail, ShieldAlert } from 'lucide-react';
import { CitizenReport, LaporWargaConfig, DEFAULT_LAPOR_WARGA_CONFIG } from '../data/newsData';

interface LaporWargaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: CitizenReport) => void;
  darkMode: boolean;
  laporConfig?: LaporWargaConfig;
}

export default function LaporWargaModal({
  isOpen,
  onClose,
  onSubmitReport,
  darkMode,
  laporConfig = DEFAULT_LAPOR_WARGA_CONFIG
}: LaporWargaModalProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(laporConfig.categories[0] || 'Infrastruktur & Jalan Rusak');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) return;

    const newReport: CitizenReport = {
      id: `rep-${Date.now()}`,
      reporterName: name.trim() || 'Warga Anonim',
      reporterContact: contact.trim() || '08xxxxxxxxxx',
      location: location.trim(),
      title: `[${selectedSubCategory}] ${title.trim()}`,
      description: description.trim(),
      category: 'Lapor Warga',
      timestamp: 'Baru saja',
      status: laporConfig.autoApprove ? 'published' : 'pending'
    };

    onSubmitReport(newReport);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
    setName('');
    setContact('');
    setLocation('');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden my-auto ${
          darkMode ? 'bg-[#081a33] border-blue-900/80 text-white' : 'bg-[#0a2142] border-blue-700/70 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-blue-800/80 flex items-center justify-between bg-blue-950 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Megaphone className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Lapor Warga · Arun News
              </h3>
              <p className="text-[11px] text-amber-300 font-semibold">
                Salurkan aspirasi, kejadian darurat & informasi di sekitar Anda
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 text-blue-200 hover:text-amber-300" aria-label="Tutup form lapor warga">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-black text-white">
              Laporan Anda Berhasil Diterima Redaksi!
            </h4>
            <p className="text-xs text-blue-200 max-w-sm mx-auto leading-relaxed">
              Tim jurnalis Arun News akan memverifikasi data dan fakta lapangan secepatnya. Jika memenuhi kaidah jurnalistik, laporan Anda akan diterbitkan di kanal <strong>Lapor Warga</strong>.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl"
            >
              Kembali ke Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 text-white">
            {/* Admin Hotline & Advokasi Bar */}
            <div className="p-3 rounded-xl bg-blue-950/90 border border-blue-800 text-[11px] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>WA Hotline: {laporConfig.hotlineWA}</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-200">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email: {laporConfig.emailAdvokasi}</span>
              </div>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Kategori Laporan / Aduan:
              </label>
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 font-semibold"
              >
                {laporConfig.categories.map((c) => (
                  <option key={c} value={c} className="bg-[#071933] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Judul Laporan / Peristiwa:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Jembatan Penghubung Antardesa Ambruk Akibat Banjir Bandang"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Lokasi Kejadian Lengkap:</span>
              </label>
              <input
                type="text"
                required
                placeholder="Nama Desa, Kecamatan, Kabupaten/Kota, dan Provinsi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Nama Pelapor:
                </label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  No. WhatsApp / Kontak (Untuk Verifikasi):
                </label>
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Uraian Kronologi / Kondisi Lapangan:
              </label>
              <textarea
                required
                rows={4}
                placeholder="Jelaskan secara rinci kronologi kejadian, dampak yang dirasakan warga, serta bantuan atau tindakan yang sangat dibutuhkan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
            </div>

            {/* Admin Guidelines Box */}
            <div className="p-3 rounded-lg bg-blue-950/70 border border-blue-800 text-[11px] text-blue-200 leading-relaxed flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{laporConfig.guidelines}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Kirim Laporan ke Redaksi Arun News</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
