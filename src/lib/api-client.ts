import { XMLParser, X2jOptions } from 'fast-xml-parser';

import { Endpoint } from './types';

export class ApiClient {
  private domain = 'boardgamegeek';
  private endpoint = 'xmlapi2';

  private lastCalled = 0;
  private waitTime: number = 5000;

  private parser: XMLParser;
  private apiKey: string;

  constructor(apiKey: string) {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
      htmlEntities: true,
    });

    this.apiKey = apiKey;
  }

  setParserOptions(options: X2jOptions) {
    this.parser = new XMLParser(options);
  }

  setTimeout(waitTime: number) {
    this.waitTime = waitTime;
  }

  setDomain(domain: 'boardgamegeek' | 'rpggeek' | 'videogamegeek') {
    this.domain = domain;
  }

  setApiEndpoint(endpoint: 'xmlapi2' | 'xmlapi') {
    this.endpoint = endpoint;
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
    path: Endpoint,
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

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

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
    const pathArray: string[] = [];

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

    return `https://${this.domain}.com/${this.endpoint}/${path}${pathArray.length > 0 && '?'}${pathArray.join('&')}`;
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

    const data =
      object?.items?.item ||
      object?.user ||
      object?.guild ||
      object?.forums?.forum ||
      object?.forum ||
      object.thread;

    return data as T;
  }
}
