import { Flame } from 'lucide-react';
import { TRENDING_TAGS } from '../data/newsData';

interface TrendingBarProps {
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  darkMode: boolean;
}

export default function TrendingBar({ selectedTag, onSelectTag, darkMode }: TrendingBarProps) {
  return (
    <div
      className={`border-b text-xs transition-colors py-2 ${
        darkMode ? 'bg-[#081b36] border-blue-900/60' : 'bg-[#0a1e3b] border-blue-800/60 text-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
        {/* Label */}
        <div className="flex items-center gap-1.5 text-amber-400 font-extrabold shrink-0">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="uppercase text-[11px] tracking-wider">Topik Terhangat:</span>
        </div>

        {/* Tags horizontal list */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {TRENDING_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(isSelected ? null : tag)}
                className={`whitespace-nowrap px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-blue-100 hover:text-amber-300 hover:bg-blue-800/60'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Clear filter indicator if selected */}
        {selectedTag && (
          <button
            onClick={() => onSelectTag(null)}
            className="text-[11px] font-semibold text-rose-500 hover:underline shrink-0 ml-auto"
          >
            Reset Topik ({selectedTag})
          </button>
        )}
      </div>
    </div>
  );
}
