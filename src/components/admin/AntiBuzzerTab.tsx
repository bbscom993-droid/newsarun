import { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Ban,
  Plus,
  Trash2,
  CheckCircle,
  Sliders,
  Sparkles,
  Lock,
  Unlock,
  RotateCcw,
  Clock,
  UserX
} from 'lucide-react';
import { AntiBuzzerConfig, BuzzerInterceptionLog } from '../../data/newsData';

interface AntiBuzzerTabProps {
  antiBuzzerConfig: AntiBuzzerConfig;
  onUpdateAntiBuzzerConfig: (config: AntiBuzzerConfig) => void;
  buzzerLogs: BuzzerInterceptionLog[];
  onClearBuzzerLogs: () => void;
}

export default function AntiBuzzerTab({
  antiBuzzerConfig,
  onUpdateAntiBuzzerConfig,
  buzzerLogs,
  onClearBuzzerLogs
}: AntiBuzzerTabProps) {
  const [isEnabled, setIsEnabled] = useState(antiBuzzerConfig.isEnabled);
  const [sensitivity, setSensitivity] = useState(antiBuzzerConfig.sensitivity);
  const [blockLinks, setBlockLinks] = useState(antiBuzzerConfig.blockLinksInComments);
  const [requireHumanVerification, setRequireHumanVerification] = useState(
    antiBuzzerConfig.requireHumanVerification
  );
  const [rateLimit, setRateLimit] = useState(antiBuzzerConfig.rateLimitPerMinute);
  const [autoShadowBan, setAutoShadowBan] = useState(antiBuzzerConfig.autoShadowBan);
  const [keywords, setKeywords] = useState<string[]>(antiBuzzerConfig.blockedKeywords);
  const [newKeyword, setNewKeyword] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newKeyword.trim().toLowerCase();
    if (!trimmed) return;
    if (!keywords.map((k) => k.toLowerCase()).includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
    }
    setNewKeyword('');
  };

  const handleRemoveKeyword = (kwToRemove: string) => {
    setKeywords(keywords.filter((k) => k !== kwToRemove));
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AntiBuzzerConfig = {
      ...antiBuzzerConfig,
      isEnabled,
      sensitivity,
      blockedKeywords: keywords,
      blockLinksInComments: blockLinks,
      requireHumanVerification,
      rateLimitPerMinute: rateLimit,
      autoShadowBan
    };
    onUpdateAntiBuzzerConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-black shadow-md ${
                isEnabled
                  ? 'bg-gradient-to-tr from-emerald-600 to-amber-400 text-slate-950'
                  : 'bg-rose-950 text-rose-300 border border-rose-500'
              }`}
            >
              {isEnabled ? (
                <ShieldCheck className="w-6 h-6 text-slate-950" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                    isEnabled
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {isEnabled ? '● PERISAI AKTIF' : '○ NONAKTIF'}
                </span>
                <span className="text-xs text-blue-200">
                  Sistem Pertahanan Ruang Publik & Integritas Pers
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight mt-0.5">
                Perisai Anti Buzzer & Filter Bot Manipulatif
              </h3>
            </div>
          </div>

          {/* Quick Toggle Switch */}
          <button
            type="button"
            onClick={() => setIsEnabled(!isEnabled)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md ${
              isEnabled
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
          >
            {isEnabled ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            <span>{isEnabled ? 'Perisai Sedang Mengamankan' : 'Aktifkan Perisai'}</span>
          </button>
        </div>

        <p className="text-xs text-blue-200 mt-3 leading-relaxed">
          Perisai Anti-Buzzer bertugas menyaring ujaran kebencian SARA terkoordinasi, serangan bot buzzer bayaran, tautan promosi judi online/phishing, serta menjaga ruang diskusi komentar pembaca ARUN NEWS tetap sehat, faktual, dan bermartabat.
        </p>

        {/* Status Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-blue-800">
          <div className="p-3 rounded-xl bg-[#06172d] border border-blue-800">
            <div className="text-[10px] font-bold text-blue-300 uppercase">Upaya Dicegat</div>
            <div className="text-xl font-black text-amber-400 mt-0.5 tabular-nums">
              {antiBuzzerConfig.interceptedCount} Serangan
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#06172d] border border-blue-800">
            <div className="text-[10px] font-bold text-blue-300 uppercase">Kata Kunci Blacklist</div>
            <div className="text-xl font-black text-emerald-400 mt-0.5 tabular-nums">
              {keywords.length} Frasa
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#06172d] border border-blue-800">
            <div className="text-[10px] font-bold text-blue-300 uppercase">Sensitivitas</div>
            <div className="text-xl font-black text-white mt-0.5 capitalize">
              {sensitivity}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#06172d] border border-blue-800">
            <div className="text-[10px] font-bold text-blue-300 uppercase">Filter Link Spam</div>
            <div className="text-xl font-black text-rose-400 mt-0.5">
              {blockLinks ? 'Aktif' : 'Nonaktif'}
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>✓ Pengaturan Perisai Anti-Buzzer berhasil disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveConfig} className="space-y-6">
        {/* SECTION: PARAMETER PROTEKSI */}
        <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
          <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Parameter Proteksi Komentar & Bot Interceptor</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tingkat Sensitivitas */}
            <div className="p-4 rounded-xl bg-[#06172d] border border-blue-800 space-y-2">
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                Tingkat Sensitivitas Filter:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'strict'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSensitivity(lvl)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-colors ${
                      sensitivity === lvl
                        ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                        : 'bg-[#071933] border border-blue-700 text-blue-200 hover:text-white'
                    }`}
                  >
                    {lvl === 'low' && 'Rendah'}
                    {lvl === 'medium' && 'Menengah'}
                    {lvl === 'strict' && 'Ketat (Maksimal)'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-blue-300">
                {sensitivity === 'low' && 'Menyaring kata kasar kotor & link judi eksplisit.'}
                {sensitivity === 'medium' && 'Direkomendasikan: Menyaring kata provokatif SARA, narasi buzzerRp, & link spam.'}
                {sensitivity === 'strict' && 'Proteksi Maksimal: Wajib verifikasi uji manusia, pembatasan ketat banjir komentar.'}
              </p>
            </div>

            {/* Checkbox Proteksi Tambahan */}
            <div className="p-4 rounded-xl bg-[#06172d] border border-blue-800 space-y-3">
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                Aturan & Otomasi Intersepsi:
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                <input
                  type="checkbox"
                  checked={blockLinks}
                  onChange={(e) => setBlockLinks(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>Blokir tautan/link URL di kolom komentar (Cegah spam judi & phishing)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                <input
                  type="checkbox"
                  checked={requireHumanVerification}
                  onChange={(e) => setRequireHumanVerification(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>Wajibkan Uji Verifikasi Manusia Ringan (Anti Script Bot)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                <input
                  type="checkbox"
                  checked={autoShadowBan}
                  onChange={(e) => setAutoShadowBan(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>Auto-Shadowban akun bot yang terdeteksi mengulang narasi berantai</span>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION: MANAJEMEN KATA KUNCI BLACKLIST */}
        <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-blue-800">
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-400" />
                <span>Daftar Kata Kunci & Frasa Terlarang Buzzer ({keywords.length})</span>
              </h4>
              <p className="text-xs text-blue-200">
                Komentar yang memuat kata kunci ini akan dicegat secara otomatis oleh sistem sebelum tampil ke publik.
              </p>
            </div>
          </div>

          {/* Form Tambah Keyword */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ketik kata/frasa terlarang baru (misal: bot link, judol, sara)..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/40 font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>Tambah Kata Kunci</span>
            </button>
          </div>

          {/* Keywords Tag Cloud */}
          <div className="p-4 rounded-xl bg-[#06172d] border border-blue-800 flex flex-wrap gap-2 max-h-52 overflow-y-auto">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs font-semibold"
              >
                <span>{kw}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(kw)}
                  className="text-rose-400 hover:text-white transition-colors"
                  title="Hapus kata kunci"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* SECTION: LOG INTERSEPSI TERBARU */}
        <div className="p-5 sm:p-6 rounded-2xl border bg-[#091f3d] border-blue-700/60 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-blue-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h4 className="font-extrabold text-sm sm:text-base text-white">
                Log Riwayat Intersepsi Buzzer & Bot Terbaru ({buzzerLogs.length})
              </h4>
            </div>
            {buzzerLogs.length > 0 && (
              <button
                type="button"
                onClick={onClearBuzzerLogs}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
              >
                Bersihkan Riwayat Log
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {buzzerLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl border border-rose-900/80 bg-rose-950/30 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-black text-[10px] uppercase">
                      Dicegat
                    </span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <UserX className="w-3.5 h-3.5 text-rose-400" />
                      <span>{log.authorName}</span>
                    </span>
                    <span className="text-[11px] text-blue-300">· {log.timestamp}</span>
                  </div>
                  <p className="text-blue-100 italic line-clamp-1">"{log.snippet}"</p>
                  <p className="text-[11px] text-rose-300 font-semibold">
                    Alasan: {log.reason} {log.articleTitle ? `(Artikel: ${log.articleTitle})` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Simpan */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-slate-950" />
            <span>Simpan Konfigurasi Perisai Anti-Buzzer</span>
          </button>
        </div>
      </form>
    </div>
  );
}
