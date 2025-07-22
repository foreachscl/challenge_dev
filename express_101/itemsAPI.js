const express = require('express');
const app = express();// Datos de ejemplo
const items = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 2 },
  { id: 3, name: 'Cherry', price: 3 },
];// Ruta GET /items
app.get('/items', (req, res) => {
  res.json(items);
});// Ruta GET /items/search?name=...
app.get('/items/search', (req, res) => {
  const query = req.query.name || '';
  const filtered = items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filtered);
});// Ruta GET /items/total
app.get('/items/total', (req, res) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  res.json({ total });
});// Exportamos solo la app (sin listen)
module.exports = app;
