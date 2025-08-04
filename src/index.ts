import { BoardGameGeekClient } from './lib/bgg-client';

const bgg = new BoardGameGeekClient();

export default bgg;

export type { ThingDetails, HotItem, SearchResult } from './lib/types';
