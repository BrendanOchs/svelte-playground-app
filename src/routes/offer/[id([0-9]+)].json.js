import cars from './_cars.js';

const lookup = new Map();
cars.forEach(car => {
	lookup.set(car.id, JSON.stringify(car));
});

export function get(req, res) {
	let { id } = req.params;
	let number = id++;
	if (lookup.has(number)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(number));
	}
	else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

export async function put(req, res) {
	let { id } = req.params;
	let replacement = req.body;
	let number = id++;
	if (lookup.has(number)) {
		lookup.delete(number);
		lookup.set(number, JSON.stringify(replacement));
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(replacement));
	}
	else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

export async function post(req, res) {
	let { id } = req.params;
	let replacement = req.body;
	let number = id++;
	lookup.set(number, JSON.stringify(replacement));
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(replacement));
}

export async function del(req, res) {
	let { id } = req.params;
	let number = id++;
	if (lookup.has(number)) {
		lookup.delete(number);
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({
			message: `Delete Successful`
		}));
	}
	else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

export function all() {
	return Array.from(lookup.values());
}