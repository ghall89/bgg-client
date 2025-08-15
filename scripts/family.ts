#!/usr/bin/env ts-node
import prompts from 'prompts';

import bgg from '../src';

(async () => {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'id',
        message: `Family ID`,
      },
    ]);

    const results = await bgg.family(response.id);

    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exitCode = 1;
  }
})();
