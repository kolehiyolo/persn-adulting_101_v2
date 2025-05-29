hey. this function inside App.tsx needs to work:
const handleClickGenerateData = async () => {
  console.log(`Trigger handleClickGenerateData()`);
  fetchTransactions();
};


here's the directory structure
client/
  public/
    data/
      generateTransactionsData.py
  src/
    App.tsx


I want that function handleClickGenerateData() trigger a "python generateTransactionsData.py" command, which is located relatively as described above