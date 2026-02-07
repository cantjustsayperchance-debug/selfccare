
import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const navItems: { id: AppView; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'plan', label: 'My Care Plan', icon: '📋' },
    { id: 'buddies', label: 'Buddies', icon: '👥' },
    { id: 'progress', label: 'Progress', icon: '📈' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#FDFDFD] shadow-2xl relative overflow-hidden font-sans">
      {/* Header */}
      <header className="bg-[#40B8C4] pt-12 pb-8 px-6 rounded-b-[40px] shadow-lg relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm">
               <span className="text-[#40B8C4] font-black text-xl tracking-tight">Self <span className="text-[#FACC15]">CC</span> Care</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-md pl-1 pr-4 py-1 rounded-full flex items-center gap-3 border border-white/30 shadow-inner">
            <div className="w-9 h-9 rounded-full bg-[#FACC15] flex items-center justify-center text-gray-800 font-black text-sm border-2 border-white">B</div>
            <span className="text-white text-xs font-bold tracking-wide uppercase">Barbara</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 pb-32 overflow-y-auto bg-slate-50/30">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 backdrop-blur-xl border border-gray-100 p-3 flex justify-around items-center z-50 rounded-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
              activeView === item.id 
                ? 'scale-110' 
                : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`text-[10px] font-black uppercase tracking-wider ${activeView === item.id ? 'text-[#40B8C4]' : 'text-gray-400'}`}>
              {item.label}
            </span>
            {activeView === item.id && (
              <div className="w-1 h-1 bg-[#40B8C4] rounded-full mt-0.5"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
