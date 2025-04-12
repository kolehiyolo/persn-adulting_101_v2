created working generateRecurringTransactions.py
1. as I was attempting to refactor App.tsx, I realized I needed a proper "types" file, cuz there were too many repeating type declarations across my system already
  1.1. as I do that, I realize I wanted to add a new property to the transactions type, category, but that's not available right now in the transactions.csv as a column with proper values
  1.2. I also realized that the amount and date values are strings, which is definitely not ideal
  1.3. so, I thought it essential that I go and create a generateRecurringTransactions.py script which I already plan on doing anyways
  1.4. after some painstaking drafting and prompting, it's now working (as far as I can tell), and my transactions.csv now has a category column, with the number and date values the proper types
2. I now have the proper transaction type, which is being used by App.tsx and CalendarMonth
  2.1. but I don't like that the properties are capitalized, so I definitely need to fix that