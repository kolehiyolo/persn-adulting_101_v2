Alright. So. I have 4 types of recurring transactions
Annual - Transactions that happen definitely every year on a specific date. Assume that the feb 29 exception doesn't happen at all
Monthly (Date) - Transactions that happen definitely every month on a specific date. Assume that only the first 28 days will be where the transactions happen, so we don't have to take into account what happens if I want the transactions to be for every 31st, and then adjust each actual transaction if the month has a 31st or not
Monthly (Week+Day) - Transactions that happen every month, but on a specific week and day of the month. For example, my cat Miho will always have a grooming scheduled every first saturday of the month
Weekly - Transactions that happen definitely every week on a specific day. For example, I will always have my laundry done on a Sunday, and pay PHP 175 for the service

Here's what my 'Recurring Transactions' look like at the moment:
RECURSION ID,PARAMETERS,REGULARITY,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
202407080001,"May, 7",Annual,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
202407080002,7,Monthly (Date),minimalist phone,Expense,EastWest CC Expenses,Software,Subscriptions,180,
202407080003,14,Monthly (Date),YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
202407080004,3,Monthly (Date),GitHub Copilot,Expense,EastWest CC Expenses,Software,Subscriptions,600,
202407080005,"1, Saturday",Monthly (Week+Day),Miho Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
202407080006,"1, Saturday",Monthly (Week+Day),Diego Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
202407080007,"1, Saturday",Monthly (Week+Day),Leechou Groom,Expense,Expected Expense,Pets,Grooming,900,Monthly Grooming
202407080008,"2, Sunday",Monthly (Week+Day),Electricity,Expense,EastWest HPL Game Design Corporation,Household,Electricity,4000,
202407080009,Sunday,Weekly,Groceries,Expense,EastWest CC Expenses,Food,,1200,Weekly Resets
202407080010,Sunday,Weekly,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
202407080011,Sunday,Weekly,Globe Reload,Expense,GCash,Household,Mobile Plan,110,Weekly Resets
202407080012,Sunday,Weekly,Pet Groceries,Expense,Expected Expense,Pets,,400,Weekly Resets
202407080013,"-1, Saturday",Monthly (Week+Day),Spa Day,Expense,Expected Expense,Health,Services,1500,

Tell me if you understand this, and then I'll give you more info


So, the 2 columns you definitely have to take a look at to generate the actual individual transactions are the first 2, PARAMETERS and REGULARITY. REGULARITY is where the Recurrence type is shown, either of the 4 options I described earlier (Annual, Monthly (Date), Monthly (Week+Date), Weekly). PARAMETERS is where I specify the rules for how the recurrence should go depending on the REGULARITY. I will now detail what the expected PARAMETERS are per REGULARITY:
Annual:
  INPUT: "{Month}, {Date}"
    {Month} - The month of the year, string
    {Date} - The date of the month, integer
  SAMPLE: "May, 7"
  SAMPLE MEANING: Every 7th of May every year, the transaction happens
Monthly (Date):
  INPUT: {Date}
    {Date} - The date of the month, integer
  SAMPLE: 7
  SAMPLE MEANING: Every 7th of the month every month, the transaction happens
Monthly (Week+Date):
  INPUT: "{Week}, {Day}"
    {Week} - The nth week of the month, integer
    {Day} - The day of the week, string such as "Monday", "Tuesday", etc
  SAMPLE: "1, Saturday"
  SAMPLE MEANING: Every Saturday of the 1st week of the month, the transaction happens
  MORE INFO: If the {Week} is -1, that means the last week of the month, so for example, "-1, Saturday" means the Saturday of every last week of the month
Weekly:
  INPUT: {Day}
    {Day} - The day of the week, string such as "Monday", "Tuesday", etc
  SAMPLE: Sunday
  SAMPLE MEANING: Every Sunday of the week, the transaction happens

Tell me if you understand this, and then I'll give you more info

ALRIGHTY THEN. Here's the final little info. The input of the program will be the ff:
1. 'Recurring Transactions' sheet
2. (MM/DD/YYYY) The date start of the transaction data generated, for example, if I set the start to Jan 1, 2024, the program will generate all transactions starting from that date
2. (MM/DD/YYYY) The date limit of the transaction data generated, for example, if I set the limit to Dec 31, 2050, the program will generate all transactions up until that date

The expected output is this:
1. The 'All Transactions' sheet

Tell me if you understand this, and then I'll give you more info

I'll give you 2 sample input and output scenarios:
SCENARIO 1:
INPUT:
1. 'Recurring Transactions':
RECURSION ID,PARAMETERS,REGULARITY,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
202407080001,"May, 7",Annual,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
202407080003,14,Monthly (Date),YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
2. Start Date: 03/01/2024
3. End Date: 12/31/2025

OUTPUT:
DATE,RECURSION ID,EXCEPTION,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
5/7/2024,202407080001,FALSE,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
5/7/2025,202407080001,FALSE,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
3/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
4/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
5/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
6/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
7/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
8/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
9/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
10/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
11/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
12/14/2024,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
1/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
2/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
3/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
4/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
5/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
6/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
7/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
8/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
9/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
10/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
11/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
12/14/2025,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,


Tell me if you understand this, and then I'll give you more info

SCENARIO 2:
INPUT:
1. 'Recurring Transactions':
RECURSION ID,PARAMETERS,REGULARITY,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
202407080005,"1, Saturday",Monthly (Week+Day),Miho Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
202407080008,"2, Sunday",Monthly (Week+Day),Electricity,Expense,EastWest HPL Game Design Corporation,Household,Electricity,4000,
202407080010,Sunday,Weekly,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
202407080013,"-1, Saturday",Monthly (Week+Day),Spa Day,Expense,Expected Expense,Health,Services,1500,
2. Start Date: 05/01/2024
3. End Date: 07/31/2024

OUTPUT:
DATE,RECURSION ID,EXCEPTION,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
5/4/2024,202407080005,FALSE,Miho Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
6/1/2024,202407080005,FALSE,Miho Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
7/6/2024,202407080005,FALSE,Miho Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
5/12/2024,202407080008,FALSE,Electricity,Expense,EastWest HPL Game Design Corporation,Household,Electricity,4000,
6/9/2024,202407080008,FALSE,Electricity,Expense,EastWest HPL Game Design Corporation,Household,Electricity,4000,
7/14/2024,202407080008,FALSE,Electricity,Expense,EastWest HPL Game Design Corporation,Household,Electricity,4000,
5/5/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
5/12/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
5/19/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
5/26/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
6/2/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
6/9/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
6/16/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
6/23/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
6/30/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
7/7/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
7/14/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
7/21/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
7/28/2024,202407080010,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
5/25/2024,202407080013,FALSE,Spa Day,Expense,Expected Expense,Health,Services,1500,
6/29/2024,202407080013,FALSE,Spa Day,Expense,Expected Expense,Health,Services,1500,
7/27/2024,202407080013,FALSE,Spa Day,Expense,Expected Expense,Health,Services,1500,

Tell me if you understand this, and then I'll give you more info


As you can see, here are the important columns to keep in mind for the input and output sheets:
INPUT:
PARAMETERS
REGULARITY

OUTPUT:
DATE
EXCEPTION

These are the columns that are unique to each sheet. Meanwhile, all other columns are just to be copied from the input to the output. Keep this in mind, because chances are I will be updating the other columns besides those unique ones

Tell me if you understand this, and then I'll give you more info


ACTUALLY, let's revise the input a bit. Instead of needing 3 separate inputs, namely the 'Recurring Transactions' sheet, the start date, and the end date, let's make it so that it's just one input this time, the 'Recurring Transactions' sheet, and then each transaction row will have a start and end date. Here's a sample CSV of the new input:
RECURSION ID,PARAMETERS,REGULARITY,START,END,ARCHIVED,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
202407080001,"May, 7",Annual,7/1/2024,12/31/2024,FALSE,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
202407080002,7,Monthly (Date),7/1/2024,12/31/2024,FALSE,minimalist phone,Expense,EastWest CC Expenses,Software,Subscriptions,180,
202407080003,14,Monthly (Date),7/1/2024,12/31/2024,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
202407080004,3,Monthly (Date),7/1/2024,12/31/2024,FALSE,GitHub Copilot,Expense,EastWest CC Expenses,Software,Subscriptions,600,
202407080005,"1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Miho Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
202407080006,"1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Diego Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
202407080007,"1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Leechou Groom,Expense,Expected Expense,Pets,Grooming,900,Monthly Grooming
202407080008,"2, Sunday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Electricity,Expense,EastWest HPL Game Design Corporation,Household,Electricity,4000,
202407080009,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Groceries,Expense,EastWest CC Expenses,Food,,1200,Weekly Resets
202407080010,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
202407080011,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Globe Reload,Expense,GCash,Household,Mobile Plan,110,Weekly Resets
202407080012,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Pet Groceries,Expense,Expected Expense,Pets,,400,Weekly Resets
202407080013,"-1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Spa Day,Expense,Expected Expense,Health,Services,1500,

Basically, we will do the generating of the transactions based on the specified start and end dates. Also, there's a new column, ARCHIVED, which basically means that if a transaction has a TRUE value for that, it will not be included in the generation

Tell me if you understand this, and then I'll give you more info

As you can see, here are the important columns to keep in mind for the input and output sheets:
INPUT:
PARAMETERS
REGULARITY
START
END
ARCHIVED

OUTPUT:
DATE
EXCEPTION

These are the columns that are unique to each sheet. Meanwhile, all other columns are just to be copied from the input to the output. Keep this in mind, because chances are I will be updating the other columns besides those unique ones

Tell me if you understand this, and then I'll give you more info

Alright. So now you know the expected input and output, and then what is essentially the processing that needs to be done to achieve the desired output based on the input. The specifics of the actual project are ff:
1. In my Google Drive, I have a folder called "Adulting 101 V2" with the ff contents:
  Adulting 101 V2.gsheet
  1Money Data/
    1Money.csv
2. Nevermind the 1Money Data folder for now
3. The 'Adulting 101 V2.gsheet' file hosts the ff sheets:
  'Recurring Transactions'
  'All Transactions'
4. Based on my earlier explanations, these are the 2 sheets to watch out for as input and output
5. I need to use Apps Scripts to generate a button within my spreadsheet's menu UI, called something like "Generate from Recurring Transactions", and when I click it, I want the program created to get the current information within 'Recurring Transactions' sheet, and process accordingly to update the 'All Transactions' sheet
6. Now here's a little caveat. Remember that the 'All Transactions' sheet has an EXCEPTION column? Basically, when "Generate from Recurring Transactions" is clicked, I want the program to delete ALL the data within 'All Transactions' and add the new data, BUT, only those with EXCEPTION=FALSE values. If a row/transaction is set to EXCEPTION=TRUE, do not delete it or alter it at all

Tell me if you understand this, and then I'll give you more info


Yo. I need a little change:
1. So for the output, I need an additional column called "RECURRING", and basically just have the value in the cell be TRUE for all rows generated by generateTransactions()
2. The order of the output columns are DATE, RECURRING, RECURSION ID, EXCEPTION, NOTES, TYPE, FROM ACCOUNT, TO ACCOUNT/TO CATEGORY, SUBCATEGORY, AMOUNT, TAGS
3. Here's the latest version of my script:
/**
 * Creates a custom menu in the Google Sheets UI.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Generate from Recurring Transactions', 'generateTransactions')
    .addToUi();
}

/**
 * Generates transactions based on recurring rules and appends them to the 'All Transactions' sheet.
 */
function generateTransactions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const recurringSheet = ss.getSheetByName('Recurring Transactions');
  const allTransactionsSheet = ss.getSheetByName('All Transactions');
  
  // Read data from 'Recurring Transactions'
  const recurringData = recurringSheet.getDataRange().getValues();
  const headers = recurringData.shift();
  
  // Index mapping for columns
  const PARAMS_INDEX = headers.indexOf('PARAMETERS');
  const REGULARITY_INDEX = headers.indexOf('REGULARITY');
  const START_INDEX = headers.indexOf('START');
  const END_INDEX = headers.indexOf('END');
  const ARCHIVED_INDEX = headers.indexOf('ARCHIVED');
  const EXCEPTION_INDEX = headers.indexOf('EXCEPTION');
  
  // Clear 'All Transactions' except rows with EXCEPTION=TRUE
  const allTransactionsData = allTransactionsSheet.getDataRange().getValues();
  const newAllTransactionsData = allTransactionsData.filter(row => row[EXCEPTION_INDEX] === true);
  allTransactionsSheet.clear();
  allTransactionsSheet.getRange(1, 1, newAllTransactionsData.length, newAllTransactionsData[0].length).setValues(newAllTransactionsData);
  
  // Generate transactions based on the recurrence rules
  const generatedTransactions = [];
  const startDate = new Date();
  const endDate = new Date();
  
  recurringData.forEach(row => {
    if (row[ARCHIVED_INDEX] === 'TRUE') return;

    const params = row[PARAMS_INDEX];
    const regularity = row[REGULARITY_INDEX];
    const start = new Date(row[START_INDEX]);
    const end = new Date(row[END_INDEX]);
    
    let currentDate = start;
    
    while (currentDate <= end) {
      let transactionDate = new Date(currentDate);
      
      switch (regularity) {
        case 'Annual':
          const [month, day] = params.split(', ');
          transactionDate.setMonth(monthNames.indexOf(month));
          transactionDate.setDate(parseInt(day));
          break;
        case 'Monthly (Date)':
          transactionDate.setDate(parseInt(params));
          break;
        case 'Monthly (Week+Day)':
          const [week, dayOfWeek] = params.split(', ');
          setDateToNthWeekday(transactionDate, parseInt(week), dayOfWeek);
          break;
        case 'Weekly':
          setDateToNextWeekday(transactionDate, params);
          break;
      }
      
      if (transactionDate >= start && transactionDate <= end) {
        generatedTransactions.push([transactionDate, ...row.slice(1)]);
      }
      
      // Increment currentDate based on regularity
      switch (regularity) {
        case 'Annual':
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          break;
        case 'Monthly (Date)':
        case 'Monthly (Week+Day)':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case 'Weekly':
          currentDate.setDate(currentDate.getDate() + 7);
          break;
      }
    }
  });
  
  // Append generated transactions to 'All Transactions'
  if (generatedTransactions.length > 0) {
    allTransactionsSheet.getRange(allTransactionsSheet.getLastRow() + 1, 1, generatedTransactions.length, generatedTransactions[0].length).setValues(generatedTransactions);
  }
}

/**
 * Sets the date to the nth weekday of a given month.
 * @param {Date} date - The date object to modify.
 * @param {number} week - The week number (positive or negative).
 * @param {string} dayOfWeek - The name of the day of the week.
 */
function setDateToNthWeekday(date, week, dayOfWeek) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const day = dayOfWeekNames.indexOf(dayOfWeek);
  const firstWeekday = firstDay.getDay();
  const offset = (day >= firstWeekday) ? (day - firstWeekday) : (7 - (firstWeekday - day));
  
  date.setDate(1 + offset + (week - 1) * 7);
  
  if (week === -1) {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    date.setDate(lastDay.getDate() - ((lastDay.getDay() - day + 7) % 7));
  }
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Sets the date to the next occurrence of a given weekday.
 * @param {Date} date - The date object to modify.
 * @param {string} dayOfWeek - The name of the day of the week.
 */
function setDateToNextWeekday(date, dayOfWeek) {
  const day = dayOfWeekNames.indexOf(dayOfWeek);
  const offset = (day >= date.getDay()) ? (day - date.getDay()) : (7 - (date.getDay() - day));
  date.setDate(date.getDate() + offset);
}

const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

generateTransactions()



Here's the pseudo code for generateTransactions():
1. Get the data from 'Recurring Transactions' and save it as recurringTransactionsData
2. Get the EXCEPTION=TRUE data within 'All Transactions' and save it
3. Delete all rows below the header (1st row) within 'All Transactions' that aren't EXCEPTION=TRUE
4. Loop from recurringTransactionsData
  4.1. Check the REGULARITY value of the row
  4.2. Do a switch() depending on the REGULARITY value
    4.2.1. 'Annual': run generateAnnualTransactions()
    4.2.2. 'Monthly (Date)': run generateMonthlyDateTransactions()
    4.2.3. 'Monthly (Week+Day)': run generateMonthlyWeekDayTransactions()
    4.2.4. 'Weekly': run generateWeeklyTransactions()
5. Each function will accept the row as the input data, and then will return a 2D data of the generated transactions depending on the type of REGULARITY
6. Once the transactions are returned, add to 'All Transactions'


Give me the code for that please. Build each REGULARITY function as well, and any helper functions needed
Here's the sample 'Recurring Transactions' data:
RECURSION ID,PARAMETERS,REGULARITY,START,END,ARCHIVED,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
202407080001,"May, 7",Annual,7/1/2024,12/31/2024,FALSE,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
202407080002,7,Monthly (Date),7/1/2024,12/31/2024,FALSE,minimalist phone,Expense,EastWest CC Expenses,Software,Subscriptions,180,
202407080003,14,Monthly (Date),7/1/2024,12/31/2024,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
202407080004,3,Monthly (Date),7/1/2024,12/31/2024,FALSE,GitHub Copilot,Expense,EastWest CC Expenses,Software,Subscriptions,600,
202407080005,"1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Miho Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
202407080006,"1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Diego Groom,Expense,Expected Expense,Pets,Grooming,600,Monthly Grooming
202407080007,"1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Leechou Groom,Expense,Expected Expense,Pets,Grooming,900,Monthly Grooming
202407080008,"2, Sunday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Electricity,Expense,EastWest HPL Game Design Corporation,Household,Electricity,4000,
202407080009,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Groceries,Expense,EastWest CC Expenses,Food,,1200,Weekly Resets
202407080010,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Laundry,Expense,Expected Expense,Clothing,Laundry,200,Weekly Resets
202407080011,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Globe Reload,Expense,GCash,Household,Mobile Plan,110,Weekly Resets
202407080012,Sunday,Weekly,7/1/2024,12/31/2024,FALSE,Pet Groceries,Expense,Expected Expense,Pets,,400,Weekly Resets
202407080013,"-1, Saturday",Monthly (Week+Day),7/1/2024,12/31/2024,FALSE,Spa Day,Expense,Expected Expense,Health,Services,1500,

Here's the sample 'All Transactions' data before generateTransactions():
DATE,RECURRING,RECURSION ID,EXCEPTION,NOTES,TYPE,FROM ACCOUNT,TO ACCOUNT/TO CATEGORY,SUBCATEGORY,AMOUNT,TAGS
5/7/2024,TRUE,202407080001,TRUE,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
5/7/2025,TRUE,202407080001,FALSE,Niagara Pro,Expense,EastWest CC Expenses,Software,Subscriptions,150,
3/14/2025,TRUE,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
4/14/2025,TRUE,202407080003,TRUE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,
5/14/2025,TRUE,202407080003,FALSE,YouTube Premium,Expense,EastWest CC Expenses,Software,Subscriptions,159,