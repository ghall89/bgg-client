import convert from 'xml-js';
import { decode } from 'he';

import {
  BggDetailsResponse,
  BggSearchResponse,
  SearchResultXml,
  GameDetailsXml,
} from './types';

/**
 * Parses a BGG XML search response into a list of game search results.
 */
export function parseResults(xml: string): BggSearchResponse | undefined {
  const resultsArray: BggSearchResponse = [];

  try {
    const object = convert.xml2js(xml, { compact: true }) as SearchResultXml;
    const { item: items } = object.items;

    if (Array.isArray(items)) {
      for (const item of items) {
        resultsArray.push({
          bggId: item._attributes.id,
          title: item.name._attributes.value,
          type: item._attributes.type,
        });
      }
    } else {
      resultsArray.push({
        bggId: items._attributes.id,
        title: items.name._attributes.value,
        type: items._attributes.type,
      });
    }
  } catch (error) {
    throw error;
  }

  return resultsArray;
}

/**
 * Parses a BGG XML board game response into structured game data.
 */
export function parseGameData(xml: string): BggDetailsResponse {
  let gameData: BggDetailsResponse;

  try {
    const object = convert.xml2js(xml, { compact: true }) as GameDetailsXml;

    const {
      items: { item },
    } = object;

    gameData = {
      bggId: item._attributes.id,
      title:
        item.name.find((name) => name._attributes?.type === 'primary')
          ?._attributes.value || '',
      img: item.image._text,
      thumbnail: item.thumbnail._text,
      description: decode(item.description._text),
      yearPublished: Number(item.yearpublished._attributes.value),
      minPlayers: Number(item?.minplayers?._attributes?.value),
      maxPlayers: Number(item.maxplayers?._attributes?.value),
      avgPlaytime: Number(item.playingtime?._attributes?.value),
      minPlaytime: Number(item.minplaytime?._attributes?.value),
      maxPlaytime: Number(item.maxplaytime?._attributes?.value),
      minPlayerAge: Number(item.minage?._attributes?.value),
      polls: item.poll.map((poll) =>
        Array.isArray(poll.results)
          ? {
              name: poll._attributes.name,
              results: poll.results.map((entry) => ({
                players: Number(entry?._attributes?.numplayers),
                results: entry.result.map((res) => ({
                  value: res._attributes.value,
                  votes: Number(res._attributes.numvotes),
                })),
              })),
            }
          : {
              name: poll._attributes.name,
              results: poll.results.result.map((res) => ({
                value: res._attributes.value,
                votes: Number(res._attributes.numvotes),
              })),
            },
      ),
      links: item.link.map((link) => ({
        id: link._attributes.id,
        type: link._attributes.type,
        value: link._attributes.value,
      })),
    };

    if (item?.statistics) {
      const { ratings } = item.statistics;

      gameData = {
        ...gameData,
        stats: {
          ranks: ratings.ranks.rank.map(({ _attributes: rank }) => ({
            type: rank.type,
            key: rank.name,
            name: rank.friendlyname,
            value: Number(rank.value),
          })),
          owned: Number(ratings.owned._attributes.value),
          trading: Number(ratings.trading._attributes.value),
          wanting: Number(ratings.wanting._attributes.value),
          wishing: Number(ratings.wishing._attributes.value),
          complexity: Number(ratings.averageweight._attributes.value),
        },
      };
    }
  } catch (error) {
    throw error;
  }

  return gameData;
}
