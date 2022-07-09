import { XMLElement } from './XMLElement';
import { AdobeLocaleCodes, isAdobeLocaleCode } from './enumsAndValidators';
import { badArgumentError } from '../errorMessages';
import { notAValue } from '../validators';

type localeCodes = AdobeLocaleCodes | keyof typeof AdobeLocaleCodes;

export type LocaleListArgument = localeCodes | localeCodes[];

const isLocaleListArgument: (arg: any) => boolean = (
	args,
): args is LocaleListArgument => {
	if (
		!notAValue(args) &&
		(args instanceof Array || typeof args === 'string')
	) {
		if (typeof args === 'string') {
			if (!isAdobeLocaleCode(args)) {
				throw badArgumentError(
					'localeList',
					'localeCodes (type)',
					args,
				);
			}
		} else {
			for (const arg of args) {
				if (!isAdobeLocaleCode(arg)) {
					throw badArgumentError(
						'Each elements of the localeLists array',
						'localeCodes (type)',
						arg,
					);
				}
			}
		}
	} else {
		throw badArgumentError('localeList', 'LocaleListArgument (type)', args);
	}
	return true;
};
export class LocaleList extends XMLElement {
	constructor(locales: any) {
		if (isLocaleListArgument(locales)) {
			locales = typeof locales === 'string' ? [locales] : locales;
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
		if (typeof code === 'string' && isAdobeLocaleCode(code))
			code = AdobeLocaleCodes[code];
		super({ name: 'Locale', attributes: { name: 'Code', value: code } });
	}
}
