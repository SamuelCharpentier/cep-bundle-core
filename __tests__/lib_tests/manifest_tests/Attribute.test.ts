import { Attribute, AttributeArgument } from '@manifest/Attribute';

describe('Attribute', () => {
	it('should be defined', () => {
		expect(Attribute).toBeDefined();
	});
	it('is a class', () => {
		expect(Attribute).toBeInstanceOf(Function);
	});
	let badArgument: any;
	it('invalidates undefined argument', () => {
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute must be provided as an AttributeArgument (type), undefined (undefined) received',
		);
	});
	it('invalidates non-AttributeArgument argument', () => {
		badArgument = {};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute must be provided as an AttributeArgument (type), \n{}\n(object) received',
		);
		badArgument = "I'm not an AttributeArgument";
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			"Validation Error: attribute must be provided as an AttributeArgument (type), 'I'm not an AttributeArgument' (string) received",
		);
		badArgument = 42;
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute must be provided as an AttributeArgument (type), 42 (number) received',
		);
		badArgument = true;
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute must be provided as an AttributeArgument (type), true (boolean) received',
		);
		badArgument = ['I', 'am', 'not', 'an', 'AttributeArgument'];
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute must be provided as an AttributeArgument (type), \n["I", "am", "not", "an", "AttributeArgument"]\n(array) received',
		);
		badArgument = () => {};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute must be provided as an AttributeArgument (type), badArgument() (function) received',
		);
	});
	it('invalidates bad name value', () => {
		badArgument = {
			name: '',
			value: '',
		};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			"Validation Error: attribute.name must be provided as a string, '' (string) received",
		);
		badArgument = {
			name: 42,
			value: '',
		};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.name must be provided as a string, 42 (number) received',
		);
		badArgument = {
			name: true,
			value: '',
		};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.name must be provided as a string, true (boolean) received',
		);
		badArgument = {
			name: [],
			value: '',
		};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.name must be provided as a string, \n[]\n(array) received',
		);
		badArgument = {
			name: () => {},
			value: '',
		};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.name must be provided as a string, name() (function) received',
		);
	});
	it('invalidates bad value value', () => {
		badArgument = {
			name: 'name',
			value: '',
		};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			"Validation Error: attribute.value (optional) must be provided as a string, '' (string) received",
		);
		badArgument.value = 42;
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.value (optional) must be provided as a string, 42 (number) received',
		);
		badArgument.value = true;
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.value (optional) must be provided as a string, true (boolean) received',
		);
		badArgument.value = [];
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.value (optional) must be provided as a string, \n[]\n(array) received',
		);
		badArgument.value = () => {};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.value (optional) must be provided as a string, [annonymous function] (function) received',
		);
	});
	it('invalidates a bad context (optional)', () => {
		badArgument = {
			name: 'name',
			value: 'value',
			context: '',
		};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			"Validation Error: attribute.context (optional) must be provided as a function returning a boolean, '' (string) received",
		);
		badArgument.context = 42;
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.context (optional) must be provided as a function returning a boolean, 42 (number) received',
		);
		badArgument.context = true;
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.context (optional) must be provided as a function returning a boolean, true (boolean) received',
		);
		badArgument.context = [];
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.context (optional) must be provided as a function returning a boolean, \n[]\n(array) received',
		);
		badArgument.context = () => {};
		expect(() => {
			new Attribute(badArgument);
		}).toThrow(
			'Validation Error: attribute.context (optional) must be provided as a function returning a boolean, [annonymous function] (function) received',
		);
	});
	let validArgument: AttributeArgument;
	it('validates a valid argument', () => {
		validArgument = {
			name: 'name',
			value: 'value',
		};
		expect(() => {
			new Attribute(validArgument);
		}).not.toThrow();
		validArgument = {
			name: 'name',
			value: 'value',
			context: () => true,
		};
		expect(() => {
			new Attribute(validArgument);
		}).not.toThrow();
	});
	it('outputs xml with and without an argument value', () => {
		validArgument = {
			name: 'name',
			value: 'value',
		};

		const space = ' ';
		var attribute = new Attribute(validArgument);
		expect(attribute.xml()).toBe(`${space}name="value"`);

		validArgument.context = () => true;
		attribute = new Attribute(validArgument);
		expect(attribute.xml()).toBe(`${space}name="value"`);

		validArgument.value = undefined;
		attribute = new Attribute(validArgument);
		expect(attribute.xml()).toBe(`${space}name`);

		validArgument.context = undefined;
		attribute = new Attribute(validArgument);
		expect(attribute.xml()).toBe(`${space}name`);
	});
});
