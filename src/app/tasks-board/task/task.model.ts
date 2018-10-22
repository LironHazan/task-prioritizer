export interface Task {
  id?: string;
  name: string;
  description: string;
  area: string;
  areaType: number;
  openedBy: string;
}

export interface AreaModel {
  id: number;
  value: string;
}

export enum Areas {
  importantUrgent = 'important & urgent',
  urgentNotImportant = 'urgent & not important',
  importantNotUrgent = 'important & not urgent',
  notImportantNotUrgent = 'not important & not urgent',
}

export enum AreaType {
  importantNotUrgent = 0,
  importantUrgent = 1,
  urgentNotImportant = 2,
  notImportantNotUrgent = 3,
}
