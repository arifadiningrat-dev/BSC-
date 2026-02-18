
import React, { useState } from 'react';
import { DirectorateConfig, KPI } from '../types';

interface MonthlyReviewProps {
  config: DirectorateConfig;
  onUpdateActual: (kpiId: string, monthIndex: number, value: number) => void;
}

const MonthlyReview: React.FC<MonthlyReviewProps> = ({ config, onUpdateActual }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [editingCell, setEditingCell] = useState<{kpiId: string, monthIndex: number} | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const getAchievement = (actual: number, target: number) => {
    if (target === 0) return 0;
    return (actual / target) * 100;
  };

  const getStatusColor = (actual: number, target: number) => {
    const perf = getAchievement(actual, target);
    if (perf >= 100) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (perf >= 90) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-rose-100 text-rose-800 border-rose-200';
  };

  const handleEdit = (kpiId: string, monthIndex: number, currentVal: number) => {
    setEditingCell({ kpiId, monthIndex });
    setTempValue(currentVal.toString());
  };

  const handleSave = () => {
    if (editingCell) {
      const val = parseFloat(tempValue);
      if (!isNaN(val)) {
        onUpdateActual(editingCell.kpiId, editingCell.monthIndex, val);
      }
      setEditingCell(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Monthly Performance Review</h2>
          <p className="text-slate-500 text-sm">Click on any value to update monthly actuals</p>
        </div>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center"><div className="w-3 h-3 bg-emerald-400 mr-1 rounded" /> ≥100% Achieved</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-amber-400 mr-1 rounded" /> 90-99% Achieved</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-rose-400 mr-1 rounded" /> &lt;90% Achieved</div>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <th className="p-4 border border-slate-800 sticky left-0 bg-slate-900 z-10 min-w-[200px]">KPI Description</th>
              <th className="p-4 border border-slate-800 text-center">Target</th>
              {months.map(m => <th key={m} className="p-4 border border-slate-800 text-center w-24">{m}</th>)}
              <th className="p-4 border border-slate-800 text-center bg-sky-900">Avg % Achieved</th>
            </tr>
          </thead>
          <tbody>
            {config.kpis.map(kpi => {
              const totalAchieved = kpi.actuals.reduce((acc, val) => acc + getAchievement(val, kpi.targetValue), 0);
              const avgAchieved = totalAchieved / 12;

              return (
                <tr key={kpi.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 border border-slate-200 font-medium sticky left-0 bg-white z-10">
                    <div className="text-[10px] text-sky-600 font-bold mb-1">{kpi.id}</div>
                    <div className="text-xs truncate max-w-[180px]" title={kpi.kpiCorporate}>{kpi.kpiCorporate}</div>
                  </td>
                  <td className="p-3 border border-slate-200 text-center font-bold text-slate-400 text-xs">
                    {kpi.target}
                  </td>
                  {kpi.actuals.map((val, idx) => {
                    const isEditing = editingCell?.kpiId === kpi.id && editingCell?.monthIndex === idx;
                    const ach = getAchievement(val, kpi.targetValue);
                    
                    return (
                      <td 
                        key={idx} 
                        className={`p-2 border border-slate-200 text-center relative group cursor-pointer ${getStatusColor(val, kpi.targetValue)}`}
                        onClick={() => !isEditing && handleEdit(kpi.id, idx, val)}
                      >
                        {isEditing ? (
                          <input
                            autoFocus
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            className="w-full p-1 text-center bg-white border border-sky-500 rounded font-bold outline-none"
                          />
                        ) : (
                          <>
                            <div className="font-bold text-[11px]">{val}</div>
                            <div className="text-[9px] opacity-70 mt-0.5">{ach.toFixed(0)}%</div>
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </div>
                          </>
                        )}
                      </td>
                    );
                  })}
                  <td className={`p-3 border border-slate-200 text-center font-black ${avgAchieved >= 100 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                    {avgAchieved.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-center space-x-4">
        <div className="bg-sky-500 p-2 rounded-lg text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sky-900 font-bold text-sm">Achievement Measurement</p>
          <p className="text-sky-700 text-xs">Pencapaian dihitung berdasarkan (Actual / Target Value) * 100. Warna cell berubah otomatis sesuai threshold (Red &lt; 90%, Amber 90-99%, Green ≥ 100%).</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReview;
