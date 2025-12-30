"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert, 
  Stethoscope, 
  Contact,
  Globe,
  Gavel
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const steps = [
  {
    id: 'intro',
    title: "What is IATA?",
    icon: Globe,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 'downloads',
    title: "Essential Downloads",
    icon: Download,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 'passport',
    title: "Mobility Aid Passport",
    icon: Contact,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 'medif',
    title: "Medical Clearance (MEDIF)",
    icon: Stethoscope,
    color: "bg-rose-100 text-rose-600"
  },
  {
    id: 'regulations',
    title: "Rights & Regulations",
    icon: Gavel,
    color: "bg-amber-100 text-amber-600"
  }
];

export const IATAGuide: React.FC<{ initialStep?: string }> = ({ initialStep }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (initialStep) {
      const stepIndex = steps.findIndex(s => s.id === initialStep);
      if (stepIndex !== -1) setActiveStep(stepIndex);
    }
  }, [initialStep]);

  const next = () => activeStep < steps.length - 1 && setActiveStep(activeStep + 1);
  const prev = () => activeStep > 0 && setActiveStep(activeStep - 1);

  const renderContent = () => {
    switch (steps[activeStep].id) {
      case 'intro':
        return (
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              The <strong>International Air Transport Association (IATA)</strong> is the trade association for the world's airlines, representing some 330 airlines or 80% of total air traffic.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Safety First</h4>
                <p className="text-sm text-slate-500">IATA sets the global standards for airline safety and security, including the transport of dangerous goods like lithium batteries.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Universal Policy</h4>
                <p className="text-sm text-slate-500">While each airline has its own rules, they almost all derive their core accessibility procedures from IATA's standard resolutions.</p>
              </div>
            </div>
          </div>
        );

      case 'downloads':
        return (
          <div className="space-y-6">
            <p className="text-slate-600 italic mb-4 text-sm font-medium">Click to download the official current guidance documents:</p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { 
                  title: "Battery Powered Wheelchair Guidance", 
                  desc: "The core document for flying with electric mobility aids and battery safety rules.",
                  url: "https://www.iata.org/contentassets/6fea26dd84d24b26a7a1fd5788561d6e/mobility-aid-guidance-document.pdf" 
                },
                { 
                  title: "Transport of Mobility Aids (Comprehensive)", 
                  desc: "Broad guide on handling procedures to prevent damage during loading and transit.",
                  url: "https://www.iata.org/contentassets/7b3762815ac44a10b83ccf5560c1b308/iata-guidance-on-the-transport-of-mobility-aids-final-feb2023.pdf" 
                },
                { 
                  title: "Travelling with Lithium Batteries", 
                  desc: "Essential for POCs, CPAPs, and spare battery limits in carry-on luggage.",
                  url: "https://www.iata.org/contentassets/6fea26dd84d24b26a7a1fd5788561d6e/passengers_travelling_with_lithium_batteries.pdf" 
                }
              ].map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{doc.title}</h4>
                      <p className="text-xs text-slate-500">{doc.desc}</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                </a>
              ))}
            </div>
          </div>
        );

      case 'passport':
        return (
          <div className="space-y-6">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                The <strong>Mobility Aid Passport</strong> is a static set of information that belongs to the mobility aid and connects it to its owner. It streamlines the check-in process by providing all technical specs in a standardized format.
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 my-6 rounded-r-2xl">
                <h4 className="text-indigo-900 font-bold mb-3 flex items-center gap-2 uppercase tracking-tight text-sm">
                  <ShieldAlert className="w-4 h-4" /> Recommended Data Points
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs text-indigo-800 font-medium">
                  <li>• Battery type & Wh rating</li>
                  <li>• Method to disconnect battery</li>
                  <li>• Neutral mechanism location</li>
                  <li>• Weight in air-travel configuration</li>
                  <li>• Dimensions (L x W x H)</li>
                  <li>• Removable components list</li>
                </ul>
              </div>
              <p className="text-xs text-slate-500 bg-slate-100 p-4 rounded-xl leading-relaxed">
                IATA recommends that the Mobility Aid Passport be aligned with the RESNA AT-1 Section 4 Air Travel Configuration Card.
              </p>
            </div>
          </div>
        );

      case 'medif':
        return (
          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              The <strong>Medical Information Form (MEDIF)</strong> is the standard industry form used when a passenger needs medical clearance to fly. 
            </p>
            <div className="p-8 bg-rose-50 border border-rose-100 rounded-3xl space-y-4">
              <div className="flex items-center gap-3 text-rose-700">
                <ShieldAlert className="w-6 h-6" />
                <h4 className="font-bold text-lg">When is this needed?</h4>
              </div>
              <ul className="space-y-2 text-sm text-rose-800">
                <li className="flex gap-2"><span>•</span> Passengers with unstable medical conditions.</li>
                <li className="flex gap-2"><span>•</span> Recent surgeries (typically within 10-14 days).</li>
                <li className="flex gap-2"><span>•</span> Need for supplemental oxygen or specialized medical equipment.</li>
              </ul>
              <a href="https://www.caa.co.uk/media/mp3lmyyd/iata-medif-form.pdf" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 mt-4">
                <Download className="w-4 h-4" />
                Download Standard MEDIF Form
              </a>
            </div>
          </div>
        );

      case 'regulations':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-3 text-amber-600 mb-4">
                  <Gavel className="w-6 h-6" />
                  <h4 className="font-bold text-lg">IATA Resolution 700</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  This is the global standard prohibiting discrimination based on disability. It ensures the acceptance and carriage of incapacitated passengers across all member airlines.
                </p>
                <a href="https://eagosh.org/eagosh-files/articles_presentations_infos/sars/iata_who/iata_reso_700_e.pdf" target="_blank" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                  View Resolution Summary <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-3 text-amber-600 mb-4">
                  <ShieldAlert className="w-6 h-6" />
                  <h4 className="font-bold text-lg">DGR Table 2.3.A</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  The definitive proof of carriage. This table lists provisions for dangerous goods carried by passengers, explicitly detailing that battery-powered wheelchairs ARE allowed.
                </p>
                <a href="https://www.iata.org/contentassets/6fea26dd84d24b26a7a1fd5788561d6e/dgr-65-en-2.3.a.pdf" target="_blank" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                  Download DGR Table 2.3.A <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 lg:p-12 space-y-10">
      <header className="flex items-center gap-6 pb-8 border-b border-slate-100">
        <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg", steps[activeStep].color)}>
          {React.createElement(steps[activeStep].icon, { className: "w-8 h-8" })}
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{steps[activeStep].title}</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Step {activeStep + 1} of {steps.length}</p>
        </div>
      </header>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="pt-12 flex items-center justify-between border-t border-slate-100">
        <button
          onClick={prev}
          disabled={activeStep === 0}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
            activeStep === 0 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:bg-slate-100"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === activeStep ? "w-8 bg-indigo-600" : "w-1.5 bg-slate-200"
              )} 
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeStep === steps.length - 1}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
            activeStep === steps.length - 1 ? "text-slate-300 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100"
          )}
        >
          {activeStep === steps.length - 1 ? 'Finished' : 'Next Section'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

const ExternalLink: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);
