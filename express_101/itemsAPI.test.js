const request = require('supertest');
const app = require('./itemsAPI');describe('Items API', () => {
  test('GET /items - retorna todos los items', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: 'Apple', price: 1 },
      { id: 2, name: 'Banana', price: 2 },
      { id: 3, name: 'Cherry', price: 3 },
    ]);
  });  test('GET /items/search?name=a - filtra por nombre', async () => {
    const res = await request(app).get('/items/search?name=a');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: 'Apple', price: 1 },
      { id: 2, name: 'Banana', price: 2 },
    ]);
  });  test('GET /items/total - calcula el total', async () => {
    const res = await request(app).get('/items/total');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ total: 6 });
  });
});
