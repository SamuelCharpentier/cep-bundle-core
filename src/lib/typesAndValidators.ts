export type AttributeArgument = { name: string; value: string; context?: (parents: string[]) => boolean };

export type NumberString = `${number}` | `${number}.${number}` | number;
export function isNumeric(str: any): boolean {
	if (typeof str !== 'string') return false;
	return !isNaN(parseFloat(str));
}

export type EmailAdress = `${string}@${string}.${string}`;

const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function isEmail(email: any): boolean {
	return emailRegex.test(email);
}

export type VersionNumber =
	| `${number}`
	| `${number}.${number}`
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}.${number}`;
export type RangedVersion = number | VersionNumber | `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`;

const rangedVersionRegex =
	/(\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?)|([(\[]\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?,?\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?[)\]])/;

export function isRangedVersion(value: any): boolean {
	if (typeof value === 'number') value = value.toString();
	if (typeof value === 'string') return rangedVersionRegex.test(value);
	return false;
}

export type RelativePath = `./${string}`;

export function isRelativePath(value: any): boolean {
	if (typeof value !== 'string') return false;
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
	| '--mixed-conext'
	| `--${string}`
	| `--${string}=${string}`;

export function isValidCommand(command: Command): boolean {
	return /^--[a-z1-9-]+$|^--[a-z1-9-]+?=([a-zA-Z0-9]+|".*")$/g.test(command);
}

export type EventType = string;

export function isEvent(event: EventType[]): boolean {
	return true;
}

export type Placement = string;

export function isPlacement(placement: Placement): boolean {
	return true;
}
import { ScreenPercentage, Size, MinSize, MaxSize } from './Size';
export type Sizes = ScreenPercentage | Size | MinSize | MaxSize;
