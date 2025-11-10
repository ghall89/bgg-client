import { z } from 'zod';

// attributes

const stringValueAttribute = z.object({
	value: z.string(),
});

const urlValueAttribute = z.object({
	value: z.union([z.url(), z.literal('')]),
});

const dateValueAttribute = z.object({
	value: z.coerce.date(),
});

const numberValueAttribute = z.object({
	value: z.number(),
});

const thingName = z.object({
	type: z.enum(['primary', 'alternate']),
	sortindex: z.number(),
	value: z.string(),
});

// Workaround for XML parser returning objects that should be arrays
export const coerceArray = <T extends z.ZodTypeAny>(schema: T) =>
	z.preprocess((v) => (Array.isArray(v) ? v : [v]), z.array(schema));

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
	'boardgameversion',
	'language',
]);

export const familyTypeEnum = z.enum([
	'rpg',
	'rpgperiodical',
	'boardgamefamily',
]);

export const domainTypeEnum = z.enum(['boardgame', 'rpg', 'videogame']);

// data

export const searchResult = z.object({
	id: z.number(),
	type: thingTypeEnum,
	name: stringValueAttribute,
});

export const hotItem = z.object({
	id: z.number(),
	rank: z.number(),
	thumbnail: urlValueAttribute,
	name: stringValueAttribute,
	yearpublished: numberValueAttribute,
});

export const pollResult = z
	.object({
		numplayers: z.union([z.number(), z.string()]).optional(),
		value: z.union([z.number(), z.string()]).optional(),
		numvotes: z.number(),
	})
	.refine(
		(data) => (data.numplayers === undefined) !== (data.value === undefined),
		{
			message: 'numplayers or value must be defined',
			path: ['numplayers'],
		},
	);

export const pollItem = z.object({
	name: z.string(),
	results: coerceArray(
		z.object({
			result: coerceArray(pollResult),
		}),
	),
	title: z.string(),
	totalvotes: z.number(),
});

export const linkItem = z.object({
	type: linkTypeEnum,
	id: z.number(),
	value: z.string(),
	inbound: z.boolean().optional(),
});

export const comment = z.object({
	username: z.string(),
	rating: z.union([z.number(), z.literal('N/A')]),
	value: z.coerce.string(),
});

export const family = z.object({
	id: z.number(),
	type: familyTypeEnum,
	thumbnail: z.url(),
	image: z.url(),
	name: coerceArray(thingName),
	description: z.string(),
	link: coerceArray(linkItem),
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
		sortindex: z.number(),
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
	id: z.number(),
	name: z.string(),
	firstname: stringValueAttribute,
	lastname: stringValueAttribute,
	avatarlink: stringValueAttribute,
	yearregistered: numberValueAttribute,
	lastlogin: dateValueAttribute,
	stateorprovince: stringValueAttribute,
	country: stringValueAttribute,
	webaddress: stringValueAttribute,
	xboxaccount: stringValueAttribute,
	wiiaccount: stringValueAttribute,
	psnaccount: stringValueAttribute,
	battlenetaccount: stringValueAttribute,
	steamaccount: stringValueAttribute,
	traderrating: numberValueAttribute.optional(),
	buddies: z
		.object({
			buddy: coerceArray(userConnection).optional(),
			total: z.number(),
			page: z.number(),
		})
		.optional(),
	guilds: z
		.object({
			guild: coerceArray(userConnection).optional(),
			total: z.number(),
			page: z.number(),
		})
		.optional(),
	top: z
		.object({
			item: coerceArray(userItem),
			domain: domainTypeEnum,
		})
		.optional(),
	hot: z
		.object({
			item: coerceArray(userItem),
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
			member: coerceArray(guildMember),
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
	postdate: z.coerce.date(),
	lastpostdate: z.coerce.date(),
});

export const forum = z.object({
	id: z.number(),
	groupid: z.number().optional(),
	title: z.string(),
	noposting: z.number(),
	description: z.string().optional(),
	numthreads: z.number(),
	numposts: z.number(),
	lastpostdate: z.coerce.date(),
	threads: z.object({ thread: coerceArray(forumThread) }).optional(),
});

export const article = z.object({
	subject: z.string(),
	body: z.string(),
	id: z.number(),
	username: z.string(),
	link: z.url(),
	postdate: z.coerce.date(),
	editdate: z.coerce.date(),
	numedits: z.number(),
});

export const thread = z.object({
	subject: z.string(),
	articles: z.object({ article: coerceArray(article) }),
	id: z.number(),
	link: z.url(),
});

export const thingDetails = z.object({
	type: z.string(),
	id: z.number(),
	thumbnail: z.url(),
	image: z.url(),
	name: coerceArray(thingName),
	description: z.string(),
	yearpublished: numberValueAttribute,
	minplayers: numberValueAttribute,
	maxplayers: numberValueAttribute,
	playingtime: z.object({
		value: z.number(),
	}),
	minplaytime: numberValueAttribute,
	maxplaytime: numberValueAttribute,
	poll: coerceArray(pollItem),
	link: coerceArray(linkItem),
	statistics: z
		.object({
			page: z.number(),
			ratings: z.object({
				usersrated: numberValueAttribute,
				average: numberValueAttribute,
				bayesaverage: numberValueAttribute,
				ranks: z.object({
					rank: coerceArray(
						z.object({
							type: z.string(),
							id: z.number(),
							name: z.string(),
							friendlyname: z.string(),
							value: z.number(),
							bayesaverage: z.number(),
						}),
					),
				}),
				stddev: numberValueAttribute.optional(),
				median: numberValueAttribute.optional(),
				trading: numberValueAttribute.optional(),
				wanting: numberValueAttribute.optional(),
				wishing: numberValueAttribute.optional(),
				numcomments: numberValueAttribute.optional(),
				numweights: numberValueAttribute.optional(),
				averageweight: numberValueAttribute.optional(),
			}),
		})
		.optional(),
	versions: z
		.object({
			item: coerceArray(
				z.object({
					thumbnail: z.url().optional(),
					image: z.url().optional(),
					link: coerceArray(linkItem),
					name: coerceArray(thingName),
					yearpublished: numberValueAttribute,
					productcode: z.union([numberValueAttribute, stringValueAttribute]),
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
			video: coerceArray(
				z.object({
					id: z.number(),
					title: z.string(),
					category: z.string(),
					language: z.string(),
					username: z.string(),
					userid: z.number(),
					postdate: z.coerce.date(),
				}),
			),
		})
		.optional(),
	comments: z
		.object({
			comment: coerceArray(comment),
		})
		.optional(),
});
