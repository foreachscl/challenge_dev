const fetchData = require('./fetchData').default;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Success' }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it('should fetch data from the API', async () => {
  const data = await fetchData('https://api.example.com/data');
  expect(fetch).toHaveBeenCalledWith('https://api.example.com/data');
});
