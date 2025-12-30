"use client";

import React, { useState } from 'react';
import { 
  Scale, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle,
  Construction,
  MessageSquare,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const steps = [
  {
    id: 'intro',
    title: "EU 1107/2006 Overview",
    icon: Scale,
    color: "bg-amber-100 text-amber-600"
  },
  {
    id: 'rights',
    title: "Non-Discrimination",
    icon: ShieldCheck,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 'assistance',
    title: "Right to Assistance",
    icon: Construction,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 'compensation',
    title: "Damage & Compensation",
    icon: History,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 'complaints',
    title: "Enforcement & Complaints",
    icon: MessageSquare,
    color: "bg-rose-100 text-rose-600"
  }
];

export const EULegalGuide: React.FC<{ initialStep?: string }> = ({ initialStep }) => {
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
              <strong>Regulation (EC) No 1107/2006</strong> is the fundamental EU law ensuring the rights of disabled persons and persons with reduced mobility (PRM) when travelling by air.
            </p>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-tight text-xs">Applicability</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span> All flights departing from EU/EEA airports.</li>
                <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span> Flights arriving at EU/EEA airports if operated by an EU carrier.</li>
                <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span> Includes Iceland, Norway, and Switzerland.</li>
              </ul>
            </div>
            <a href="https://eur-lex.europa.eu/eli/reg/2006/1107/oj/eng" target="_blank" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
              View Official Journal Text <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        );

      case 'rights':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
              <h4 className="text-emerald-900 font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Article 3: Prevention of Refusal
              </h4>
              <p className="text-sm text-emerald-800 leading-relaxed mb-4">
                An air carrier, agent, or tour operator cannot refuse a reservation or embarkation on the grounds of disability or reduced mobility.
              </p>
              <div className="bg-white/50 p-4 rounded-xl space-y-3">
                <h5 className="text-xs font-bold text-emerald-900 uppercase">Only 2 Exceptions (Article 4):</h5>
                <ul className="text-xs text-emerald-800 space-y-2">
                  <li className="flex gap-2 font-medium"><span>1.</span> Safety requirements established by law.</li>
                  <li className="flex gap-2 font-medium"><span>2.</span> If the aircraft size/doors make embarkation physically impossible.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'assistance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" /> Airport Responsibility
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Managing bodies of airports are responsible for providing assistance from designated points of arrival to the aircraft seat (Annex I).
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" /> Carrier Responsibility
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Airlines must transport up to two pieces of mobility equipment per person free of charge (Annex II).
                </p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 font-medium">Notification requirement: You must notify the airline 48 hours in advance to guarantee the required assistance.</p>
            </div>
          </div>
        );

      case 'compensation':
        return (
          <div className="space-y-6">
            <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-4">
              <h4 className="text-xl font-bold text-indigo-900">Article 12: Compensation</h4>
              <p className="text-slate-700 leading-relaxed">
                Where wheelchairs or other mobility equipment are lost or damaged during handling at the airport or transport on board, the passenger must be compensated.
              </p>
              <div className="bg-white p-5 rounded-2xl border border-indigo-100">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  <strong>Crucial Difference:</strong> While the Montreal Convention usually limits liability to approx. €1,600, EU regulators and many courts interpret 1107/2006 as requiring <strong>full replacement cost</strong> for mobility aids, as they are extensions of the person's body.
                </p>
              </div>
            </div>
          </div>
        );

      case 'complaints':
        return (
          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              If your rights under this regulation are infringed, follow this hierarchy:
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "Contact the Airline/Airport", desc: "First, bring the matter to the attention of the managing body of the airport or the air carrier." },
                { step: "2", title: "National Enforcement Body (NEB)", desc: "If unsatisfied, complain to the designated body in the Member State where the incident occurred." },
                { step: "3", title: "Legal Redress", desc: "You maintain the right to seek legal redress from courts under national law." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-rose-200 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-rose-50 text-rose-600 flex flex-shrink-0 items-center justify-center font-bold text-sm">{item.step}</div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
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
                i === activeStep ? "w-8 bg-amber-600" : "w-1.5 bg-slate-200"
              )} 
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeStep === steps.length - 1}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
            activeStep === steps.length - 1 ? "text-slate-300 cursor-not-allowed" : "bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-100"
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
