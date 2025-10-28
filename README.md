# 🎲 bgg-client

![NPM Version](https://img.shields.io/npm/v/bgg-client)
![NPM Downloads](https://img.shields.io/npm/dm/bgg-client)
![npm bundle size](https://img.shields.io/bundlephobia/min/bgg-client)
![GitHub License](https://img.shields.io/github/license/ghall89/bgg-client)

A TypeScript client for working with the [BoardGameGeek.com API](https://boardgamegeek.com/wiki/page/BGG_XML_API2).

To use `bgg-client`, you must [get an API key](https://boardgamegeek.com/applications), and accept BoardGameGeek.com's [XML API Terms of Use](https://boardgamegeek.com/wiki/page/XML_API_Terms_of_Use#).

## Install

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

## Usage

Import the BoardGameGeekClient class, and create a new instance of it with an API key.

```ts
import { BoardGameGeekClient } from 'bgg-client';
const bgg = new BoardGameGeekClient('your-api-key');
```

By default, there is a rate limit of 1 request every 5 seconds to comply with the BoardGameGeek API's suggested request rate.

For full manual access to any endpoint, you can use the lower-level `ApiClient` class. However, this is not fully supported, and you may have to provide your own types for full type safety.


## Migration from v1 to v2

The default export has been removed. You must now import `BoardGameGeekClient` and provide an API key, as described above.

## Methods

### Search

**`search(query, options)`**

Calls the `search` endpoint to look up games by name. Returns an array of matching items, including board games, expansions, and other types. Supports options like `type` and `exact`.

### Thing

**`thing(id, options)`**

Calls the `thing` endpoint to fetch detailed information about a game or item by its BGG ID. Supports options like `stats` to include game statistics.

### Hot

**`hot(options)`**

Calls the `hot` endpoint to retrieve a list of trending or popular items. You can optionally specify a `type` (e.g., `boardgame`, `rpg`, `boardgameperson`) to filter results.

### Family

**`family(id, options)`**

Calls the `family` endpoint to retrieve a "family", and an array of links to related things. You can optionally specify a `type` (e.g., `boardgamefamily`, `rpg`, `rpgperiodical`) to filter results.

### User

**`user(name, options)`**

Calls the `user` endpoint to retrieve a "user" by their username, and their related stats. You can optionally include "buddies", "guilds", as well as the user's "top" and "hot" items

### Guild

**`user(id, options)`**

Calls the `guild` endpoint to retrieve a "guild" by id. You can optionally include  a list of users that belong to the guild.

### Plays

**`plays(id, options)`**

Calls the `plays` endpoint to retrieve a list of "plays" by the id of a "thing" or "user".

### Collection

**`user(username, options)`**

Calls the `collection` endpoint to retrieve a users collection by their username. Can be filtered using various options detailed [here](https://boardgamegeek.com/wiki/page/BGG_XML_API2#toc13).

### Forum List

**`forumList(id, options)`**

Calls the "forumlist" endpoint to retrieve a list of "forums" for a given "thing" by the thing id.

### Forum

**`forum(id, options)`**

Calls the "forum" endpoint to retrieve a "forum", or list of "threads", by forum id.

### Thread

**`thread(id, options)`**

Calls the "thread" endpoint to retrieve a forum "thread" by thread id.

## Example

```ts
import { BoardGameGeekClient } from 'bgg-client';
const bgg = new BoardGameGeekClient('your-api-key');

const results = await bgg.search('Cascadia');
const game = await bgg.thing('342942'); // Cascadia's BGG ID
const hot = await bgg.hot();
```

## Additional Info

Refer to the [BGG XML API2 docs](https://boardgamegeek.com/wiki/page/BGG_XML_API2) for documentation on all endpoints, and their options.

## Dependencies

- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [try-catcher-ts](https://github.com/ghall89/try-catcher-ts)
