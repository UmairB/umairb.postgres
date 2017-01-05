import * as hapi from "hapi";
import * as fs from "fs";
import * as path from "path";

let apiRoutes = fs.readdirSync(__dirname)
	.filter(f => path.extname(f) === ".js" && __filename.indexOf(f) === -1)
	.map(f => {
		let r = require(`./${f}`);
		let routes: Array<hapi.IRouteConfiguration> = r.default;

		return routes;
	});

const ROUTES: Array<hapi.IRouteConfiguration> =
	apiRoutes.length ? apiRoutes.reduce((a, b) => a.concat(b)) : [];

// static
ROUTES.push({
	method: "GET",
	path: "/{param*}",
	handler: {
		directory: {
			path: ".",
			redirectToSlash: true,
			index: true
		}
	}
});

export default ROUTES;
