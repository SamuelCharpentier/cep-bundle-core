import fs from 'fs-extra';
import path from 'path';

export function copyDependencies({ root, out, pkg }: { root: string; out: string; pkg: any }) {
	const deps = pkg.dependencies || {};
	return Object.keys(deps).reduce((chain, dep) => {
		if (dep.indexOf('/') !== -1) {
			dep = dep.split('/')[0];
		}
		const src = path.join(root, 'node_modules', dep);
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
						const packageJson = fs.readJsonSync(path.join(root, 'node_modules', dep, 'package.json'));
						return copyDependencies({
							root,
							out,
							pkg: packageJson,
						});
					} catch (err) {
						return;
					}
				});
			return chain;
		}
		return chain;
	}, Promise.resolve());
}
