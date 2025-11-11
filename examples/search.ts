import { BoardGameGeekClient } from '../src';

(async () => {
	const bgg = new BoardGameGeekClient(process.env.API_KEY);

	try {
		const result = await bgg.search('knarr');

		console.log(result);
	} catch (err) {
		console.error(err);
	}
})();
