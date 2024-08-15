const express = require('express');
const holidayRoutes = require('./routes/holidayRoutes');

const app = express();

app.use(express.json());
app.use('/api', holidayRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
