import bgg from './src';

async function test() {
  const data = await bgg.thing(379629, { versions: true });

  console.log(JSON.stringify(data, null, 2));
}

test();
