import { useState } from 'react';
import { TrendingUp, TrendingDown, Sun, Cloud, CloudRain, CloudSun, Calendar, ChevronDown } from 'lucide-react';
import { MARKET_DATA, INDONESIA_WEATHER, WeatherCity } from '../data/newsData';

interface TopUtilityBarProps {
  darkMode: boolean;
}

export default function TopUtilityBar({ darkMode }: TopUtilityBarProps) {
  const [selectedCity, setSelectedCity] = useState<WeatherCity>(INDONESIA_WEATHER[0]);
  const [showCityMenu, setShowCityMenu] = useState(false);

  // Today's date in formal Indonesian
  const formattedDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const hijriDate = '8 Rabiul Akhir 1448 H';

  const renderWeatherIcon = (icon: WeatherCity['icon']) => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-3.5 h-3.5 text-amber-500" />;
      case 'rain':
        return <CloudRain className="w-3.5 h-3.5 text-sky-500" />;
      case 'cloud':
        return <Cloud className="w-3.5 h-3.5 text-slate-400" />;
      case 'cloud-sun':
      default:
        return <CloudSun className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  return (
    <div
      className={`border-b text-xs transition-colors duration-200 ${
        darkMode
          ? 'bg-[#061426] border-blue-900/60 text-slate-300'
          : 'bg-[#07172c] text-slate-200 border-blue-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 gap-4 overflow-hidden">
          {/* Left: Date & Calendar */}
          <div className="flex items-center gap-2 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-slate-100">{formattedDate}</span>
            <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-slate-400 hidden sm:inline">{hijriDate}</span>
          </div>

          {/* Center: Market Ticker (Scrollable / Dense) */}
          <div className="hidden lg:flex items-center gap-5 overflow-x-auto no-scrollbar py-1">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] shrink-0">
              PASAR & KURS:
            </span>
            {MARKET_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="font-semibold text-white tabular-nums">{item.value}</span>
                <span
                  className={`flex items-center text-[11px] font-semibold tabular-nums ${
                    item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          {/* Right: City Weather Selector */}
          <div className="relative shrink-0 flex items-center">
            <button
              onClick={() => setShowCityMenu(!showCityMenu)}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              aria-label="Pilih cuaca kota"
            >
              {renderWeatherIcon(selectedCity.icon)}
              <span className="font-medium text-slate-100">{selectedCity.city}</span>
              <span className="text-amber-400 font-semibold tabular-nums">{selectedCity.temp}°C</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* City dropdown */}
            {showCityMenu && (
              <div
                className="absolute right-0 top-full mt-1.5 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowCityMenu(false)}
              >
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Cuaca Kota Indonesia
                </div>
                {INDONESIA_WEATHER.map((city) => (
                  <button
                    key={city.city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCityMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-800 transition-colors ${
                      selectedCity.city === city.city ? 'bg-slate-800/60 text-amber-400' : 'text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {renderWeatherIcon(city.icon)}
                      <span>{city.city}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold tabular-nums">{city.temp}°C</span>
                      <span className="block text-[10px] text-slate-400">{city.condition}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
