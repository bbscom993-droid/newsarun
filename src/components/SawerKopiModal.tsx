import { useState } from 'react';
import { Coffee, X, QrCode, CheckCircle2, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { CoffeeTip } from '../data/newsData';

interface SawerKopiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTip: (tip: CoffeeTip) => void;
  darkMode: boolean;
  articleTitle?: string;
}

export default function SawerKopiModal({
  isOpen,
  onClose,
  onAddTip,
  darkMode,
  articleTitle
}: SawerKopiModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'GoPay' | 'Dana' | 'OVO'>('QRIS');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const NOMINAL_OPTIONS = [
    { value: 10000, label: 'Rp 10.000', icon: '☕', desc: '1 Cangkir Kopi Hitam' },
    { value: 25000, label: 'Rp 25.000', icon: '☕🥞', desc: 'Kopi & Gorengan Redaksi' },
    { value: 50000, label: 'Rp 50.000', icon: '🚀', desc: 'Dukung Liputan Investigasi' },
    { value: 100000, label: 'Rp 100.000', icon: '👑', desc: 'Sponsor Independensi Jurnalis' }
  ];

  const currentAmount = customAmount ? parseInt(customAmount, 10) || selectedAmount : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 5000) return;

    const newTip: CoffeeTip = {
      id: `tip-${Date.now()}`,
      supporterName: name.trim() || 'Pembaca Setia Arun News',
      amount: currentAmount,
      message: message.trim() || `Traktir kopi untuk liputan: ${articleTitle?.slice(0, 40) || 'Jurnalisme Arun News'}`,
      timestamp: 'Baru saja',
      paymentMethod
    };

    onAddTip(newTip);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden my-auto ${
          darkMode ? 'bg-[#081a33] border-blue-900/80 text-white' : 'bg-[#0a2142] border-blue-700/70 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-blue-800/80 flex items-center justify-between bg-blue-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Coffee className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                <span>Sawer Kopi Redaksi Arun News</span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </h3>
              <p className="text-[11px] text-amber-300 font-semibold">
                Apresiasi pembaca untuk independensi jurnalis di lapangan
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white"
            aria-label="Tutup sawer kopi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">
                Terima Kasih Banyak, Sahabat Arun!
              </h4>
              <p className="text-xs text-blue-200 max-w-sm mx-auto mt-1 leading-relaxed">
                Traktiran kopi sebesar <strong className="text-amber-400 font-bold">Rp {currentAmount.toLocaleString('id-ID')}</strong> telah berhasil disalurkan ke kas operasional liputan jurnalis Arun News.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-950 border border-blue-800 text-xs text-blue-200">
              ☕ Secangkir kopi Anda menjadi bahan bakar semangat tim kami menyuarakan kebenaran.
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-colors shadow-xs"
            >
              Kembali Membaca Berita
            </button>
          </div>
        ) : (
          /* Tip Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-white">
            {articleTitle && (
              <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800 text-xs text-blue-200 line-clamp-1">
                <span className="font-bold text-amber-400">Liputan: </span>
                {articleTitle}
              </div>
            )}

            {/* Nominal choices */}
            <div>
              <label className="block text-xs font-bold text-white mb-2">
                Pilih Nominal Traktir Kopi:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {NOMINAL_OPTIONS.map((opt) => {
                  const isSelected = selectedAmount === opt.value && !customAmount;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(opt.value);
                        setCustomAmount('');
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400 text-slate-950 font-black shadow-xs'
                          : 'border-blue-800 bg-blue-950 text-blue-100 hover:text-white hover:bg-blue-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{opt.icon}</span>
                        <span className={`text-xs font-black ${isSelected ? 'text-slate-950' : 'text-amber-400'}`}>
                          {opt.label}
                        </span>
                      </div>
                      <div className={`text-[10px] mt-1 ${isSelected ? 'text-slate-900' : 'text-blue-300'}`}>
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount input */}
              <div className="mt-2.5">
                <input
                  type="number"
                  min="5000"
                  step="5000"
                  placeholder="Atau ketik nominal kustom (Min. Rp 5.000)..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>
            </div>

            {/* Supporter details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Nama Anda (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Misal: Budi Santoso / Anonim"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Metode Pembayaran:
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['QRIS', 'GoPay', 'Dana', 'OVO'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-1.5 px-1 rounded-lg text-[11px] font-bold border transition-colors ${
                        paymentMethod === method
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-xs'
                          : 'border-blue-800 bg-blue-950 text-blue-200 hover:text-white'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message input */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                Pesan / Harapan untuk Jurnalis:
              </label>
              <input
                type="text"
                placeholder="Tulis pesan penyemangat untuk tim redaksi..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-blue-700 bg-[#071933] text-white placeholder-blue-300/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
            </div>

            {/* QRIS / Simulator Preview */}
            <div className="p-3 rounded-xl bg-blue-950 border border-blue-800 flex items-center gap-3">
              <div className="w-14 h-14 bg-[#0a203f] p-1 rounded-lg border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
                <QrCode className="w-11 h-11 text-amber-400" />
              </div>
              <div className="text-[11px] text-blue-200">
                <div className="font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gerbang Pembayaran Instan {paymentMethod}</span>
                </div>
                <p className="mt-0.5 text-blue-300">
                  Mendukung semua aplikasi e-wallet & mobile banking Indonesia secara aman tanpa biaya potongan.
                </p>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>
                Traktir Kopi Sekarang (Rp {currentAmount.toLocaleString('id-ID')})
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
