import "reflect-metadata";
import { Container } from "inversify";
import config, { CONFIG_TYPE } from "./Config";
// import CONTROLLERS from "./controllers";
// import SERVICES from "./services";
import Server from "./Server";

let container = new Container();

container.bind(Server)
	.toSelf()
	.inSingletonScope();

container.bind(CONFIG_TYPE)
	.toConstantValue(config);

// CONTROLLERS.forEach(c => {
// 	kernel.bind(c)
// 		.toSelf()
// 		.inTransientScope();
// });

// SERVICES.forEach(s => {
// 	kernel.bind(s.type)
// 		  .to(s["class"])
// 		  .inTransientScope();
// });

export default container;
