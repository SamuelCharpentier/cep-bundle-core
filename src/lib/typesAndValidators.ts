export type NumberString = `${number}` | `${number}.${number}` | number;
export function isNumeric(str: any): boolean {
	if (typeof str !== 'string') return false;
	return !isNaN(parseFloat(str));
}

export type EmailAddress = `${string}@${string}.${string}`;

const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function isEmail(email: any): boolean {
	return typeof email === 'string' && emailRegex.test(email);
}

export const isValidUrl = <(url: any) => url is URL>((url: any) => {
	if (typeof url === 'string') {
		try {
			new URL(url);
		} catch (e) {
			console.error(e);
			return false;
		}
		return true;
	}
	return false;
});
export type VersionNumber =
	| `${number}`
	| `${number}.${number}`
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}.${number}`;

export function isVersionNumber(value: any): boolean {
	if (typeof value === 'string' && /^\d|\d\.\d|\d\.\d\.\d|\d\.\d\.\d\.\d$/.test(value)) return true;
	return false;
}

export type RangedVersion = number | VersionNumber | `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`;

const rangedVersionRegex =
	/(\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?)|([(\[]\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?,?\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?[)\]])/;

export function isRangedVersion(value: any): boolean {
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

export function isValidCommand(command: any): command is Command {
	if (typeof command !== 'string' || !/^--[a-z1-9-]+$|^--[a-z1-9-]+?=([a-zA-Z0-9]+|".*")$/g.test(command))
		return false;
	return true;
}

export type EventType = string;

export const isEvent: (e: any) => boolean = (event): event is EventType => {
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

export const isValidId: (val: any) => boolean = (value): value is ID => {
	return typeof value === 'string';
};
