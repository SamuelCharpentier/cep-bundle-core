import fs from 'fs-extra';
import path from 'path';

import manifestTemplate from './templates/manifest';
import panelTemplate from './templates/html';
import debugTemplate from './templates/.debug';

export function writeExtensionTemplates(opts: any) {
	const manifestContents = manifestTemplate(opts);
	const { out, debugInProduction, isDev, extensions } = opts;
	const manifestDir = path.join(out, 'CSXS');
	const manifestFile = path.join(manifestDir, 'manifest.xml');
	return Promise.resolve()
		.then(() => fs.ensureDir(manifestDir))
		.then(() => fs.writeFile(manifestFile, manifestContents))
		.then(() => {
			let chain = Promise.resolve();
			if (debugInProduction || isDev) {
				const debugContents = debugTemplate(opts);
				chain = chain.then(() => fs.writeFile(path.join(out, '.debug'), debugContents));
			}
			if (isDev) {
				extensions.forEach((extension: any) => {
					const href = `http://${extension.devHost}:${extension.devPort}`;
					const panelContents = panelTemplate({
						title: extension.name,
						href,
					});
					chain = chain.then(() => fs.writeFile(path.join(out, `dev.${extension.id}.html`), panelContents));
				});
			}
			return chain;
		});
}
