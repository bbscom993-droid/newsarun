import { useState, useEffect } from 'react';
import { Vote, CheckCircle2, Users, Sparkles, AlertCircle } from 'lucide-react';

interface PollOption {
  id: number;
  label: string;
  votes: number;
}

interface PublicPollingWidgetProps {
  darkMode: boolean;
}

export default function PublicPollingWidget({ darkMode }: PublicPollingWidgetProps) {
  const [hasVoted, setHasVoted] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arun_public_poll_voted');
      return saved ? parseInt(saved, 10) : null;
    }
    return null;
  });

  const [options, setOptions] = useState<PollOption[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arun_public_poll_options');
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      { id: 1, label: 'Sangat Berdampak Nyata & Tepat Sasaran', votes: 7840 },
      { id: 2, label: 'Cukup Positif Namun Butuh Pengawasan Ketat', votes: 4120 },
      { id: 3, label: 'Belum Merata Dirasakan Masyarakat Bawah', votes: 2150 },
      { id: 4, label: 'Masih Memerlukan Evaluasi Regulasi Menyeluruh', votes: 890 }
    ];
  });

  const [justVotedAlert, setJustVotedAlert] = useState(false);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId: number) => {
    if (hasVoted !== null) return;

    const updated = options.map((opt) =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );

    setOptions(updated);
    setHasVoted(optionId);
    setJustVotedAlert(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('arun_public_poll_voted', String(optionId));
      localStorage.setItem('arun_public_poll_options', JSON.stringify(updated));
    }

    setTimeout(() => setJustVotedAlert(false), 4000);
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        darkMode
          ? 'bg-[#081a33] border-blue-900/80 text-white shadow-xl'
          : 'bg-[#0a2347] border-blue-700/70 text-white shadow-2xl'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-blue-800/80 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Vote className="w-4 h-4 fill-slate-950" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
              Jajak Pendapat Publik
            </span>
            <h3 className="text-xs sm:text-sm font-black text-white">
              Suara Pembaca Arun News
            </h3>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-400/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Survei Aktif</span>
        </span>
      </div>

      {/* Poll Question */}
      <p className="text-xs sm:text-sm font-bold text-blue-100 leading-snug mb-3.5">
        "Bagaimana penilaian Anda terhadap akselerasi hilirisasi industri nasional dan perlindungan hak-hak masyarakat daerah lingkar tambang saat ini?"
      </p>

      {/* Just voted toast */}
      {justVotedAlert && (
        <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Terima kasih! Suara Anda telah dicatat dalam tabulasi independen Arun News.</span>
        </div>
      )}

      {/* Voting Options */}
      <div className="space-y-2.5">
        {options.map((opt) => {
          const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          const isSelected = hasVoted === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={hasVoted !== null}
              className={`w-full text-left p-3 rounded-xl text-xs transition-all relative overflow-hidden border ${
                isSelected
                  ? 'border-amber-400 bg-amber-400/20 text-white font-extrabold shadow-md'
                  : hasVoted !== null
                  ? 'border-blue-800/80 bg-blue-950/60 text-blue-200 cursor-default'
                  : 'border-blue-700/70 hover:border-amber-400 bg-blue-950/70 text-blue-100 hover:bg-blue-900/60'
              }`}
            >
              {/* Progress bar background when voted */}
              {hasVoted !== null && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                    isSelected ? 'bg-amber-400/30' : 'bg-blue-600/30'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400 text-slate-950'
                        : 'border-blue-500'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </span>
                  <span className="leading-snug">{opt.label}</span>
                </div>

                {hasVoted !== null && (
                  <span className="font-extrabold tabular-nums text-amber-300 ml-2 shrink-0">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="mt-3.5 pt-2.5 border-t border-blue-900/80 flex items-center justify-between text-[11px] text-blue-300">
        <span className="flex items-center gap-1 font-semibold">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span>{totalVotes.toLocaleString('id-ID')} Suara Warga</span>
        </span>

        {hasVoted ? (
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-amber-400" />
            <span>Pilihan Tercatat</span>
          </span>
        ) : (
          <span className="text-blue-300 italic">Pilih satu untuk melihat hasil</span>
        )}
      </div>
    </div>
  );
}
