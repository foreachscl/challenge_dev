const express = require('express');
const app = express();

const ITEMS = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 2 },
  { id: 3, name: 'Cherry', price: 3 },
];

app.get('/api/items', (req, res) => {

  res.status(200).json({});
});

module.exports = app;
