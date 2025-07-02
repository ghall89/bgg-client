import type { ThingType, LinkType } from './enums';

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
      _attributes: {
        type: string;
        id: string;
      };
      thumbnail: {
        _text: string;
      };
      image: {
        _text: string;
      };
      name: {
        _attributes: {
          type?: 'primary' | 'alternate';
          value: string;
        };
      }[];
      description: {
        _text: string;
      };
      yearpublished: {
        _attributes: {
          value: string;
        };
      };
      minplayers: {
        _attributes: {
          value: string;
        };
      };
      maxplayers: {
        _attributes: {
          value: string;
        };
      };
      playingtime: {
        _attributes: {
          value: string;
        };
      };
      minplaytime: {
        _attributes: {
          value: string;
        };
      };
      maxplaytime: {
        _attributes: {
          value: string;
        };
      };
      minage: {
        _attributes: {
          value: string;
        };
      };
      poll: PollItemXML[];
      link: {
        _attributes: {
          type: LinkType;
          id: string;
          value: string;
        };
      }[];
    };
  };
}

export interface PollItemXML {
  _attributes: {
    name: string;
  };
  results: PollResultXML | PollResultXML[];
}

export interface PollResultXML {
  _attributes?: {
    numplayers?: string;
  };
  result: PollResultItemXML[];
}

export interface PollResultItemXML {
  _attributes: {
    value: string;
    numvotes: string;
  };
}
