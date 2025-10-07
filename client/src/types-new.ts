// * Database Types
export interface Account {
  id: string;
  name: string;
  type: 'savings' | 'regular' | 'debt';
  owner: string; // to be replaced with User type
  balance: number;
  color: string; // hex color code only
  order: number;
  include: boolean;
  // goal: string;
  // currency: string;
  // date: string;
  // description: string;
  // tag: string;
  // icon_id: string;
  // archived: boolean;
  // deleted: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategory: string;
  type: 'income' | 'expense';
  color: string; // hex color code only
  order: number | null;
  include: boolean;
}

export interface Transaction {
  id: string;
  name: string;
  type: 'income' | 'expense';
  from: string; // id of account or category
  to: string; // id of account or category
  amount: number;
  date: Date;
  recurring: boolean;
  recurringId: string | null;
}

export interface RecurringTransaction {
  id: string;
  name: string;
  type: 'income' | 'expense';
  from: string; // id of account or category
  to: string; // id of account or category
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly-by-date' | 'monthly-by-week-&-day' | 'yearly';
  startDate: Date;
  endDate: Date;
  parameters: string;
}

// * Rendering Types
export interface DisplayDate {
  displayMonth: Date;
  date: Date;
  isNotTrailingOrLeading: boolean;
  totalIncome: number | null;
  totalExpense: number | null;
  totalChange: number | null;
  totalRunning: number | null;
  transactions: Array<Transaction>;
}

export interface DisplayHead {
  totalRunning: number | null;
  totalChange: number | null;
  runningMax: number | null;
  runningMin: number | null;
}