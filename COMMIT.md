App.tsx should fetch calendar-dates-data.csv
1. we're about to hit it big with performance with this
2. App.tsx now can fetch the data from calendar-dates-data.csv, and I'm gonna make it so that CalendarMonth just fetches this instead of calculating for the dates and the transactions
3. we can even optimize further by having it so that the transactions passed to CalendarMonth is also stripped to just the dates within the selected calendar-month data
4. oh also I noticed that the getCalendarDates.py scripts append to the CSV instead of replacing it entirely, so I went and fixed that