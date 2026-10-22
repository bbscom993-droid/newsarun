import { useState, useEffect } from 'react';
import { Bell, BellRing, BellOff, CheckCircle2, AlertTriangle, Sparkles, X } from 'lucide-react';

interface BrowserNotificationManagerProps {
  darkMode: boolean;
  onSendTestToast?: (message: string) => void;
}

export default function BrowserNotificationManager({
  darkMode,
  onSendTestToast
}: BrowserNotificationManagerProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastAlertTime, setLastAlertTime] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('Notification' in window) {
        setPermission(Notification.permission);
      } else {
        setIsSupported(false);
      }

      const dismissed = localStorage.getItem('arun_dismiss_notif_banner');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    }
  }, []);

  const handleRequestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Peramban Anda tidak mendukung Web Notification API. Notifikasi warta akan dialihkan ke alert banner portal.');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        // Send initial welcoming notification
        new Notification('ARUN NEWS - Jembatan Media Nusantara', {
          body: 'Notifikasi Warta Real-Time Aktif! Anda akan menerima pembaruan berita breaking news terkini langsung di peramban.',
          icon: '/favicon.ico'
        });
        setLastAlertTime('Baru saja aktif');
        onSendTestToast?.('Alert peramban (browser) berhasil diaktifkan untuk warta terkini!');
      } else if (result === 'denied') {
        onSendTestToast?.('Izin notifikasi peramban ditolak. Anda dapat mengubahnya di pengaturan peramban.');
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  const handleSendTestNotification = () => {
    if (permission === 'granted') {
      try {
        new Notification('🔴 BREAKING NEWS - ARUN NEWS', {
          body: 'Sidang Paripurna DPR RI Sahkan RUU Pemilihan Kepala Daerah dan Reformasi Tata Kelola Pemerintahan Daerah.',
          icon: '/favicon.ico'
        });
        setLastAlertTime(new Date().toLocaleTimeString('id-ID'));
        onSendTestToast?.('Tes notifikasi peramban berhasil dikirim!');
      } catch (e) {
        onSendTestToast?.('Gagal memicu alert sistem. Mengirimkan notifikasi layar.');
      }
    } else {
      handleRequestPermission();
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('arun_dismiss_notif_banner', 'true');
  };

  if (isDismissed) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex justify-end">
        <button
          onClick={() => {
            setIsDismissed(false);
            localStorage.removeItem('arun_dismiss_notif_banner');
          }}
          className="text-[11px] font-bold text-blue-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800"
        >
          <Bell className="w-3 h-3 text-amber-400" />
          <span>Pengaturan Alert Peramban</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div
        className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg transition-all ${
          permission === 'granted'
            ? 'bg-blue-950/90 border-emerald-500/50 text-white'
            : 'bg-gradient-to-r from-[#092244] via-[#0d2e5c] to-[#092244] border-amber-400/60 text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
              permission === 'granted'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-amber-400 text-slate-950 animate-pulse'
            }`}
          >
            {permission === 'granted' ? (
              <BellRing className="w-5 h-5 fill-slate-950" />
            ) : (
              <Bell className="w-5 h-5 fill-slate-950" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-900 text-amber-300 border border-amber-400/40">
                Notifikasi Warta Real-Time
              </span>
              {permission === 'granted' && (
                <span className="text-[11px] text-emerald-400 font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Alert Aktif di Peramban</span>
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
              {permission === 'granted'
                ? 'Peramban Anda siap menerima warta kilat dan breaking news penting secara langsung.'
                : 'Dapatkan pemberitahuan seketika saat peristiwa darurat dan breaking news penting terjadi.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {permission === 'granted' ? (
            <button
              onClick={handleSendTestNotification}
              className="px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-amber-300 border border-amber-400/50 text-xs font-black transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tes Alert Peramban</span>
            </button>
          ) : (
            <button
              onClick={handleRequestPermission}
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md flex items-center gap-1.5"
            >
              <BellRing className="w-4 h-4 fill-slate-950" />
              <span>Aktifkan Alert Peramban</span>
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/50 transition-colors"
            title="Tutup banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
