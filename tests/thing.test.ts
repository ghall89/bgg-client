import bgg from '../src/index';

describe('gameById', () => {
  test('7 Wonders', async () => {
    const result = await bgg.thing(68448);
    expect(result?.name.find(({ type }) => type === 'primary')?.value).toEqual(
      '7 Wonders',
    );
    expect(result?.statistics).toBeUndefined();
  });
  test('7 Wonders with optional data', async () => {
    const result = await bgg.thing(68448, { stats: true, versions: true });
    expect(result?.name.find(({ type }) => type === 'primary')?.value).toEqual(
      '7 Wonders',
    );
    expect(result?.statistics).toBeDefined();
    expect(result?.versions).toBeDefined();
  });
});
