the overview of the app process is this

- generate data
  - backend generates transactions.csv
    - INPUTS
      - accounts.csv
      - transactionsRecurring.csv
      - transactionsOneTime.csv
      - categories.csv
    - OUTPUT
      - transactions.csv
  - backend generates displayDatesEmpty.csv
    - INPUTS
      - min_date
      - max_date
    - OUTPUT
      - displayDatesEmpty.csv
  - backend combines transactions.csv and displayDatesEmpty.csv
    - INPUTS
      - transactions.csv
      - displayDatesEmpty.csv
    - OUTPUT
      - displayDates.csv

- fetching data      
  - frontend fetches all necessary data at once
    - accounts.csv
    - categories.csv
    - transactions.csv
    - displayDates.csv

- process data for rendering
  - frontend displays this by default
    - display view is monthly
    - selected date is current date
    - account filtered is all accounts
    - ignore transfers is disabled