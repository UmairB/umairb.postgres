export interface IConfig {
	server: {
		wwwroot: string;
		apiRoot: string;
		port: number;
	};
}

const config = <IConfig>{
	"server": {
		"wwwroot": "wwwroot",
		"apiRoot": "/api",
		"port": 9001
	}
};

export const CONFIG_TYPE = Symbol("Config");

export default config;
