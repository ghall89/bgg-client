import { BoardGameGeekClient } from '../src/index';

const bgg = new BoardGameGeekClient(process.env.API_KEY);

jest.setTimeout(6000);

describe('BoardGameGeekClient', () => {
  describe('family()', () => {
    test('fetch family by id', async () => {
      const id = 33;
      const result = await bgg.family(id);
      expect(result).toBeDefined();
      expect(result?.id).toEqual(id);
    });
  });

  describe('hot()', () => {
    test('fetch hot games list', async () => {
      const result = await bgg.hot();
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('search()', () =>
    test('search for a game by name', async () => {
      const result = await bgg.search('Catan');
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(
        result.some((game) => game.name.value.toLowerCase().includes('catan')),
      ).toBe(true);
    }));

  describe('thing()', () => {
    test('fetch thing by id without optional data', async () => {
      const result = await bgg.thing(68448);
      expect(result).toBeDefined();
      expect(
        result?.name.find(({ type }) => type === 'primary')?.value,
      ).toEqual('7 Wonders');
      expect(result?.statistics).toBeUndefined();
    });

    test('fetch thing by id with optional data', async () => {
      const result = await bgg.thing(68448, {
        stats: true,
        versions: true,
        comments: true,
        ratingcomments: true,
        videos: true,
      });
      expect(result).toBeDefined();
      expect(
        result?.name.find(({ type }) => type === 'primary')?.value,
      ).toEqual('7 Wonders');
      expect(result?.statistics).toBeDefined();
      expect(result?.versions).toBeDefined();
      expect(result?.videos).toBeDefined();
      expect(result?.comments).toBeDefined();
    });
  });
});
