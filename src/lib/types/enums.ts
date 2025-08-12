export enum ThingTypeEnum {
  boardgame,
  boardgameexpansion,
  boardgameaccessory,
  boardgameintegration,
  boardgamecompilation,
  boardgameimplementation,
  rpg,
  rpgitem,
  videogame,
}

export type ThingType = keyof typeof ThingTypeEnum;

export enum HotItemTypeEnum {
  boardgame,
  rpg,
  videogame,
  boardgameperson,
  rpgperson,
  boardgamecompany,
  rpgcompany,
  videogamecompany,
}

export type HotItemType = keyof typeof HotItemTypeEnum;

export enum LinkTypeEnum {
  boardgamecategory,
  boardgamemechanic,
  boardgamefamily,
  boardgameexpansion,
  boardgameaccessory,
  boardgameimplementation,
  boardgamedesigner,
  boardgameartist,
  boardgamepublisher,
}

export type LinkType = keyof typeof LinkTypeEnum;
