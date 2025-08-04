import { BoardGameGeekClient } from './lib/bgg-client';
import { ApiClient } from './lib/api-client';

const bgg = new BoardGameGeekClient();

export default bgg;
export { BoardGameGeekClient, ApiClient };
export type { ThingDetails, HotItem, SearchResult } from './lib/types';

const api = new ApiClient();
