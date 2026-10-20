import { useState } from 'react';
import {
  Heart,
  Share2,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
  Video,
  Instagram,
  Twitter,
  Play
} from 'lucide-react';

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok';
  handle: string;
  name: string;
  avatar: string;
  verified: boolean;
  timeAgo: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  postUrl: string;
}

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'sp-1',
    platform: 'twitter',
    handle: '@ArunNewsID',
    name: 'ARUN NEWS Official',
    avatar: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&auto=format&fit=crop&q=80',
    verified: true,
    timeAgo: '15 mnt lalu',
    content: '🚨 [BREAKING NEWS] Sidang Paripurna DPR RI resmi mengesahkan RUU Pilkada Serentak & Penataan Birokrasi Daerah Terpadu. Baca telaah hukum lengkap tim investigasi kami di portal! #ArunNews #SidangParipurna #PolitikNusantara',
    likesCount: 1420,
    commentsCount: 230,
    sharesCount: 680,
    postUrl: 'https://twitter.com'
  },
  {
    id: 'sp-2',
    platform: 'instagram',
    handle: '@arunnews.official',
    name: 'Arun News Nusantara',
    avatar: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&auto=format&fit=crop&q=80',
    verified: true,
    timeAgo: '45 mnt lalu',
    content: '[INFOGRAFIS KHUSUS] Jembatan Bahari Maluku tuntas 100%! Pangkas waktu penyeberangan warga dari 6 jam jadi 25 menit. Cek detail konektivitas pulau terluar di link bio! 🌉🌊 #ArunNews #Daerah #MalukuKonektivitas',
    mediaUrl: '/src/assets/images/news_green_energy_transit_1792424746923.jpg',
    mediaType: 'image',
    likesCount: 4890,
    commentsCount: 312,
    sharesCount: 540,
    postUrl: 'https://instagram.com'
  },
  {
    id: 'sp-3',
    platform: 'youtube',
    handle: 'Arun News TV',
    name: 'Arun News TV Official',
    avatar: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&auto=format&fit=crop&q=80',
    verified: true,
    timeAgo: '2 jam lalu',
    content: '🔴 [LIVE REPORT] Gelora Bung Karno Bergemuruh! Reaksi Suporter & Ulasan Taktik Usai Garuda Kunci Kemenangan Krusial. Tonton highlight lengkapnya di channel YouTube kami.',
    mediaUrl: '/src/assets/images/news_sports_timnas_1792424747238.jpg',
    mediaType: 'video',
    likesCount: 8200,
    commentsCount: 940,
    sharesCount: 1250,
    postUrl: 'https://youtube.com'
  },
  {
    id: 'sp-4',
    platform: 'tiktok',
    handle: '@arunnews',
    name: 'Arun News Media',
    avatar: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&auto=format&fit=crop&q=80',
    verified: true,
    timeAgo: '3 jam lalu',
    content: 'Gerebek markas judi siber berkedok game edukasi! Polisi sita 180 server & aset kripto 85 miliar. Kawal terus kasusnya bareng Arun News! 💻🔍 #Hukum #Kriminal #PoldaMetro #ArunNews',
    likesCount: 15400,
    commentsCount: 1820,
    sharesCount: 3200,
    postUrl: 'https://tiktok.com'
  }
];

interface SocialFeedWidgetProps {
  darkMode: boolean;
}

export default function SocialFeedWidget({ darkMode }: SocialFeedWidgetProps) {
  const [platformFilter, setPlatformFilter] = useState<'all' | 'twitter' | 'instagram' | 'youtube' | 'tiktok'>('all');
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<{ [id: string]: boolean }>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredPosts = posts.filter(
    (post) => platformFilter === 'all' || post.platform === platformFilter
  );

  const handleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[id];
      setPosts((currentPosts) =>
        currentPosts.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1
            };
          }
          return p;
        })
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const renderPlatformIcon = (platform: SocialPost['platform']) => {
    switch (platform) {
      case 'twitter':
        return (
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center p-1">
            <Twitter className="w-3 h-3 fill-white" />
          </div>
        );
      case 'instagram':
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center p-1">
            <Instagram className="w-3 h-3" />
          </div>
        );
      case 'youtube':
        return (
          <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center p-1">
            <Video className="w-3 h-3 fill-white" />
          </div>
        );
      case 'tiktok':
        return (
          <div className="w-5 h-5 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center font-black text-[10px]">
            <span>♪</span>
          </div>
        );
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        darkMode ? 'bg-[#081a33] border-blue-900/80 text-white' : 'bg-[#091f3d] border-blue-700/60 shadow-xl text-white'
      }`}
    >
      {/* Widget Header */}
      <div className="p-4 border-b border-blue-800/80 bg-gradient-to-r from-blue-950 via-[#0c264d] to-blue-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">
            <span>#</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black tracking-tight text-white uppercase">
                MEDIA SOSIAL RESMI
              </h3>
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-[10px] text-amber-300 font-bold">
              Kanal Terverifikasi @ArunNewsID
            </p>
          </div>
        </div>

        {/* Refresh & Follow Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRefresh}
            className={`p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800/60 transition-all ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            title="Muat ulang pembaruan medsos"
            aria-label="Refresh feed sosial media"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${
              isFollowing
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs'
            }`}
          >
            {isFollowing ? '✓ Mengikuti' : '+ Ikuti Akun'}
          </button>
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div className="px-3 py-2 border-b border-blue-800/70 bg-[#071933] flex items-center gap-1 overflow-x-auto no-scrollbar">
        {[
          { key: 'all', label: 'Semua' },
          { key: 'twitter', label: 'X / Twitter' },
          { key: 'instagram', label: 'Instagram' },
          { key: 'youtube', label: 'YouTube' },
          { key: 'tiktok', label: 'TikTok' }
        ].map((tab) => {
          const isActive = platformFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setPlatformFilter(tab.key as any)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                  : 'text-blue-200 hover:text-white hover:bg-blue-900/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Posts Stream */}
      <div className="p-3.5 space-y-3 max-h-[480px] overflow-y-auto no-scrollbar">
        {filteredPosts.map((post) => {
          const isLiked = !!likedPosts[post.id];
          return (
            <div
              key={post.id}
              className={`p-3 rounded-xl border transition-all ${
                darkMode
                  ? 'bg-[#061426] border-blue-900/80 hover:border-blue-700'
                  : 'bg-[#0e2a52] border-blue-700/60 hover:border-amber-400 hover:bg-[#113260] text-white shadow-sm'
              }`}
            >
              {/* Post Author Info */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img
                      src={post.avatar}
                      alt={post.name}
                      className="w-8 h-8 rounded-full object-cover border border-amber-400"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {renderPlatformIcon(post.platform)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-xs text-white leading-tight">
                        {post.name}
                      </span>
                      {post.verified && (
                        <CheckCircle2 className="w-3 h-3 text-amber-400 fill-amber-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-blue-200/90 font-semibold block -mt-0.5">
                      {post.handle} · {post.timeAgo}
                    </span>
                  </div>
                </div>

                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-blue-300 hover:text-amber-400 transition-colors"
                  title="Lihat postingan asli"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Post Body Caption */}
              <p className="text-xs text-slate-100 font-medium leading-relaxed mb-2.5">
                {post.content}
              </p>

              {/* Optional Post Media Preview */}
              {post.mediaUrl && (
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-slate-900 mb-2.5 group">
                  <img
                    src={post.mediaUrl}
                    alt="Media preview"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  {post.mediaType === 'video' && (
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Engagement Metrics & Interaction Buttons */}
              <div className="pt-2 border-t border-blue-800/80 flex items-center justify-between text-xs text-blue-200">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 font-bold text-[11px] transition-colors ${
                    isLiked
                      ? 'text-rose-400 fill-rose-400'
                      : 'hover:text-rose-400 text-blue-200'
                  }`}
                  aria-label="Suka postingan"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span className="tabular-nums">{post.likesCount.toLocaleString('id-ID')}</span>
                </button>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-300">
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span className="tabular-nums">{post.commentsCount.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-300">
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="tabular-nums">{post.sharesCount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Widget Footer */}
      <div className="p-3 border-t border-blue-800/80 bg-[#071933] text-center">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-black text-amber-400 hover:text-amber-300 hover:underline inline-flex items-center gap-1"
        >
          <span>Kunjungi Semua Akun Media Sosial Arun News</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
