const request = require('supertest');
const app = require('./api');

describe('API Error Handling Challenge', () => {
  // Test 1: Error aleatorio en GET /items
  test('should handle random errors in GET /items', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBeOneOf([200, 500]);
    if (res.status === 500) {
      expect(res.body).toHaveProperty('error');
    }
  });

  // Test 2: Item no encontrado
  test('should return 404 for non-existent item', async () => {
    const res = await request(app).get('/items/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Item no encontrado' });
  });

  // Test 3: POST sin datos requeridos
  test('should reject POST with missing fields', async () => {
    const testCases = [
      { data: {}, expected: 'Nombre y precio son requeridos' },
      { data: { name: 'Test' }, expected: 'Nombre y precio son requeridos' },
      { data: { price: 10 }, expected: 'Nombre y precio son requeridos' }
    ];

    for (const testCase of testCases) {
      const res = await request(app)
        .post('/items')
        .send(testCase.data);
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(testCase.expected);
    }
  });

  // Test 4: POST con datos inválidos
  test('should reject invalid price values', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Test', price: 'not-a-number' });
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
