import { tryCatch } from 'try-catcher-ts';
import { ApiClient } from './api-client';

import {
  Endpoint,
  SearchResult,
  ThingDetails,
  ThingType,
  HotItem,
  HotItemType,
  FamilyType,
  Family,
  User,
  DomainType,
} from './types';

export class BoardGameGeekClient {
  private api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  setTimeout(waitTime: number) {
    this.api.setTimeout(waitTime);
  }

  private async request<T>(
    endpoint: Endpoint,
    options: { [k: string]: any } = {},
  ): Promise<T> {
    const response = await tryCatch(
      () => this.api.getRequest<T>(endpoint, options),
      'Error fetching data from BGG API',
    );

    return response;
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
    return this.request<SearchResult[]>('search', { query, ...options }) ?? [];
  }

  /**
   * Fetches detailed information about a specific item (thing) from the BGG API by ID.
   *
   * @param id - The unique identifier of the item to fetch.
   * @param options - Optional parameters for the request.
   * @param options.type - The type or types of the item (e.g., boardgame, boardgameexpansion).
   * @param options.versions - If true, includes version info in the response.
   * @param options.videos - If true, includes videos in the response.
   * @param options.stats - If true, includes ranking and rating stats in the response.
   * @param options.comments - If true, includes comments in the response.
   * @param options.ratingcomments - If true, includes comments with ratings in the response.
   * @param options.pagesize - Set the number of records to return in paging. Minimum is 10, maximum is 100.
   * @param options.page - Controls the page of data to see for historical info, comments, and ratings data.
   * @returns A promise that resolves to the item's details, or undefined if an error occurs.
   */
  async thing(
    id: number,
    options?: {
      type?: ThingType | ThingType[];
      versions?: boolean;
      videos?: boolean;
      stats?: boolean;
      comments?: boolean;
      ratingcomments?: boolean;
      pagesize?: number;
      page?: number;
    },
  ): Promise<ThingDetails | undefined> {
    return this.request<ThingDetails>('thing', { id, ...options });
  }

  /**
   * Fetches a list of hot items (popular items) from the BGG API.
   *
   * @param options - Optional parameters to filter hot items.
   * @param options.type - The type or types of hot items to fetch (e.g., boardgame, boardgameperson).
   * @returns A promise that resolves to a list of hot items.
   */
  async hot(options?: { type?: HotItemType | HotItemType[] }) {
    return this.request<HotItem[]>('hot', options);
  }

  /**
   * Fetches a "family" with associated things from the BGG API.
   *
   * @param id - The unique identifier of the family to fetch.
   * @param options - Optional parameters for the request.
   * @param options.type - The type or types of family to fetch (e.g., boardgamefamily, rpgperiodical).
   * @returns A promise that resolves to a BGG "family" with a list of associated things.
   */
  async family(
    id: number,
    options?: { type: FamilyType | FamilyType[] },
  ): Promise<Family | undefined> {
    return this.request<Family>('family', { id, ...options });
  }

  /**
   * Fetches a user from the BGG API.
   *
   * @param name - The unique username of the user to fetch.
   * @param options - Optional parameters for the request.
   * @param options.buddies - Turns on optional buddies reporting.
   * @param options.guilds - Turns on optional guilds reporting.
   * @param options.hot - Include the user's hot 10 list from their profile.
   * @param options.top - Include the user's top 10 list from their profile.
   * @param options.domain - Controls the domain for the users hot 10 and top 10 lists.
   * @param options.page - Specifies the page of buddy and guild results to return.
   * @returns A promise that resolves to a BGG "user", or undefined if an error occurs.
   */
  async user(
    name: string,
    options?: {
      buddies?: boolean;
      guilds?: boolean;
      hot?: boolean;
      top?: boolean;
      domain?: DomainType;
      page?: number;
    },
  ): Promise<User | undefined> {
    return this.request<User>('user', { name, ...options });
  }

  /* TODO: Add type definitions and JSDocs to all
  endpoints below */

  async guild(
    id: number,
    options?: {
      members?: boolean;
      sort?: 'username' | 'date';
      page?: number;
    },
  ) {
    return this.request('guild', { id, ...options });
  }

  async plays(
    id: number | string,
    options?: {
      type?: 'thing' | 'family';
      subtype?: ThingType | ThingType[];
      page?: number;
    },
  ) {
    let dynamicOptions: object;

    if (typeof id === 'number') {
      dynamicOptions = { id, ...options };
    } else {
      dynamicOptions = { username: id, ...options };
    }

    return this.request('guild', dynamicOptions);
  }

  async collection(
    username: string,
    options?: {
      version?: boolean;
      subtype?: ThingType;
      excludesubtype?: ThingType;
      id?: number | number[];
      brief?: boolean;
      stats?: boolean;
      own?: boolean;
      rated?: boolean;
      played?: boolean;
      comment?: boolean;
      trade?: boolean;
      want?: boolean;
      wishlist?: boolean;
      wishlistpriority?: 1 | 2 | 3 | 4 | 5;
      preordered?: boolean;
      wanttoplay?: boolean;
      wanttobuy?: boolean;
      prevowned?: boolean;
      hasparts?: boolean;
      wantparts?: boolean;
      minrating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
      bggrating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
      minplays?: number;
      maxplays?: number;
      showprivate?: boolean;
      collid?: number;
      modifiedsince?: Date;
    },
  ) {
    return this.request('collection', { username, ...options });
  }

  async forumList(id: number, options?: { type?: 'thing' | 'family' }) {
    return this.request('forumlist', { id, ...options });
  }

  async forum(id: number, options?: { page?: number }) {
    return this.request('forum', { id, ...options });
  }

  async thread(
    id: number,
    options: {
      minarticleid?: number;
      minarticledate?: Date;
      count?: number;
    },
  ) {
    return this.request('thread', { id, ...options });
  }
}
