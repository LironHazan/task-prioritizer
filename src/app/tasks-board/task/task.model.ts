export interface Task {
  id?: string;
  name: string;
  description: string;
  area: string;
  openedBy: string;
}

export enum Areas {
  importantUrgent = 'Important & Urgent',
  urgentNotImportant = 'Urgent & Not Important',
  importantNotUrgent = 'Important & Not Urgent',
  notImportantNotUrgent = 'Not Important & Not Urgent',
}
