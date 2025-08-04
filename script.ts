import bgg from './src';

async function test() {
  const data = await bgg.thing('68448');

  console.log(JSON.stringify(data, null, 2));
}

test();
