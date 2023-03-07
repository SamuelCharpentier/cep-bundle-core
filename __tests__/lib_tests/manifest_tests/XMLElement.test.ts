import { XMLElement, XMLElementArgument } from '@manifest/XMLElement';
import { StringContent } from '@manifest/StringContent';

describe('XMLElement', () => {
	it('should be defined', () => {
		expect(XMLElement).toBeDefined();
	});
	it('should be a function', () => {
		expect(typeof XMLElement).toBe('function');
	});
	let badArgument: any;
	it('Invalidated undefined argument', () => {
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			'Validation Error: XMLElement argument must be provided as an XMLElementArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates invalid argument type', () => {
		badArgument = 42;
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			'Validation Error: XMLElement argument must be provided as an XMLElementArgument (type), 42 (number) received',
		);
		badArgument = "I'm not an XMLElementArgument";
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement argument must be provided as an XMLElementArgument (type), 'I'm not an XMLElementArgument' (string) received",
		);
		badArgument = true;
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			'Validation Error: XMLElement argument must be provided as an XMLElementArgument (type), true (boolean) received',
		);
		badArgument = [];
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			'Validation Error: XMLElement argument must be provided as an XMLElementArgument (type), \n[]\n(array) received',
		);
		badArgument = () => {};
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			'Validation Error: XMLElement argument must be provided as an XMLElementArgument (type), [Function] (function) received',
		);
	});
	it('Invalidates invalid argument value', () => {
		badArgument = {};
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string, undefined (undefined) received",
		);
		badArgument = { name: 42 };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string, 42 (number) received",
		);
		badArgument = { name: true };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string, true (boolean) received",
		);
		badArgument = { name: [] };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string, \n[]\n(array) received",
		);
		badArgument = { name: {} };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string, \n{}\n(object) received",
		);
		badArgument = { name: () => {} };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string, name() (function) received",
		);
		badArgument = { name: '' };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a non-empty string, '' (string) received",
		);
		badArgument = { name: ' ' };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string containing only alphanumeric characters, underscores, hyphens and periods, ' ' (string) received",
		);
		badArgument = { name: 'a bad name' };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.name must be provided as a string containing only alphanumeric characters, underscores, hyphens and periods, 'a bad name' (string) received",
		);
		badArgument = { name: 'Valid_Name', attributes: 42 };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.attributes (optional) must be provided as an AttributeArgument (type) or an array of AttributeArgument, 42 (number) received",
		);
		badArgument = { name: 'Valid_Name', attributes: true };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.attributes (optional) must be provided as an AttributeArgument (type) or an array of AttributeArgument, true (boolean) received",
		);
		badArgument = { name: 'Valid_Name', attributes: [] };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.attributes (optional) must be provided as an AttributeArgument (type) or an array of AttributeArgument, \n[]\n(array) received",
		);
		badArgument = { name: 'Valid_Name', attributes: {} };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.attributes (optional) must be provided as an AttributeArgument (type) or an array of AttributeArgument, \n{}\n(object) received",
		);
		badArgument = { name: 'Valid_Name', attributes: () => {} };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.attributes (optional) must be provided as an AttributeArgument (type) or an array of AttributeArgument, attributes() (function) received",
		);
		badArgument = { name: 'Valid_Name', attributes: [{}] };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: When provided as an array, each XMLElement's argument.attribute (optional) must be provided as an AttributeArgument (type), \n{}\n(object) received",
		);
		// Other attribute validation is tested in Attribute
		badArgument = { name: 'Valid_Name', content: true };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.content (optional) must be provided as an XMLElement (class), an array of XMLElement, a StringContent (class), a string or a number, true (boolean) received",
		);
		badArgument = { name: 'Valid_Name', content: {} };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: When provided as an object, XMLElement's argument.content (optional) must be provided as a StringContent (class) instance, \n{}\n(object) received",
		);
		badArgument = { name: 'Valid_Name', content: [42] };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"When provided as an array, XMLElement's argument.content (optional) must be provided as an XMLElement (class), 42 (number) received",
		);
		badArgument = { name: 'Valid_Name', content: [{}] };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"When provided as an array, XMLElement's argument.content (optional) must be provided as an XMLElement (class), \n{}\n(object) received",
		);
		badArgument = {
			name: 'Valid_Name',
			content: ' ',
		};
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: When provided as a string, XMLElement's argument.content must be provided as a non-empty string, ' ' (string) received",
		);
		badArgument = { name: 'Valid_Name', context: 'hello' };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.context (optional) must be provided as a function, 'hello' (string) received",
		);
		badArgument = { name: 'Valid_Name', context: 42 };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.context (optional) must be provided as a function, 42 (number) received",
		);
		badArgument = { name: 'Valid_Name', context: true };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.context (optional) must be provided as a function, true (boolean) received",
		);
		badArgument = { name: 'Valid_Name', context: [] };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.context (optional) must be provided as a function, \n[]\n(array) received",
		);
		badArgument = { name: 'Valid_Name', context: {} };
		expect(() => {
			new XMLElement(badArgument);
		}).toThrow(
			"Validation Error: XMLElement's argument.context (optional) must be provided as a function, \n{}\n(object) received",
		);
	});

	let validArgument: XMLElementArgument = { name: 'Valid_Name' };
	it('Validates valid argument values', () => {
		expect(() => {
			new XMLElement(validArgument);
		}).not.toThrow();
		validArgument = {
			name: 'Valid_Name',
			attributes: [{ name: 'Valid_Name' }],
		};
		expect(() => {
			new XMLElement(validArgument);
		}).not.toThrow();
		validArgument = {
			name: 'Valid_Name',
			attributes: [{ name: 'Valid_Name', value: 'Valid_Value' }],
		};
		expect(() => {
			new XMLElement(validArgument);
		}).not.toThrow();
		validArgument = {
			name: 'Valid_Name',
			attributes: [{ name: 'Valid_Name', value: 'Valid_Value' }],
			content: 'Valid_Content',
		};
		expect(() => {
			new XMLElement(validArgument);
		}).not.toThrow();
		validArgument = {
			name: 'Valid_Name',
			attributes: [
				{ name: 'Valid_Name', value: 'Valid_Value' },
				{ name: '2ndValid_Name', value: '2ndValid_Value' },
			],
			content: 5000,
		};
		expect(() => {
			new XMLElement(validArgument);
		}).not.toThrow();
		validArgument = {
			name: 'Valid_Name',
			attributes: [{ name: 'Valid_Name', value: 'Valid_Value' }],
			content: [new XMLElement({ name: 'Valid_Name' })],
		};
		expect(() => {
			new XMLElement(validArgument);
		}).not.toThrow();
	});
	it('outputs an empty string if it has no attribute or content', () => {
		const xmlElement = new XMLElement({ name: 'Valid_Name' });
		expect(xmlElement.xml()).toBe('');
	});
});
