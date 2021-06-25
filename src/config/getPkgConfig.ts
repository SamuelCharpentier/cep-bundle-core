import fs from 'fs-extra';
import path from 'path';

export function getPkgConfig(root?: string, env?: string) {
	let pgkConfig: any = {};
	root = root ? path.resolve(root) : process.cwd();
	let packageJSONPath = path.join(root, '/package.json');
	if (fs.existsSync(packageJSONPath)) {
		if (env !== undefined) {
			return require(packageJSONPath).cep[env];
		}
		pgkConfig = require(packageJSONPath).cep;
		env = pgkConfig.env;
		if (env !== undefined && typeof env === 'string') {
			pgkConfig = { ...pgkConfig, ...getPkgConfig(root, pgkConfig.env) };
			delete pgkConfig[env];
			delete pgkConfig[pgkConfig.env];
			delete pgkConfig.env;
		}
	}
	return pgkConfig;
}
