components must be divided into
- containers
- controls
- layouts

- always use states instead of variables
- underscore_case must be camelCase
- types must always be explicit
- no duplicate components

ideal data structure
- Scenario
- Group
- User
- Account
- Goal
- Category
- Transaction
- Tag
- Icon
- Goal


- Scenario
  - Transaction[]
  - 
- Group
- User
- Account
- Category
- Transaction
  - Title: string
  - Type: string
  - Tags: Tags
  - From: Category |Account
  - To: Category | Account
  - Amount: number
  - Date: Date
- CalDate
- Tags

mvp data structures
- Account
- Income Category
- Expense Category
- Transaction

- What is the step-by-step of the app?
- User should be able to 
- Transactions generation
  - 