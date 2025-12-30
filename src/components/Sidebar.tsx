import { 
  Plane, 
  Scale, 
  Globe, 
  BookOpen, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  LucideIcon
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ViewType = 'airlines' | 'iata' | 'legal-eu' | 'legal-us' | 'legal-intl' | 'about';

interface SubItem {
  id: string;
  label: string;
}

interface SidebarItem {
  id: ViewType;
  label: string;
  icon: LucideIcon;
  color: string;
  subItems?: SubItem[];
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarProps {
  currentView: ViewType;
  currentSubView?: string;
  onViewChange: (view: ViewType, subView?: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, currentSubView, onViewChange, isOpen }) => {
  const sections: SidebarSection[] = [
    {
      title: "Core Database",
      items: [
        { id: 'airlines', label: 'Airline Policies', icon: Plane, color: 'text-blue-600 bg-blue-50' },
      ]
    },
    {
      title: "Global Standards",
      items: [
        { 
          id: 'iata', 
          label: 'IATA Regulations', 
          icon: Globe, 
          color: 'text-indigo-600 bg-indigo-50',
          subItems: [
            { id: 'intro', label: 'Overview' },
            { id: 'downloads', label: 'Downloads' },
            { id: 'passport', label: 'Mobility Passport' },
            { id: 'medif', label: 'Medical (MEDIF)' },
            { id: 'regulations', label: 'Rights Summary' },
          ]
        },
      ]
    },
    {
      title: "Legal Frameworks",
      items: [
        { 
          id: 'legal-eu', 
          label: 'EU 1107/2006', 
          icon: Scale, 
          color: 'text-amber-600 bg-amber-50',
          subItems: [
            { id: 'intro', label: 'Overview' },
            { id: 'rights', label: 'Non-Discrimination' },
            { id: 'assistance', label: 'Right to Assistance' },
            { id: 'compensation', label: 'Compensation' },
            { id: 'complaints', label: 'Complaints' },
          ]
        },
        { 
          id: 'legal-us', 
          label: 'US DOT Part 382', 
          icon: ShieldCheck, 
          color: 'text-emerald-600 bg-emerald-50',
          subItems: [
            { id: 'intro', label: 'Overview' },
            { id: 'seating', label: 'Seating' },
            { id: 'stowage', label: 'Cabin Stowage' },
            { id: 'animals', label: 'Service Animals' },
            { id: 'damage', label: 'Damage Liability' },
          ]
        },
        { 
          id: 'legal-intl', 
          label: 'Montreal Convention', 
          icon: BookOpen, 
          color: 'text-rose-600 bg-rose-50',
          subItems: [
            { id: 'intro', label: 'Overview' },
            { id: 'liability', label: 'Liability' },
            { id: 'limits', label: 'SDR Limits' },
            { id: 'timelines', label: 'Deadlines' },
          ]
        },
      ]
    },
    {
      title: "Resources",
      items: [
        { 
          id: 'about', 
          label: 'About', 
          icon: Info, 
          color: 'text-slate-600 bg-slate-50',
          subItems: [
            { id: 'wheelair', label: 'About WheelAir' },
            { id: 'author', label: 'About the Author' },
          ]
        },
      ]
    }
  ];

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 pt-16 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
      !isOpen && "-translate-x-full"
    )}>
      <div className="h-full overflow-y-auto px-4 py-6 flex flex-col gap-8 custom-scrollbar">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => onViewChange(item.id as ViewType)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                        isActive 
                          ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <div className={cn(
                        "p-1.5 rounded-lg transition-colors",
                        isActive ? "bg-white shadow-sm" : item.color
                      )}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="flex-grow text-left">{item.label}</span>
                      {isActive && !item.subItems && <ChevronRight className="w-4 h-4 opacity-50" />}
                    </button>
                    
                    {/* Render Sub-items if Active */}
                    {isActive && item.subItems && (
                      <div className="ml-9 border-l border-slate-100 pl-4 py-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => onViewChange(item.id as ViewType, sub.id)}
                            className={cn(
                              "w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors font-medium",
                              currentSubView === sub.id 
                                ? "text-indigo-600 bg-indigo-50/50" 
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
