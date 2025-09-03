import bgg from './src/index';

(() => {
  bgg
    .thread(1087157)
    .then((result) => console.log(JSON.stringify(result, null, 2)));
})();
