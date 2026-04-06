we have this type

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

i need a script that does this:
- we have this array prcsdCalDates that has type CalDate[]
- look for the first item in prcsdCalDates that has date_is_not_trailing_or_leading===true
- assign it to const prcsdMonth


C:\Priority Software\Developer\Node.js