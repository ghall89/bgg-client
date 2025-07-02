import { gameById } from '../src/index';

async function main() {
  const game = await gameById('13');

  console.log(JSON.stringify(game, null, 2));
}

main();
