Transaction.amount now number type
1. alright so I made it so this property is now properly a number
2. I had to of course change CalendarMonth and DateCard so they no longer need to parseFloat the string into a float
3. what I realized, tho, is that App.tsx doesn't parse the generatedTransactions.csv rows properly, fetching all values as strings regardless
4. this has now been fixed, but I certainly still need to fully refactor App.tsx eventually
5. now I need Transaction.date to actually be date type