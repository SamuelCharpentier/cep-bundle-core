const prettier = require('prettier');
type Attribute = { name: string; value: string };

class StringContent {
	constructor(readonly value: string) {}
}

const badArgumentError = (argumentName: string, argumentType: string, valueReceived: any) =>
	`${argumentName} must be provided as a ${argumentType}, ${
		typeof valueReceived === 'string' ? `'${valueReceived}'` : valueReceived
	} (${typeof valueReceived}) received`;

class XMLElement {
	readonly name: string;
	readonly attributes?: Attribute[];
	readonly content?: XMLElement[] | StringContent;
	constructor({
		name,
		attributes,
		content,
	}: {
		name: string;
		attributes?: Attribute | Attribute[];
		content?: XMLElement | XMLElement[] | string;
	}) {
		if (typeof name !== 'string') throw new Error(badArgumentError("XML Element's name", 'string', name));

		this.name = name;
		if (attributes !== undefined) {
			if (attributes instanceof Array) this.attributes = attributes;
			else if (attributes instanceof Object) this.attributes = [attributes];
		}
		if (content !== undefined) {
			if (content instanceof Array) this.content = content;
			else if (content instanceof XMLElement) this.content = [content];
			else if (typeof content === 'string') this.content = new StringContent(content);
		}
	}
	xml(
		{ printAttributes, printContent }: { printAttributes?: boolean; printContent?: boolean } = {
			printAttributes: true,
			printContent: true,
		},
	): string {
		let result = `<${this.name}`;
		if (
			printAttributes &&
			this.attributes !== undefined &&
			this.attributes instanceof Array &&
			this.attributes?.length > 0
		)
			this.attributes.forEach((attribute) => (result += ` ${attribute.name}="${attribute.value}"`));
		if (printContent && this.content) {
			result += '>\n';
			if (this.content instanceof Array) this.content.forEach((contained) => (result += contained.xml()));
			else if (this.content instanceof StringContent) result += this.content.value;
			result += `</${this.name}>`;
		} else {
			result += '/>\n';
		}
		result = prettier.format(result, { printWidth: 80, tabWidth: 4, useTabs: true, parser: 'html' });
		return result;
	}
}
type NumberString = `${number}` | `${number}.${number}` | number;

function isNumeric(str: any) {
	if (typeof str !== 'string') return false;
	return !isNaN(parseFloat(str));
}

class ExtensionManifest extends XMLElement {
	constructor(
		{ bundleId, bundleVersion, bundleName }: { bundleId: string; bundleVersion: NumberString; bundleName?: string },
		content: (Author | Contact | Legal | Abstract | ExtensionList | ExecutionEnvironment | DispatchInfoList)[],
	) {
		let attributes = [{ name: 'Version', value: '7.0' }];
		if (bundleId && typeof bundleId === 'string') attributes.push({ name: 'ExtensionBundleId', value: bundleId });
		else throw new Error(badArgumentError("The bundle's ID", 'string', bundleId));

		if (bundleVersion && (typeof bundleVersion === 'number' || isNumeric(bundleVersion)))
			attributes.push({ name: 'ExtensionBundleVersion', value: bundleVersion.toString() });
		else throw new Error(badArgumentError("The bundle's version", 'number or string', bundleVersion));

		if (bundleName && typeof bundleName === 'string')
			attributes.push({ name: 'ExtensionBundleName', value: bundleName });
		else if (bundleName) throw new Error(badArgumentError("The bundle's name (optional)", 'string', bundleName));

		super({ name: 'ExtensionManifest', attributes: attributes });
	}
}
class Author extends XMLElement {
	constructor(authorName: string) {
		if (!authorName || typeof authorName !== 'string' || authorName.length <= 0)
			throw new Error(badArgumentError("Author's name", 'string', authorName));
		super({ name: 'Author', content: authorName });
	}
}
type EmailAdress = `${string}@${string}.${string}`;
const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
class Contact extends XMLElement {
	constructor(contactEmail: EmailAdress) {
		if (!emailRegex.test(contactEmail))
			throw new Error(badArgumentError('Contact email', 'valid email string', contactEmail));
		super({ name: 'Contact', attributes: { name: 'mailto', value: contactEmail } });
	}
}

class HrefElement extends XMLElement {
	constructor(elementName: string, href: URL | string) {
		if (href instanceof URL) href = href.href;
		super({ name: 'Contact', attributes: { name: 'href', value: href } });
	}
}
class Legal extends HrefElement {
	constructor(href: URL | string) {
		super('Legal', href);
	}
}
class Abstract extends HrefElement {
	constructor(href: URL | string) {
		super('Abstract', href);
	}
}
class ExtensionList extends XMLElement {
	constructor(extensions: Extension | Extension[]) {
		if (typeof extensions === 'object' && extensions instanceof Extension) extensions = [extensions];
		else if (typeof extensions !== 'object' || !(extensions instanceof Array))
			throw new Error(badArgumentError('Extension list Extension', 'object of type Extension', extensions));

		super({ name: 'ExtensionList', content: extensions });
	}
}

class Extension extends XMLElement {
	constructor({
		id,
		version,
		hostList,
	}: {
		id: string;
		version?: string;
		hostList?: HostList;
		dispatchInfo: DispatchInfo;
	}) {
		let attributes = [];
		if (!id || typeof id !== 'string' || id.length <= 0)
			throw new Error(badArgumentError('Extension Id', 'string', id));
		else attributes.push({ name: 'Id', value: id });
		if (version) {
			if (typeof version !== 'string' || version?.length <= 0)
				throw new Error(badArgumentError('Extension Version (optional)', 'string', version));
			else attributes.push({ name: 'Version', value: version });
		}
		super({
			name: 'Extension',
			attributes: attributes,
		});
	}
}
class ExecutionEnvironment extends XMLElement {
	constructor(hostList: HostList, localeList: LocaleList) {
		super({ name: 'ExecutionEnvironment', content: [hostList, localeList] });
	}
}

class HostList extends XMLElement {
	constructor(hosts: Host | Host[]) {
		super({ name: 'HostList', content: hosts });
	}
}

enum HostEngine {
	'INCOPY' = 'AICY',
	'INDESIGN' = 'IDSN',
	'ILLUSTRATOR' = 'ILST',
	'PHOTOSHOP' = 'PHXS',
	'PRELUDE' = 'PRLD',
	'PREMIERE PRO' = 'PPRO',
	'DREAMWEAVER' = 'DRWV',
	'FLASH PRO' = 'FLPR',
	'AFTER EFFECTS' = 'AEFT',
	'InCopy' = 'AICY',
	'InDesign' = 'IDSN',
	'Illustrator' = 'ILST',
	'Photoshop' = 'PHXS',
	'Prelude' = 'PRLD',
	'Premiere Pro' = 'PPRO',
	'Dreamweaver' = 'DRWV',
	'Flash Pro' = 'FLPR',
	'After Effects' = 'AEFT',
}
type VersionNumber =
	| `${number}`
	| `${number}.${number}`
	| `${number}.${number}.${number}`
	| `${number}.${number}.${number}.${number}`;
type RangedVersion = number | VersionNumber | `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`;

const isRangedVersion = (value: any) => {
	if (typeof value === 'number') value = value.toString();
	if (typeof value === 'string')
		return /(\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?)|([(\[]\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?,?\d{1,9}(\.\d{1,9}(\.\d{1,9}(\.(\w|_|-)+)?)?)?[)\]])/.test(
			value,
		);
	return false;
};

const isEnumToken = <T>(testedEnum: T) => {
	let generatedFunction = (token: any): token is T[keyof T] =>
		(Object as any).values(testedEnum).includes(token as T[keyof T]);
	return generatedFunction;
};
const isEnumKey = <T>(testesEnum: T) => {
	let generatedFunction = (testedKey: string) => Object.keys(testesEnum).includes(testedKey.toUpperCase());
	return generatedFunction;
};
const isHostEngineKey = isEnumKey(HostEngine);
const isHostEngineValue = isEnumToken(HostEngine);

class Host extends XMLElement {
	constructor(hostName: HostEngine | keyof typeof HostEngine, version: 'All' | 'ALL' | 'all' | RangedVersion) {
		let attribute = [];
		if (hostName && isHostEngineValue(hostName)) attribute.push({ name: 'Name', value: hostName });
		else if (hostName && isHostEngineKey(hostName)) attribute.push({ name: 'Name', value: HostEngine[hostName] });
		else
			throw new Error(
				badArgumentError(
					'Host Engine Name',
					'string containing a key of HostEngine (enum) or a value of HostEngine',
					hostName,
				),
			);
		let versionAttr = { name: 'Version', value: '' };
		if (version && isRangedVersion(version)) {
			versionAttr.value = version.toString();
		} else if (version && typeof version === 'string' && version.toUpperCase() === 'ALL') {
			versionAttr.value = '[0,99]';
		} else
			throw new Error(
				badArgumentError(
					'Host version',
					"string containing a version number, a version range ([1,13]) or the word 'ALL'",
					version,
				),
			);
		attribute.push(versionAttr);

		super({ name: 'Host', attributes: attribute });
	}
}

class LocaleList extends XMLElement {
	constructor(content: LocaleElement | LocaleElement[]) {
		if (content instanceof LocaleElement) [content];
		else if (Array.isArray(content))
			throw new Error(
				badArgumentError('LocaleList content', 'instance of LocaleElement (class) or LocaleElement[]', content),
			);
		super({ name: 'LocaleList', content: content });
	}
}

enum AdobeLocaleCodes {
	'All' = 'All',
	'en_US' = 'en_US',
	'fr_FR' = 'fr_FR',
	'de_DE' = 'de_DE',
	'ja_JP' = 'ja_JP',
	'fr_CA' = 'fr_CA',
	'en_GB' = 'en_GB',
	'nl_NL' = 'nl_NL',
	'it_IT' = 'it_IT',
	'es_ES' = 'es_ES',
	'es_MX' = 'es_MX',
	'pt_BR' = 'pt_BR',
	'pt_PT' = 'pt_PT',
	'sv_SE' = 'sv_SE',
	'da_DK' = 'da_DK',
	'fi_FI' = 'fi_FI',
	'nb_NO' = 'nb_NO',
	'zh_CN' = 'zh_CN',
	'zh_TW' = 'zh_TW',
	'kr_KR' = 'kr_KR',
	'cs_CZ' = 'cs_CZ',
	'ht_HU' = 'ht_HU',
	'pl_PL' = 'pl_PL',
	'ru_RU' = 'ru_RU',
	'uk_UA' = 'uk_UA',
	'tr_TR' = 'tr_TR',
	'sk_SK' = 'sk_SK',
	'sl_SI' = 'sl_SI',
	'eu_ES' = 'eu_ES',
	'ca_ES' = 'ca_ES',
	'hr_HR' = 'hr_HR',
	'ro_RO' = 'ro_RO',
	'fr_MA' = 'fr_MA',
	'en_AE' = 'en_AE',
	'en_IL' = 'en_IL',
}

const isAdobeLocaleCodesValue = isEnumToken(AdobeLocaleCodes);

class LocaleElement extends XMLElement {
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

class RequiredRuntimeList extends XMLElement {
	constructor(content?: RequiredRuntime | RequiredRuntime[]) {
		if (content !== undefined && content instanceof RequiredRuntime) content = [content];
		else if (content !== undefined && Array.isArray(content)) {
			const filteredContent = content.filter((element) => element instanceof RequiredRuntime);
			if (filteredContent.length !== content.length) {
				console.warn(`Some of the elements in the array of RequiredRuntime were ignored because they weren't an instance of RequiredRuntime. 
				Received ${content}
				Kept ${filteredContent}`);
				content = filteredContent;
			}
		} else if (content !== undefined)
			console.warn(
				`Content of RequiredRuntimeList must be of type RequiredRuntime (class) or RequiredRuntime[], ${
					typeof content === 'string' ? `'${content}'` : content
				} (${typeof content}) received`,
			);
		('');
		super({ name: 'RequiredRuntimeList', content: content });
	}
}

class RequiredRuntime extends XMLElement {
	constructor(version: RangedVersion) {
		if (version === undefined || !isRangedVersion(version))
			throw new Error(badArgumentError(`Each RequiredRuntime Element need a version`, `RangedVersion`, version));
		super({
			name: 'RequiredRuntime',
			attributes: [
				{ name: 'Name', value: 'CSXS' },
				{ name: 'Version', value: version.toString() },
			],
		});
	}
}

class DispatchInfoList extends XMLElement {
	constructor(extensions: Extension | Extension[]) {
		if (extensions instanceof Extension) extensions = [extensions];
		super({ name: 'DispatchInfoList', content: extensions });
	}
}

class DispatchInfo extends XMLElement {
	constructor() {
		super({ name: 'DispatchInfo' });
	}
}
