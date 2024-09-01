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
  description?: string;
  tag?: string;
  archived: boolean;
  icon_id: string;
  color: string;
}