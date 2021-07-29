import { HrefElement } from './HrefElement';
export class Abstract extends HrefElement {
	constructor(href: URL | string) {
		super('Abstract', href);
	}
}
