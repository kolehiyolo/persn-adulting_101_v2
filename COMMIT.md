separate prcsdCalHead processing
1. I noticed that fetchActiveDateCalendarDatesData is also processing prcsdCalHead, so I just split processing prcsdCalHead into its own function
2. committing now before I attempt contUsers fetching refactor