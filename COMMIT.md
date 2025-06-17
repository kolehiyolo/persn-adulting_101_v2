calendarView select, view switch working
1. alright so the bare-minimum of being able to switch between calendarViews is working
2. now we need to actually make it work, and part of that is making sure CalendarMonth processes its data on its own, which is a problem with the current infrastructure of the app
  2.1. it's just really a matter of moving the data processing in CalendarMonth, BUT, the data fetches still happen in the App level, since it only has to be done the one time
  2.2. in fact, maybe we don't even need to fetch the dataSets EVERY single time dataSet switch happens, as that incurs so many data fetches
  2.3. yeah let's actually do this now
