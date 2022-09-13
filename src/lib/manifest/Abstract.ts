import { HrefElement } from './HrefElement';
import { isValidUrl } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

/**
 *
 *
 * @export
 * @class Abstract
 * @extends {HrefElement}
 */
export class Abstract extends HrefElement {
	/**
	 * Creates an instance of Abstract.
	 * @param {(URL | string)} href
	 * @memberof Abstract
	 */
	constructor(href: URL | string) {
		if (!isValidUrl(href))
			throw new Error(
				badArgumentError('abstract', 'a valid URL (type)', href),
			);
		super('Abstract', href);
	}
}
