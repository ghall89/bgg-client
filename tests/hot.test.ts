import { hot } from '../src/lib/bgg-client';

describe('hot', () => {
  test('hot', async () => {
    const result = await hot();
    expect(result).toBeDefined();
  });
});
