
import React from 'react';
import { DirectorateConfig, Perspective } from '../types';

interface ScorecardViewProps {
  config: DirectorateConfig;
}

const ScorecardView: React.FC<ScorecardViewProps> = ({ config }) => {
  const perspectives = Object.values(Perspective);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
            <th className="p-4 border border-slate-800">ID</th>
            <th className="p-4 border border-slate-800 min-w-[250px]">Strategic Objectives</th>
            <th className="p-4 border border-slate-800 min-w-[200px]">KPI Corporate</th>
            <th className="p-4 border border-slate-800 text-center">UOM</th>
            <th className="p-4 border border-slate-800 text-center">Target</th>
            <th className="p-4 border border-slate-800 text-center">Timebound</th>
            <th className="p-4 border border-slate-800 text-center bg-sky-900">KPI Weight</th>
            {config.subDirectorates.map((sub, i) => (
              <th key={sub} className="p-4 border border-slate-800 text-center min-w-[80px]" style={{ backgroundColor: `hsl(${200 + i * 40}, 70%, 40%)` }}>
                {sub}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {perspectives.map((pers) => {
            const kpis = config.kpis.filter(k => k.perspective === pers);
            const persWeight = config.perspectives[pers];
            
            return (
              <React.Fragment key={pers}>
                <tr className="bg-sky-100 font-bold text-sky-900 border-t-2 border-slate-300">
                  <td colSpan={100} className="p-3 text-xs uppercase">{pers} ({persWeight}%)</td>
                </tr>
                {kpis.length > 0 ? kpis.map((kpi) => (
                  <tr key={kpi.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border border-slate-200 font-bold text-slate-500">{kpi.id}</td>
                    <td className="p-3 border border-slate-200 font-medium text-slate-700">{kpi.objective}</td>
                    <td className="p-3 border border-slate-200 text-slate-600">{kpi.kpiCorporate}</td>
                    <td className="p-3 border border-slate-200 text-center">{kpi.uom}</td>
                    <td className="p-3 border border-slate-200 text-center font-semibold text-slate-800">{kpi.target}</td>
                    <td className="p-3 border border-slate-200 text-center text-xs">{kpi.timebound}</td>
                    <td className="p-3 border border-slate-200 text-center font-bold bg-sky-50">{kpi.weight.toFixed(2)}%</td>
                    {config.subDirectorates.map((sub) => (
                      <td key={sub} className="p-3 border border-slate-200 text-center font-medium">
                        {(kpi.subWeights[sub] || 0).toFixed(2)}%
                      </td>
                    ))}
                  </tr>
                )) : (
                  <tr className="text-slate-400 italic">
                    <td colSpan={100} className="p-4 text-center">No active KPIs defined for this perspective</td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
          <tr className="bg-slate-50 font-black border-t-2 border-slate-900">
            <td colSpan={6} className="p-4 text-right uppercase tracking-widest">Total Performance Weights</td>
            <td className="p-4 text-center bg-sky-100">100.00%</td>
            {config.subDirectorates.map(sub => {
              const total = config.kpis.reduce((acc, kpi) => acc + (kpi.subWeights[sub] || 0), 0);
              return (
                <td key={sub} className="p-4 text-center bg-slate-100">
                  {total.toFixed(2)}%
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScorecardView;
