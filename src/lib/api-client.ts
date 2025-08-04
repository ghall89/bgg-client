import { XMLParser } from 'fast-xml-parser';

export class ApiClient {
  private BASE_URL = 'https://boardgamegeek.com/xmlapi2' as const;

  private lastCalled = 0;
  private waitTime: number;

  private parser: XMLParser;

  constructor(config?: { waitTime?: number }) {
    this.waitTime = config?.waitTime ?? 5000;
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
      htmlEntities: true,
    });
  }

  /**
   * Makes a GET request to one of the supported BoardGameGeek API endpoints.
   * Enforces a delay between requests to respect BGG's rate limiting recommendations.
   *
   * @template T - The expected shape of the parsed response.
   * @param path - The endpoint path to call (e.g., 'thing', 'search', 'hot').
   * @param options - An object representing query parameters to append to the request.
   * @returns A promise resolving to the parsed and simplified XML response.
   * @throws If the response status is not OK.
   */
  async getRequest<T>(
    path:
      | 'collection'
      | 'family'
      | 'forum'
      | 'forumlist'
      | 'guild'
      | 'hot'
      | 'plays'
      | 'search'
      | 'thing'
      | 'thread'
      | 'user',
    options: { [k: string]: any } = {},
  ): Promise<T> {
    const now = Date.now();
    const timeSinceLast = now - this.lastCalled;

    if (timeSinceLast < this.waitTime) {
      const delay = this.waitTime - timeSinceLast;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    this.lastCalled = Date.now();

    const url = this.createUrlWithParams(path, options);

    const response = await fetch(url);

    if (!response?.ok) {
      throw new Error(`Response status: ${response?.status}`);
    }

    return this.parseXmlResponse<T>(response);
  }

  /**
   * Constructs a full request URL with encoded query parameters.
   *
   * @param path - The base endpoint path.
   * @param options - An object of key-value pairs to be converted into query parameters.
   * @returns A full URL string with query parameters appended.
   */
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

    return `${this.BASE_URL}/${path}${pathArray.length > 0 && '?'}${pathArray.join('&')}`;
  }

  /**
   * Converts a raw XML HTTP response into a parsed JavaScript object using fast-xml-parser.
   *
   * @template T - The expected return type after parsing.
   * @param response - The Response object received from a fetch request.
   * @returns A promise resolving to the parsed object data.
   */
  private async parseXmlResponse<T>(response: Response): Promise<T> {
    const xml = await response.text();
    const object = this.parser.parse(xml, true);

    return object.items.item as T;
  }
}
