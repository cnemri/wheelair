"use client";

import React, { useState, useMemo } from 'react';
import { Sidebar, ViewType } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { AirlineGrid, Airline } from '@/components/AirlineGrid';
import { IATAGuide } from '@/components/IATAGuide';
import { EULegalGuide } from '@/components/EULegalGuide';
import { USLegalGuide } from '@/components/USLegalGuide';
import { MontrealConventionGuide } from '@/components/MontrealConventionGuide';
import airlinesData from '@/airlines.json';
import { Scale, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('airlines');
  const [currentSubView, setCurrentSubView] = useState<string | undefined>();
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const breadcrumb = useMemo(() => {
    const labels: Record<string, string> = {
      'airlines': 'Airline Policies',
      'iata': 'IATA Regulations',
      'legal-eu': 'EU 1107/2006',
      'legal-us': 'US DOT Part 382',
      'legal-intl': 'Montreal Convention',
      'about': 'About',
      'intro': 'Overview',
      'downloads': 'Downloads',
      'passport': 'Mobility Passport',
      'medif': 'Medical (MEDIF)',
      'regulations': 'Rights Summary',
      'rights': 'Non-Discrimination',
      'assistance': 'Right to Assistance',
      'compensation': 'Compensation',
      'complaints': 'Complaints',
      'seating': 'Seating',
      'stowage': 'Cabin Stowage',
      'animals': 'Service Animals',
      'damage': 'Damage Liability',
      'liability': 'Liability',
      'limits': 'SDR Limits',
      'timelines': 'Deadlines',
      'wheelair': 'About WheelAir',
      'author': 'About the Author'
    };

    const path = [labels[currentView] || currentView];
    if (currentSubView) {
      path.push(labels[currentSubView] || currentSubView);
    }
    if (currentView === 'airlines' && selectedAirline) {
      path.push(selectedAirline.airline_name);
    }
    return path;
  }, [currentView, currentSubView, selectedAirline]);

  const content = useMemo(() => {
    switch (currentView) {
      case 'airlines':
        return (
          <AirlineGrid 
            airlines={airlinesData as any} 
            searchQuery={searchQuery} 
            selectedAirline={selectedAirline}
            onSelectAirline={setSelectedAirline}
          />
        );
      
      case 'iata':
        return <IATAGuide initialStep={currentSubView} />;

      case 'legal-eu':
        return <EULegalGuide initialStep={currentSubView} />;

      case 'legal-us':
        return <USLegalGuide initialStep={currentSubView} />;

      case 'legal-intl':
        return <MontrealConventionGuide initialStep={currentSubView} />;

      case 'about':
        if (currentSubView === 'author') {
          return (
            <div className="max-w-4xl mx-auto p-8 lg:p-12 space-y-12">
              <header className="space-y-6 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden ring-4 ring-white shadow-xl">
                     <img src="https://media.licdn.com/dms/image/v2/D4E03AQE8Z8_8Z_8Z8A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718283847281?e=1741219200&v=beta&t=Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z" alt="Chouaieb Nemri" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl font-bold">CN</span>' }} />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Chouaieb Nemri</h1>
                    <p className="text-xl text-indigo-600 font-semibold uppercase tracking-wider">Generative AI BlackBelt @ Google</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">AI Expert</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Avid Traveler</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Accessibility Advocate</span>
                    </div>
                  </div>
                </div>
              </header>
              
              <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm space-y-8">
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">About the Author</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    As a Generative AI BlackBelt Specialist at Google, Chouaieb Nemri has spent over a decade navigating the complexities of data and AI. Beyond his technical role, he is a dedicated mentor committed to empowering individuals, especially those with disabilities, to pursue careers in technology.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Traveling extensively across the globe, Chouaieb has witnessed the hurdles faced by travelers with reduced mobility. WheelAir represents his mission to use AI for social good—simplifying complex airline policies into actionable insights for everyone.
                  </p>
                </div>
              </section>
            </div>
          );
        }
        return (
          <div className="max-w-4xl mx-auto p-8 lg:p-12 space-y-12">
            <header className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">About WheelAir</h1>
              <p className="text-lg text-slate-500 leading-relaxed">The unified global database for aviation mobility policies.</p>
            </header>
            
            <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm space-y-8">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Airline wheelchair policies are often buried in dense legal documents or outdated PDFs. <strong>WheelAir</strong> was created to solve this information asymmetry.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  By leveraging state-of-the-art Generative AI and real-time web grounding, we provide a clean, searchable, and verified interface for passengers to understand their rights and the technical requirements for their mobility aids before they reach the airport.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Global Coverage
                  </h3>
                  <p className="text-sm text-indigo-700 leading-relaxed">Mapping policies for over 360 airlines across every continent.</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> AI Grounded
                  </h3>
                  <p className="text-sm text-emerald-700 leading-relaxed">Information is dynamically retrieved and verified using Google's Gemini 3 Flash models.</p>
                </div>
              </div>
            </section>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-[60vh] text-slate-400 flex-col gap-4">
            <Zap className="w-12 h-12 opacity-20" />
            <p className="font-medium">Section coming soon</p>
          </div>
        );
    }
  }, [currentView, searchQuery, currentSubView]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        onSearch={setSearchQuery} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        currentView={currentView}
        breadcrumb={breadcrumb}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          currentSubView={currentSubView}
          onViewChange={(v, sub) => {
            setCurrentView(v);
            setCurrentSubView(sub);
            setSelectedAirline(null); // Clear selected airline when changing views
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto relative lg:pb-12 pb-24">
          {content}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}