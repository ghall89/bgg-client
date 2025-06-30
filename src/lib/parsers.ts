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

    console.log(JSON.stringify(object, null, 2));

    const elements = object.elements?.[0]?.elements || [];

    for (const element of elements) {
      const title = element.elements.find(({ name }) => name === 'name');

      if (!title) return;

      resultsArray.push({
        bggId: element.attributes.id,
        title: title.attributes.value,
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
