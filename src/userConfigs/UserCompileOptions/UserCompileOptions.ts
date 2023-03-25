import path from 'path';
import { defaultCompileOptions } from './defaultCompileOptions';
import { deepObjectMerge } from '@src/lib/deepObjectMerge';
import { getPkgCompileOptions } from './getPkgCompileOptions';
import { DeepPartial } from '@src/lib/deepPartial';

import { UserRoot, isUserRoot } from './Parts/UserRoot';
import { UserOutputFolder, isUserOutputFolder } from './Parts/UserOutputFolder';
import { UserHTMLFilename, isUserHTMLFilename } from './Parts/UserHTMLFilename';
import { UserDevHost, isUserDevHost } from './Parts/UserDevHost';
import { UserDevHostPort, isUserDevHostPort } from './Parts/UserDevHostPort';
import { UserIsDev, isUserIsDev } from './Parts/UserIsDev';
import { UserSymlink, isUserSymlink } from './Parts/UserSymlink';
import {
	UserDebugInProduction,
	isUserDebugInProduction,
} from './Parts/UserDebugInProduction';
import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../needsValidation';

export interface UserCompileOptions {
	root: UserRoot;
	outputFolder: UserOutputFolder;
	htmlFilename: UserHTMLFilename;
	devHost: UserDevHost;
	devHostPort?: UserDevHostPort;
	isDev: UserIsDev;
	symlink: UserSymlink;
	debugInProduction: UserDebugInProduction;
}

export const getUserCompileOptions = (arg: any): UserCompileOptions => {
	let compileOptionsOverrides: DeepPartial<UserCompileOptions> = {};
	if (isPartialUserCompileOptions(arg, ['CEPBundle.compile({'])) {
		compileOptionsOverrides = arg;
	}
	let root: string = path.resolve(
		compileOptionsOverrides.root !== undefined
			? compileOptionsOverrides.root
			: defaultCompileOptions.root,
	);
	let pkgCompileOptions: DeepPartial<UserCompileOptions> = {};
	if (
		isPartialUserCompileOptions(getPkgCompileOptions(root), [
			'package.json{cep',
		])
	) {
		pkgCompileOptions = getPkgCompileOptions(root);
	}

	let compileOptions: any = deepObjectMerge(
		defaultCompileOptions,
		pkgCompileOptions,
		compileOptionsOverrides,
	);

	compileOptions.root = path.resolve(compileOptions.root);
	isUserCompileOptions(compileOptions, ['merged compileOptions']);
	return compileOptions;
};

function isPartialUserCompileOptions(
	arg: any,
	parents: string[],
): arg is Partial<UserCompileOptions> {
	return isUserCompileOptions(arg, parents, { partial: true });
}

function isUserCompileOptions(
	arg: any,
	parents: string[],
	partial: { partial: true },
): arg is Partial<UserCompileOptions>;
function isUserCompileOptions(
	arg: any,
	parents: string[],
	partial?: { partial: false },
): arg is UserCompileOptions;
function isUserCompileOptions(
	arg: any,
	parents: string[] = ['compileOptions'],
	partial: { partial: boolean } = { partial: false },
) {
	let cumulatedErrors: string[] = [];
	if (
		needsValidation(arg, partial) &&
		(arg === undefined ||
			arg === null ||
			arg instanceof Array ||
			typeof arg !== 'object' ||
			Object.keys(arg).length === 0)
	) {
		throw badValueError({
			propertyName: [...parents, 'compileOptions'].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user compile options type',
				'UserCompileOptions',
			)}`,
			received: arg,
		});
	}
	const {
		root,
		outputFolder,
		htmlFilename,
		devHost,
		devHostPort,
		isDev,
		symlink,
		debugInProduction,
	} = arg;
	try {
		isUserRoot(root, [...parents, 'root'], partial);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isUserOutputFolder(outputFolder, [...parents, 'outputFolder'], partial);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isUserHTMLFilename(htmlFilename, [...parents, 'htmlFilename'], partial);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isUserDevHost(devHost, [...parents, 'devHost'], partial);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isUserDevHostPort(devHostPort, [...parents, 'devHostPort'], partial);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isUserIsDev(isDev, [...parents, 'isDev'], partial);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isUserSymlink(symlink, [...parents, 'symlink'], partial);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isUserDebugInProduction(
			debugInProduction,
			[...parents, 'debugInProduction'],
			partial,
		);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	if (cumulatedErrors.length > 0)
		throw new Error(cumulatedErrors.join('\n\n'));
	return true;
}
