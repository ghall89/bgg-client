import { BoardGameGeekClient } from '../src/index';

jest.setTimeout(8000);

describe('bgg-client tests', () => {
  let bgg: BoardGameGeekClient;

  beforeAll(() => {
    const apiKey = process.env.API_KEY;
    bgg = new BoardGameGeekClient(apiKey);
  });

  describe('things', () => {
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
          result.some((game) =>
            game.name.value.toLowerCase().includes('catan'),
          ),
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

  describe('community', () => {
    describe('user()', () => {
      const name = 'ghall89';

      test('fetch user by name', async () => {
        const result = await bgg.user(name);
        expect(result).toBeDefined();
        expect(result?.name).toEqual(name);
      });

      test('fetch user by name with optional data', async () => {
        const result = await bgg.user(name, {
          buddies: true,
          guilds: true,
          hot: true,
          top: true,
        });
        expect(result).toBeDefined();
      });
    });

    describe('guild()', () => {
      const id = 458;

      test('fetch guild by id', async () => {
        const result = await bgg.guild(id);
        expect(result).toBeDefined();
      });

      test('fetch guild by id with members', async () => {
        const result = await bgg.guild(id);
        expect(result?.members).toBeDefined();
      });
    });

    describe('plays()', () => {
      test('fetch plays by id', async () => {
        const id = 13;
        const result = await bgg.plays(id);
        expect(result).toBeDefined();
      });

      test('fetch plays by username', async () => {
        const name = 'andwat';
        const result = await bgg.plays(name);
        expect(result).toBeDefined();
      });
    });
  });

  describe('forum', () => {
    let bgg: BoardGameGeekClient;

    beforeAll(() => {
      const apiKey = process.env.API_KEY;
      bgg = new BoardGameGeekClient(apiKey);
    });

    describe('forumList()', () => {
      test('get forum list by thing id', async () => {
        const id = 13;
        const result = await bgg.forumList(id);
        expect(result).toBeDefined();
      });
    });

    describe('forum()', () => {
      test('get forum by id', async () => {
        const id = 297;
        const result = await bgg.forum(id);
        expect(result).toBeDefined();
      });
    });

    describe('thread()', () => {
      test('get forum thread by id', async () => {
        const id = 3594318;
        const result = await bgg.thread(id);
        expect(result).toBeDefined();
      });
    });
  });
});
