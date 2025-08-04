import type { ThingType, LinkType } from './enums';

export interface SearchResult {
  id: string;
  type: ThingType;
  name: ValueAttribute;
}

export interface HotItem {
  id: string;
  rank: string;
  thumbnail: ValueAttribute;
  name: ValueAttribute;
  yearpublished: ValueAttribute;
}

export interface ThingDetails {
  type: string;
  id: string;
  thumbnail: string;
  image: string;
  name: {
    type?: 'primary' | 'alternate';
    value: string;
  }[];
  description: string;
  yearpublished: ValueAttribute;
  minplayers: ValueAttribute;
  maxplayers: ValueAttribute;
  playingtime: {
    value: string;
  };
  minplaytime: ValueAttribute;
  maxplaytime: {
    value: string;
  };
  minage: ValueAttribute;
  poll: PollItem[];
  link: {
    type: LinkType;
    id: string;
    value: string;
  }[];
  statistics?: {
    page: string;
    ratings: {
      usersrated: ValueAttribute;
      average: ValueAttribute;
      bayesaverage: ValueAttribute;
      ranks: {
        rank: Rank[];
      };
      stddev: ValueAttribute;
      median: ValueAttribute;
      owned: ValueAttribute;
      trading: ValueAttribute;
      wanting: ValueAttribute;
      wishing: ValueAttribute;
      numcomments: ValueAttribute;
      numweights: ValueAttribute;
      averageweight: ValueAttribute;
    };
  };
}

interface ValueAttribute {
  value: string;
}

interface Rank {
  type: string;
  id: string;
  name: string;
  friendlyname: string;
  value: string;
  bayesaverage: string;
}

export interface PollItem {
  name: string;
  results: PollResult | PollResult[];
}

export interface PollResult {
  numplayers?: string;
  result: PollResultItem[];
}

export interface PollResultItem {
  value: string;
  numvotes: string;
}
