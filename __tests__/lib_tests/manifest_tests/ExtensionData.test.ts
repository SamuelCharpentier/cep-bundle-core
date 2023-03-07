import { ExtensionData } from '@manifest/ExtensionData';

describe('ExtensionData', () => {
	it('Is defined', () => {
		expect(ExtensionData).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new ExtensionData(badArgument);
		}).toThrow(
			'Validation Error: extensionData must be provided as a string, undefined (undefined) received',
		);
	});
	it('Invalidates non-string argument', () => {
		badArgument = 42;
		expect(() => {
			new ExtensionData(badArgument);
		}).toThrow(
			'Validation Error: extensionData must be provided as a string, 42 (number) received',
		);
		badArgument = {};
		expect(() => {
			new ExtensionData(badArgument);
		}).toThrow(
			'Validation Error: extensionData must be provided as a string, \n{}\n(object) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new ExtensionData(badArgument);
		}).toThrow(
			'Validation Error: extensionData must be provided as a string, \n["hello"]\n(array) received',
		);
		badArgument = true;
		expect(() => {
			new ExtensionData(badArgument);
		}).toThrow(
			'Validation Error: extensionData must be provided as a string, true (boolean) received',
		);
		badArgument = () => {};
		expect(() => {
			new ExtensionData(badArgument);
		}).toThrow(
			'Validation Error: extensionData must be provided as a string, badArgument() (function) received',
		);
	});
	it('invalidates string of length 0', () => {
		badArgument = '';
		expect(() => {
			new ExtensionData(badArgument);
		}).toThrow(
			"Validation Error: extensionData must be provided as a string of at least one character, '' (string) received",
		);
	});
	let validArgument: string;
	it('validates any string', () => {
		validArgument = 'hello';
		expect(() => {
			new ExtensionData(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		const validArgument = 'hello';
		const extensionData = new ExtensionData(validArgument);
		expect(extensionData.xml()).toBe(
			`<ExtensionData>${validArgument}</ExtensionData>\n`,
		);
	});
});
