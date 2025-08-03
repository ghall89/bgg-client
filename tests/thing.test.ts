import { thing } from '../src/lib/bgg-client';

describe('gameById', () => {
  test('7 Wonders', async () => {
    const result = await thing('68448');
    expect(result?.title).toEqual('7 Wonders');
    expect(result?.stats).toBeUndefined();
  });
  test('7 Wonders with stats', async () => {
    const result = await thing('68448', { stats: true });
    expect(result?.title).toEqual('7 Wonders');
    expect(result?.stats).toBeDefined();
  });
});
