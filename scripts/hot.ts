#!/usr/bin/env ts-node
import prompts from 'prompts';
import { Choice } from 'prompts';
import bgg from '../src';
import { HotItemTypeEnum } from '../src/lib/types';

(async () => {
  try {
    const response = await prompts([
      {
        type: 'multiselect',
        name: 'type',
        message: 'Pick thing type',
        choices: Object.values(HotItemTypeEnum)
          .filter((type) => typeof type === 'string')
          .map(
            (type): Choice => ({
              title: type as string,
              value: type as string,
            }),
          ),
      },
    ]);

    const results = await bgg.hot({
      type: response.type,
    });
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exitCode = 1;
  }
})();
