const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const accountsFilePath = path.join(__dirname, '../data/sample/accounts.csv');

// * Utility functions
const convertAccountToCSVRow = (account) => {
  return `${account.id},${account.date},${account.time},${account.name},${account.balance},${account.goal},${account.currency},${account.order},${account.type},${account.description || ''},${account.tag || ''},${account.icon_id},${account.color},${account.archived},${account.deleted}\n`;
};

// * Get all accounts
// GET http://localhost:5000/account/
router.get('/', (req, res) => {
  fs.readFile(accountsFilePath, 'utf8', (err, csvData) => {
    if (err) {
      console.error('Error reading accounts CSV:', err);
      return res.status(500).send('Error fetching data');
    }

    // Parse CSV data to JSON
    const parsedData = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    res.json(parsedData.data); // Send JSON data to the client
  });
});

// * Add new account
// POST http://localhost:5000/account/new
router.post('/new', (req, res) => {
  const account = req.body;
  const newRow = convertAccountToCSVRow(account);

  fs.appendFile(accountsFilePath, newRow, (err) => {
    if (err) {
      console.error('Error adding account to CSV:', err);
      return res.status(500).send('Error saving data');
    }
    res.status(200).send('Account added successfully');
  });
});

module.exports = router;