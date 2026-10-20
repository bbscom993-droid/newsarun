import { useState } from 'react';
import {
  CloudSun,
  Train,
  Plane,
  Ship,
  Bus,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Gauge,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Calendar
} from 'lucide-react';
import {
  DETAILED_WEATHER_DATA,
  TRANSPORT_SCHEDULE_DATA,
  DetailedWeatherItem,
  TransportMode,
  TransportScheduleItem
} from '../data/newsData';

interface PublicServicesWidgetProps {
  darkMode: boolean;
}

export default function PublicServicesWidget({ darkMode }: PublicServicesWidgetProps) {
  const [activeTab, setActiveTab] = useState<'cuaca' | 'transportasi'>('cuaca');
  const [selectedCityId, setSelectedCityId] = useState<string>('w-jkt');
  const [selectedTransportMode, setSelectedTransportMode] = useState<'semua' | TransportMode>('semua');
  const [transportSearchQuery, setTransportSearchQuery] = useState('');

  const currentCity = DETAILED_WEATHER_DATA.find((c) => c.id === selectedCityId) || DETAILED_WEATHER_DATA[0];

  const renderWeatherIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'sun':
        return <Sun className={`${className} text-amber-400`} />;
      case 'rain':
        return <CloudRain className={`${className} text-sky-400`} />;
      case 'cloud':
        return <Cloud className={`${className} text-slate-300`} />;
      case 'cloud-sun':
      default:
        return <CloudSun className={`${className} text-amber-300`} />;
    }
  };

  const filteredTransports = TRANSPORT_SCHEDULE_DATA.filter((item) => {
    const matchesMode = selectedTransportMode === 'semua' || item.mode === selectedTransportMode;
    const matchesSearch =
      !transportSearchQuery ||
      item.operator.toLowerCase().includes(transportSearchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(transportSearchQuery.toLowerCase()) ||
      item.routeFrom.toLowerCase().includes(transportSearchQuery.toLowerCase()) ||
      item.routeTo.toLowerCase().includes(transportSearchQuery.toLowerCase());
    return matchesMode && matchesSearch;
  });

  const getStatusBadge = (status: TransportScheduleItem['status']) => {
    switch (status) {
      case 'Boarding':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 animate-pulse shadow-xs">
            <Clock className="w-2.5 h-2.5" />
            <span>Boarding</span>
          </span>
        );
      case 'Tepat Waktu':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Tepat Waktu</span>
          </span>
        );
      case 'Tunda':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>Tunda</span>
          </span>
        );
      case 'Tiba':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/40">
            <span>Tiba</span>
          </span>
        );
    }
  };

  const getModeIcon = (mode: TransportMode) => {
    switch (mode) {
      case 'kereta':
        return <Train className="w-4 h-4 text-amber-400" />;
      case 'pesawat':
        return <Plane className="w-4 h-4 text-sky-400" />;
      case 'kapal':
        return <Ship className="w-4 h-4 text-emerald-400" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <section className="mb-10 w-full">
      <div
        className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-xl ${
          darkMode
            ? 'bg-gradient-to-br from-[#06172d] via-[#092244] to-[#06172d] border-blue-900/80 text-white'
            : 'bg-gradient-to-br from-[#092040] via-[#0e2d5c] to-[#092040] border-blue-800/80 text-white shadow-2xl'
        }`}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-blue-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-md">
              {activeTab === 'cuaca' ? <CloudSun className="w-5 h-5" /> : <Train className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase bg-blue-900 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Layanan Publik Terpadu
                </span>
                <span className="text-[10px] text-blue-300 flex items-center gap-1 hidden sm:flex">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Update Realtime</span>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5">
                Prakiraan Cuaca BMKG & Jadwal Transportasi Nusantara
              </h2>
            </div>
          </div>

          {/* Main Tab Buttons */}
          <div className="flex items-center bg-blue-950/90 p-1 rounded-xl border border-blue-700/80 shrink-0">
            <button
              onClick={() => setActiveTab('cuaca')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'cuaca'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <CloudSun className="w-3.5 h-3.5" />
              <span>Prakiraan Cuaca</span>
            </button>
            <button
              onClick={() => setActiveTab('transportasi')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'transportasi'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Train className="w-3.5 h-3.5" />
              <span>Jadwal Transportasi</span>
            </button>
          </div>
        </div>

        {/* Tab 1: PRAKIRAAN CUACA */}
        {activeTab === 'cuaca' && (
          <div className="p-4 sm:p-6 space-y-5">
            {/* City Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Pilih Kota:</span>
              </span>
              {DETAILED_WEATHER_DATA.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityId(city.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    selectedCityId === city.id
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                      : 'bg-blue-950/60 text-blue-200 border-blue-800/80 hover:bg-blue-900/60 hover:text-white'
                  }`}
                >
                  {renderWeatherIcon(city.icon, 'w-3.5 h-3.5')}
                  <span>{city.city}</span>
                  <span className="text-[11px] opacity-80">{city.temp}°C</span>
                </button>
              ))}
            </div>

            {/* City Weather Highlight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Main Weather Card (7 cols) */}
              <div className="lg:col-span-7 rounded-xl bg-gradient-to-r from-[#0d274c] to-[#0b203e] border border-blue-700/60 p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-900 text-amber-300 border border-amber-400/30">
                        {currentCity.region}
                      </span>
                      <span className="text-xs text-blue-300 font-medium">Stasiun Meteorologi BMKG</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {currentCity.city}
                    </h3>
                    <p className="text-sm font-semibold text-amber-300 flex items-center gap-1.5 mt-0.5">
                      {renderWeatherIcon(currentCity.icon, 'w-4 h-4')}
                      <span>{currentCity.condition}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-4xl sm:text-5xl font-black text-white tabular-nums drop-shadow-md">
                      {currentCity.temp}
                      <span className="text-2xl text-amber-400 font-normal">°C</span>
                    </div>
                    <span className="text-[11px] text-blue-300 font-medium">Terasa seperti {currentCity.temp + 2}°C</span>
                  </div>
                </div>

                {/* Weather Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-5 mt-4 border-t border-blue-800/80">
                  <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800/60 text-center">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-blue-300 mb-0.5">
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      <span>Kelembapan</span>
                    </div>
                    <span className="text-sm font-black text-white tabular-nums">{currentCity.humidity}%</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800/60 text-center">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-blue-300 mb-0.5">
                      <Wind className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kecepatan Angin</span>
                    </div>
                    <span className="text-sm font-black text-white tabular-nums">{currentCity.windSpeed} km/j</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/80 border border-blue-800/60 text-center">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-blue-300 mb-0.5">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Kualitas Udara (AQI)</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm font-black text-white tabular-nums">{currentCity.aqi}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          currentCity.aqiLevel === 'Baik'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {currentCity.aqiLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-Day Forecast Cards (5 cols) */}
              <div className="lg:col-span-5 rounded-xl bg-gradient-to-r from-[#0b2140] to-[#0d274c] border border-blue-700/60 p-4 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-blue-800/80">
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Prakiraan 3 Hari ke Depan</span>
                  </span>
                  <span className="text-[10px] text-blue-300">BMKG Indonesia</span>
                </div>

                <div className="space-y-2.5 my-auto py-2">
                  {currentCity.forecastDays.map((fc) => (
                    <div
                      key={fc.day}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-blue-950/80 border border-blue-800/70 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-blue-900/60">
                          {renderWeatherIcon(fc.icon, 'w-4 h-4')}
                        </div>
                        <div>
                          <div className="font-bold text-white">{fc.day}</div>
                          <div className="text-[11px] text-blue-300">{fc.condition}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-amber-300 tabular-nums">{fc.tempMax}°C</span>
                        <span className="text-blue-400 text-[11px] ml-1.5 tabular-nums">/ {fc.tempMin}°C</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-blue-300/80 pt-1 text-center">
                  Sumber data resmi: Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) Republik Indonesia.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: JADWAL TRANSPORTASI */}
        {activeTab === 'transportasi' && (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Mode Selector and Quick Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setSelectedTransportMode('semua')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedTransportMode === 'semua'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-blue-950/80 text-blue-200 border border-blue-800 hover:text-white'
                  }`}
                >
                  Semua Moda ({TRANSPORT_SCHEDULE_DATA.length})
                </button>
                <button
                  onClick={() => setSelectedTransportMode('kereta')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    selectedTransportMode === 'kereta'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-blue-950/80 text-blue-200 border border-blue-800 hover:text-white'
                  }`}
                >
                  <Train className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kereta Api & Whoosh</span>
                </button>
                <button
                  onClick={() => setSelectedTransportMode('pesawat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    selectedTransportMode === 'pesawat'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-blue-950/80 text-blue-200 border border-blue-800 hover:text-white'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5 text-sky-400" />
                  <span>Pesawat</span>
                </button>
                <button
                  onClick={() => setSelectedTransportMode('kapal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    selectedTransportMode === 'kapal'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-blue-950/80 text-blue-200 border border-blue-800 hover:text-white'
                  }`}
                >
                  <Ship className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kapal Pelni & Ferry</span>
                </button>
                <button
                  onClick={() => setSelectedTransportMode('bus')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    selectedTransportMode === 'bus'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-blue-950/80 text-blue-200 border border-blue-800 hover:text-white'
                  }`}
                >
                  <Bus className="w-3.5 h-3.5 text-orange-400" />
                  <span>Bus AKAP</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari rute, kota, no penerbangan..."
                  value={transportSearchQuery}
                  onChange={(e) => setTransportSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-blue-950 border border-blue-700/80 text-xs text-white placeholder-blue-300/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Transport Table */}
            <div className="overflow-x-auto rounded-xl border border-blue-800/80 shadow-md">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#071933] text-amber-300 uppercase tracking-wider text-[10px] font-black border-b border-blue-800">
                  <tr>
                    <th className="py-2.5 px-3">Moda & Operator</th>
                    <th className="py-2.5 px-3">Kode / No.</th>
                    <th className="py-2.5 px-3">Rute Asal → Tujuan</th>
                    <th className="py-2.5 px-3">Keberangkatan</th>
                    <th className="py-2.5 px-3">Kedatangan</th>
                    <th className="py-2.5 px-3">Gate / Peron</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-800/60 bg-blue-950/50">
                  {filteredTransports.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-blue-300">
                        Tidak ditemukan jadwal perjalanan untuk pencarian ini.
                      </td>
                    </tr>
                  ) : (
                    filteredTransports.map((item) => (
                      <tr key={item.id} className="hover:bg-blue-900/50 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <span className="p-1 rounded bg-blue-900/80 shrink-0">
                            {getModeIcon(item.mode)}
                          </span>
                          <span>{item.operator}</span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-blue-200 tabular-nums">
                          {item.code}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-white font-medium">{item.routeFrom}</span>
                          <span className="text-amber-400 mx-1.5 font-bold">→</span>
                          <span className="text-amber-200 font-semibold">{item.routeTo}</span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-white tabular-nums">
                          {item.depTime}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-blue-200 tabular-nums">
                          {item.arrTime}
                        </td>
                        <td className="py-2.5 px-3 text-blue-300 font-medium">
                          {item.terminalGate}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {getStatusBadge(item.status)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-blue-300/80 pt-1">
              <span>*Jadwal terintegrasi stasiun KAI, bandara AP I & AP II, dermaga ASDP, dan terminal bus antar kota.</span>
              <span className="text-amber-400 font-semibold">Tiba 30 menit sebelum keberangkatan untuk check-in.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
