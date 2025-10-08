// ==============================
// 📘 types.ts
// Centralized type definitions
// ==============================

// ✅ Reusable primitives
export type UUID = string; // e.g. "a12f4c90-3e6f-4db5-8a6b-2ad3f56c9870"
export type ISODate = string; // e.g. "2025-10-08"

// Account
export interface Account {
  id: UUID;
  name: string;
  type: 'savings' | 'regular' | 'debt';
  owner: string; // TODO: Replace with User type later
  balance: number;
  color: string; // hex color code only
  order: number;
  include: boolean;
}

// Category
export interface Category {
  id: UUID;
  name: string;
  subcategory: string;
  type: 'income' | 'expense';
  color: string; // hex color code only
  order: number | null;
  include: boolean;
}

// Transaction Types
export interface BaseTransaction {
  id: UUID;
  name: string;
  type: 'income' | 'expense';
  from: UUID;
  to: UUID;
  amount: number;
}

export interface RecurringTransaction extends BaseTransaction {
  frequency:
    | 'daily'
    | 'weekly'
    | 'biweekly'
    | 'monthly-by-date'
    | 'monthly-by-week-&-day'
    | 'yearly';
  startDate: ISODate;
  endDate: ISODate;
  parameters: string;
  recurring: true;
  recurringId: null; // for schema compatibility
}

export interface OneTimeTransaction extends BaseTransaction {
  date: ISODate;
  recurring: false;
  recurringId: null;
}

export type Transaction = RecurringTransaction | OneTimeTransaction;

// "Without ID" Input Variants
export type AccountWithoutID = Omit<Account, 'id'>;
export type CategoryWithoutID = Omit<Category, 'id'>;
export type RecurringTransactionWithoutID = Omit<RecurringTransaction, 'id'>;
export type OneTimeTransactionWithoutID = Omit<OneTimeTransaction, 'id'>;

// Utility Collection Types (optional)
export interface Dataset {
  accounts: Account[];
  categories: Category[];
  transactionsRecurring: RecurringTransaction[];
  transactionsOneTime: OneTimeTransaction[];
  transactions: Transaction[];
}
