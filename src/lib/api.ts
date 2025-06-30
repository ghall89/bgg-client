import { tryCatch } from 'try-catcher-ts';

const BASE_URL = 'https://boardgamegeek.com';

/**
 * Handle request to the BGG API
 */
export async function getRequest<T>(
  path: string,
  parseFn: (xml: string) => T,
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  console.info('URL:', url);

  const response = await fetch(url);

  if (!response?.ok) {
    throw new Error(`Response status: ${response?.status}`);
  }

  return parseXmlResponse(response, parseFn);
}

/**
 * Parses an XML HTTP response using a custom parsing function.
 */
async function parseXmlResponse<T>(
  response: Response,
  parseFn: (xml: string) => T,
): Promise<T> {
  const xml = await tryCatch(() => response.text(), 'Error parsing XML');

  return parseFn(xml as string);
}
