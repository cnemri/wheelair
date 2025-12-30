"use client";

import React, { useState, useMemo } from 'react';
import { 
  Battery, 
  Mail, 
  Phone, 
  ExternalLink, 
  MapPin, 
  Info,
  X,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
  Globe,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Airline {
  airline_name: string;
  iata_code: string;
  manual_wheelchair_policy: string;
  electric_wheelchair_policy: string;
  battery_types_allowed: string[];
  battery_handling_instructions: string;
  special_assistance_contact_general: string;
  accessibility_emails: string[];
  accessibility_phones: string[];
  sources: string[];
  "Legal Name": string;
  "Airline Code": number | string;
  "ICAO Code": string;
  Country: string;
  Region: string;
  Website: string;
}

interface AirlineCardProps {
  airline: Airline;
  onClick: () => void;
}

const AirlineCard: React.FC<AirlineCardProps> = ({ airline, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer flex flex-col group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-1">{airline.airline_name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold font-mono tracking-wider">{airline.iata_code}</span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
              <MapPin className="w-3 h-3" />
              <span>{airline.Country}</span>
            </div>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex gap-2.5">
          <Battery className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            <span className="font-bold text-slate-400 uppercase text-[9px] block tracking-wider mb-0.5">Battery Support</span>
            {airline.battery_types_allowed.join(', ') || 'Contact Airline'}
          </div>
        </div>
        <div className="flex gap-2.5">
          <Mail className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
            <span className="font-bold text-slate-400 uppercase text-[9px] block tracking-wider mb-0.5">Direct Contact</span>
            {airline.accessibility_emails[0] || airline.special_assistance_contact_general || 'Visit Website'}
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{airline.Region}</span>
        <div className="flex gap-1.5">
          {airline.manual_wheelchair_policy && (
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center" title="Manual Wheelchair Info">
              <Info className="w-3 h-3 text-slate-500" />
            </div>
          )}
          {airline.electric_wheelchair_policy && (
            <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center" title="Power Wheelchair Info">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface AirlineModalProps {
  airline: Airline;
  onClose: () => void;
  onSuggest: () => void;
}

const AirlineModal: React.FC<AirlineModalProps> = ({ airline, onClose, onSuggest }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="px-8 py-6 bg-indigo-700 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold">{airline.airline_name}</h2>
              <span className="px-2 py-0.5 rounded bg-white/20 text-white text-sm font-mono font-bold uppercase">{airline.iata_code}</span>
            </div>
            <p className="text-indigo-100 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{airline.Region}</span>
              <span className="opacity-50">|</span>
              <span>{airline.Country}</span>
            </p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Col */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 text-indigo-700 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold uppercase tracking-wider text-xs">Manual Wheelchair Policy</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{airline.manual_wheelchair_policy || 'Standard manual wheelchair policies apply. Free of charge for personal use.'}</p>
              </section>

              <section>
                <div className="flex items-center gap-3 text-amber-600 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold uppercase tracking-wider text-xs">Electric Wheelchair Policy</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{airline.electric_wheelchair_policy || 'Powered wheelchairs require advance notification (typically 48h). Must specify weight and dimensions.'}</p>
              </section>

              <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-center gap-3 text-emerald-700 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Battery className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold uppercase tracking-wider text-xs">Battery Guidelines</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Allowed Types</span>
                    <div className="flex flex-wrap gap-2">
                      {airline.battery_types_allowed.map(type => (
                        <span key={type} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">{type}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Instructions</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{airline.battery_handling_instructions}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Col */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 text-blue-700 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold uppercase tracking-wider text-xs">Accessibility Contacts</h4>
                </div>
                <div className="space-y-3">
                  {airline.accessibility_emails.map(email => (
                    <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 group">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-100 group-hover:bg-blue-100 transition-colors">
                        <Mail className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{email}</span>
                    </a>
                  ))}
                  {airline.accessibility_phones.map(phone => (
                    <a key={phone} href={`tel:${phone}`} className="flex items-center gap-3 group">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-100 group-hover:bg-blue-100 transition-colors">
                        <Phone className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{phone}</span>
                    </a>
                  ))}
                  {airline.special_assistance_contact_general && (
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-blue-800 leading-relaxed">
                      <span className="font-bold block mb-1 opacity-70">General Assistance</span>
                      {airline.special_assistance_contact_general}
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 text-slate-700 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold uppercase tracking-wider text-xs">Resources & Identity</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">ICAO</span>
                    <span className="font-mono font-bold text-slate-700">{airline["ICAO Code"]}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Airline Code</span>
                    <span className="font-mono font-bold text-slate-700">{airline["Airline Code"]}</span>
                  </div>
                </div>
                <a href={`https://${airline.Website}`} target="_blank" className="w-full mt-4 flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl text-indigo-700 text-sm font-bold transition-all">
                  <span>Official Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </section>

              <section>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Grounded Evidence</h4>
                <div className="space-y-2">
                  {airline.sources.map((source, i) => (
                    <a key={i} href={source} target="blank" className="text-[11px] text-indigo-500 hover:text-indigo-700 truncate block py-2 px-3 bg-indigo-50/30 rounded-lg hover:bg-indigo-50 transition-colors">
                      {source}
                    </a>
                  ))}
                </div>
              </section>

              <section className="pt-6 border-t border-slate-100">
                <button 
                  onClick={onSuggest}
                  className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  Suggest a Correction
                </button>
                <p className="text-[10px] text-slate-400 mt-3 text-center leading-relaxed px-4">
                  Help the community by reporting outdated links or policy changes.
                </p>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const AirlineGrid: React.FC<{ 
  airlines: Airline[], 
  searchQuery: string,
  selectedAirline: Airline | null,
  onSelectAirline: (airline: Airline | null) => void
}> = ({ airlines, searchQuery, selectedAirline, onSelectAirline }) => {
  const [regionFilter, setRegionFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  const regions = useMemo(() => {
    return Array.from(new Set(airlines.map(a => a.Region).filter(Boolean))).sort();
  }, [airlines]);

  const countries = useMemo(() => {
    const activeRegionAirlines = regionFilter 
      ? airlines.filter(a => a.Region === regionFilter)
      : airlines;
    return Array.from(new Set(activeRegionAirlines.map(a => a.Country).filter(Boolean))).sort();
  }, [airlines, regionFilter]);

  const filtered = airlines.filter(a => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      a.airline_name.toLowerCase().includes(q) || 
      a.iata_code.toLowerCase().includes(q) || 
      a.Country.toLowerCase().includes(q);
    
    const matchesRegion = !regionFilter || a.Region === regionFilter;
    const matchesCountry = !countryFilter || a.Country === countryFilter;

    return matchesSearch && matchesRegion && matchesCountry;
  });

  const handleSuggest = () => {
    if (!selectedAirline) return;
    
    // REPLACE THIS URL with your actual Google Form URL
    // You can pre-fill fields using entry.ID query parameters
    const baseUrl = "https://forms.gle/yPucCB8X44o2Tpy9A";
    const params = new URLSearchParams({
      "usp": "pp_url",
      "entry.123456789": selectedAirline.airline_name, // Replace with your actual entry ID
      "entry.987654321": selectedAirline.iata_code    // Replace with your actual entry ID
    });
    
    window.open(`${baseUrl}?${params.toString()}`, "_blank");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-slate-400 mr-2">
          <Globe className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
        </div>
        
        <div className="flex flex-grow gap-4 flex-wrap">
          <select 
            value={regionFilter}
            onChange={(e) => { setRegionFilter(e.target.value); setCountryFilter(''); }}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 outline-none transition-all"
          >
            <option value="">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select 
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5 outline-none transition-all"
          >
            <option value="">All Countries</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {(regionFilter || countryFilter) && (
            <button 
              onClick={() => { setRegionFilter(''); setCountryFilter(''); }}
              className="text-indigo-600 text-xs font-bold hover:text-indigo-700 transition-colors px-2"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {filtered.length} Results
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((airline, idx) => (
          <AirlineCard 
            key={`${airline.iata_code}-${airline.airline_name}-${idx}`} 
            airline={airline} 
            onClick={() => onSelectAirline(airline)} 
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedAirline && (
          <AirlineModal 
            airline={selectedAirline} 
            onClose={() => onSelectAirline(null)} 
            onSuggest={handleSuggest}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
