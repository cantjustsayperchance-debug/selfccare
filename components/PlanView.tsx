
import React from 'react';
import { CarePlan, Exercise, AppView } from '../types';

interface PlanViewProps {
  plan: CarePlan;
  onStartSession: (mode: 'diagram' | 'video') => void;
  onViewChange: (view: AppView) => void;
}

const PlanView: React.FC<PlanViewProps> = ({ plan, onStartSession, onViewChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-[#FEF9C3] p-8 rounded-[40px] shadow-sm border border-yellow-100/50">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">My Plan</h2>
          <p className="text-gray-500 text-sm font-medium">Customized for your recovery journey.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {plan.exercises.map((ex) => (
            <div key={ex.id} className="bg-white p-5 rounded-[30px] flex flex-col items-center justify-center border-2 border-transparent hover:border-[#FACC15] transition-all shadow-sm group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-inner group-hover:scale-110 transition-transform">
                {ex.icon}
              </div>
              <h4 className="font-black text-[11px] uppercase tracking-wider text-center text-gray-800 line-clamp-1">
                {ex.name}
              </h4>
              <div className="mt-1 bg-[#FACC15]/20 px-3 py-0.5 rounded-full">
                <p className="text-[10px] text-gray-700 font-black">{ex.reps} REPS</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button 
              onClick={() => onStartSession('diagram')}
              className="flex-1 bg-white hover:bg-slate-50 text-gray-800 py-6 rounded-[30px] font-black text-xs transition-all shadow-sm border-2 border-transparent active:border-[#FACC15] flex flex-col items-center gap-2"
            >
              <span className="text-2xl">📊</span>
              DIAGRAM
            </button>
            <button 
              onClick={() => onStartSession('video')}
              className="flex-1 bg-white hover:bg-slate-50 text-gray-800 py-6 rounded-[30px] font-black text-xs transition-all shadow-sm border-2 border-transparent active:border-[#FACC15] flex flex-col items-center gap-2"
            >
              <span className="text-2xl">🎥</span>
              VIDEO
            </button>
          </div>
          
          <button 
            onClick={() => onStartSession('video')}
            className="w-full bg-[#FACC15] hover:bg-yellow-400 text-gray-800 py-5 rounded-[25px] font-black text-lg shadow-lg transition-all active:scale-95"
          >
            START SESSION NOW →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanView;
