import { tryCatch } from 'try-catcher-ts';
import { XMLParser } from 'fast-xml-parser';

import { SearchResult, ThingDetails, ThingType, HotItem } from './types';

export class BoardGameGeekClient {
  private BASE_URL = 'https://boardgamegeek.com' as const;
  private APIV2_ENDPOINT = 'xmlapi2' as const;

  private lastCalled = 0;
  private waitTime = 5000;

  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
  }

  /**
   * Handle request to the BGG API
   */
  private async getRequest<T>(path: string): Promise<T> {
    const now = Date.now();
    const timeSinceLast = now - this.lastCalled;

    if (timeSinceLast < this.waitTime) {
      const delay = this.waitTime - timeSinceLast;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    this.lastCalled = Date.now();

    const url = `${this.BASE_URL}/${this.APIV2_ENDPOINT}/${path}`;

    const response = await fetch(url);

    if (!response?.ok) {
      throw new Error(`Response status: ${response?.status}`);
    }

    return this.parseXmlResponse<T>(response);
  }

  /**
   * Parses an XML HTTP response using a custom parsing function.
   */
  async parseXmlResponse<T>(response: Response): Promise<T> {
    const xml = await response.text();
    const object = this.parser.parse(xml, true);

    return object.items.item as T;
  }

  private createUrlWithParams(
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
    const path = this.createUrlWithParams(
      `search?query=${encodeURIComponent(query)}`,
      options,
    );

    const response = await tryCatch(
      () => this.getRequest<SearchResult[]>(path),
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
    const path = this.createUrlWithParams(`thing?id=${id}`, options);

    const response = await tryCatch(
      () => this.getRequest<ThingDetails>(path),
      'Error fetching thing by ID',
    );

    return response;
  }

  async hot(options?: { type?: ThingType | ThingType[] }) {
    const path = this.createUrlWithParams('hot');

    const response = await tryCatch(
      () => this.getRequest<HotItem>(path),
      'Error fetching thing by ID',
    );

    return response;
  }
}
