import { search } from '../src/lib/bgg-client';

describe('search', () => {
  test('Catan', async () => {
    const result = await search('Catan');
    expect(result).toBeDefined();
  });
});
