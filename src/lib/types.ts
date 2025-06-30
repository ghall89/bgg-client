export type BggSearchResponse = SearchResult[];
export type BggDetailsResponse = GameDetails;

export interface SearchResult {
  bggId: string;
  title: string;
  type: ThingType;
}
export interface GameDetails {
  bggId?: string;
  title?: string;
  img?: string;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  avgPlaytime?: number;
}

export interface SearchResultXml {
  items: {
    item: {
      _attributes: {
        id: string;
        type: ThingType;
      };
      name: {
        _attributes: {
          value: string;
        };
      };
    }[];
  };
}

export interface GameDetailsXml {
  items: {
    item: {
      '_attributes': {
        type: string;
        id: string;
      };
      'thumbnail': {
        _text: string;
      };
      'image': {
        _text: string;
      };
      'name': {
        _attributes: {
          type?: 'primary' | 'alternate';
          value: string;
        };
      }[];
      'description': {
        _text: string;
      };
      'yearpublished': {
        _attributes: {
          value: string;
        };
      };
      'minplayers': {
        _attributes: {
          value: string;
        };
      };
      'maxplayers': {
        _attributes: {
          value: string;
        };
      };
      'playingtime': {
        _attributes: {
          value: string;
        };
      };
      'minplaytime': {
        _attributes: {
          value: string;
        };
      };
      'maxplaytime': {
        _attributes: {
          value: string;
        };
      };
      'minage': {
        _attributes: {
          value: string;
        };
      };
      'poll-summary': {
        name: string;
        title: string;
        result: {
          _attributes: {
            name: string;
            value: string;
          };
        }[];
      }[];
      'link': {
        _attributes: {
          type: LinkType;
          id: string;
          value: string;
        };
      };
    };
  };
}

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
