woah i have a fucking insane problem

RENDERING ISSUE
calendar month is being rendered 1 month in advance
so april data is being shown as mar data


CalendarMonth
line 101 prcsActiveDateCalendarDatesData(activeDate, activeUser.cal_date, activeUser.transactions);
this is already wrong
activeUser.cal_date has the data behind by 1 in both the calendarmonth and date values
activeUser.transactions is behind by 1 in the date values


i have a problem. i have this script

const fetchTransactions = async (user: string) => {
  // * Step 1: Fetch the CSV file from the public folder
  const response = await fetch(`/data/users/${user}/output/transactions-all.csv`);

  // * Step 2: Read the response as plain text
  const csvText = await response.text();

  // * Step 3: Parse the CSV text using PapaParse, treating the first row as headers
  const parsed = Papa.parse(csvText, {
    header: true,           // Treat the first row as column headers
    skipEmptyLines: true,   // Ignore empty lines in the CSV
  });

  // * Step 4: Transform parsed data into Transaction objects
  const parsedData: Transaction[] = parsed.data.map((row: any) => ({
    title: row.title,
    type: row.type,
    tags: row.tags,
    category: row.category,
    amount: parseFloat(row.amount),
    date: new Date(row.date),
  }));

  // * Step 5: Set the transformed data into state
  return(parsedData);
};

the problem is step 4, specifically when we fetch the date data
what's being returned to each transactions is a date value that is 1 date behind
what's up with that