import bgg from './src';

async function test() {
  const data = await bgg.search('Knarr');

  console.log(JSON.stringify(data, null, 2));
}

test();
