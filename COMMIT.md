Move CSV fetch to App.tsx
1. Yeah so moved the accounts.csv fetch to App.tsx, so the fetch only happens when the app itself is mounted, instead of everytime PageAccounts() is
2. Updated the fetch function name to fetchAccountsCSVData(), since fetchCSVData() is too vague and we'll be doing other fetch requests for the other CSVs to
3. The export default declaration for App.tsx was at the end so just updated it to maintain consistency with the other components
4. Consequently, I also had to refactor PageAccounts to receive the accounts props from App.tsx