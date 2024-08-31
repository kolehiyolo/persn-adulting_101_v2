/**
 * Creates a custom menu in the Google Sheets UI.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Generate from Recurring Transactions', 'generateRecurringTransactions')
    .addToUi();
}

/**
 * Generates transactions based on recurring rules and appends them to the 'All Transactions' sheet.
 */
function generateRecurringTransactions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const recurringSheet = ss.getSheetByName('Recurring Transactions');
  const allTransactionsSheet = ss.getSheetByName('All Transactions');

  // Get the headers of recurringSheet and allTransactionsSheet
  const recurringTransactionsHeaders = recurringSheet.getRange(1, 1, 1, recurringSheet.getLastColumn()).getValues()[0];
  const allTransactionsHeaders = allTransactionsSheet.getRange(1, 1, 1, allTransactionsSheet.getLastColumn()).getValues()[0];

  function getColumnIndex(headers, columnName) {
    return headers.findIndex(column => column === columnName);
  }
  
  const recurringTransactionsData = recurringSheet.getDataRange().getValues().slice(1); // Exclude header
  const allTransactionsData = allTransactionsSheet.getDataRange().getValues();
  const exceptionData = allTransactionsData.filter(row => row[getColumnIndex(allTransactionsHeaders, 'EXCEPTION')] === true);
  
  // 2. Clear 'All Transactions' and keep EXCEPTION=TRUE rows
  allTransactionsSheet.clearContents();
  allTransactionsSheet.appendRow(allTransactionsData[0]); // Re-add header
  exceptionData.forEach(row => 
    {
      const date = row[0].toISOString().split('T')[0].replace(/-/g, '/');
      const modifiedRow = [date, ...row.slice(1)];
      allTransactionsSheet.appendRow(modifiedRow);
      const newTransactionRow = allTransactionsSheet.getLastRow();
      const dateCell = allTransactionsSheet.getRange(newTransactionRow, getColumnIndex(allTransactionsHeaders, 'DATE') + 1);
      const upcomingCell = allTransactionsSheet.getRange(newTransactionRow, getColumnIndex(allTransactionsHeaders, 'UPCOMING') + 1);      
      upcomingCell.setFormula(`=IF(${dateCell.getA1Notation()} > CONFIG!$B$1, "TRUE", "FALSE")`);
    }
  );
  
  // 3. Loop through recurring transactions to generate new transactions
  recurringTransactionsData.forEach(row => {
    const archived = row[getColumnIndex(recurringTransactionsHeaders, 'ARCHIVED')];
    
    // console.log(row);
    
    if (archived) {
      console.log('Skipping archived transaction');
      return;
    }
    
    const regularity = row[getColumnIndex(recurringTransactionsHeaders, 'REGULARITY')];
    const params = {
      row: row,
      parameters: row[getColumnIndex(recurringTransactionsHeaders, 'PARAMETERS')],
      startDate: new Date(row[getColumnIndex(recurringTransactionsHeaders, 'START')]),
      endDate: new Date(row[getColumnIndex(recurringTransactionsHeaders, 'END')]),
      notesValue: row[getColumnIndex(recurringTransactionsHeaders, 'NOTES')],
    }
    let generatedTransactions = [];

    switch (regularity) {
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
    generatedTransactions.forEach(transaction => {
      allTransactionsSheet.appendRow(transaction);
      const newTransactionRow = allTransactionsSheet.getLastRow();
      const dateCell = allTransactionsSheet.getRange(newTransactionRow, getColumnIndex(allTransactionsHeaders, 'DATE') + 1);
      const upcomingCell = allTransactionsSheet.getRange(newTransactionRow, getColumnIndex(allTransactionsHeaders, 'UPCOMING') + 1);      
      upcomingCell.setFormula(`=IF(${dateCell.getA1Notation()} > CONFIG!$B$1, "TRUE", "FALSE")`);
    });
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
  console.log(`generate${functionName}(${params.notesValue}, ${params.startDate}, ${params.endDate})`);
}

// Generate Annual Transactions
function generateAnnualTransactions(params) {
  logGenerateFunctionTrigger('AnnualTransactions', params);
  const transactions = [];

  // Getting the month and date integers from the parameters
  const [monthStr, dateStr] = params.parameters.split(', ');
  const monthInt = monthStringToNumber(monthStr.trim());
  const dateInt = parseInt(dateStr, 10);

  // Loop through the years between the start and end dates
  for (let year = params.startDate.getFullYear(); year <= params.endDate.getFullYear(); year++) {
    const transactionDate = new Date(year, monthInt, dateInt);
    if (transactionDate >= params.startDate && transactionDate <= params.endDate) {
      // date must look like yyyy/mm/dd
      const date = transactionDate.toISOString().split('T')[0].replace(/-/g, '/');
      const valuesRetained = params.row.slice(5);
      const newTransaction = [
        date, 
        true,
        false,
        'To Fill with Formula',
        ...valuesRetained
      ];

      transactions.push(newTransaction);
    }
  }

  return transactions;
}
// Generate Monthly (Date) Transactions
function generateMonthlyDateTransactions(params) {
  logGenerateFunctionTrigger('MonthlyDateTransactions', params);
  const transactions = [];

  // Getting the date integer from the parameters
  const dateInt = parseInt(params.parameters, 10);

  // Loop through the months between the start and end dates
  for (let d = new Date(params.startDate); d <= params.endDate; d.setMonth(d.getMonth() + 1)) {
    const transactionDate = new Date(d.getFullYear(), d.getMonth(), dateInt);
    if (transactionDate >= params.startDate && transactionDate <= params.endDate) {
      // date must look like yyyy/mm/dd
      const date = transactionDate.toISOString().split('T')[0].replace(/-/g, '/');
      const valuesRetained = params.row.slice(5);
      const newTransaction = [
        date, 
        true,
        false,
        'To Fill with Formula',
        ...valuesRetained
      ];

      transactions.push(newTransaction);
    }
  }

  return transactions;
}

// Generate Monthly (Week+Day) Transactions
function generateMonthlyWeekDayTransactions(params) {
  logGenerateFunctionTrigger('MonthlyWeekDayTransactions', params);
  const transactions = [];
  
  // Get the week and day integers from the parameters
  const [weekStr, dayStr] = params.parameters.split(', ');
  const weekInt = parseInt(weekStr.trim(), 10);
  const dayInt = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(dayStr.trim());

  // Loop through the months between the start and end dates
  for (let d = new Date(params.startDate); d <= params.endDate; d.setMonth(d.getMonth() + 1)) {
    const transactionDate = getNthWeekdayOfMonth(d.getFullYear(), d.getMonth(), dayInt+1, weekInt);
    if (transactionDate >= params.startDate && transactionDate <= params.endDate) {
      // date must look like yyyy/mm/dd
      const date = transactionDate.toISOString().split('T')[0].replace(/-/g, '/');
      const valuesRetained = params.row.slice(5);
      const newTransaction = [
        date, 
        true,
        false,
        'To Fill with Formula',
        ...valuesRetained
      ];

      transactions.push(newTransaction);
    }
  }

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

  // Get the dayInt of the week from the parameters
  const dayInt = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(params.parameters.trim());
  
  // Loop through the weeks between the start and end dates
  for (let d = new Date(params.startDate); d <= params.endDate; d.setDate(d.getDate() + 7)) {
    const transactionDate = new Date(d);
    transactionDate.setDate(transactionDate.getDate() + (dayInt - transactionDate.getDay() + 7) % 7 + 1);
    if (transactionDate >= params.startDate && transactionDate <= params.endDate) {
      // date must look like yyyy/mm/dd
      const date = transactionDate.toISOString().split('T')[0].replace(/-/g, '/');
      const valuesRetained = params.row.slice(5);
      const newTransaction = [
        date, 
        true,
        false,
        'To Fill with Formula',
        ...valuesRetained
      ];

      transactions.push(newTransaction);
    }
  }
  
  return transactions;
}

generateRecurringTransactions()

// ! BRUH
// Dates are all messed up because of timezone differences. Start and End dates are in UTC, but the generated dates are in local time.
// Fix later