"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Armchair,
  Package,
  HeartPulse,
  Dog,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const steps = [
  {
    id: 'intro',
    title: "US DOT Part 382 Overview",
    icon: ShieldCheck,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 'seating',
    title: "Seating Accommodations",
    icon: Armchair,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 'stowage',
    title: "Equipment Stowage",
    icon: Package,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 'animals',
    title: "Service Animals",
    icon: Dog,
    color: "bg-amber-100 text-amber-600"
  },
  {
    id: 'damage',
    title: "Treatment of Mobility Aids",
    icon: HeartPulse,
    color: "bg-rose-100 text-rose-600"
  }
];

export const USLegalGuide: React.FC<{ initialStep?: string }> = ({ initialStep }) => {
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
              The <strong>Air Carrier Access Act (ACAA)</strong>, implemented via <strong>14 CFR Part 382</strong>, prohibits discrimination on the basis of disability in air travel.
            </p>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-tight text-xs">General Rule</h4>
              <p className="text-sm text-slate-600">Carriers may not refuse transportation solely on the basis of disability, unless justified by a direct threat to safety.</p>
              <div className="p-4 bg-emerald-50 rounded-xl flex items-start gap-3 border border-emerald-100">
                <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 font-medium">Carriers cannot require a medical certificate except in extremely limited cases (e.g. stretcher, medical oxygen, or reasonable doubt of safety).</p>
              </div>
            </div>
          </div>
        );

      case 'seating':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Movable Armrests", desc: "Airlines must provide a seat in a row with a movable armrest for passengers who use an aisle chair to board." },
                { title: "Adjoining Seating", desc: "Airlines must provide a seat next to the passenger for a personal care attendant or reader/interpreter." },
                { title: "Priority Stowage", desc: "Manual wheelchairs have priority for in-cabin stowage over other passengers' carry-on bags if the passenger pre-boards." }
              ].map((item, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'stowage':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
              <h4 className="text-blue-900 font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" /> Article 382.41: Cabin Stowage
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed mb-4 font-medium">
                Aircraft with 100+ seats MUST have a designated priority space in the cabin for at least one folding wheelchair.
              </p>
              <div className="bg-white/50 p-4 rounded-xl space-y-3 text-xs text-blue-800">
                <p>• If you pre-board, your chair has absolute priority in this space.</p>
                <p>• If the chair fits in overhead bins or under seats, it must be allowed.</p>
                <p>• Assistive devices do NOT count toward carry-on limits.</p>
              </div>
            </div>
          </div>
        );

      case 'animals':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-900">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Dog className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">Assistance Dogs</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Carriers must permit service animals to accompany passengers in any seat, as long as they don't block an emergency evacuation aisle.
            </p>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Evidence Accepted</h5>
              <p className="text-xs text-slate-500">ID cards, harnesses, tags, or even "credible verbal assurances" of the passenger are considered valid evidence under DOT rules.</p>
            </div>
          </div>
        );

      case 'damage':
        return (
          <div className="space-y-6">
            <div className="p-8 bg-rose-50 border border-rose-100 rounded-3xl space-y-4">
              <h4 className="text-xl font-bold text-rose-900 flex items-center gap-2">
                <HeartPulse className="w-6 h-6" /> Zero Liability Limits
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                For <strong>domestic US travel</strong>, the standard baggage liability limits (Part 254) do NOT apply to wheelchairs.
              </p>
              <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm">
                <p className="text-sm text-rose-600 font-bold leading-relaxed">
                  Compensation for a lost or destroyed wheelchair must be the ORIGINAL PURCHASE PRICE of the device.
                </p>
              </div>
              <p className="text-xs text-rose-500 font-medium italic italic">Airlines cannot require you to sign a liability waiver for damage to a mobility aid.</p>
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
                i === activeStep ? "w-8 bg-emerald-600" : "w-1.5 bg-slate-200"
              )} 
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeStep === steps.length - 1}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
            activeStep === steps.length - 1 ? "text-slate-300 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100"
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
