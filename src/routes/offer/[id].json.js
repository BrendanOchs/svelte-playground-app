import cars from './_cars.js';

const lookup = new Map();
cars.forEach(car => {
	lookup.set(car.vin, JSON.stringify(car));
});

export function get(req, res) {
	let { id } = req.params;
	if (id == "-1") {
		res.writeHead(200);
		let array = all();
		res.end(JSON.stringify({val: array}));
	}
	else if (lookup.has(id)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(lookup.get(id));
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
	if (lookup.has(id)) {
		lookup.set(id, JSON.stringify(replacement));
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
	lookup.set(id, JSON.stringify(replacement));
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(replacement));
}

export async function del(req, res) {
	let { id } = req.params;;
	if (lookup.has(id)) {
		lookup.delete(id);
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
	let array = [];
	lookup.forEach(val => {
		array.push(JSON.parse(val))
	});
	array.sort((a, b) => (a.vin > b.vin) ? 1 : -1);
	return array
}