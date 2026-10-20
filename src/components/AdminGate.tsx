import { useEffect, useState, ReactNode } from 'react';
import { ArrowLeft, Lock, LogOut, Mail, KeyRound, ShieldAlert } from 'lucide-react';
import {
  getUser,
  login,
  logout,
  handleAuthCallback,
  acceptInvite,
  updateUser,
  requestPasswordRecovery,
  onAuthChange,
  AuthError,
  MissingIdentityError,
  type User
} from '@netlify/identity';

export const ADMIN_ROLE = 'admin';

export interface AdminSession {
  email: string;
  logout: () => void;
}

interface AdminGateProps {
  darkMode: boolean;
  onExit: () => void;
  onAuthorizedChange: (authorized: boolean) => void;
  children: (session: AdminSession) => ReactNode;
}

type Mode = 'login' | 'forgot' | 'invite' | 'recovery';

const isAdmin = (user: User | null) => Boolean(user?.roles?.includes(ADMIN_ROLE));

function describeError(error: unknown) {
  if (error instanceof MissingIdentityError) return 'Layanan login belum aktif di situs ini.';
  if (error instanceof AuthError) {
    if (error.status === 401) return 'Email atau kata sandi salah.';
    if (error.status === 422) return 'Data tidak valid. Periksa email dan kata sandi (min. 8 karakter).';
    return error.message;
  }
  return 'Terjadi kesalahan. Silakan coba lagi.';
}

export default function AdminGate({ darkMode, onExit, onAuthorizedChange, children }: AdminGateProps) {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<Mode>('login');
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await handleAuthCallback();
        if (result) {
          // Keep the editor on the admin view after the identity hash is consumed.
          window.history.replaceState(null, '', `${window.location.pathname}#admin`);
          if (result.type === 'invite') {
            setInviteToken(result.token ?? null);
            setMode('invite');
          } else if (result.type === 'recovery') {
            setMode('recovery');
          }
        }
      } catch (err) {
        if (active) setError(describeError(err));
      }
      const current = await getUser();
      if (active) {
        setUser(current);
        setChecking(false);
      }
    })();

    const unsubscribe = onAuthChange((_event, nextUser) => setUser(nextUser));
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const authorized = isAdmin(user) && mode !== 'recovery' && mode !== 'invite';

  useEffect(() => {
    onAuthorizedChange(authorized);
  }, [authorized, onAuthorizedChange]);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      run(async () => {
        setUser(await login(email.trim(), password));
        setPassword('');
      });
    } else if (mode === 'forgot') {
      run(async () => {
        await requestPasswordRecovery(email.trim());
        setNotice('Tautan reset kata sandi telah dikirim ke email Anda.');
        setMode('login');
      });
    } else if (mode === 'invite' && inviteToken) {
      run(async () => {
        setUser(await acceptInvite(inviteToken, password));
        setPassword('');
        setMode('login');
      });
    } else if (mode === 'recovery') {
      run(async () => {
        setUser(await updateUser({ password }));
        setPassword('');
        setMode('login');
        setNotice('Kata sandi berhasil diperbarui.');
      });
    }
  };

  const handleLogout = () => {
    run(async () => {
      await logout();
      setUser(null);
      setMode('login');
    });
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c2447]">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authorized && user) {
    return <>{children({ email: user.email ?? '', logout: handleLogout })}</>;
  }

  const loggedInWithoutRole = user && !isAdmin(user) && mode === 'login';

  const titles: Record<Mode, string> = {
    login: 'Masuk Panel Redaksi',
    forgot: 'Lupa Kata Sandi',
    invite: 'Aktifkan Akun Redaksi',
    recovery: 'Buat Kata Sandi Baru'
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#07162b]' : 'bg-[#0c2447]'} text-white`}>
      <header className="bg-[#071933] border-b border-blue-800 px-4 sm:px-8 py-3.5 flex items-center gap-3">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-xs font-bold text-amber-400 transition-colors border border-blue-700/80"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ke Portal Publik</span>
        </button>
        <span className="font-black text-white text-base tracking-tight">
          ARUN <span className="text-amber-400">NEWS</span>
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-[#071933] border border-blue-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-lg leading-tight">{titles[mode]}</h1>
              <p className="text-[11px] text-blue-200">Khusus tim redaksi Arun News</p>
            </div>
          </div>

          {loggedInWithoutRole ? (
            <div className="space-y-4">
              <div className="flex gap-2 p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-100">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Akun <b>{user.email}</b> belum memiliki akses redaksi. Minta pemimpin redaksi menambahkan peran
                  <b> admin</b> pada akun Anda.
                </p>
              </div>
              <button
                onClick={handleLogout}
                disabled={busy}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-sm font-bold"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {(mode === 'login' || mode === 'forgot') && (
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Email</span>
                  <div className="mt-1 flex items-center gap-2 px-3 rounded-lg bg-blue-950 border border-blue-800 focus-within:border-amber-400">
                    <Mail className="w-4 h-4 text-blue-300" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-blue-400"
                      placeholder="redaksi@arunnews.id"
                    />
                  </div>
                </label>
              )}

              {mode !== 'forgot' && (
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                    {mode === 'login' ? 'Kata Sandi' : 'Kata Sandi Baru'}
                  </span>
                  <div className="mt-1 flex items-center gap-2 px-3 rounded-lg bg-blue-950 border border-blue-800 focus-within:border-amber-400">
                    <KeyRound className="w-4 h-4 text-blue-300" />
                    <input
                      type="password"
                      required
                      minLength={mode === 'login' ? undefined : 8}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent py-2.5 text-sm outline-none"
                    />
                  </div>
                </label>
              )}

              {error && <p className="text-xs text-red-300 font-semibold">{error}</p>}
              {notice && <p className="text-xs text-emerald-300 font-semibold">{notice}</p>}

              <button
                type="submit"
                disabled={busy}
                className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-950 text-sm font-black uppercase tracking-wider"
              >
                {busy
                  ? 'Memproses...'
                  : mode === 'login'
                  ? 'Masuk'
                  : mode === 'forgot'
                  ? 'Kirim Tautan Reset'
                  : 'Simpan Kata Sandi'}
              </button>

              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="w-full text-xs text-blue-200 hover:text-amber-300"
                >
                  Lupa kata sandi?
                </button>
              )}
              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-xs text-blue-200 hover:text-amber-300"
                >
                  Kembali ke halaman masuk
                </button>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
