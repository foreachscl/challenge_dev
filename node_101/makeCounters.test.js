const makeCounters = require('./makeCounters').default;

test('should return an array of functions', () => {
  const counters = makeCounters();
  expect(Array.isArray(counters)).toBe(true);
  expect(counters.length).toBe(3);
});

test('each function should return its index', () => {
  const counters = makeCounters();
  expect(counters[0]()).toBe(0);
  expect(counters[1]()).toBe(1);
  expect(counters[2]()).toBe(2);
});
