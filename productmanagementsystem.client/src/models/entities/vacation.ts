export enum VacationStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
}

export interface IVacation {
  id: string;
  fromDate: string;
  toDate: string;
  status: VacationStatus;
  reason?: string;
}
