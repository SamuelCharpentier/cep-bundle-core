import { XMLElement } from './XMLElement';
import { EmailAddress } from '@src/lib/typesAndValidators';
export class Contact extends XMLElement {
	constructor(contactEmail: EmailAddress) {
		super({
			name: 'Contact',
			attributes: { name: 'mailto', value: contactEmail },
		});
	}
}
