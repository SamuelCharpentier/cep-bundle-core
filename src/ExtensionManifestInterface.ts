type LocalizationKey = `%${string}`;

//type Element<Name, Content, Attributes> = { name: Name; attributes?: Attributes; content: Content };
type Attribute = { name: string; value: string };

interface Contact {
	mailto: EmailAdress;
}

interface Legal {
	href: URL;
}

interface Abstract {
	href: URL;
}

interface Extension {
	attributes: {
		Id: string;
		Version: string;
	};
}

enum HostsByName {
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

interface Host {
	Name: HostsByName;
	Version: string;
}

interface SupportedLocale {
	attribute: {
		Code: AdobeLocales;
	};
}
interface Runtime {
	name: 'CSXS';
	version: string;
}

interface ExecutionEnvironment {
	hostList: Host[] | Host;
	localeList: SupportedLocale[] | SupportedLocale;
	RequiredRuntimeList: {
		RequiredRuntime: Runtime;
	};
}

interface Resources {
	MainPath: string;
	ScriptPath?: string;
}

enum StartOnEvents {
	documentAfterActivate,
	documentAfterDeactivate,
	applicationActivate,
	applicationBeforeQuit,
	documentAfterSave,
}

interface Lifecycle {
	AutoVisible: boolean;
	StartOn: StartOnEvents;
}

enum UITypes {
	Panel,
	ModalDialog,
	Modeless,
}

interface Size {
	Height: number | LocalizationKey;
	Width: number | LocalizationKey;
}
interface MaxSize {
	Height?: number | LocalizationKey;
	Width?: number | LocalizationKey;
}
interface MinSize {
	Height?: number | LocalizationKey;
	Width?: number | LocalizationKey;
}

interface Geometry {
	Size: Size;
	MaxSize?: MaxSize;
	MinSize?: MinSize;
}

interface UI {
	Type?: UITypes;
	Menu?: string | LocalizationKey;
	Geometry?: Geometry;
}
enum iconTypes {
	Normal,
	Disabled,
	Rollover,
}
interface Icon {
	path: string | LocalizationKey;
	Type: iconTypes;
}

interface DispatchInfo {
	resources: Resources;
	lifecycle: Lifecycle;
	UI: UI;
	Icons: Icon[] | Icon;
	attribute?: { Host?: HostsByName };
}

interface DispatchInfo {
	Extension: {
		attributes: {
			Id: string;
		};
		dispatchInfo: DispatchInfo[] | DispatchInfo;
	};
}

interface ExtensionData {
	attributes: {
		Id: string;
		host?: HostsByName;
	};
	data: string | LocalizedSettings;
}
interface ExtensionManifest {
	author?: string;
	contact?: { attributes: Contact };
	legal?: { attributes: Legal };
	abstract?: { attributes: Abstract };
	extensionList: Extension[] | Extension;
	executionEnvironment: ExecutionEnvironment;
	dispatchInfoList: DispatchInfo[] | DispatchInfo;
	extensionData?: ExtensionData[];
	dependencyList?: string;
}

//type AuthorType = Element<'Author', string, []>;

type ExtMani = (Author | string)[];

class StringContent {
	constructor(readonly value: string) {}
}
class Element {
	readonly name: string;
	readonly attributes: Attribute[] = [];
	readonly content: Element[] | StringContent = [];
	constructor({
		name,
		attributes,
		content,
	}: {
		name: string;
		attributes?: Attribute | Attribute[];
		content?: Element | Element[] | string;
	}) {
		this.name = name;
		if (attributes !== undefined) {
			if (attributes instanceof Array) this.attributes = attributes;
			else if (attributes instanceof Object) this.attributes = [attributes];
		}
		if (content !== undefined) {
			if (content instanceof Array) this.content = content;
			else if (content instanceof Element) this.content = [content];
			else if (typeof content === 'string') this.content = new StringContent(content);
		}
	}
}
class Author extends Element {
	constructor(authorName: string) {
		if (!authorName || typeof authorName !== 'string' || authorName.length <= 0)
			throw new Error(
				`Author name must be provided as a string, ${
					typeof authorName === 'string' ? `'${authorName}'` : authorName
				} (${typeof authorName}) received`,
			);
		super({ name: 'Author', content: authorName });
	}
}
type EmailAdress = `${string}@${string}.${string}`;
const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
class Contact extends Element {
	constructor(contactEmail: EmailAdress) {
		if (!emailRegex.test(contactEmail))
			throw new Error(
				`Contact email must be a valid email provided as a string, ${
					typeof contactEmail === 'string' ? `'${contactEmail}'` : contactEmail
				} (${typeof contactEmail}) received`,
			);
		super({ name: 'Contact', attributes: { name: 'mailto', value: contactEmail } });
	}
}

class HrefElement extends Element {
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
class ExtensionList extends Element {
	constructor(extensions: Extension[]) {
		super({ name: 'ExtensionList', content: extensions });
	}
}

class Extension extends Element {
	constructor() {
		super({ name: 'Extension', attributes: [] });
	}
}

type LocalizableSettings =
	| 'id'
	| 'name'
	| 'width'
	| 'height'
	| 'minWidth'
	| 'minHeight'
	| 'maxWidth'
	| 'maxHeight'
	| 'menu'
	| 'normalIcon'
	| 'disabledIcon'
	| 'rolloverIcon';

import { Locale } from 'locale-enum';

type AdobeLocales =
	| 'All'
	| 'en_US'
	| 'fr_FR'
	| 'de_DE'
	| 'ja_JP'
	| 'fr_CA'
	| 'en_GB'
	| 'nl_NL'
	| 'it_IT'
	| 'es_ES'
	| 'es_MX'
	| 'pt_BR'
	| 'pt_PT'
	| 'sv_SE'
	| 'da_DK'
	| 'fi_FI'
	| 'nb_NO'
	| 'zh_CN'
	| 'zh_TW'
	| 'kr_KR'
	| 'cs_CZ'
	| 'ht_HU'
	| 'pl_PL'
	| 'ru_RU'
	| 'uk_UA'
	| 'tr_TR'
	| 'sk_SK'
	| 'sl_SI'
	| 'eu_ES'
	| 'ca_ES'
	| 'hr_HR'
	| 'ro_RO'
	| 'fr_MA'
	| 'en_AE'
	| 'en_IL';

type LocalizedSettings = {
	[P in AdobeLocales]?: { [K in LocalizableSettings]?: string };
};

let myLocalizedSettings: LocalizedSettings = {
	fr_CA: { id: 'string', normalIcon: './images/icons/fr-CA/normal-icon.png' },
};
