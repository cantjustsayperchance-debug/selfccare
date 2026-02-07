
import React, { useState } from 'react';
import { Exercise, SessionFeedback, FeedbackColor } from '../types';

interface ExerciseFlowProps {
  exercises: Exercise[];
  mode: 'diagram' | 'video';
  onComplete: (feedback: SessionFeedback) => void;
  onCancel: () => void;
}

const ExerciseFlow: React.FC<ExerciseFlowProps> = ({ exercises, mode, onComplete, onCancel }) => {
  const [step, setStep] = useState<'playing' | 'feedback'>('playing');
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Feedback states
  const [color, setColor] = useState<FeedbackColor | null>(null);
  const [pain, setPain] = useState(0);
  const [ease, setEase] = useState(5);
  const [breaks, setBreaks] = useState(0);

  const currentExercise = exercises[currentIdx];

  const handleNext = () => {
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setStep('feedback');
    }
  };

  const submitFeedback = () => {
    if (!color) return;
    onComplete({
      color,
      painLevel: pain,
      easeRating: ease,
      breaksTaken: breaks
    });
  };

  if (step === 'playing') {
    return (
      <div className="bg-white rounded-[40px] h-full flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="bg-[#40B8C4] p-8 flex justify-between items-center">
          <div>
            <h3 className="text-white font-black tracking-widest text-xs uppercase opacity-80">Exercise {currentIdx + 1} of {exercises.length}</h3>
            <h2 className="text-white text-xl font-black">{currentExercise.name}</h2>
          </div>
          <button onClick={onCancel} className="text-white bg-white/20 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-10">
          <div className="w-full aspect-square max-w-[280px] bg-[#FEF9C3] rounded-[50px] flex items-center justify-center border-8 border-slate-50 relative overflow-hidden shadow-inner">
            <span className="text-[120px] animate-pulse drop-shadow-xl">{currentExercise.icon}</span>
            
            {/* Minimal Progress Bar at bottom of visual area */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-3 bg-white/50 rounded-full overflow-hidden border-2 border-white">
              <div 
                className="h-full bg-[#40B8C4] transition-all duration-700 ease-out" 
                style={{ width: `${((currentIdx + 1) / exercises.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center gap-3 mb-4">
               <div className="bg-[#40B8C4]/10 px-4 py-1.5 rounded-full border border-[#40B8C4]/20">
                  <span className="text-[#40B8C4] font-black text-sm uppercase tracking-widest">{currentExercise.reps} REPS</span>
               </div>
               <div className="bg-gray-100 px-4 py-1.5 rounded-full border border-gray-200">
                  <span className="text-gray-600 font-black text-sm uppercase tracking-widest">{currentExercise.sets} SETS</span>
               </div>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed px-4">{currentExercise.description}</p>
          </div>
        </div>

        <div className="p-10 bg-slate-50/50">
          <button 
            onClick={handleNext}
            className="w-full bg-[#FACC15] hover:bg-yellow-400 text-gray-800 py-6 rounded-[30px] font-black text-2xl shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-4"
          >
            {currentIdx === exercises.length - 1 ? 'FINISH' : 'NEXT'}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF9C3] p-10 rounded-[50px] shadow-2xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden border border-yellow-100/50">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full -mr-16 -mt-16"></div>
      
      <div className="text-center relative z-10">
        <h2 className="text-4xl font-black text-gray-800 tracking-tighter">Great Job!</h2>
        <p className="text-gray-600 mt-2 font-bold uppercase tracking-widest text-xs">Tell us how you feel</p>
      </div>

      <div className="flex justify-center gap-8 relative z-10">
        <button 
          onClick={() => setColor(FeedbackColor.RED)}
          className={`w-24 h-24 rounded-full bg-[#FF7171] border-[6px] shadow-xl transition-all flex items-center justify-center text-4xl ${color === FeedbackColor.RED ? 'border-gray-800 scale-125 z-20' : 'border-white/50 opacity-40 scale-100'}`}
        >😫</button>
        <button 
          onClick={() => setColor(FeedbackColor.YELLOW)}
          className={`w-24 h-24 rounded-full bg-[#FFD66B] border-[6px] shadow-xl transition-all flex items-center justify-center text-4xl ${color === FeedbackColor.YELLOW ? 'border-gray-800 scale-125 z-20' : 'border-white/50 opacity-40 scale-100'}`}
        >😐</button>
        <button 
          onClick={() => setColor(FeedbackColor.GREEN)}
          className={`w-24 h-24 rounded-full bg-[#96E6A1] border-[6px] shadow-xl transition-all flex items-center justify-center text-4xl ${color === FeedbackColor.GREEN ? 'border-gray-800 scale-125 z-20' : 'border-white/50 opacity-40 scale-100'}`}
        >🤩</button>
      </div>

      <div className="space-y-8 relative z-10 px-2">
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Pain Level</label>
            <span className="text-2xl font-black text-[#40B8C4]">{pain}</span>
          </div>
          <input 
            type="range" min="0" max="10" value={pain} 
            onChange={(e) => setPain(parseInt(e.target.value))}
            className="w-full h-4 bg-white rounded-full appearance-none cursor-pointer accent-[#40B8C4] shadow-inner" 
          />
        </div>

        <div className="flex items-center justify-between bg-white/50 p-6 rounded-[30px] border border-white">
          <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Breaks Taken</label>
          <div className="flex items-center gap-6">
            <button onClick={() => setBreaks(Math.max(0, breaks - 1))} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-yellow-200 font-black text-2xl text-[#40B8C4] active:scale-90 transition-transform">-</button>
            <span className="text-3xl font-black text-gray-800 min-w-[30px] text-center">{breaks}</span>
            <button onClick={() => setBreaks(breaks + 1)} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-yellow-200 font-black text-2xl text-[#40B8C4] active:scale-90 transition-transform">+</button>
          </div>
        </div>
      </div>

      <button 
        disabled={!color}
        onClick={submitFeedback}
        className={`w-full py-6 rounded-[30px] font-black text-2xl shadow-2xl transition-all relative z-10 ${
          color ? 'bg-[#40B8C4] text-white hover:bg-[#359aa4] active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
        }`}
      >
        SUBMIT PROGRESS
      </button>
    </div>
  );
};

export default ExerciseFlow;
