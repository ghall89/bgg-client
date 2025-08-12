#!/usr/bin/env ts-node
import prompts from 'prompts';
import { Choice } from 'prompts';
import bgg from '../src';
import { ThingTypeEnum } from '../src/lib/types';

(async () => {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'id',
        message: `Thing ID`,
      },
      {
        type: 'multiselect',
        name: 'type',
        message: 'Pick thing type',
        choices: Object.values(ThingTypeEnum)
          .filter((type) => typeof type === 'string')
          .map(
            (type): Choice => ({
              title: type as string,
              value: type as string,
            }),
          ),
      },
      {
        type: 'number',
        name: 'page',
        message: 'Page',
      },
      {
        type: 'number',
        name: 'pagesize',
        message: 'Page Size',
      },
      {
        type: 'multiselect',
        name: 'include',
        message: 'Include additional data',
        choices: [
          'versions',
          'videos',
          'stats',
          'comments',
          'ratingcomments',
        ].map(
          (option): Choice => ({
            title: option,
            value: option,
          }),
        ),
      },
    ]);

    let additionalData = {};

    for (const option in response.include) {
      additionalData[option] = true;
    }

    const results = await bgg.thing(response.id, {
      type: response.type,
      page: response.page,
      pagesize: response.pagesize,
      ...additionalData,
    });
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exitCode = 1;
  }
})();
