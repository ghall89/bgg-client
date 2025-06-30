import { tryCatch } from 'try-catcher-ts';

import { SearchResult, GameDetails } from './types';
import { parseResults, parseGameData } from './parsers';
import { getRequest } from './api';

/**
 * Search the BGG API for the given query and return an array of results.
 */
export async function search(
  query: string,
): Promise<SearchResult[] | undefined> {
  const path = `/xmlapi2/search?query=${query}`;

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
  const path = `/xmlapi/boardgame/${id}`;

  const response = await tryCatch(
    () => getRequest(path, parseGameData),
    'Error fetching game via API by ID',
  );

  return response;
}
