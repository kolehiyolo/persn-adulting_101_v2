this is what i have in DateCard
  const [dateRunningTotal, setDateRunningTotal] = useState(0);
  const [dateTotal, setDateTotal] = useState(0);

  useEffect(() => {
    const amount = transactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.Amount);
      return transaction.Type.toLowerCase() === "expense" ? total - amount : total + amount;
    }, 0);

    setDateTotal(amount);
    // console.log(`dateTotal: ${amount}`);
  }, [transactions]); // ✅ Re-run when data updates
  
  useEffect(() => {
    setDateRunningTotal(runningTotal + dateTotal);
    console.log(`dateRunningTotal: ${runningTotal} + ${dateTotal}}`);
  }, [dateTotal]); // ✅ Runs only once when the component mounts
  
  useEffect(() => {
    setRunningTotal(dateRunningTotal);
    // console.log(`runningTotal: ${dateRunningTotal}`);
  }, [dateRunningTotal]); // ✅ Runs only once when the component mounts


this is what I have in CalendarMonth

  const [runningTotalBeforeCalendarMonth, setRunningTotalBeforeCalendarMonth] = useState(0);
  const [runningTotal, setRunningTotal] = useState(0);
  
  useEffect(() => {
    if (transactions.length === 0 || allDates.length === 0) return; // Avoid running on empty data
  
    const amount = transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.Date);
      
      if (transactionDate < allDates[0].date) {    
        return total + (transaction.Type.toLowerCase() === "expense" 
          ? -parseFloat(transaction.Amount) 
          : parseFloat(transaction.Amount));
      }
      
      return total;
    }, 0);
      setRunningTotalBeforeCalendarMonth(amount);
      // console.log(`runningTotalBeforeCalendarMonth: ${amount}`);
  }, [transactions, allDates]); // ✅ Re-run when data updates
  
  useEffect(() => {
    setRunningTotal(runningTotalBeforeCalendarMonth);
    // console.log(`runningTotal: ${runningTotalBeforeCalendarMonth}`);
  }, [runningTotalBeforeCalendarMonth]); // ✅ Sync runningTotal when the previous total updates


tell me what i'm trying to do and fix it