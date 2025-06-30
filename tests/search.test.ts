import { search } from '../src/index';

async function main() {
  const games = await search('Catan');

  console.log(games);
}

main();
