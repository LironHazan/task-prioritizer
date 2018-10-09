export interface Task {
  id?: string;
  name: string;
  description: string;
  area: string;
}

export enum Areas {
  importantUrgent = 'important & urgent',
  urgentNotImportant = 'urgent & not important',
  importantNotUrgent = 'important & not urgent',
  notImportantNotUrgent = 'not important & not urgent',
}
