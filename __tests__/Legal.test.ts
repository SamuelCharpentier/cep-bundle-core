import { Legal } from '@manifest/Legal';

describe('Legal', () => {
	it('is defined', () => {
		expect(Legal).toBeDefined();
	});
	it('should be a function', () => {
		expect(Legal).toBeInstanceOf(Function);
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Legal(badArgument);
		}).toThrow(
			'Validation Error: legal must be provided as a valid URL (type), undefined (undefined) received',
		);
	});
	it('Invalidates non-URL argument', () => {
		badArgument = 42;
		expect(() => {
			new Legal(badArgument);
		}).toThrow(
			'Validation Error: legal must be provided as a valid URL (type), 42 (number) received',
		);
		badArgument = {};
		expect(() => {
			new Legal(badArgument);
		}).toThrow(
			'Validation Error: legal must be provided as a valid URL (type), \n{}\n (object) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new Legal(badArgument);
		}).toThrow(
			'Validation Error: legal must be provided as a valid URL (type), \n["hello"]\n (array) received',
		);
		badArgument = true;
		expect(() => {
			new Legal(badArgument);
		}).toThrow(
			'Validation Error: legal must be provided as a valid URL (type), true (boolean) received',
		);
		badArgument = () => {};
		expect(() => {
			new Legal(badArgument);
		}).toThrow(
			'Validation Error: legal must be provided as a valid URL (type), [Function] (function) received',
		);
	});
	it('Invalidates bad URL value', () => {
		badArgument = 'Some legal text';
		expect(() => {
			new Legal(badArgument);
		}).toThrow(
			"Validation Error: legal must be provided as a valid URL (type), 'Some legal text' (string) received",
		);
	});
	let validArgument: URL | string;
	it('validates any URL', () => {
		validArgument = new URL('http://myextension.com/legal.html');
		expect(() => {
			new Legal(validArgument);
		}).not.toThrow();
		validArgument = 'http://myextension.com/legal.html';
		expect(() => {
			new Legal(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		validArgument = new URL('http://myextension.com/legal.html');
		let legal = new Legal(validArgument);
		expect(legal.xml(['manifest.xml'])).toBe(
			'<Legal href="http://myextension.com/legal.html"/>\n',
		);
		validArgument =
			'http://myextension.com/some/weird/sub/url/as/string/legal.html';
		legal = new Legal(validArgument);
		expect(legal.xml(['manifest.xml'])).toBe(
			'<Legal href="http://myextension.com/some/weird/sub/url/as/string/legal.html"/>\n',
		);
	});
});
