import { tryCatch } from 'try-catcher-ts';

import { SearchResult, GameDetails, ThingType } from './types';
import { parseResults, parseGameData } from './parsers';
import { getRequest } from './api';

/**
 * Search the BGG API for the given query and return an array of results.
 */
export async function search(
  query: string,
  options?: {
    type?: ThingType | ThingType[];
    exact?: boolean;
  },
): Promise<SearchResult[]> {
  const path = createUrlWithParams(
    `/xmlapi2/search?query=${encodeURIComponent(query)}`,
    options,
  );

  const response = await tryCatch(
    () => getRequest(path, parseResults),
    'Error searching BGG API',
  );

  return response ?? [];
}

/**
 * Fetch a thing from BGG API by its ID and return the response
 */
export async function thing(
  id: string,
  options?: {
    type?: ThingType | ThingType[];
    // versions?: boolean;
    // videos?: boolean;
    stats?: boolean;
    // comments?: boolean;
    // ratingcomments?: boolean;
  },
): Promise<GameDetails | undefined> {
  const path = createUrlWithParams(`/xmlapi2/thing?id=${id}`, options);

  const response = await tryCatch(
    () => getRequest(path, parseGameData),
    'Error fetching thing by ID',
  );

  return response;
}

export async function hot(options?: { type?: ThingType | ThingType[] }) {
  const path = createUrlWithParams('/xmlapi2/hot', options);

  const response = await tryCatch(
    () => getRequest(path, parseResults),
    'Error fetching thing by ID',
  );

  return response;
}

function createUrlWithParams(
  path: string,
  options: { [k: string]: any } = {},
): string {
  const pathArray: string[] = [path];

  for (const key of Object.keys(options)) {
    const value = options[key];

    if (value === undefined || value === null) continue;

    if (typeof value === 'boolean') {
      pathArray.push(`${key}=${value ? '1' : '0'}`);
    } else if (Array.isArray(value)) {
      pathArray.push(`${key}=${encodeURIComponent(value.join(','))}`);
    } else {
      pathArray.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return pathArray.join('&');
}
