import { tryCatch } from 'try-catcher-ts';

import { SearchResult, GameDetails, ThingType } from './types';
import { parseResults, parseGameData } from './parsers';
import { getRequest } from './api';

/**
 * Search the BGG API for the given query and return an array of results.
 */
export async function search(
  query: string,
  type: ThingType | ThingType[] = 'boardgame',
): Promise<SearchResult[] | undefined> {
  const thingType = Array.isArray(type) ? type.join(',') : type;

  const path = `/xmlapi2/search?query=${query}&type=${thingType}`;

  const response = await tryCatch(
    () => getRequest(path, parseResults),
    'Error searching BGG API',
  );

  return response;
}

/**
 * Fetch a board game from BGG API by its ID and return the response
 */
export async function gameById(id: string): Promise<GameDetails | undefined> {
  const path = `/xmlapi2/thing?id=${id}`;

  const response = await tryCatch(
    () => getRequest(path, parseGameData),
    'Error fetching game via API by ID',
  );

  return response;
}
