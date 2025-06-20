<!-- user can see "year" view -->
refactor selectedCalendarDatesData
calendarMonth should process data fetches on its own
refactor CalendarMonth rendering
refactor CalendarMonth processing

<!-- sanity refactoring -->
refactor CalHead
settle on a naming convention for componentName+className, ie DateCard or dateCard

<!-- better py scripts -->
separate income and expenses
combine py scripts into one
users can input all input that's needed, and the program will process it all on its own to show the best path forward while respecting parameters
refactor generateRecurringTransactions.py

<!-- ! OPTIMIZATION -->
<!-- fetch the default user data first -->
<!-- migrate to better stack -->

<!-- @ CRUD ON GUI -->
<!-- users can CRUD recurring expenses on CSV -->
<!-- users can CRUD one time expenses on CSV -->
<!-- users can CRUD savings goals on CSV -->
<!-- users can CRUD debts goals on CSV -->
<!-- users can CRUD snowball expense on CSV -->
<!-- users can CRUD income on CSV -->
<!-- users can CRUD accounts on CSV -->
<!-- users can have joint expenses -->
<!-- users can have joint income -->
<!-- users can have joint savings -->
<!-- users can have joint debt -->
<!-- users can have joint goals -->
<!-- user can archive accounts -->
<!-- user can toggle view of archived accounts -->
<!-- user can drag accounts in order -->

<!-- @ BONUS -->
<!-- apply better styling for better data viz -->
<!-- scrollbars should not touch content -->
<!-- my CC payments isn't perfectly planned -->
<!-- no 2025 back to school plan -->
<!-- no optical plan -->
<!-- toggle where you can just focus on current month, disable trailing and leading dates data -->


<!-- DATA SHOULD BE FETCHED EVERY TIME ACTIVEUSER IS CHANGED -->
1. let it be said that I know fetching each user's data fresh from the DB will always always always be advisable, because the expectation is that multiple users will share a "household", and user B may make changes to their own data without user A being notified, so it's a good idea for the app to fetch fresh from the overall household DB
2. but that's a problem for a later day, not to mention the infrastructure I set still holds, we just now need to fetch for the newly selected activeUser's DB, and I'm sure even that there ought a way to just "check" if the stored data is equal to the one in the DB, so that if there's no changes made, just a minor "check for changes" fetches has to be done and no longer an entire "give me all the data" fetch