#!/usr/bin/env ts-node
import prompts from 'prompts';
import { Choice } from 'prompts';
import bgg from '../src';

(async () => {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'name',
        message: `User name`,
      },
    ]);

    // let additionalData = {};

    // for (const option in response.include) {
    //   additionalData[response.include[option]] = true;
    // }

    const res = await bgg.collection(response.name, { bggrating: 7 });

    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exitCode = 1;
  }
})();
