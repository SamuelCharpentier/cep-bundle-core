import { Abstract } from '@manifest/Abstract';

describe('Abstract', () => {
	it('is defined', () => {
		expect(Abstract).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Abstract(badArgument);
		}).toThrow('Validation Error: abstract must be provided as a valid URL (type), undefined (undefined) received');
	});
	it('Invalidates non-URL argument', () => {
		badArgument = 42;
		expect(() => {
			new Abstract(badArgument);
		}).toThrow('Validation Error: abstract must be provided as a valid URL (type), 42 (number) received');
		badArgument = {};
		expect(() => {
			new Abstract(badArgument);
		}).toThrow('Validation Error: abstract must be provided as a valid URL (type), \n{}\n (object) received');
		badArgument = ['hello'];
		expect(() => {
			new Abstract(badArgument);
		}).toThrow('Validation Error: abstract must be provided as a valid URL (type), \n["hello"]\n (array) received');
		badArgument = true;
		expect(() => {
			new Abstract(badArgument);
		}).toThrow('Validation Error: abstract must be provided as a valid URL (type), true (boolean) received');
		badArgument = () => {};
		expect(() => {
			new Abstract(badArgument);
		}).toThrow('Validation Error: abstract must be provided as a valid URL (type), [Function] (function) received');
	});
	it('Invalidates bad URL value', () => {
		badArgument = 'Some abstraction text';
		expect(() => {
			new Abstract(badArgument);
		}).toThrow(
			"Validation Error: abstract must be provided as a valid URL (type), 'Some abstraction text' (string) received",
		);
	});
	let validArgument: URL | string = new URL('http://myextension.com/abstract.html');
	it('validates any URL', () => {
		expect(() => {
			new Abstract(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		const abstract = new Abstract(validArgument);
		expect(abstract.xml(['manifest.xml'])).toBe('<Abstract href="http://myextension.com/abstract.html"/>\n');
		validArgument = 'http://myextension.com/some/weird/sub/url/as/string/abstract.html';
		const dispatchInfo2 = new Abstract(validArgument);
		expect(dispatchInfo2.xml(['manifest.xml'])).toBe(
			'<Abstract href="http://myextension.com/some/weird/sub/url/as/string/abstract.html"/>\n',
		);
	});
});
