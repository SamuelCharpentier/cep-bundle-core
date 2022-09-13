import { URL } from 'url';

export const defaultCompileOptions = {
	root: process.cwd(),
	outputFolder: './dist',
	htmlFilename: 'index.html',
	devHost: new URL('http://localhost'),
	isDev: true,
	symlink: true,
	debugInProduction: false,
};
