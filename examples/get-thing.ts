import { BoardGameGeekClient } from '../src';

(async () => {
	const bgg = new BoardGameGeekClient(process.env.API_KEY);

	try {
		// catan
		const result = await bgg.thing(13);

		console.log(result);
	} catch (err) {
		console.error(err);
	}
})();
