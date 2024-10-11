const express = require('express');
const cors = require('cors');

// * Initializing Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// * Routes
const accountRoutes = require('./routes/account.routes');
app.use('/account', accountRoutes);

// * Start Server
app.listen(PORT, () => {
  console.clear();
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  console.log(`\n`);
});

