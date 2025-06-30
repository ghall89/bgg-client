import { search } from '../src/index';

async function main() {
  const games = await search('Catan', 'boardgameexpansion');

  console.log(games);
}

main();
