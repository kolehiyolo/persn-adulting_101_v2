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
function generateRecurringTransactions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const recurringSheet = ss.getSheetByName('Recurring Transactions');
  const allTransactionsSheet = ss.getSheetByName('All Transactions');
  
  // 1. Get data
  const recurringTransactionsData = recurringSheet.getDataRange().getValues().slice(1); // Exclude header
  const allTransactionsData = allTransactionsSheet.getDataRange().getValues();
  const exceptionData = allTransactionsData.filter(row => row[3] === true); // EXCEPTION=TRUE

  // Get the headers of recurringSheet and allTransactionsSheet
  const recurringTransactionsHeaders = recurringSheet.getRange(1, 1, 1, recurringSheet.getLastColumn()).getValues()[0];
  const allTransactionsHeaders = allTransactionsSheet.getRange(1, 1, 1, allTransactionsSheet.getLastColumn()).getValues()[0];

  // Get the index of these important columns
  // recurringTransactionsHeaders: PARAMETERS, REGULARITY, START,END, ARCHIVED, NOTES
  // allTransactionsHeaders: DATE, RECURRING, EXCEPTION
  const recurringParametersIndex = recurringTransactionsHeaders.findIndex(column => column === 'PARAMETERS');
  const recurringRegularityIndex = recurringTransactionsHeaders.findIndex(column => column === 'REGULARITY');
  const recurringStartIndex = recurringTransactionsHeaders.findIndex(column => column === 'START');
  const recurringEndIndex = recurringTransactionsHeaders.findIndex(column => column === 'END');
  const recurringArchivedIndex = recurringTransactionsHeaders.findIndex(column => column === 'ARCHIVED');
  const recurringNotesIndex = recurringTransactionsHeaders.findIndex(column => column === 'NOTES');
  const allTransactionsDateIndex = allTransactionsHeaders.findIndex(column => column === 'DATE');
  const allTransactionsRecurringIndex = allTransactionsHeaders.findIndex(column => column === 'RECURRING');
  const allTransactionsExceptionIndex = allTransactionsHeaders.findIndex(column => column === 'EXCEPTION');

  console.log(recurringTransactionsHeaders);
  console.log(allTransactionsHeaders);
  
  // 2. Clear 'All Transactions' and keep EXCEPTION=TRUE rows
  allTransactionsSheet.clearContents();
  allTransactionsSheet.appendRow(allTransactionsData[0]); // Re-add header
  exceptionData.forEach(row => allTransactionsSheet.appendRow(row));
  
  // 3. Loop through recurring transactions to generate new transactions
  recurringTransactionsData.forEach(row => {
    const notesValue = row[recurringNotesIndex];
    const startDate = new Date(row[recurringStartIndex]);
    const endDate = new Date(row[recurringEndIndex]);

    // console.log(row);

    const params = {
      row: row,
      startDate: startDate,
      endDate: endDate,
      notesValue: notesValue,
    }

    let generatedTransactions = [];
    switch (row[2]) { // REGULARITY
      case 'Annual':
        generatedTransactions = generateAnnualTransactions(params);
        break;
      case 'Monthly (Date)':
        generatedTransactions = generateMonthlyDateTransactions(params);
        break;
      case 'Monthly (Week+Day)':
        generatedTransactions = generateMonthlyWeekDayTransactions(params);
        break;
      case 'Weekly':
        generatedTransactions = generateWeeklyTransactions(params);
        break;
    }
    // 4. Add generated transactions to 'All Transactions'
    generatedTransactions.forEach(transaction => allTransactionsSheet.appendRow(transaction));
  });
}

// Helper function to add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Helper function to get the nth weekday of a month
function getNthWeekdayOfMonth(year, month, weekday, n) {
  const firstDayOfMonth = new Date(year, month, 1);
  let dayOfWeek = firstDayOfMonth.getDay();
  let day = 1 + ((weekday - dayOfWeek + 7) % 7);
  if (n > 0) {
    day += (n - 1) * 7;
  } else { // Last week of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDate = lastDayOfMonth.getDate();
    while (day <= lastDate) {
      day += 7;
    }
    day -= 7; // Roll back to the last occurrence
  }
  return new Date(year, month, day);
}

// Helper function to parse month string to month number
function monthStringToNumber(month) {
  const date = new Date(`${month} 1, 2000`);
  return date.getMonth();
}

function logGenerateFunctionTrigger(functionName, params) {
  // console.log(`generate${functionName}(${params.notesValue}, ${params.startDate}, ${params.endDate})`);
}

// Generate Annual Transactions
function generateAnnualTransactions(params) {
  logGenerateFunctionTrigger('AnnualTransactions', params);
  const transactions = [];
  // const [monthStr, dateStr] = row[1].split(', '); // Assuming the date is always at index 1
  // const month = monthStringToNumber(monthStr.trim());
  // const date = parseInt(dateStr, 10);

  // for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
  //   const transactionDate = new Date(year, month, date);
  //   if (transactionDate >= startDate && transactionDate <= endDate) {
  //     transactions.push([transactionDate.toISOString().split('T')[0], ...row]);
  //   }
  // }

  return transactions;
}
// Generate Monthly (Date) Transactions
function generateMonthlyDateTransactions(params) {
  logGenerateFunctionTrigger('MonthlyDateTransactions', params);
  const transactions = [];
  // const date = parseInt(row[1], 10);

  // for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
  //   const transactionDate = new Date(d.getFullYear(), d.getMonth(), date);
  //   if (transactionDate >= startDate && transactionDate <= endDate) {
  //     transactions.push([transactionDate.toISOString().split('T')[0], ...row]);
  //   }
  // }

  return transactions;
}

// Generate Monthly (Week+Day) Transactions
function generateMonthlyWeekDayTransactions(params) {
  logGenerateFunctionTrigger('MonthlyWeekDayTransactions', params);
  const transactions = [];
  // const [weekStr, dayStr] = row[1].split(', ');
  // const week = parseInt(weekStr.trim(), 10);
  // const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayStr.trim());

  // for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
  //   const transactionDate = getNthWeekdayOfMonth(d.getFullYear(), d.getMonth(), day, week);
  //   if (transactionDate >= startDate && transactionDate <= endDate) {
  //     transactions.push([transactionDate.toISOString().split('T')[0], ...row]);
  //   }
  // }

  return transactions;
}

// Generate Weekly Transactions
function generateWeeklyTransactions(params) {
  logGenerateFunctionTrigger('WeeklyTransactions', params);
  const transactions = [];
  // const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(row[1].trim());
  // let transactionDate = new Date(startDate);
  // transactionDate = addDays(transactionDate, (day - transactionDate.getDay() + 7) % 7); // Adjust to the next correct day of the week

  // while (transactionDate <= endDate) {
  //   transactions.push([transactionDate.toISOString().split('T')[0], ...row]);
  //   transactionDate = addDays(transactionDate, 7); // Move to the next week
  // }

  return transactions;
}

generateRecurringTransactions()