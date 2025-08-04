import type { ThingType, LinkType } from './enums';

export interface SearchResult {
  id: string;
  type: ThingType;
  name: StringValueAttribute;
}

export interface HotItem {
  id: string;
  rank: string;
  thumbnail: StringValueAttribute;
  name: StringValueAttribute;
  yearpublished: NumberValueAttribute;
}

export interface ThingDetails {
  type: string;
  id: string;
  thumbnail: string;
  image: string;
  name: ThingName[];
  description: string;
  yearpublished: NumberValueAttribute;
  minplayers: NumberValueAttribute;
  maxplayers: NumberValueAttribute;
  playingtime: {
    value: string;
  };
  minplaytime: NumberValueAttribute;
  maxplaytime: NumberValueAttribute;
  minage: NumberValueAttribute;
  poll: PollItem[];
  link: LinkItem[];
  statistics?: {
    page: string;
    ratings: {
      usersrated: NumberValueAttribute;
      average: NumberValueAttribute;
      bayesaverage: NumberValueAttribute;
      ranks: {
        rank: Rank[];
      };
      stddev: NumberValueAttribute;
      median: NumberValueAttribute;
      owned: NumberValueAttribute;
      trading: NumberValueAttribute;
      wanting: NumberValueAttribute;
      wishing: NumberValueAttribute;
      numcomments: NumberValueAttribute;
      numweights: NumberValueAttribute;
      averageweight: NumberValueAttribute;
    };
  };
  versions?: {
    item: {
      thumbnail: string;
      image: string;
      link: LinkItem[];
      name: ThingName[];
      yearpublished: NumberValueAttribute;
      productcode: StringValueAttribute;
      width: NumberValueAttribute;
      length: NumberValueAttribute;
      depth: NumberValueAttribute;
      weight: NumberValueAttribute;
      type: string;
      id: number;
    }[];
  };
}

interface StringValueAttribute {
  value: string;
}

interface NumberValueAttribute {
  value: string;
}

interface ThingName {
  type: 'primary' | 'alternate';
  sortindex: number;
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

export interface LinkItem {
  type: LinkType;
  id: string;
  value: string;
}
