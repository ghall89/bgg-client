import type { z } from 'zod';

import type {
	domainTypeEnum,
	familyTypeEnum,
	hotItemTypeEnum,
	linkTypeEnum,
	thingTypeEnum,
} from '../schema';

export type Endpoint =
	| 'collection'
	| 'family'
	| 'forum'
	| 'forumlist'
	| 'guild'
	| 'hot'
	| 'plays'
	| 'search'
	| 'thing'
	| 'thread'
	| 'user';

export type ThingType = z.infer<typeof thingTypeEnum>;

export type HotItemType = z.infer<typeof hotItemTypeEnum>;

export type LinkType = z.infer<typeof linkTypeEnum>;

export type FamilyType = z.infer<typeof familyTypeEnum>;

export type DomainType = z.infer<typeof domainTypeEnum>;
