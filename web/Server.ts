import { injectable } from "inversify";
import * as path from "path";
import * as Hapi from "hapi";
import config from "./Config";
import ROUTES from "./routes";

const Inert = require('inert');

@injectable()
export default class Server {
	private readonly server: Hapi.Server;

	constructor() {
		let server = new Hapi.Server({
			connections: {
				routes: {
					files: {
						relativeTo: path.join(__dirname, config.server.wwwroot)
					}
				}
			}
		});
		server.connection({
			port: config.server.port
		});

		this.server = server;
	}

	public setupPlugins() {
		this.server.register(Inert, () => { });
	}

	public setupRoutes() {
		this.server.route(ROUTES);

		this.server.ext('onPreResponse', function (request, reply) {
			if (request.response.isBoom) {
				// Angular routing: If path is not found (and is not a file or api path) then return index
				// TODO: Typings for hapi are incorrect?
				let responseOutput = (<any>request.response).output;
				if (responseOutput.statusCode === 404 && request.path.indexOf('.') === -1 && request.path.indexOf(config.server.apiRoot) === -1) {
					return reply.file('index.html');
				}
			}

			return reply.continue();
		});

	}

	public start(onStart: (info: Hapi.IServerConnectionInfo) => void) {
		this.server.start((err) => {
			if (err) {
				throw err;
			}

			onStart(this.server.info);
		});
	}
}
