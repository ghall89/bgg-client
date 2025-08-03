import { BoardGameGeekClient } from './lib/bgg-client';

const bgg = new BoardGameGeekClient();

export default bgg;

export type { GameDetails, SearchResult } from './lib/types';
