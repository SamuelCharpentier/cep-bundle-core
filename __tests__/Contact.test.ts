import { Contact } from '@manifest/Contact';
import { EmailAddress } from '@src/lib/typesAndValidators';

describe('Contact', () => {
	it('is defined', () => {
		expect(Contact).toBeDefined();
	});
	it('should be a function', () => {
		expect(Contact).toBeInstanceOf(Function);
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Contact(badArgument);
		}).toThrow(
			'Validation Error: contact must be provided as a valid EmailAdress (type), undefined (undefined) received',
		);
	});
	it('Invalidates non-EmailAdress argument', () => {
		badArgument = 42;
		expect(() => {
			new Contact(badArgument);
		}).toThrow('Validation Error: contact must be provided as a valid EmailAdress (type), 42 (number) received');
		badArgument = {};
		expect(() => {
			new Contact(badArgument);
		}).toThrow(
			'Validation Error: contact must be provided as a valid EmailAdress (type), \n{}\n (object) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new Contact(badArgument);
		}).toThrow(
			'Validation Error: contact must be provided as a valid EmailAdress (type), \n["hello"]\n (array) received',
		);
		badArgument = true;
		expect(() => {
			new Contact(badArgument);
		}).toThrow('Validation Error: contact must be provided as a valid EmailAdress (type), true (boolean) received');
		badArgument = () => {};
		expect(() => {
			new Contact(badArgument);
		}).toThrow(
			'Validation Error: contact must be provided as a valid EmailAdress (type), [Function] (function) received',
		);
	});
	it('Invalidates bad URL value', () => {
		badArgument = 'Some legal text';
		expect(() => {
			new Contact(badArgument);
		}).toThrow(
			"Validation Error: contact must be provided as a valid EmailAdress (type), 'Some legal text' (string) received",
		);
	});
	let validArgument: EmailAddress = 'contact@extension.com';
	it('validates any URL', () => {
		expect(() => {
			new Contact(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		const abstract = new Contact(validArgument);
		expect(abstract.xml(['manifest.xml'])).toBe('<Contact mailto="contact@extension.com"/>\n');
	});
});
