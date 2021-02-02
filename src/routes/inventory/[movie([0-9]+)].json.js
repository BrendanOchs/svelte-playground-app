import movies from './_movies.js';

const lookup = new Map();
movies.forEach(movie => {
	lookup.set(movie.id, JSON.stringify(movie));
});

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	let { movie } = req.params;
	let number = movie++
	if (lookup.has(number)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(number));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}