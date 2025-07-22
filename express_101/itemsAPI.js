const express = require('express');
const app = express();

const ITEMS = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 2 },
  { id: 3, name: 'Cherry', price: 3 },
];

app.get('/api/items', (req, res) => {
  const { name } = req.body;

  if (name !== undefined && name.length != 0) {
    return res.status(400).json({ error: 'Name debe tener al menos 1 caracter' });
  }

  const result = name ? ITEMS.filter(item => item.name.includes(name)) : [];
  
  res.status(200).json(result);
});

module.exports = app;
