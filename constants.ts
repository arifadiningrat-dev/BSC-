
import { Perspective, DirectorateConfig } from './types';

const generateMockActuals = (target: number, trend: 'up' | 'down' | 'stable' = 'stable') => {
  return Array.from({ length: 12 }, (_, i) => {
    const variation = (Math.random() - 0.5) * (target * 0.2);
    const monthTrend = trend === 'up' ? i * (target * 0.02) : trend === 'down' ? -i * (target * 0.02) : 0;
    return Number((target + variation + monthTrend).toFixed(2));
  });
};

export const DIRECTORATES: Record<string, DirectorateConfig> = {
  CORPORATE: {
    id: 'CORPORATE',
    name: 'Corporate Scorecard',
    code: 'CSC',
    approver: 'Nurul Kowim',
    perspectives: {
      [Perspective.FINANCIAL]: 50,
      [Perspective.CUSTOMER]: 30,
      [Perspective.INTERNAL]: 10,
      [Perspective.LEARNING]: 10,
    },
    subDirectorates: ['SLS', 'OT', 'FA', 'CSS', 'FND'],
    kpis: [
      {
        id: 'F1',
        perspective: Perspective.FINANCIAL,
        objective: 'Profitability',
        kpiCorporate: 'Net Margin Rp. 35 M',
        uom: '%',
        target: '7%',
        targetValue: 7,
        timebound: 'Quarterly',
        weight: 25,
        subWeights: { SLS: 7.5, OT: 6.25, FA: 7.5, CSS: 2.5, FND: 1.25 },
        actuals: generateMockActuals(7, 'up'),
      },
      {
        id: 'F2',
        perspective: Perspective.FINANCIAL,
        objective: 'Revenue',
        kpiCorporate: 'Secure Revenue',
        uom: 'IDR',
        target: '500 Billion',
        targetValue: 500,
        timebound: 'Quarterly',
        weight: 10,
        subWeights: { SLS: 3, OT: 2.5, FA: 3, CSS: 1, FND: 0.5 },
        actuals: generateMockActuals(500, 'stable'),
      },
      {
        id: 'C1',
        perspective: Perspective.CUSTOMER,
        objective: 'Penjualan Product in House MTM',
        kpiCorporate: 'SDWAN, SOC, CyberXatria',
        uom: 'IDR',
        target: '10 Billion',
        targetValue: 10,
        timebound: 'Quarterly',
        weight: 10,
        subWeights: { SLS: 2.5, OT: 2, FA: 2.5, CSS: 2.5, FND: 0.5 },
        actuals: generateMockActuals(10, 'up'),
      },
      {
        id: 'I1',
        perspective: Perspective.INTERNAL,
        objective: 'Meningkatkan representasi operasional',
        kpiCorporate: 'Penambahan Serpo Baru',
        uom: '#',
        target: '15',
        targetValue: 15,
        timebound: 'Quarterly',
        weight: 6,
        subWeights: { SLS: 0.6, OT: 3, FA: 0.6, CSS: 1.8, FND: 0 },
        actuals: generateMockActuals(15, 'stable'),
      }
    ]
  },
  SALES: {
    id: 'SALES',
    name: 'Sales Directorate',
    code: 'SDSC',
    approver: 'Harnaka Harto',
    perspectives: {
      [Perspective.FINANCIAL]: 55,
      [Perspective.CUSTOMER]: 25,
      [Perspective.INTERNAL]: 10,
      [Perspective.LEARNING]: 10,
    },
    subDirectorates: ['Telkom/Tsel/B2B', 'Govt/Enterprise', 'FS/Healthcare/ISP', 'Presales'],
    kpis: [
      {
        id: 'F1',
        perspective: Perspective.FINANCIAL,
        objective: 'Improve revenue quality',
        kpiCorporate: 'Booking Revenue',
        uom: 'IDR',
        target: '650 Billion',
        targetValue: 650,
        timebound: 'Quarterly',
        weight: 20,
        subWeights: { 'Telkom/Tsel/B2B': 8, 'Govt/Enterprise': 4, 'FS/Healthcare/ISP': 4, 'Presales': 4 },
        actuals: generateMockActuals(650, 'up'),
      }
    ]
  },
  FINANCE: {
    id: 'FINANCE',
    name: 'Finance Directorate',
    code: 'FDSC',
    approver: 'Dodi Taufiq Wijaya',
    perspectives: {
      [Perspective.FINANCIAL]: 60,
      [Perspective.CUSTOMER]: 20,
      [Perspective.INTERNAL]: 10,
      [Perspective.LEARNING]: 10,
    },
    subDirectorates: ['Treasury', 'FA'],
    kpis: [
      {
        id: 'F1',
        perspective: Perspective.FINANCIAL,
        objective: 'Safeguard corporate profitability',
        kpiCorporate: 'Net Margin',
        uom: '%',
        target: '>=7%',
        targetValue: 7,
        timebound: 'Quarterly',
        weight: 20,
        subWeights: { Treasury: 6, FA: 14 },
        actuals: generateMockActuals(7.5, 'stable'),
      }
    ]
  },
  OPERATIONS: {
    id: 'OPERATIONS',
    name: 'Operation & Tech Dir',
    code: 'OTSC',
    approver: 'Wisnu Prasetya',
    perspectives: {
      [Perspective.FINANCIAL]: 50,
      [Perspective.CUSTOMER]: 30,
      [Perspective.INTERNAL]: 10,
      [Perspective.LEARNING]: 10,
    },
    subDirectorates: ['SSDO', 'PS&D', 'MS OD', 'BS', 'P&L'],
    kpis: [
      {
        id: 'F2',
        perspective: Perspective.FINANCIAL,
        objective: 'Increase resource productivity',
        kpiCorporate: 'Utilization Rate',
        uom: '%',
        target: '>=85%',
        targetValue: 85,
        timebound: 'Monthly',
        weight: 20,
        subWeights: { SSDO: 6, 'PS&D': 5, 'MS OD': 6, BS: 2, 'P&L': 1 },
        actuals: generateMockActuals(88, 'stable'),
      }
    ]
  },
  CSS: {
    id: 'CSS',
    name: 'Corporate Strategy & Services',
    code: 'CSSSC',
    approver: 'Sugend Jadmoko',
    perspectives: {
      [Perspective.FINANCIAL]: 40,
      [Perspective.CUSTOMER]: 30,
      [Perspective.INTERNAL]: 20,
      [Perspective.LEARNING]: 10,
    },
    subDirectorates: ['HC', 'CS/Lgl', 'GA', 'R&D', 'CSP'],
    kpis: [
      {
        id: 'F2',
        perspective: Perspective.FINANCIAL,
        objective: 'Enhance organizational productivity',
        kpiCorporate: 'Productivity Index',
        uom: 'Score',
        target: '>=90',
        targetValue: 90,
        timebound: 'Annual',
        weight: 15,
        subWeights: { HC: 4.5, 'CS/Lgl': 1.5, GA: 4.5, 'R&D': 3, CSP: 1.5 },
        actuals: generateMockActuals(92, 'stable'),
      }
    ]
  },
  FND: {
    id: 'FND',
    name: 'FnD Directorate',
    code: 'FNDSC',
    approver: 'Nurul Kowim',
    perspectives: {
      [Perspective.FINANCIAL]: 40,
      [Perspective.CUSTOMER]: 30,
      [Perspective.INTERNAL]: 20,
      [Perspective.LEARNING]: 10,
    },
    subDirectorates: ['Audit', 'Cust Relation'],
    kpis: [
      {
        id: 'F1',
        perspective: Perspective.FINANCIAL,
        objective: 'Ensure governance efficiency',
        kpiCorporate: 'Budget Efficiency',
        uom: '%',
        target: '<=100%',
        targetValue: 100,
        timebound: 'Annual',
        weight: 20,
        subWeights: { Audit: 10, 'Cust Relation': 10 },
        actuals: generateMockActuals(95, 'stable'),
      }
    ]
  }
};
