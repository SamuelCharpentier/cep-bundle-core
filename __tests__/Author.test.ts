import { Author } from '@manifest/Author';

describe('Author', () => {
	it('is defined', () => {
		expect(Author).toBeDefined();
	});
	it('is a class', () => {
		expect(Author).toBeInstanceOf(Function);
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Author(badArgument);
		}).toThrow('Validation Error: authorName must be provided as a string, undefined (undefined) received');
	});
	it('Invalidates non-string argument', () => {
		badArgument = 42;
		expect(() => {
			new Author(badArgument);
		}).toThrow('Validation Error: authorName must be provided as a string, 42 (number) received');
		badArgument = {};
		expect(() => {
			new Author(badArgument);
		}).toThrow('Validation Error: authorName must be provided as a string, \n{}\n (object) received');
		badArgument = ['hello'];
		expect(() => {
			new Author(badArgument);
		}).toThrow('Validation Error: authorName must be provided as a string, \n["hello"]\n (array) received');
		badArgument = true;
		expect(() => {
			new Author(badArgument);
		}).toThrow('Validation Error: authorName must be provided as a string, true (boolean) received');
		badArgument = () => {};
		expect(() => {
			new Author(badArgument);
		}).toThrow('Validation Error: authorName must be provided as a string, [Function] (function) received');
	});
	let validArgument: string = 'Extension Creator';
	it('validates any URL', () => {
		expect(() => {
			new Author(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		const abstract = new Author(validArgument);
		expect(abstract.xml(['manifest.xml'])).toBe('<Author>Extension Creator</Author>\n');
	});
});
