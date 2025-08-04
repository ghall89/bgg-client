import { tryCatch } from 'try-catcher-ts';
import { ApiClient } from './api-client';

import {
  SearchResult,
  ThingDetails,
  ThingType,
  HotItem,
  HotItemType,
} from './types';

export class BoardGameGeekClient {
  private api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  /**
   * Searches the BoardGameGeek (BGG) API for items matching the given query.
   *
   * @param query - The search query string.
   * @param options - Optional parameters to refine the search.
   * @param options.type - The type or types of items to search for (e.g., boardgame, expansion).
   * @param options.exact - If true, performs an exact match search.
   * @returns A promise that resolves to an array of search results.
   */
  async search(
    query: string,
    options?: {
      type?: ThingType | ThingType[];
      exact?: boolean;
    },
  ): Promise<SearchResult[]> {
    const response = await tryCatch(
      () =>
        this.api.getRequest<SearchResult[]>('search', { query, ...options }),
      'Error searching BGG API',
    );

    return response ?? [];
  }

  /**
   * Fetches detailed information about a specific item (thing) from the BGG API by ID.
   *
   * @param id - The unique identifier of the item to fetch.
   * @param options - Optional parameters for the request.
   * @param options.type - The type or types of the item (e.g., boardgame, boardgameexpansion).
   * @param options.stats - If true, includes statistics in the response.
   * @returns A promise that resolves to the item's details, or undefined if an error occurs.
   */
  async thing(
    id: number,
    options?: {
      type?: ThingType | ThingType[];
      versions?: boolean;
      // videos?: boolean;
      stats?: boolean;
      // comments?: boolean;
      // ratingcomments?: boolean;
    },
  ): Promise<ThingDetails | undefined> {
    const response = await tryCatch(
      () => this.api.getRequest<ThingDetails>('thing', { id, ...options }),
      'Error fetching thing by ID',
    );

    return response;
  }

  /**
   * Fetches a list of hot items (popular items) from the BGG API.
   *
   * @param options - Optional parameters to filter hot items.
   * @param options.type - The type or types of hot items to fetch (e.g., boardgame, boardgameperson).
   * @returns A promise that resolves to a list of hot items.
   */
  async hot(options?: { type?: HotItemType | HotItemType[] }) {
    const response = await tryCatch(
      () => this.api.getRequest<HotItem>('hot', options),
      'Error fetching thing by ID',
    );

    return response;
  }
}
