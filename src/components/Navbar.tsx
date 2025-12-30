import React from 'react';
import { Search, Accessibility, Menu, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
  currentView: string;
  breadcrumb: string[];
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onToggleSidebar, currentView, breadcrumb }) => {
  return (
    <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center px-4 sm:px-6">
      <button 
        onClick={onToggleSidebar}
        className="p-2 hover:bg-slate-100 rounded-lg lg:hidden mr-2 transition-colors"
      >
        <Menu className="w-5 h-5 text-slate-600" />
      </button>

      <div className="flex items-center gap-2 mr-8">
        <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
          <Accessibility className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">WheelAir</span>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mr-8 hidden lg:flex">
        {breadcrumb.map((item, index) => (
          <React.Fragment key={item}>
            {index > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
            <span className={index === breadcrumb.length - 1 ? "text-slate-900 font-bold" : ""}>
              {item}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="flex-grow max-w-xl hidden md:block">
        {currentView === 'airlines' && (
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search airlines, codes, or countries..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-slate-100 border-transparent border focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 py-2.5 pl-10 pr-4 rounded-xl transition-all outline-none text-sm text-slate-700"
            />
          </div>
        )}
      </div>

      <div className="flex-grow md:hidden" />
    </nav>
  );
};
