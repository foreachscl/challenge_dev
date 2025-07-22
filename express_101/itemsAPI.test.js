const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
const request = require('supertest');
const app = require('./itemsAPI');

describe('Challenge 1: Filtrado correcto', () => {
  test('Debe filtrar items por nombre (case-insensitive)', async () => {
    const res = await request(app).get('/api/items?name=a');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: 'Apple', price: 1 },
      { id: 2, name: 'Banana', price: 2 },
    ]);
  });

  test('Debe devolver todos los items sin filtro', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  test('Debe fallar si name tiene menos de 1 caracter', async () => {
    const res = await request(app).get('/api/items').query({ name: '' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch('El parámetro name debe tener al menos 1 caracter');
  });
});

