import bgg from '../src/index';

describe('hot', () => {
  test('hot', async () => {
    const id = 33;
    const result = await bgg.family(id);
    expect(result?.id).toEqual(id);
  });
});
