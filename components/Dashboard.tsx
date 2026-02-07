
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AppView } from '../types';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const data = [
    { name: 'Completed', value: 100 },
    { name: 'Remaining', value: 0 },
  ];
  const COLORS = ['#BEF264', '#E2E8F0'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Progress Section */}
      <div className="bg-[#FEF9C3] p-8 rounded-[40px] flex items-center gap-6 shadow-sm border border-yellow-100/50">
        <div className="flex-1">
          <h2 className="text-2xl font-black text-gray-800 leading-tight">Welcome,<br/>Barbara!</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium italic">You're doing great!</p>
        </div>
        <div className="relative w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={38}
                outerRadius={52}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-gray-800 tracking-tighter">100%</span>
          </div>
          <div className="absolute -bottom-1 w-full text-center">
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Complete</p>
          </div>
        </div>
      </div>

      {/* Buddy Message Card */}
      <div className="bg-[#FEF9C3] p-6 rounded-[35px] shadow-sm flex flex-col gap-4 border border-yellow-100/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-yellow-200 text-xl">💬</div>
          <div>
            <h3 className="font-black text-gray-800 text-sm">Susan sent encouragement!</h3>
            <p className="text-xs text-gray-500 font-medium">"You've got this, Barbara! Almost done for the week!"</p>
          </div>
        </div>
        <button 
          onClick={() => onViewChange('buddies')}
          className="bg-[#FACC15] hover:bg-yellow-400 text-gray-800 px-6 py-2.5 rounded-2xl text-xs font-black transition-all shadow-sm self-end active:scale-95"
        >
          MEET BUDDIES →
        </button>
      </div>

      {/* Action Section */}
      <div className="bg-[#FEF9C3] p-8 rounded-[40px] shadow-sm space-y-6 border border-yellow-100/50">
        <div>
          <h3 className="text-xl font-black text-gray-800">Next Step?</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Ready for your afternoon plan?</p>
        </div>
        <button 
          onClick={() => onViewChange('plan')}
          className="w-full bg-[#FACC15] hover:bg-yellow-400 text-gray-800 py-5 rounded-[25px] font-black text-xl shadow-lg transition-all active:scale-95 group flex items-center justify-center gap-3"
        >
          SEE MY CARE PLAN 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
