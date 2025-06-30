import { gameById } from '../src/index';

async function main() {
  const game = await gameById('13');

  console.log(game);
}

main();
