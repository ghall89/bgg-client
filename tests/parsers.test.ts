import { readFileSync } from 'fs';
import { join } from 'path';

import { parseGameData, parseResults } from '../src/lib/parsers';

describe('parsers', () => {
  test('parseGameData', () => {
    const xmlPath = join(__dirname, 'fixtures', 'game-details.xml');
    const xmlData = readFileSync(xmlPath, 'utf-8');

    const result = parseGameData(xmlData);
    expect(result.title).toEqual('7 Wonders');
  });
  test('parseResults', () => {
    const xmlPath = join(__dirname, 'fixtures', 'search-results.xml');
    const xmlData = readFileSync(xmlPath, 'utf-8');

    const result = parseResults(xmlData);
    expect(result).toBeDefined();
    expect(result?.[0].bggId).toBeDefined();
  });
});
