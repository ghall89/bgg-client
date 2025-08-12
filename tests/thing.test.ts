import bgg from '../src/index';

describe('gameById', () => {
  test('7 Wonders', async () => {
    const result = await bgg.thing(68448);
    expect(result?.name.find(({ type }) => type === 'primary')?.value).toEqual(
      '7 Wonders',
    );
    expect(result?.statistics).toBeUndefined();
  }, 5000);
  test('7 Wonders with optional data', async () => {
    const result = await bgg.thing(68448, {
      stats: true,
      versions: true,
      comments: true,
      ratingcomments: true,
      videos: true,
    });
    expect(result?.name.find(({ type }) => type === 'primary')?.value).toEqual(
      '7 Wonders',
    );
    expect(result?.statistics).toBeDefined();
    expect(result?.versions).toBeDefined();
    expect(result?.videos).toBeDefined();
    expect(result?.comments).toBeDefined();
  }, 10000);
});
