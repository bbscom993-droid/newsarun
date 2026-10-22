import { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, ShieldCheck, Newspaper } from 'lucide-react';

interface DailyNewsletterSectionProps {
  darkMode: boolean;
}

export default function DailyNewsletterSection({ darkMode }: DailyNewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [edition, setEdition] = useState<'pagi' | 'sore' | 'kedua'>('kedua');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arun_newsletter_count');
      return saved ? parseInt(saved, 10) : 34820;
    }
    return 34820;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubscribed(true);
    const newCount = subscriberCount + 1;
    setSubscriberCount(newCount);

    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('arun_newsletter_subscribers') || '[]');
        existing.push({ email, edition, date: new Date().toISOString() });
        localStorage.setItem('arun_newsletter_subscribers', JSON.stringify(existing));
        localStorage.setItem('arun_newsletter_count', String(newCount));
      } catch (err) {
        console.error('Failed saving newsletter sub:', err);
      }
    }
  };

  return (
    <section className="mb-12 w-full">
      <div
        className={`p-6 sm:p-10 rounded-3xl border transition-all relative overflow-hidden ${
          darkMode
            ? 'bg-gradient-to-r from-[#071830] via-[#0b2752] to-[#071830] border-blue-900/80 shadow-2xl text-white'
            : 'bg-gradient-to-r from-[#092247] via-[#0f3266] to-[#092247] border-blue-700/80 shadow-2xl text-white'
        }`}
      >
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading and Description (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-amber-400/40 text-xs font-black text-amber-300">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>LANGGANAN NEWSLETTER HARIAN GRATIS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Kurasi Warta Terpilih Nusantara, Langsung ke Email Anda Setiap Hari.
            </h2>

            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed max-w-xl">
              Dapatkan rangkuman eksklusif kabar politik parlemen, perkembangan ekonomi pasar modal, serta investigasi independen Arun News sebelum Anda memulai aktivitas pagi atau mengakhiri hari.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-blue-200 font-semibold">
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tanpa Spam & Bebas Iklan Mengganggu</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Dapat Dibatalkan Kapan Saja</span>
              </span>
              <span className="text-emerald-300 font-bold tabular-nums">
                • {subscriberCount.toLocaleString('id-ID')} Pembaca Terdaftar
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Subscription Form (5 cols) */}
          <div className="lg:col-span-5">
            {isSubscribed ? (
              <div className="p-6 rounded-2xl bg-blue-950/90 border-2 border-emerald-400/80 text-center space-y-3 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center font-black">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-white">
                  Selamat Datang di Buletin Harian Arun News!
                </h3>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Konfirmasi telah dikirimkan ke <strong>{email}</strong>. Edisi warta berikutnya akan tiba tepat pukul 06:00 WIB di kotak masuk Anda.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-xs font-bold text-amber-400 hover:underline pt-2 inline-block"
                >
                  Ubah preferensi langganan
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-7 rounded-2xl bg-blue-950/80 border border-blue-700/80 space-y-4 shadow-xl"
              >
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-1.5">
                    Pilih Edisi Pengiriman:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pagi', label: 'Edisi Pagi', sub: '06:00 WIB' },
                      { id: 'sore', label: 'Edisi Sore', sub: '17:00 WIB' },
                      { id: 'kedua', label: 'Pagi & Sore', sub: 'Lengkap' }
                    ].map((ed) => (
                      <button
                        key={ed.id}
                        type="button"
                        onClick={() => setEdition(ed.id as any)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          edition === ed.id
                            ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md'
                            : 'bg-blue-900/60 text-blue-200 border-blue-800 hover:border-blue-600 font-semibold'
                        }`}
                      >
                        <div className="text-[11px] leading-tight">{ed.label}</div>
                        <div className="text-[9px] opacity-80">{ed.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="newsletter-email" className="block text-xs font-bold text-blue-200 mb-1.5">
                    Alamat Email Anda:
                  </label>
                  <div className="relative">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-blue-900/80 border border-blue-700 text-white placeholder-blue-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors pr-10"
                    />
                    <Mail className="w-4 h-4 text-amber-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 fill-slate-950" />
                  <span>Daftar Newsletter Harian</span>
                </button>

                <p className="text-[10px] text-blue-300/80 text-center">
                  Kami menghormati privasi Anda. Bebas unsubsribe kapan saja dengan 1 klik.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
