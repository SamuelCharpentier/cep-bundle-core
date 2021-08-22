import { XMLElement } from './XMLElement';
export class HrefElement extends XMLElement {
	constructor(elementName: string, href: URL | string) {
		if (href instanceof URL) href = href.href;
		super({ name: elementName, attributes: { name: 'href', value: href } });
	}
}
