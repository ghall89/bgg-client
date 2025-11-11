import type { z } from 'zod';

import type {
	article,
	collectionitem,
	comment,
	family,
	forum,
	forumThread,
	guild,
	guildLocation,
	guildMember,
	hotItem,
	linkItem,
	playLog,
	pollItem,
	pollResult,
	searchResult,
	thingDetails,
	thread,
	user,
	userConnection,
	userItem,
} from '../schema';

export type Article = z.infer<typeof article>;
export type CollectionItem = z.infer<typeof collectionitem>;
export type Comment = z.infer<typeof comment>;
export type Family = z.infer<typeof family>;
export type Forum = z.infer<typeof forum>;
export type ForumThread = z.infer<typeof forumThread>;
export type Guild = z.infer<typeof guild>;
export type GuildLocation = z.infer<typeof guildLocation>;
export type GuildMember = z.infer<typeof guildMember>;
export type HotItem = z.infer<typeof hotItem>;
export type LinkItem = z.infer<typeof linkItem>;
export type PlayLog = z.infer<typeof playLog>;
export type PollItem = z.infer<typeof pollItem>;
export type PollResult = z.infer<typeof pollResult>;
export type SearchResult = z.infer<typeof searchResult>;
export type ThingDetails = z.infer<typeof thingDetails>;
export type Thread = z.infer<typeof thread>;
export type User = z.infer<typeof user>;
export type UserConnection = z.infer<typeof userConnection>;
export type UserItem = z.infer<typeof userItem>;
