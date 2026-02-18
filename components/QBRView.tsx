
import React, { useState } from 'react';
import { DirectorateConfig, Perspective } from '../types';

interface QBRViewProps {
  config: DirectorateConfig;
}

const QBRView: React.FC<QBRViewProps> = ({ config }) => {
  const [activeQuarter, setActiveQuarter] = useState<number>(1);
  const quarters = [1, 2, 3, 4];

  const getQuarterData = (kpiActuals: number[], q: number) => {
    const start = (q - 1) * 3;
    const qValues = kpiActuals.slice(start, start + 3);
    return (qValues.reduce((a, b) => a + b, 0) / 3);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quarterly Business Review (QBR)</h2>
          <p className="text-slate-500">Executive Performance Summary & Action Planning</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {quarters.map(q => (
            <button
              key={q}
              onClick={() => setActiveQuarter(q)}
              className={`px-6 py-2 rounded-md font-bold transition-all ${
                activeQuarter === q 
                  ? 'bg-sky-600 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Q{q}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex justify-between">
              <span className="font-bold">Quarterly KPI Achievement Matrix</span>
              <span className="text-sky-400">Periode Q{activeQuarter} 2026</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-4 text-left">Strategic KPI</th>
                  <th className="p-4 text-center">Target</th>
                  <th className="p-4 text-center">Actual Q{activeQuarter}</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {config.kpis.map(kpi => {
                  const actual = getQuarterData(kpi.actuals, activeQuarter);
                  const isGap = actual < kpi.targetValue;
                  return (
                    <tr key={kpi.id}>
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{kpi.objective}</p>
                        <p className="text-xs text-slate-500">{kpi.kpiCorporate}</p>
                      </td>
                      <td className="p-4 text-center font-medium">{kpi.target}</td>
                      <td className="p-4 text-center font-bold text-sky-600">{actual.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                          !isGap ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {!isGap ? 'Target Met' : 'Gap Identified'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              Critical Gaps (Root Cause)
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                <p className="text-xs font-bold text-rose-800 mb-1">F1: Profitability Gap</p>
                <p className="text-[11px] text-slate-600">Unexpected increase in direct COGS due to vendor pricing adjustments in Feb.</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-xs font-bold text-amber-800 mb-1">C1: SDWAN Sales</p>
                <p className="text-[11px] text-slate-600">Delay in certification process for technical engineers slowed down the sales closure.</p>
              </div>
            </div>
          </div>

          <div className="bg-sky-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              Action Plan for Q{activeQuarter + 1}
            </h3>
            <ul className="space-y-3 text-[11px]">
              <li className="flex items-start">
                <span className="mr-2 text-sky-400">1.</span>
                <span>Initiate cost renegotiation with Tier-1 vendors for managed services hardware.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-400">2.</span>
                <span>Accelerate "Solar Enterprise" training program for sales enablement.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-400">3.</span>
                <span>Implement Monthly Internal Audit for high-value project expenses.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QBRView;
