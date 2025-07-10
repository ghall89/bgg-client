import { search } from '../src/index';

async function main() {
  const games = await search('Catan', ['boardgame', 'boardgameexpansion']);

  console.log(JSON.stringify(games, null, 2));
}

main();
