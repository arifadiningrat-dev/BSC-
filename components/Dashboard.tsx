
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { DirectorateConfig, Perspective } from '../types';

interface DashboardProps {
  config: DirectorateConfig;
}

const COLORS = ['#0ea5e9', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6'];

const Dashboard: React.FC<DashboardProps> = ({ config }) => {
  // Calculate real achievement scores per perspective
  const perspectiveAchievementData = (Object.entries(config.perspectives) as [string, number][]).map(([name, weight]) => {
    const kpisInPers = config.kpis.filter(k => k.perspective === name);
    
    // Average achievement % of all KPIs in this perspective
    let avgAchievement = 0;
    if (kpisInPers.length > 0) {
      const totalAch = kpisInPers.reduce((acc, kpi) => {
        const kpiAvg = kpi.actuals.reduce((a, b) => a + b, 0) / 12;
        const kpiAch = (kpiAvg / kpi.targetValue) * 100;
        return acc + kpiAch;
      }, 0);
      avgAchievement = totalAch / kpisInPers.length;
    }

    return {
      name: name.split(' ')[0],
      weight: weight,
      actual: avgAchievement // Percentage achievement
    };
  });

  // Calculate Overall Score (Weighted Achievement)
  const overallScore = perspectiveAchievementData.reduce((acc, item) => {
    return acc + (item.actual * (item.weight / 100));
  }, 0);

  const subWeightsData = config.subDirectorates.map((sub, idx) => {
    const totalWeight = config.kpis.reduce((acc, kpi) => acc + (kpi.subWeights[sub] || 0), 0);
    return { name: sub, weight: totalWeight };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Perspective Weights</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perspectiveAchievementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={12} stroke="#64748b" />
                <YAxis domain={[0, 100]} hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="weight" fill="#0ea5e9" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Directorate Sub-Weights</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subWeightsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="weight"
                >
                  {subWeightsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Overall Performance Index</h3>
          <div className="flex flex-col items-center justify-center h-[200px]">
            <div className={`relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-slate-100`}>
              <div 
                className={`absolute inset-0 rounded-full border-8 ${overallScore >= 95 ? 'border-emerald-500' : 'border-amber-500'}`} 
                style={{ clipPath: `conic-gradient(black ${overallScore}%, transparent 0)` }}
              />
              <div className="text-center">
                <span className="text-4xl font-bold text-slate-800">{overallScore.toFixed(1)}%</span>
                <p className="text-sm text-slate-500">Actual Achievement</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm px-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 ${overallScore >= 90 ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full mr-2`} /> 
              {overallScore >= 90 ? 'On Track' : 'Needs Review'}
            </div>
            <div className="flex items-center font-bold text-slate-600">Weighted Average</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Achievement % per Perspective
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={perspectiveAchievementData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="name" fontSize={14} />
              <PolarRadiusAxis angle={30} domain={[0, 120]} />
              <Radar 
                name="% Achievement" 
                dataKey="actual" 
                stroke="#0ea5e9" 
                fill="#0ea5e9" 
                fillOpacity={0.6} 
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
