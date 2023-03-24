import { URL } from 'url';
import { UserCompileOptions } from './UserCompileOptions';

export const defaultCompileOptions: UserCompileOptions = {
	root: process.cwd(),
	outputFolder: './dist',
	htmlFilename: 'index.html',
	devHost: new URL('http://localhost'),
	isDev: true,
	symlink: true,
	debugInProduction: false,
};
