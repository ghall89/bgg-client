export type BggSearchResponse = SearchResult[];
export type BggDetailsResponse = GameDetails;

export interface SearchResult {
  bggId: string;
  title: string;
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

export interface BoardGameXml {
  elements: {
    elements: {
      attributes: {
        id: string;
      };
      elements: {
        name: string;
        attributes: {
          value: string;
        };
      }[];
    }[];
  }[];
}

export interface GameDetailsXml {
  boardgames: {
    boardgame: {
      _attributes: {
        objectid: string;
      };
      name:
        | {
            _attributes: {
              primary?: 'true' | 'false';
            };
            _text: string;
          }[]
        | {
            _attributes: {
              primary?: 'true' | 'false';
            };
            _text: string;
          };
      thumbnail: {
        _text: string;
      };
      image: {
        _text: string;
      };
      description: {
        _text: string;
      };
      minplayers: {
        _text: string;
      };
      maxplayers: {
        _text: string;
      };
      playingtime: {
        _text: string;
      };
    };
  };
}
