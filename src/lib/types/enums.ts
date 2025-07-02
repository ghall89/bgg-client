enum ThingTypeEnum {
  boardgame,
  boardgameexpansion,
}

export type ThingType = keyof typeof ThingTypeEnum;

enum LinkTypeEnum {
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
