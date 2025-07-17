import { search } from '../src/index';

async function main() {
  const games = await search('7 Wonders', {
    type: ['boardgame', 'boardgameexpansion'],
    exact: true,
  });

  console.log(JSON.stringify(games, null, 2));
}

main();
