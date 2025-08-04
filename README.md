# 🎲 bgg-client

A TypeScript client for working with the [BoardGameGeek.com API](https://boardgamegeek.com/wiki/page/BGG_XML_API2).

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

Simply import the default `bgg` instance from `bgg-client` — a pre-instantiated (singleton) client with built-in rate limiting for the BoardGameGeek API.

If you'd prefer more control — for example, to customize rate limits or request behavior — you can import the `BoardGameGeekClient` class. For full manual access to any endpoint, you can use the lower-level `ApiClient` class.

By default, there is a rate limit of 1 request every 5 seconds to comply with the BoardGameGeek API's suggested request rate. This can be adjusted by importing and instantiating either the `BoardGameGeekClient` or `ApiClient` classes yourself.

### Methods

**`search(query, options)`**

Calls the `search` endpoint, and returns an array of results.

**`thing(id, options)`**

Calls the `thing` endpoint, and returns an object.

**`hot(options)`**

Calls the `hot` endpoint, and returns an array of results.

### Example

```ts
import bgg from 'bgg-client';

const results = await bgg.search('Cascadia');
const game = await bgg.thing('342942'); // Cascadia's BGG ID
const hot = await bgg.hot();
```

### Additional Endpoints

This package is in active development, and more endpoints will be added over time. Need something like `user`, `collection`, or `plays`? You can access any BGG endpoint manually by importing the `ApiClient` class and using its `getRequest()` method directly.

Refer to the [BGG XML API2 docs](https://boardgamegeek.com/wiki/page/BGG_XML_API2) for documentation on all endpoints, and their options.

## 🔗 Dependencies

- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [try-catcher-ts](https://github.com/ghall89/try-catcher-ts)
