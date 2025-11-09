import { z } from 'zod';

// attributes

const stringValueAttribute = z.object({
  value: z.string(),
});

const urlValueAttribute = z.object({
  value: z.url(),
});

const dateValueAttribute = z.object({
  value: z.date(),
});

const numberValueAttribute = z.object({
  value: z
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .refine((value) => value === null || !isNaN(Number(value)), {
      message: 'Invalid number',
    })
    .transform((value) => (value === null ? null : Number(value))),
});

const thingName = z.object({
  type: z.enum(['primary', 'alternate']),
  sortindex: z.number(),
  value: z.string(),
});

const rank = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string(),
  friendlyname: z.string(),
  value: z.string(),
  bayesaverage: z.string(),
});

// enums

export const thingTypeEnum = z.enum([
  'boardgame',
  'boardgameexpansion',
  'boardgameaccessory',
  'boardgameintegration',
  'boardgamecompilation',
  'boardgameimplementation',
  'rpg',
  'rpgitem',
  'videogame',
]);

export const hotItemTypeEnum = z.enum([
  'boardgame',
  'rpg',
  'videogame',
  'boardgameperson',
  'rpgperson',
  'boardgamecompany',
  'rpgcompany',
  'videogamecompany',
]);

export const linkTypeEnum = z.enum([
  'boardgamecategory',
  'boardgamemechanic',
  'boardgamefamily',
  'boardgameexpansion',
  'boardgameaccessory',
  'boardgameimplementation',
  'boardgamedesigner',
  'boardgameartist',
  'boardgamepublisher',
]);

export const familyTypeEnum = z.enum([
  'rpg',
  'rpgperiodical',
  'boardgamefamily',
]);

export const domainTypeEnum = z.enum(['boardgame', 'rpg', 'videogame']);

// data

export const searchResult = z.object({
  id: z.string(),
  type: thingTypeEnum,
  name: stringValueAttribute,
});

export const hotItem = z.object({
  id: z.string(),
  rank: z.string(),
  thumbnail: urlValueAttribute,
  name: stringValueAttribute,
  yearpublished: numberValueAttribute,
});

export const pollResultItem = z.object({
  id: z.string(),
  numbvotes: z.number(),
});

export const pollResult = z.object({
  numplayers: z.number(),
  result: z.array(pollResultItem),
});

export const pollItem = z.object({
  name: z.string(),
  results: z.union([pollResult, z.array(pollResult)]),
});

export const linkItem = z.object({
  type: linkTypeEnum,
  id: z.string(),
  value: z.string(),
  inbound: z.boolean(),
});

export const comment = z.object({
  username: z.string(),
  rating: z.union([z.number(), z.literal('N/A')]),
  value: z.string(),
});

export const family = z.object({
  id: z.number(),
  type: familyTypeEnum,
  thumbnail: z.url(),
  image: z.url(),
  name: z.union([thingName, z.array(thingName)]),
  description: z.string(),
  link: z.array(linkItem),
});

export const userConnection = z.object({
  name: z.string(),
  id: z.number(),
});

export const userItem = z.object({
  rank: z.number(),
  type: z.string(),
  id: z.number(),
  name: z.string(),
});

export const collectionitem = z.object({
  name: z.object({
    '#text': z.string(),
    'sortindex': z.number(),
  }),
  yearpublished: z.number(),
  image: z.url(),
  thumbnail: z.url(),
  status: z.object({
    own: z.number(),
    prevowned: z.number(),
    fortrade: z.number(),
    want: z.number(),
    wanttoplay: z.number(),
    wanttobuy: z.number(),
    wishlist: z.number(),
    preordered: z.number(),
    lastmodified: z.date(),
  }),
  numplays: z.number(),
  objecttype: z.string(),
  objectid: z.number(),
  subtype: thingTypeEnum,
  collid: z.number(),
});

export const user = z.object({
  id: z.string(),
  name: z.string(),
  firstname: stringValueAttribute,
  lastname: stringValueAttribute,
  avatarlink: stringValueAttribute,
  yearregistered: numberValueAttribute,
  lastlogin: dateValueAttribute,
  stateorprovince: stringValueAttribute,
  country: stringValueAttribute,
  webaddress: urlValueAttribute,
  xboxaccount: stringValueAttribute,
  wiiaccount: stringValueAttribute,
  psnaccount: stringValueAttribute,
  battlenetaccount: stringValueAttribute,
  steamaccount: stringValueAttribute,
  traderrating: numberValueAttribute,
  buddies: z
    .object({
      buddy: z.array(userConnection).optional(),
      total: z.number(),
      page: z.number(),
    })
    .optional(),
  guilds: z
    .object({
      guild: z.array(userConnection).optional(),
      total: z.number(),
      page: z.number(),
    })
    .optional(),
  top: z
    .object({
      item: z.array(userItem),
      domain: domainTypeEnum,
    })
    .optional(),
  hot: z
    .object({
      item: z.array(userItem),
      domain: domainTypeEnum,
    })
    .optional(),
});

export const guildLocation = z.object({
  addr1: z.string(),
  addr2: z.string(),
  city: z.string(),
  stateorprovince: z.string(),
  postalcode: z.union([z.number(), z.string()]),
  country: z.string(),
});

export const guildMember = z.object({
  name: z.string(),
  date: z.date(),
});

export const guild = z.object({
  category: z.string(),
  website: z.string(),
  manager: z.string(),
  description: z.string(),
  location: guildLocation,
  members: z
    .object({
      member: z.array(guildMember),
      count: z.number(),
      page: z.number(),
    })
    .optional(),
  id: z.number(),
  name: z.string(),
  created: z.date(),
});

export const forumThread = z.object({
  id: z.number(),
  subject: z.string(),
  author: z.string(),
  numarticles: z.number(),
  postdate: z.date(),
  lastpostdate: z.date(),
});

export const forum = z.object({
  id: z.number(),
  groupid: z.number(),
  title: z.string(),
  noposting: z.number(),
  description: z.string(),
  numthreads: z.number(),
  numposts: z.number(),
  lastpostdate: z.date(),
  threads: z.array(forumThread).optional(),
});

export const article = z.object({
  subject: z.string(),
  body: z.string(),
  id: z.number(),
  username: z.string(),
  link: z.url(),
  postdate: z.date(),
  editdate: z.date(),
  numedits: z.number(),
});

export const thread = z.object({
  subject: z.string(),
  articles: z.array(article),
  id: z.number(),
  link: z.url(),
});

export const thingDetails = z.object({
  type: z.string(),
  id: z.string(),
  thumbnail: z.url(),
  image: z.url(),
  name: z.union([thingName, z.array(thingName)]),
  description: z.string(),
  yearpublished: numberValueAttribute,
  minplayers: numberValueAttribute,
  maxplayers: numberValueAttribute,
  playingtime: z.object({
    value: z.string(),
  }),
  minplaytime: numberValueAttribute,
  maxplaytime: numberValueAttribute,
  poll: z.array(pollItem),
  link: z.array(linkItem),
  statistics: z
    .object({
      page: z.string(),
      ratings: z.object({
        usersrated: numberValueAttribute,
        average: numberValueAttribute,
        bayesaverage: numberValueAttribute,
        ranks: {
          rank: z.array(rank),
        },
        stddev: numberValueAttribute,
        median: numberValueAttribute,
        trading: numberValueAttribute,
        wanting: numberValueAttribute,
        wishing: numberValueAttribute,
        numcomments: numberValueAttribute,
        numweights: numberValueAttribute,
        averageweight: numberValueAttribute,
      }),
    })
    .optional(),
  versions: z
    .object({
      item: z.array(
        z.object({
          thumbnail: z.url(),
          image: z.url(),
          link: z.array(linkItem),
          name: z.union([thingName, z.array(thingName)]),
          yearpublished: numberValueAttribute,
          productcode: stringValueAttribute,
          width: numberValueAttribute,
          length: numberValueAttribute,
          depth: numberValueAttribute,
          weight: numberValueAttribute,
          type: z.string(),
          id: z.number(),
        }),
      ),
    })
    .optional(),
  videos: z
    .object({
      video: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          category: z.string(),
          language: z.string(),
          username: z.string(),
          userid: z.number(),
          postdate: z.date(),
        }),
      ),
    })
    .optional(),
  comments: z
    .object({
      comment: z.array(comment),
    })
    .optional(),
});
