redid based on new design
1. so I went ahead and redesigned the whole thing from the ground up, focusing on desktop first, rather than mobile first
  1.1. key differences from the last one is I'm going ULTRA MVP with this, in that I am foregoing so much features that I want to eventually have in favor of having something that already kinda resembles my working Adulting 101 Google Sheets file
  1.2. in that sheets file, I just have a calendar view, with transactions per date, without any mind of accounts and categories and debts and goals
  1.3. what's important is this new version is focusing on showing the transactions per date and getting a running total per date
  1.4. the next key big feature is the ability to set recurring transactions
  1.5. the order of everything else will just come naturally as I go
2. now I have a working version that does the ff:
  2.1. I have a working DateMover component
    2.1.1. DateMover takes the date today as default, and has back+forward buttons to move the selectedDate one month back or ahead
  2.2. I have the CalendarMonth component
    2.2.1. this takes the selectedDate and generates a calendar grid UI for the Calendar month of the date
  2.3. I have the DateCard component
    2.3.1. the CalendarMonth component automatically dictates the "dates" that are to be displayed, and each date is then generated as a DateCard instance
  2.4. I have a TransactionCard component
    2.4.1. from the transactions.csv, we take the rows with Date values that correspond with aa DateCard's date, then a TransactionCard instance is generated for each transaction in each DateCard
3. my next steps are
  3.1. I now wanna go and actually begin styling for the entire thing