import { LocaleList, LocaleListArgument } from '@manifest/LocaleList';
import { AdobeLocaleCodes } from '@src/lib/enumsAndValidators';

describe('LocaleList', () => {
	it('Is defined', () => {
		expect(LocaleList).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: localeList must be provided as LocaleListArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates an argument other than a string containing a string key or enum value from AdobeLocaleCodes (enum) or an array of string key or enum values from AdobeLocaleCodes', () => {
		badArgument = 42;
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: localeList must be provided as LocaleListArgument (type), 42 (number) received',
		);
		badArgument = true;
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: localeList must be provided as LocaleListArgument (type), true (boolean) received',
		);
		badArgument = {};
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: localeList must be provided as LocaleListArgument (type), \n{}\n(object) received',
		);
		badArgument = [];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: localeList must be provided as LocaleListArgument (type), \n[]\n(array) received',
		);
		badArgument = '';
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			"Validation Error: localeList must be provided as LocaleListArgument (type), '' (string) received",
		);
	});
	it('Invalidates non localeCodes strings', () => {
		badArgument = 'hello';
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			"Validation Error: localeList must be provided as localeCodes (type), 'hello' (string) received",
		);
	});
	it('Invalidates an array contining anything other than localeCodes', () => {
		badArgument = [42];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), 42 (number) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			"Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), 'hello' (string) received",
		);
		badArgument = [true];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), true (boolean) received',
		);
		badArgument = [{}];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), \n{}\n(object) received',
		);
		badArgument = [[]];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), \n[]\n(array) received',
		);
		badArgument = ['en_US', 42];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), 42 (number) received',
		);
		badArgument = ['en_US', 'hello'];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			"Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), 'hello' (string) received",
		);
		badArgument = ['en_US', true];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), true (boolean) received',
		);
		badArgument = ['en_US', {}];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), \n{}\n(object) received',
		);
		badArgument = ['en_US', []];
		expect(() => {
			new LocaleList(badArgument);
		}).toThrow(
			'Validation Error: Each elements of the localeLists array must be provided as localeCodes (type), \n[]\n(array) received',
		);
	});
	let validArgument: LocaleListArgument;
	it('Validates localeCode strings', () => {
		validArgument = 'en_US';
		expect(() => {
			new LocaleList(validArgument);
		}).not.toThrow();
	});
	it('Validates localeCode enums', () => {
		validArgument = AdobeLocaleCodes.en_US;
		expect(() => {
			new LocaleList(validArgument);
		}).not.toThrow();
	});
	it('Validates localeCode arrays', () => {
		validArgument = ['en_US', 'fr_FR'];
		expect(() => {
			new LocaleList(validArgument);
		}).not.toThrow();
	});
	it('Validates localeCode enums in arrays', () => {
		validArgument = ['en_US', AdobeLocaleCodes.fr_FR];
		expect(() => {
			new LocaleList(validArgument);
		}).not.toThrow();
	});
	it('outputs xml', () => {
		const localeList = new LocaleList('en_US');
		expect(localeList.xml()).toBe(
			'<LocaleList>\n\t<Locale Code="en_US"/>\n</LocaleList>\n',
		);
	});
});
