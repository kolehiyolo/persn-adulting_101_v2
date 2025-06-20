activeUser must be object, not string
1. did a lot and we're closer to the desired optimization
2. activeUser is now object, not string, allowing for less states, dependencies, calls, and better data management
3. states transactions and calendarDatesData no longer needed, replaced by activeUser.transactions and activeUser.cal_date respectively
4. functions fetchCalendarDatesData() and fetchTransactionsOld() no longer needed, replaced by fetchCalDates() and fetchTransactions() within the on-mount useEffect
5. fetchActiveDateCalendarDatesData moved to useEffect triggered by change in activeUser or activeDate
6. useEffect used to fetch transactions and calendarDatesData from CSV no longer needed due to points 3. and 4.
7. commented out render elements that are most likely affected by these sweeping changes, and will deal with them in the coming commits
  7.1. this is done for compartmentalization, easier debugging when looking for breaking bugs, and way easier committing