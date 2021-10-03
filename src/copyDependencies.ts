import fs from 'fs-extra';
import path from 'path';

const warningMessage = (fileName: string, location: string) => `${fileName} expected to be at root of project:
${location}
Dependencies wont be copied`;

export function copyDependencies({
	root,
	out,
	packageJSONPath,
}: {
	root: string;
	out: string;
	packageJSONPath?: string;
}) {
	packageJSONPath = packageJSONPath ? packageJSONPath : path.join(root, '/package.json');
	const nodeModulesPath = path.join(root, 'node_modules');
	if (fs.existsSync(packageJSONPath)) {
		if (fs.existsSync(packageJSONPath)) {
			const dependencies = require(packageJSONPath).dependencies || {};
			return Object.keys(dependencies).reduce((chain, dep) => {
				if (dep.indexOf('/') !== -1) {
					dep = dep.split('/')[0];
				}
				const src = path.join(nodeModulesPath, dep);
				const dest = path.join(out, 'node_modules', dep);
				let exists = false;
				try {
					exists = fs.statSync(dest).isFile();
				} catch (err) {}
				if (!exists) {
					chain = chain
						.then(() => fs.copy(src, dest))
						.catch(() => {
							console.error(`Could not copy ${src} to ${dest}. Ensure the path is correct.`);
						})
						.then(() => {
							try {
								const packageJson = fs.readJsonSync(path.join(nodeModulesPath, dep, 'package.json'));
								return copyDependencies({
									root,
									out,
									packageJSONPath: packageJson,
								});
							} catch (err) {
								return;
							}
						});
					return chain;
				}
				return chain;
			}, Promise.resolve());
		} else {
			console.warn(warningMessage('node_modules', nodeModulesPath));
		}
	} else {
		console.warn(warningMessage('package.json', packageJSONPath));
	}
}
