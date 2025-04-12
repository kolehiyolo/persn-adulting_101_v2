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

export interface Transaction {
  title: string;
  type: string;
  amount: number;
  date: string;
}