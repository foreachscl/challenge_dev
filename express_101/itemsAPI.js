const express = require('express');
const app = express();

// Datos de ejemplo
const items = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 2 },
  { id: 3, name: 'Cherry', price: 3 },
];

// Middleware para validar errores
app.use(express.json());

// Ruta GET /items
app.get('/items', (req, res) => {
  try {
    if (Math.random() > 0.9) throw new Error('Error aleatorio simulado');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener items' });
  }
});

// Ruta GET /items/:id
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  res.json(item);
});

// Ruta POST /items
app.post('/items', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }
  
  const newItem = {
    id: items.length + 1,
    name,
    price: parseInt(price)
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = app;
