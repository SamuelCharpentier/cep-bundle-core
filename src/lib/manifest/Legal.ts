import { HrefElement } from './HrefElement';
import { isValidUrl } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';
export class Legal extends HrefElement {
	constructor(href: URL | string) {
		if (!isValidUrl(href)) throw new Error(badArgumentError('legal', 'a valid URL (type)', href));
		super('Legal', href);
	}
}
