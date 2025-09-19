import type { ThingType, LinkType, FamilyType, DomainType } from './enums';

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
  videos?: {
    video: {
      id: number;
      title: string;
      category: string;
      language: string;
      username: string;
      userid: number;
      postdate: Date;
    }[];
  };
  comments?: {
    comment: Comment[];
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
  inbound: boolean;
}

export interface Comment {
  username: string;
  rating: number | 'N/A';
  value: string;
}

export interface Family {
  id: number;
  type: FamilyType;
  thumbnail: string;
  image: string;
  name: ThingName | ThingName[];
  description: string;
  link: LinkItem[];
}

export interface User {
  id: number;
  name: string;
  firstname: StringValueAttribute;
  lastname: StringValueAttribute;
  avararlink: StringValueAttribute;
  yearregistered: NumberValueAttribute;
  lastlogin: StringValueAttribute;
  stateorprovince: StringValueAttribute;
  country: StringValueAttribute;
  webaddress: StringValueAttribute;
  xboxaccount: StringValueAttribute;
  wiiaccount: StringValueAttribute;
  psnaccount: StringValueAttribute;
  battlenetaccount: StringValueAttribute;
  steamaccount: StringValueAttribute;
  traderating: NumberValueAttribute;
  buddies?: {
    buddy?: UserConnection[];
    total: number;
    page: number;
  };
  guilds?: {
    guild?: UserConnection[];
    total: number;
    page: number;
  };
  top?: {
    item: UserItem[];
    domain: DomainType;
  };
  hot?: {
    item: UserItem[];
    domain: DomainType;
  };
}

export interface UserConnection {
  name: string;
  id: number;
}

export interface UserItem {
  rank: number;
  type: string;
  id: number;
  name: string;
}

export interface CollectionItem {
  name: {
    '#text': string;
    'sortindex': number;
  };
  yearpublished: number;
  image: string;
  thumbnail: string;
  status: {
    own: number;
    prevowned: number;
    fortrade: number;
    want: number;
    wanttoplay: number;
    wanttobuy: number;
    wishlist: number;
    preordered: number;
    lastmodified: Date;
  };
  numplays: number;
  objecttype: string;
  objectid: number;
  subtype: ThingType;
  collid: number;
}

export interface Guild {
  category: string;
  website: string;
  manager: string;
  description: string;
  location: GuildLocation;
  members?: {
    member: GuildMember[];
    count: number;
    page: number;
  };
  id: number;
  name: string;
  creeated: Date;
}

export interface GuildLocation {
  addr1: string;
  addr2: string;
  city: string;
  stateorprovince: string;
  postalcode: number | string;
  country: string;
}

export interface GuildMember {
  name: string;
  date: Date;
}

export interface Forum {
  id: number;
  groupid: number;
  title: string;
  noposting: number;
  description: string;
  numthreads: number;
  numposts: number;
  lastpostdate: Date;
  threads?: ForumThread[];
}

export interface ForumThread {
  id: number;
  subject: string;
  author: string;
  numarticles: number;
  postdate: Date;
  lastpostdate: Date;
}

export interface Thread {
  subject: string;
  articles: {
    article: Article[];
  };
  id: number;
  link: string;
}

export interface Article {
  subject: string;
  body: string;
  id: number;
  username: string;
  link: string;
  postdate: Date;
  editdate: Date;
  numedits: number;
}
