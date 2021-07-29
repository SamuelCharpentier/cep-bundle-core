import { HrefElement } from './HrefElement';
export class Legal extends HrefElement {
	constructor(href: URL | string) {
		super('Legal', href);
	}
}
