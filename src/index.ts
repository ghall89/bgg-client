import { BoardGameGeekClient } from './lib/bgg-client';
import { ApiClient } from './lib/api-client';

export { BoardGameGeekClient, ApiClient };
export * from './lib/types';

export default new BoardGameGeekClient();
