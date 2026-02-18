
export enum Perspective {
  FINANCIAL = 'Financial Perspective',
  CUSTOMER = 'Customer Perspective',
  INTERNAL = 'Internal Business Process Perspective',
  LEARNING = 'Learning & Growth Perspective'
}

export type DirectorateId = 'CORPORATE' | 'SALES' | 'FINANCE' | 'OPERATIONS' | 'CSS' | 'FND';

export interface KPI {
  id: string;
  perspective: Perspective;
  objective: string;
  kpiCorporate: string;
  uom: string;
  target: string;
  targetValue: number;
  timebound: string;
  weight: number;
  subWeights: Record<string, number>;
  actuals: number[]; // 12 months
}

export interface DirectorateConfig {
  id: DirectorateId;
  name: string;
  code: string;
  approver: string;
  perspectives: Record<Perspective, number>;
  kpis: KPI[];
  subDirectorates: string[];
}

export interface ReviewAction {
  kpiId: string;
  month: number;
  status: 'Critical' | 'Warning' | 'On Track';
  finding: string;
  actionPlan: string;
}
