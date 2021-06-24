import fs from 'fs-extra';

import path from 'path';
export function copyIcons({ root, out, iconNormal, iconRollover, iconDarkNormal, iconDarkRollover }: any) {
	const iconPaths = [iconNormal, iconRollover, iconDarkNormal, iconDarkRollover]
		.filter((icon) => icon !== undefined)
		.map((icon) => ({
			source: path.resolve(root, icon),
			output: path.join(out, path.relative(root, icon)),
		}));
	return Promise.all(
		iconPaths.map((icon) => {
			return fs.copy(icon.source, icon.output).catch(() => {
				console.error(`Could not copy ${icon.source}. Ensure the path is correct.`);
			});
		}),
	);
}
