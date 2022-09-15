export type NumberString = `${number}` | `${number}.${number}` | number;

export type EmailAddress = `${string}@${string}.${string}`;

const emailRegex = /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/;

export function isEmailAddress(email: any): boolean {
	return typeof email === 'string' && emailRegex.test(email);
}

export function isValidUrl(url: any): url is URL {
	if (typeof url !== 'string' && !(url instanceof URL)) return false;
	if (typeof url === 'string') {
		try {
			new URL(url);
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	return true;
}

export type VersionNumber =
	| number
	| `${number}`
	| `${number}.${number}`
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}.${string}`;

export function isVersionNumber(value: any): value is VersionNumber {
	if (
		typeof value === 'number' ||
		(typeof value === 'string' &&
			/^(\d{1,9}\.){0,2}\d{1,9}(\.[\w_-]+)?$/.test(value))
	)
		return true;
	return false;
}

export type RangedVersion =
	| number
	| VersionNumber
	| `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`;

const rangedVersionRegex =
	/(\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?)|([(\[]\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?,?\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?[)\]])/;

export function isRangedVersion(value: any): value is RangedVersion {
	if (typeof value === 'number') value = value.toString();
	if (typeof value === 'string') return rangedVersionRegex.test(value);
	return false;
}

export type RelativePath = `./${string}`;

export function isRelativePath(value: any): value is RelativePath {
	if (typeof value !== 'string' || value === undefined) return false;
	return /\.\/.+/.test(value);
}

export type Command =
	| '--enable-media-stream'
	| '--enable-speech-input'
	| '--persist-session-cookies'
	| '--disable-image-loading'
	| '--disable-javascript-open-windows'
	| '--disable-javascript-close-windows'
	| '--disable-javascript-access-clipboard'
	| '--enable-caret-browsing'
	| '--proxy-auto-detect'
	| '--user-agent'
	| '--disable-application-cache'
	| '--enable-nodejs'
	| '--disable-pinch'
	| '--mixed-context'
	| `--${string}`
	| `--${string}=${string}`;

export function isCommand(command: any): command is Command {
	if (
		typeof command !== 'string' ||
		!/^--[a-z1-9-]+$|^--[a-z1-9-]+?=([a-zA-Z0-9]+|".*")$/g.test(command)
	)
		return false;
	return true;
}

export type StartEvent = string;

export const isStartEvent: (e: any) => boolean = (
	event,
): event is StartEvent => {
	if (typeof event !== 'string') return false;
	console.warn('isEvent validator to do, blind validation —', event);
	return true;
};

export type Placement = string;

export function isPlacement(placement: Placement): placement is Placement {
	if (typeof placement !== 'string') return false;
	console.warn('isPlacement validator to do, blind validation —', placement);
	return true;
}
export type ID = string;

export function isValidId(value: any): value is ID {
	return typeof value === 'string';
}

export interface CompileOptions {
	root: string;
	outputFolder: string;
	htmlFilename: string;
	devHost: URL | string;
	devHostPort?: `${number}` | number;
	isDev: boolean;
	symlink: boolean;
	debugInProduction: boolean;
}

import { DeepPartial } from './deepPartial';
import {
	ExtensionManifestArgument,
	ManifestArgument,
} from './manifest/ExtensionManifest';
export type ManifestConfig = {
	manifest: DeepPartial<ManifestArgument>;
	extensions: DeepPartial<ExtensionManifestArgument['extensions']>;
};

export type ConfigStructure = ManifestConfig & {
	compileOptions: DeepPartial<CompileOptions>;
};

export type All = 'All' | 'ALL' | 'all';

export const isAll: (value: any) => value is All = (value): value is All => {
	if (typeof value !== 'string') return false;
	return value === 'All' || value === 'ALL' || value === 'all';
};

export type Int = number | `${number}`;

export function isInt(value: any): value is Int {
	if (typeof value === 'number') return Number.isInteger(value);
	if (typeof value === 'string') return /^\d+$/.test(value);
	return false;
}
