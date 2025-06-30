import convert from 'xml-js';

import {
  BggDetailsResponse,
  BggSearchResponse,
  SearchResultXml,
  GameDetailsXml,
} from './types';

/**
 * Parses a BGG XML search response into a list of game search results.
 */
export async function parseResults(
  xml: string,
): Promise<BggSearchResponse | undefined> {
  const resultsArray: BggSearchResponse = [];

  try {
    const object = convert.xml2js(xml, { compact: true }) as SearchResultXml;

    const { item: items } = object.items;

    for (const item of items) {
      resultsArray.push({
        bggId: item._attributes.id,
        title: item.name._attributes.value,
        type: item._attributes.type,
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
export async function parseGameData(xml: string): Promise<BggDetailsResponse> {
  let gameData: BggDetailsResponse;

  try {
    const object = convert.xml2js(xml, { compact: true }) as GameDetailsXml;

    const {
      items: { item },
    } = object;

    gameData = {
      bggId: item?._attributes?.id,
      title: item?.name?.find((name) => name._attributes?.type === 'primary')
        ?._attributes.value,
      img: item?.image?._text,
      description: item?.description?._text,
      minPlayers: Number(item?.minplayers?._attributes?.value),
      maxPlayers: Number(item.maxplayers?._attributes?.value),
      avgPlaytime: Number(item.playingtime?._attributes?.value),
    };
  } catch (error) {
    throw error;
  }

  return gameData;
}
