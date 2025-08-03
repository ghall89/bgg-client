import bgg from '../src/index';

describe('hot', () => {
  test('hot', async () => {
    const result = await bgg.hot();
    expect(result).toBeDefined();
  });
});
