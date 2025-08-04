import bgg from '../src/index';

describe('search', () => {
  test('Catan', async () => {
    const result = await bgg.search('Catan');
    expect(result).toBeDefined();
  });
});
