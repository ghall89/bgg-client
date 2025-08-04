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
    this.api = new ApiClient('xmlapi2');
  }

  /**
   * Search the BGG API for the given query and return an array of results.
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
   * Fetch a thing from BGG API by its ID and return the response
   */
  async thing(
    id: string,
    options?: {
      type?: ThingType | ThingType[];
      // versions?: boolean;
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
   * Fetch a thing from BGG API by its ID and return the response
   */
  async hot(options?: { type?: HotItemType | HotItemType[] }) {
    const response = await tryCatch(
      () => this.api.getRequest<HotItem>('hot', options),
      'Error fetching thing by ID',
    );

    return response;
  }
}
