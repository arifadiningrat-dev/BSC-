
import React, { useState, useMemo } from 'react';
import { DirectorateId, DirectorateConfig } from './types';
import { DIRECTORATES } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ScorecardView from './components/ScorecardView';
import MonthlyReview from './components/MonthlyReview';
import QBRView from './components/QBRView';

const App: React.FC = () => {
  const [activeId, setActiveId] = useState<DirectorateId>('CORPORATE');
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'SCORECARD' | 'MONTHLY' | 'QBR'>('DASHBOARD');
  
  // Manage all directorate data in state to allow updates
  const [allDirectorates, setAllDirectorates] = useState<Record<string, DirectorateConfig>>(DIRECTORATES);

  const config = useMemo(() => allDirectorates[activeId], [allDirectorates, activeId]);

  const handleUpdateActual = (dirId: DirectorateId, kpiId: string, monthIndex: number, newValue: number) => {
    setAllDirectorates(prev => {
      const updatedDir = { ...prev[dirId] };
      updatedDir.kpis = updatedDir.kpis.map(kpi => {
        if (kpi.id === kpiId) {
          const newActuals = [...kpi.actuals];
          newActuals[monthIndex] = newValue;
          return { ...kpi, actuals: newActuals };
        }
        return kpi;
      });
      return { ...prev, [dirId]: updatedDir };
    });
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar activeId={activeId} onSelect={setActiveId} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center space-x-8">
             <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
               <img src="https://picsum.photos/seed/mtm/120/60" alt="Logo" className="grayscale contrast-125" />
             </div>
             <div>
               <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
                 {config.name} ({config.code})
               </h1>
               <div className="flex items-center mt-2 space-x-4">
                 <div className="flex items-center text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                   <span className="font-bold mr-1">Approver:</span> {config.approver}
                 </div>
                 <div className="flex items-center text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                   <span className="font-bold mr-1">Period:</span> Jan - Dec 2026
                 </div>
               </div>
             </div>
          </div>
          
          <div className="flex bg-slate-200/50 p-1 rounded-xl">
             {[
               { id: 'DASHBOARD', label: 'Dashboard' },
               { id: 'SCORECARD', label: 'Scorecard' },
               { id: 'MONTHLY', label: 'Monthly' },
               { id: 'QBR', label: 'QBR' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                   activeTab === tab.id
                     ? 'bg-white text-sky-600 shadow-sm'
                     : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 {tab.label}
               </button>
             ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-[1600px] mx-auto">
          {activeTab === 'DASHBOARD' && <Dashboard config={config} />}
          {activeTab === 'SCORECARD' && <ScorecardView config={config} />}
          {activeTab === 'MONTHLY' && (
            <MonthlyReview 
              config={config} 
              onUpdateActual={(kpiId, monthIndex, val) => handleUpdateActual(activeId, kpiId, monthIndex, val)} 
            />
          )}
          {activeTab === 'QBR' && <QBRView config={config} />}
        </div>
        
        {/* Footer info */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400">
          <div>Approved by the President Director • {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div className="font-bold tracking-widest text-slate-300 uppercase">Proprietary Performance Management System</div>
        </div>
      </main>
    </div>
  );
};

export default App;
