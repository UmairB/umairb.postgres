import container from "./inversify.config";
import Server from "./Server";

let server = container.get(Server);
server.setupPlugins();
server.setupRoutes();
server.start((info) => {
	console.log(`Server running at: ${info.uri}`);

	let open = require("open");
	open(info.uri);
});
