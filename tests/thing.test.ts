import bgg from '../src/index';

describe('gameById', () => {
  test('7 Wonders', async () => {
    const result = await bgg.thing('68448');
    expect(result?.name.find(({ type }) => type === 'primary')?.value).toEqual(
      '7 Wonders',
    );
    expect(result?.statistics).toBeUndefined();
  });
  test('7 Wonders with stats', async () => {
    const result = await bgg.thing('68448', { stats: true });
    expect(result?.name.find(({ type }) => type === 'primary')?.value).toEqual(
      '7 Wonders',
    );
    expect(result?.statistics).toBeDefined();
  });
});
