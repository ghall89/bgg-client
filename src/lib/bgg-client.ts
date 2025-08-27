import { tryCatch } from 'try-catcher-ts';
import { ApiClient } from './api-client';

import type {
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
  CollectionItem,
  Guild,
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
   * Search the BoardGameGeek (BGG) API for items matching the given query.
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
   * Request detailed information about a specific item (thing) from the BGG API by ID.
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
   * Request a list of hot items (popular items) from the BGG API.
   *
   * @param options - Optional parameters to filter hot items.
   * @param options.type - The type or types of hot items to fetch (e.g., boardgame, boardgameperson).
   * @returns A promise that resolves to a list of hot items.
   */
  async hot(options?: { type?: HotItemType | HotItemType[] }) {
    return this.request<HotItem[]>('hot', options);
  }

  /**
   * Request a "family" with associated things from the BGG API.
   *
   * @param id - The unique identifier of the family to fetch.
   * @param options - Optional parameters for the request.
   * @param options.type - The type or types of family to fetch (e.g., boardgamefamily, rpgperiodical).
   * @returns A promise that resolves to a family with a list of associated things.
   */
  async family(
    id: number,
    options?: { type: FamilyType | FamilyType[] },
  ): Promise<Family | undefined> {
    return this.request<Family>('family', { id, ...options });
  }

  /**
   * Request a user from the BGG API.
   *
   * @param name - The unique username of the user to fetch.
   * @param options - Optional parameters for the request.
   * @param options.buddies - Turns on optional buddies reporting.
   * @param options.guilds - Turns on optional guilds reporting.
   * @param options.hot - Include the user's hot 10 list from their profile.
   * @param options.top - Include the user's top 10 list from their profile.
   * @param options.domain - Controls the domain for the users hot 10 and top 10 lists.
   * @param options.page - Specifies the page of buddy and guild results to return.
   * @returns A promise that resolves to a user, or undefined if an error occurs.
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

  /**
   * Request information about particular guilds.
   *
   * @param id - The unique identifier of the guild to fetch.
   * @param options - Optional parameters for the request.
   * @param options.members -	Include member roster in the results. Member list is paged and sorted.
   * @param options.sort - Specifies how to sort the members list (e.g., username, date)
   * @param options.page - The page of the members list to return. Page size is 25.
   * @returns A promise that resolves to a guild, or undefined if an error occurs.
   */
  async guild(
    id: number,
    options?: {
      members?: boolean;
      sort?: 'username' | 'date';
      page?: number;
    },
  ): Promise<Guild | undefined> {
    return this.request<Guild>('guild', { id, ...options });
  }

  /**
   * Request plays logged by a particular user or for a particular item.
   *
   * @param id - Name of the player or id of item you want to request play information for.
   * @param options - Optional parameters for the request.
   * @param options.type - Type of the item you want to request play information for. (e.g. thing, family)
   * @param options.subtype - Limits play results to the specified type.
   * @param options.page -  The page of information to request. Page size is 100.
   * @returns A promise that resolves to a list of play records for the given user or item.
   */
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

  /**
   * Request details of a user's collection.
   *
   * @param username - Name of the user to request the collection for.
   * @param options - Optional parameters for the request.
   * @param options.version - Returns version info for each item in the requested collection.
   * @param options.subtype -Specifies which collection type you want to retrieve.
   * @param options.excludesubtype - Specifies which subtype you want to exclude from the results.
   * @param options.id - Filter collection to specifically listed item(s).
   * @param options.brief - Returns more abbreviated results.
   * @param options.stats - Returns expanded rating/ranking info for the collection.
   * @param options.own - Filter for owned games.
   * @param options.rated - Filter for whether an item has been rated.
   * @param options.played - Filter for whether an item has been played.
   * @param options.comment - Filter for items that have been commented.
   * @param options.trade - Filter for items marked for trade.
   * @param options.want - Filter for items wanted in trade.
   * @param options.wishlist - Filter for items on the wishlist.
   * @param options.wishlistpriority - Filter for wishlist priority.
   * @param options.preordered - Filter for pre-ordered games.
   * @param options.wanttoplay - Filter for items marked as wanting to play.
   * @param options.wanttobuy - Filter for items marked as wanting to buy.
   * @param options.prevowned - Filter for games marked previously owned.
   * @param options.hasparts - Filter on whether there is a comment in the "Has Parts" field of the item.
   * @param options.wantparts - Filter on whether there is a comment in the "Wants Parts" field of the item.
   * @param options.minrating -	Filter on minimum personal rating assigned for that item in the collection.
   * @param options.rating - Filter on maximum personal rating assigned for that item in the collection.
   * @param options.minbggrating - Filter on minimum BGG rating for that item in the collection.
   * @param options.bggrating - Filter on maximum BGG rating for that item in the collection.
   * @param options.minplays - Filter by minimum number of recorded plays.
   * @param options.maxplays - Filter by maximum number of recorded plays.
   * @param options.showprivate - Filter to show private collection info.
   * @param options.collid - Restrict the collection results to the single specified collection id.
   * @param options.modifiedsince - Restricts the collection results to only those whose status (own, want, fortrade, etc.) has changed or been added since the date specified.
   * @returns A promise that resolves to a user collection, or undefined if an error occurs.
   */
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
      rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
      minbggrating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
      bggrating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
      minplays?: number;
      maxplays?: number;
      showprivate?: boolean;
      collid?: number;
      modifiedsince?: Date;
    },
  ): Promise<CollectionItem[]> {
    return this.request<CollectionItem[]>('collection', {
      username,
      ...options,
    });
  }

  /**
   * Request a list of forums for an item.
   *
   * @param id - Specifies the id of the type of database entry you want the forum list for.
   * @param options - Optional parameters for the request.
   * @param options.type - The type of entry in the database.
   */
  async forumList(id: number, options?: { type?: 'thing' | 'family' }) {
    return this.request('forumlist', { id, ...options });
  }

  /**
   * Request a list of forums for an item.
   *
   * @param id - Specifies the id of the type of database entry you want the forum list for.
   * @param options - Optional parameters for the request.
   * @param options.type - The type of entry in the database.
   */
  async forum(id: number, options?: { page?: number }) {
    return this.request('forum', { id, ...options });
  }

  /**
   * Request a forum thread.
   *
   * @param id - Specifies the id of the thread to retrieve.
   * @param options - Optional parameters for the request.
   * @param options.minarticleid - Filters the results so that only articles with an equal or higher id than "minarticleid" will be returned.
   * @param options.minarticledate - Filters the results so that only articles on the specified date or later will be returned.
   * @param options.count - Limits the number of articles returned.
   */
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
