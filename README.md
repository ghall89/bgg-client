# 🎲 bgg-client

A Typescript client for working with the [BoardGameGeek.com API](https://boardgamegeek.com/wiki/page/BGG_XML_API2).

## 📦 Install

```bash
# npm
npm install bgg-client
# pnpm
pnpm add bgg-client
# yarn
yarn add bgg-client
# bun
bun add bgg-client
```

## 🚀 Usage

```ts
import { search, gameById } from 'bgg-client';

const results = await search('Cascadia');
const game = await gameById('342942'); // Cascadia's BGG ID
```

## 🔧 API Reference

### `search(query: string, options?: object): Promise<SearchResult[] | undefined>`

Search for "things" by name using the BGG API.

#### Parameters

| Name    | Type                | Description                  |
| ------- | ------------------- | ---------------------------- |
| query   | `string`            | Search term (e.g. `"Catan"`) |
| options | `object` (optional) | Options for the BGG API call |

#### Options

These are the options that can be included in the `options` prop.

| Name  | Type                   | Description                                                        |
| ----- | ---------------------- | ------------------------------------------------------------------ |
| type  | `string` or `string[]` | The type of "thing" you'd like to query for (example: `boardgame`) |
| exact | `boolean`              | If `true`, return only exact matches                               |

#### Returns

A Promise resolving to an array of `SearchResult` objects, or `undefined` if the API call fails.

#### Example

```ts
const results = await search('Terraforming Mars', {
  exact: true,
  type: 'boardgame',
});
// [
//   { bggId: '167791', title: 'Terraforming Mars', type: 'boardgame' },
//   ...
// ]
```

### `gameById(id: string, options?: object): Promise<GameDetails | undefined>`

Fetch detailed information about a game using its BGG ID.

#### Parameters

| Name    | Type     | Description                       |
| ------- | -------- | --------------------------------- |
| id      | `string` | The numeric ID of the game on BGG |
| options | `object` | Options for the BGG API call      |

#### Options

These are the options that can be included in the `options` prop.

| Name  | Type                   | Description                                                        |
| ----- | ---------------------- | ------------------------------------------------------------------ |
| type  | `string` or `string[]` | The type of "thing" you'd like to query for (example: `boardgame`) |
| stats | `boolean`              | If `true`, return additional stats, like rankings, game complexity |

#### Returns

A Promise resolving to a `GameDetails` object, or `undefined` if the API call fails.

#### Example

```ts
const game = await gameById('174430');
console.log(game.title); // "Gloomhaven"
```

## 🧱 Type Definitions

### `SearchResult`

```ts
interface SearchResult {
  bggId: string;
  title: string;
  type: ThingType;
}
```

### `GameDetails`

```ts
interface GameDetails {
  bggId: string;
  title: string;
  img: string;
  thumbnail: string;
  yearPublished: number;
  description: string;
  minPlayers?: number;
  maxPlayers?: number;
  avgPlaytime?: number;
  minPlaytime?: number;
  maxPlaytime?: number;
  minPlayerAge?: number;
  polls: PollItem[];
  links: Link[];
  stats?: {
    ranks: RankItem[];
    owned: number;
    trading: number;
    wanting: number;
    wishing: number;
    complexity: number;
  };
}
```

### `PollItem`

Represents community-generated poll data (e.g. recommended number of players):

```ts
interface PollItem {
  name: string;
  results:
    | PollResult[]
    | {
        players: number;
        results: PollResult[];
      }[];
}
```

### `PollResult`

```ts
interface PollResult {
  value: string;
  votes: number;
}
```

### `Rank Item`

Represents community generated ranking information, like its overall BGG rank, its ranking among strategy games, etc.

```ts
interface RankItem {
  type: string;
  key: string;
  name: string;
  value: number;
}
```

### `Link`

Represents BGG-related metadata, such as categories, mechanics, and expansions.

```ts
interface Link {
  id: string;
  type: string;
  value: string;
}
```

## 📘 Example App

```ts
import { search, gameById } from 'bgg-client';

async function fetchGameData(name: string, { exact: true }) {
  const results = await search(name);
  if (!results || results.length === 0) return;

  const game = await gameById(results[0].bggId, { stats: true });
  if (!game) return;

  console.log(`${game.title} (${game.yearPublished})`);
  console.log(`Players: ${game.minPlayers}-${game.maxPlayers}`);
  console.log(`Description: ${game.description.slice(0, 150)}...`);
}
```

## 🔗 Dependencies

- [xml-js](https://github.com/nashwaan/xml-js)
- [he](https://github.com/mathiasbynens/he)
- [try-catcher-ts](https://github.com/ghall89/try-catcher-ts)
