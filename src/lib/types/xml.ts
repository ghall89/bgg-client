import type { ThingType, LinkType } from './enums';

export interface SearchResultXml {
  items: {
    item: SearchResultItemXml[] | SearchResultItemXml;
  };
}

export interface SearchResultItemXml {
  _attributes: {
    id: string;
    type: ThingType;
  };
  name: ValueAttribute;
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
      yearpublished: ValueAttribute;
      minplayers: ValueAttribute;
      maxplayers: ValueAttribute;
      playingtime: {
        _attributes: {
          value: string;
        };
      };
      minplaytime: ValueAttribute;
      maxplaytime: {
        _attributes: {
          value: string;
        };
      };
      minage: ValueAttribute;
      poll: PollItemXML[];
      link: {
        _attributes: {
          type: LinkType;
          id: string;
          value: string;
        };
      }[];
      statistics?: {
        _attributes: {
          page: string;
        };
        ratings: {
          usersrated: ValueAttribute;
          average: ValueAttribute;
          bayesaverage: ValueAttribute;
          ranks: {
            rank: RankXml[];
          };
          stddev: ValueAttribute;
          median: ValueAttribute;
          owned: ValueAttribute;
          trading: ValueAttribute;
          wanting: ValueAttribute;
          wishing: ValueAttribute;
          numcomments: ValueAttribute;
          numweights: ValueAttribute;
          averageweight: ValueAttribute;
        };
      };
    };
  };
}

interface ValueAttribute {
  _attributes: {
    value: string;
  };
}

interface RankXml {
  _attributes: {
    type: string;
    id: string;
    name: string;
    friendlyname: string;
    value: string;
    bayesaverage: string;
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
