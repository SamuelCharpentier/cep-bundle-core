import { XMLElement } from './XMLElement';
import { EmailAddress, isEmail } from './typesAndValidators';
import { badArgumentError } from './errorMessages';
export class Contact extends XMLElement {
	constructor(contactEmail: EmailAddress) {
		if (!isEmail) throw new Error(badArgumentError('Contact email', 'valid email string', contactEmail));
		super({ name: 'Contact', attributes: { name: 'mailto', value: contactEmail } });
	}
}
