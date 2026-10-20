import { useState } from 'react';
import { Coffee, X, Sparkles, ChevronUp, QrCode, Heart } from 'lucide-react';
import { CoffeeTip } from '../data/newsData';

interface FloatingSawerKopiProps {
  onOpenFullModal: (context?: string) => void;
  onQuickTip: (tip: CoffeeTip) => void;
  activeCategory: string;
}

export default function FloatingSawerKopi({
  onOpenFullModal,
  onQuickTip,
  activeCategory
}: FloatingSawerKopiProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [supporterName, setSupporterName] = useState('');
  const [selectedNominal, setSelectedNominal] = useState<number>(25000);
  const [justTipped, setJustTipped] = useState(false);

  const NOMINALS = [
    { value: 10000, label: '10K', desc: '1 Cangkir Kopi' },
    { value: 25000, label: '25K', desc: 'Kopi & Gorengan' },
    { value: 50000, label: '50K', desc: 'Bensin Peliputan' },
    { value: 100000, label: '100K', desc: 'Sponsor Investigasi' }
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTip: CoffeeTip = {
      id: `tip-float-${Date.now()}`,
      supporterName: supporterName.trim() || 'Pembaca Kanal ' + activeCategory,
      amount: selectedNominal,
      message: `Dukungan kilat untuk redaksi Arun News di kanal ${activeCategory}`,
      timestamp: 'Baru saja',
      paymentMethod: 'QRIS Cepat'
    };
    onQuickTip(newTip);
    setJustTipped(true);
    setTimeout(() => {
      setJustTipped(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <aside aria-label="Sawer Kopi Redaksi Floating" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Floating Popup Card (Expanded) */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#091f3d] border-2 border-amber-400/90 text-white shadow-2xl p-4.5 animate-in slide-in-from-bottom-4 duration-200 backdrop-blur-md">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-blue-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <span>Sawer Kopi Redaksi</span>
                  <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                </h4>
                <p className="text-[10px] text-blue-200">
                  Dukung jurnalisme independen di kanal <strong>{activeCategory}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-blue-800 transition-colors"
              title="Tutup Pop-up Sawer Kopi"
              aria-label="Tutup pop-up sawer kopi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {justTipped ? (
            <div className="py-6 text-center space-y-2 animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 flex items-center justify-center">
                <Heart className="w-6 h-6 fill-emerald-400" />
              </div>
              <h5 className="text-sm font-black text-white">Terima Kasih Banyak!</h5>
              <p className="text-xs text-blue-200">
                Secangkir kopi dari Anda menjadi energi bagi jurnalis Arun News untuk terus menyuarakan kebenaran.
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="mt-3 space-y-3">
              {/* Nominal Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                {NOMINALS.map((nom) => {
                  const isSelected = selectedNominal === nom.value;
                  return (
                    <button
                      key={nom.value}
                      type="button"
                      onClick={() => setSelectedNominal(nom.value)}
                      className={`py-2 px-1 rounded-xl text-xs font-black transition-all border flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                          : 'bg-blue-950/80 text-blue-100 border-blue-800 hover:border-amber-400/60'
                      }`}
                    >
                      <span>{nom.label}</span>
                      <span className="text-[9px] font-normal opacity-80 scale-90">{nom.desc.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Supporter Name (Optional) */}
              <div>
                <input
                  type="text"
                  placeholder="Nama / Inisial Anda (Opsional)"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-blue-700 bg-[#07172c] text-xs text-white placeholder-blue-300/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-1.5 pt-1">
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <Coffee className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Kirim Kopi Kilat (Rp {selectedNominal.toLocaleString('id-ID')})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullModal(`Dukungan Pembaca Kanal ${activeCategory}`);
                  }}
                  className="w-full py-1.5 rounded-xl border border-blue-700/80 bg-blue-950/60 hover:bg-blue-900 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                >
                  <QrCode className="w-3 h-3" />
                  <span>Buka Opsi QRIS, GoPay & Bank Lengkap →</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Floating Action Pill / Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:-translate-y-1 border-2 border-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        title="Sawer Kopi untuk Redaksi Arun News"
        aria-expanded={isOpen}
      >
        {/* Glowing Pulse Ring */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-slate-950"></span>
        </span>

        {/* Coffee cup icon with subtle hover wobble */}
        <div className="w-6 h-6 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shadow-xs group-hover:rotate-12 transition-transform">
          <Coffee className="w-3.5 h-3.5 fill-amber-400" />
        </div>

        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-950">
            Sawer Kopi
          </span>
          <span className="text-[9px] font-bold text-slate-900 opacity-90">
            Dukung Redaksi
          </span>
        </div>

        <ChevronUp className={`w-3.5 h-3.5 text-slate-950 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </aside>
  );
}
