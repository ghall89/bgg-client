import convert from 'xml-js';

import {
  BggDetailsResponse,
  BggSearchResponse,
  BoardGameXml,
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
    const object = convert.xml2js(xml) as BoardGameXml;

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
    const result = convert.xml2js(xml, { compact: true }) as GameDetailsXml;

    const {
      boardgames: { boardgame },
    } = result;

    gameData = {
      bggId: boardgame?._attributes?.objectid,
      title: Array.isArray(boardgame.name)
        ? boardgame?.name?.find((name) => name._attributes?.primary === 'true')
            ?._text
        : boardgame.name?._text,
      img: boardgame?.image?._text,
      description: boardgame?.description?._text,
      minPlayers: boardgame?.minplayers?._text
        ? Number(boardgame.minplayers._text)
        : undefined,
      maxPlayers: boardgame?.maxplayers?._text
        ? Number(boardgame.maxplayers._text)
        : undefined,
      avgPlaytime: boardgame?.playingtime?._text
        ? Number(boardgame.playingtime._text)
        : undefined,
    };
  } catch (error) {
    throw error;
  }

  return gameData;
}
