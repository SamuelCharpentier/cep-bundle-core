import { XMLElement } from './XMLElement';
import { EmailAdress, isEmail } from './typesAndValidators';
export class Contact extends XMLElement {
	constructor(contactEmail: EmailAdress) {
		if (!isEmail) throw new Error(badArgumentError('Contact email', 'valid email string', contactEmail));
		super({ name: 'Contact', attributes: { name: 'mailto', value: contactEmail } });
	}
}
