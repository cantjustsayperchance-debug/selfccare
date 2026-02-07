
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PlanView from './components/PlanView';
import ExerciseFlow from './components/ExerciseFlow';
import { CarePlan, AppView, SessionFeedback, Exercise, FeedbackColor } from './types';
import { generateNextPlan } from './services/geminiService';

const INITIAL_EXERCISES: Exercise[] = [
  { id: '1', name: 'Arm Rainbows', reps: 12, sets: 1, icon: '🌈', description: 'Gently arc your arms overhead.' },
  { id: '2', name: 'Airplane', reps: 10, sets: 1, icon: '✈️', description: 'Balance and extend arms sideways.' },
  { id: '3', name: 'Shoulder Press', reps: 8, sets: 1, icon: '💪', description: 'Push weights upward slowly.' },
  { id: '4', name: 'Seated Row', reps: 8, sets: 1, icon: '🚣', description: 'Pull resistance towards your chest.' },
  { id: '5', name: 'Goblet Squats', reps: 8, sets: 1, icon: '🧘', description: 'Lower hips while holding weight.' },
  { id: '6', name: 'Calf Stretch', reps: 10, sets: 1, icon: '🦵', description: 'Lean against a wall to stretch calves.' },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [currentPlan, setCurrentPlan] = useState<CarePlan>({
    id: 'plan-1',
    weekNumber: 1,
    exercises: INITIAL_EXERCISES,
    status: 'pending'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMessage, setGenerationMessage] = useState('');

  const handleStartSession = (mode: 'diagram' | 'video') => {
    setActiveView('exercise-view');
  };

  const handleFeedbackComplete = async (feedback: SessionFeedback) => {
    setIsGenerating(true);
    setGenerationMessage('Reviewing your performance...');
    
    try {
      setGenerationMessage('Adapting your routines with Gemini AI...');
      const adaptation = await generateNextPlan(currentPlan, feedback);
      
      const newPlan: CarePlan = {
        id: `plan-${Date.now()}`,
        weekNumber: currentPlan.weekNumber + 1,
        exercises: adaptation.exercises,
        status: 'pending',
        feedback
      };
      
      setCurrentPlan(newPlan);
      setGenerationMessage('Success! Your new plan is ready.');
      setTimeout(() => {
        setIsGenerating(false);
        setActiveView('dashboard');
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
      setActiveView('dashboard');
    }
  };

  const renderContent = () => {
    if (isGenerating) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-1000">
           <div className="relative mb-10">
              <div className="w-32 h-32 border-[12px] border-[#FACC15]/20 border-t-[#40B8C4] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-3xl animate-bounce">🧠</span>
              </div>
           </div>
           <div>
             <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tighter">Personalizing...</h2>
             <p className="text-[#40B8C4] font-black text-xs uppercase tracking-[0.2em] animate-pulse">
               {generationMessage}
             </p>
           </div>
           <div className="mt-12 p-6 bg-[#FEF9C3] rounded-[30px] border border-yellow-100 max-w-xs shadow-sm">
             <p className="text-[11px] text-gray-600 font-bold leading-relaxed">
               "We're checking your pain levels and break history to make sure your next session is even safer for you."
             </p>
           </div>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard onViewChange={setActiveView} />;
      case 'plan':
        return (
          <PlanView 
            plan={currentPlan} 
            onStartSession={handleStartSession} 
            onViewChange={setActiveView}
          />
        );
      case 'exercise-view':
        return (
          <ExerciseFlow 
            exercises={currentPlan.exercises} 
            mode="video" 
            onCancel={() => setActiveView('plan')}
            onComplete={handleFeedbackComplete}
          />
        );
      case 'buddies':
        return (
          <div className="bg-[#FEF9C3] p-10 rounded-[40px] shadow-sm space-y-8 border border-yellow-100/50 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-800 tracking-tighter">Buddies</h2>
            <div className="space-y-4">
               {[
                 { name: 'Susan', color: '#BEF264', msg: 'Cheering you on!' },
                 { name: 'Paul', color: '#FACC15', msg: 'Just finished session 3' },
                 { name: 'Linda', color: '#40B8C4', msg: 'Great work today' }
               ].map((buddy) => (
                 <div key={buddy.name} className="bg-white p-5 rounded-[25px] flex justify-between items-center shadow-sm border border-yellow-50 group hover:border-[#40B8C4] transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-xl" style={{ backgroundColor: buddy.color }}>
                         {buddy.name[0]}
                       </div>
                       <div>
                         <span className="font-black text-gray-800 block text-sm">{buddy.name}</span>
                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{buddy.msg}</span>
                       </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                 </div>
               ))}
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="bg-[#FEF9C3] p-10 rounded-[40px] shadow-sm space-y-8 border border-yellow-100/50 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-800 tracking-tighter">Your Journey</h2>
            <div className="space-y-12 py-4">
              {[
                { day: 'Mon Feb 8', val: 100, label: 'Perfect Day!' },
                { day: 'Thu Feb 5', val: 100, label: 'Steady Progress' },
                { day: 'Mon Feb 2', val: 80, label: 'Great Effort' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" fill="white" className="shadow-inner" />
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="#E2E8F0" strokeWidth="14" />
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke={item.val === 100 ? '#BEF264' : '#FACC15'} strokeWidth="14" strokeDasharray={440} strokeDashoffset={440 - (440 * item.val) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-gray-800">{item.val}%</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{item.day}</span>
                    <p className="text-sm font-black text-gray-700 mt-1">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard onViewChange={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
