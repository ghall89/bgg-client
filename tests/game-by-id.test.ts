import { gameById } from '../src/index';

async function main() {
  const game = await gameById('68448', { stats: true });

  console.log(JSON.stringify(game, null, 2));
}

main();
