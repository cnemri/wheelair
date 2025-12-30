"use client";

import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert, 
  Coins,
  History,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const steps = [
  {
    id: 'intro',
    title: "Montreal Convention (MC99)",
    icon: BookOpen,
    color: "bg-rose-100 text-rose-600"
  },
  {
    id: 'liability',
    title: "Liability for Damage",
    icon: ShieldAlert,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 'limits',
    title: "Compensation Limits",
    icon: Coins,
    color: "bg-amber-100 text-amber-600"
  },
  {
    id: 'timelines',
    title: "Crucial Deadlines",
    icon: History,
    color: "bg-blue-100 text-blue-600"
  }
];

export const MontrealConventionGuide: React.FC<{ initialStep?: string }> = ({ initialStep }) => {
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
              The <strong>Montreal Convention 1999 (MC99)</strong> is the multi-lateral treaty that governs airline liability for passengers and baggage on international flights.
            </p>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Scope</h4>
              <p className="text-sm text-slate-500">It applies to all "international carriage" between States Parties. Today, over 130 countries follow this treaty.</p>
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs bg-rose-50 p-3 rounded-xl border border-rose-100">
                <AlertTriangle className="w-4 h-4" />
                Warning: If you are flying between countries that haven't signed MC99, the older (and less favorable) Warsaw Convention may apply.
              </div>
            </div>
          </div>
        );

      case 'liability':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
              <h4 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Article 17: Damage to Baggage
              </h4>
              <p className="text-sm text-indigo-800 leading-relaxed mb-4">
                The carrier is liable for damage sustained in case of destruction or loss of, or of damage to, checked baggage if the event took place on board or while in the charge of the carrier.
              </p>
              <p className="text-xs text-indigo-600 font-medium bg-white/50 p-4 rounded-xl">
                Important: Wheelchairs are legally classified as "Checked Baggage" under this treaty, though special regional rules (like in the EU or US) may provide higher protections.
              </p>
            </div>
          </div>
        );

      case 'limits':
        return (
          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              MC99 limits the financial liability of airlines. These limits are expressed in <strong>Special Drawing Rights (SDR)</strong>, a mix of international currencies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl text-center">
                <h5 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2">Standard Limit</h5>
                <p className="text-3xl font-extrabold text-amber-700 mb-1">1,288 SDR</p>
                <p className="text-xs text-amber-600">Approx. $1,700 / €1,600</p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Special Interest</h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You can increase this limit by making a <strong>Special Declaration of Interest</strong> at check-in, though airlines may charge a fee for this.
                </p>
              </div>
            </div>
          </div>
        );

      case 'timelines':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-900">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                <History className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">Timely Notice (Article 31)</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              To exercise your right to compensation, you MUST complain in writing to the carrier within strict deadlines:
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl">
                <span className="font-bold text-slate-700 text-sm">Damage to Mobility Aid</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">Within 7 Days</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-xl">
                <span className="font-bold text-slate-700 text-sm">Delay of Mobility Aid</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">Within 21 Days</span>
              </div>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl">
              <p className="text-xs text-rose-700 font-bold leading-relaxed">
                If no written complaint is made within these times, no action shall lie against the carrier.
              </p>
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
                i === activeStep ? "w-8 bg-rose-600" : "w-1.5 bg-slate-200"
              )} 
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeStep === steps.length - 1}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
            activeStep === steps.length - 1 ? "text-slate-300 cursor-not-allowed" : "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-100"
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
