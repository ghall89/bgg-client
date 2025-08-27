#!/usr/bin/env ts-node
import prompts from 'prompts';
import { Choice } from 'prompts';

import bgg from '../src';

(async () => {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'id',
        message: `Guild ID`,
      },
      {
        type: 'toggle',
        name: 'members',
        message: 'Members',
        initial: false,
      },
      {
        type: 'select',
        name: 'sort',
        message: 'Sort',
        choices: ['username', 'date'].map(
          (option): Choice => ({
            title: option,
            value: option,
          }),
        ),
      },
      {
        type: 'number',
        name: 'page',
        message: 'Page',
      },
    ]);

    const res = await bgg.guild(response.id, {
      members: response.members,
      sort: response.sort,
      page: response.page,
    });

    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exitCode = 1;
  }
})();
