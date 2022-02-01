import { XMLElement } from './XMLElement';
import { AdobeLocaleCodes, isAdobeLocaleCode } from './enumsAndValidators';

export type LocaleListArgument =
	| AdobeLocaleCodes
	| keyof typeof AdobeLocaleCodes
	| AdobeLocaleCodes[]
	| (keyof typeof AdobeLocaleCodes)[];

const isLocaleListArgument: (arg: any) => boolean = (args): args is LocaleListArgument => {
	if (typeof args === 'string') args = [args];
	if (args instanceof Array) {
		for (const arg of args) {
			if (!isAdobeLocaleCode(arg)) {
				throw new Error(`Bad Locale provided, ${arg} is not a valid AdobeLocaleCodes(enum)`);
			}
		}
		return true;
	}
	throw new Error(
		`Bad Locale provided, ${args}(${typeof args}) is not a valid AdobeLocaleCodes(enum) or array of AdobeLocaleCodes(enum)`,
	);
};
export class LocaleList extends XMLElement {
	constructor(locales: any) {
		if (typeof locales === 'string') locales = [locales];
		if (isLocaleListArgument(locales)) {
			let content: LocaleElement[] = [];
			for (const locale of locales) {
				content.push(new LocaleElement(locale));
			}
			super({ name: 'LocaleList', content });
		}
	}
}

class LocaleElement extends XMLElement {
	constructor(code: keyof typeof AdobeLocaleCodes) {
		if (typeof code === 'string' && isAdobeLocaleCode(code)) code = AdobeLocaleCodes[code];
		super({ name: 'Locale', attributes: { name: 'Code', value: code } });
	}
}
