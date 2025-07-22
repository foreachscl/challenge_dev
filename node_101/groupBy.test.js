const { groupBy } = require('./groupBy');

describe('groupBy', () => {
  it('agrupa correctamente por propiedad', () => {
    const people = [
      { name: "Alice", city: "Santiago" },
      { name: "Bob", city: "Lima" },
      { name: "Charlie", city: "Santiago" },
      { name: "David", city: "Buenos Aires" }
    ];

    const result = groupBy(people, 'city');

    expect(result).toEqual({
      Santiago: [
        { name: "Alice", city: "Santiago" },
        { name: "Charlie", city: "Santiago" }
      ],
      Lima: [
        { name: "Bob", city: "Lima" }
      ],
      "Buenos Aires": [
        { name: "David", city: "Buenos Aires" }
      ]
    });
  });

  it('retorna un objeto vacío para array vacío', () => {
    expect(groupBy([], 'city')).toEqual({});
  });

  it('agrupa por una propiedad inexistente', () => {
    const data = [{a: 1}, {a: 2}];
    expect(groupBy(data, 'b')).toEqual({ undefined: [{a:1}, {a:2}] });
  });
});