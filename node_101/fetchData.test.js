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
  const api = 'https://api.example.com/data'
  const data = await fetchData(api);
  console.log("Datos recibidos:", data);
  expect(fetch).toHaveBeenCalledWith(api);
  expect(data).toBe({"message": 'Success'});
});
