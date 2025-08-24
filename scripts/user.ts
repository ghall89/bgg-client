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
      {
        type: 'multiselect',
        name: 'include',
        message: 'Include additional data',
        choices: ['guilds', 'buddies', 'hot', 'top'].map(
          (option): Choice => ({
            title: option,
            value: option,
          }),
        ),
      },
    ]);

    let additionalData = {};

    for (const option in response.include) {
      additionalData[response.include[option]] = true;
    }

    const res = await bgg.user(response.name, {
      ...additionalData,
    });

    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exitCode = 1;
  }
})();
