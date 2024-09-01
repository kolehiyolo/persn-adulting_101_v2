Can fetch accounts.csv 
1. Alright so after some trial and error, the component now fetches accounts.csv data, assigns it to accounts[]
2. Installed npm papaparse so React can convert CSV to JSON
3. Apparently. you need to have the data within public/, which sux, but whatever moved it
  3.1. The eventual step anyways is to get the CSV data from Google Sheets, so we'll get there
  3.2. Not to mention, we also need it so that the data is fetched not from every PageAccounts() mount, but from every App() mount
4. For now, on PageAccounts() mount, a useEffect() hook runs, getting the data from the CSV, parsing it to JSON, and then assigning to accounts[]
5. Oh yeah also updated the Account type declaration