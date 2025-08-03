import type { ThingType } from './enums';

export type BggSearchResponse = SearchResult[];
export type BggDetailsResponse = GameDetails;

export interface SearchResult {
  bggId: string;
  title: string;
  type: ThingType;
}

export interface HotItem {
  bggId: string;
  name: string;
  rank: number;
  thumbnail: string;
  yearpublished: string;
}

export interface GameDetails {
  bggId: string;
  title: string;
  img: string;
  thumbnail: string;
  yearPublished: number;
  description: string;
  minPlayers?: number;
  maxPlayers?: number;
  avgPlaytime?: number;
  minPlaytime?: number;
  maxPlaytime?: number;
  minPlayerAge?: number;
  polls: PollItem[];
  links: Link[];
  stats?: {
    ranks: RankItem[];
    owned: number;
    trading: number;
    wanting: number;
    wishing: number;
    complexity: number;
  };
}

interface Link {
  id: string;
  type: string;
  value: string;
}

interface RankItem {
  type: string;
  key: string;
  name: string;
  value: number;
}

interface PollItem {
  name: string;
  results:
    | PollResult[]
    | {
        players: number;
        results: PollResult[];
      }[];
}

interface PollResult {
  value: string;
  votes: number;
}
