import { XMLElement } from './XMLElement';
import { AdobeLocaleCodes, isAdobeLocaleCodesValue } from './enumsAndValidators';
export class LocaleList extends XMLElement {
	constructor(content: LocaleElement | LocaleElement[]) {
		if (content instanceof LocaleElement) [content];
		else if (Array.isArray(content))
			throw new Error(
				badArgumentError('LocaleList content', 'instance of LocaleElement (class) or LocaleElement[]', content),
			);
		super({ name: 'LocaleList', content });
	}
}

export class LocaleElement extends XMLElement {
	constructor(code: AdobeLocaleCodes | keyof typeof AdobeLocaleCodes) {
		let attribute = [];
		let codeAttr = { name: 'Code', value: '' };
		if (isAdobeLocaleCodesValue(code)) codeAttr.value = code;
		else if (typeof code === 'string' && isAdobeLocaleCodesValue(code)) codeAttr.value = AdobeLocaleCodes[code];
		else
			throw new Error(
				`Locale Code must be a string containing a key of AdobeLocaleCodes (enum) or a value of AdobeLocaleCodes, ${
					typeof code === 'string' ? `'${code}'` : code
				} (${typeof code}) received`,
			);
		attribute.push(codeAttr);

		super({ name: 'Locale', attributes: attribute });
	}
}
