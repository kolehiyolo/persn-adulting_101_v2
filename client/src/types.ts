// ! NOT IN USE
export interface Account {
  id: string;
  date: string;
  time: string;
  name: string;
  balance: number;
  goal: string;
  currency: string;
  order: number;
  type: string;
  description: string;
  tag: string;
  icon_id: string;
  color: string;
  archived: boolean;
  deleted: boolean;
}

export interface Icon {
  id: string;
  date: string;
  time: string;
  name: string;
  src: string;
  type: string;
  group: string;
}
// ! NOT IN USE

// # ACTIVE
export interface Transaction {
  title: string;
  type: string;
  tags: string;
  category: string;
  amount: number;
  date: Date;
}

export interface CalHead {
  totalRunning: number;
  change: number;
  max: number;
  min: number;
}

export interface CalDate {
  calendar_month: Date;
  date: Date;
  date_is_not_trailing_or_leading: boolean;
  date_positive: number;
  date_negative: number;
  date_change: number;
  date_total_running: number;
  transactions: Array<Transaction>;
}

export interface User {
  id: string;
  name: string;
  folder_name: string;
  household_id: string;
  household_name: string;
  cal_date: Array<CalDate>;
  transactions: Array<Transaction>;
}

// # ACTIVE