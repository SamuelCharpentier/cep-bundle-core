import { CEFCommandLine } from '@manifest/CEFCommandLine';
import { Command } from '@src/lib/typesAndValidators';

describe('CEFCommandLine', () => {
	it('Is defined', () => {
		expect(CEFCommandLine).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			'Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), undefined (undefined) received',
		);
	});
	it('Invalidate non-string argument', () => {
		badArgument = 42;
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			'Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), 42 (number) received',
		);
		badArgument = 'test';
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			"Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), 'test' (string) received",
		);
		badArgument = () => {};
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			'Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), [Function] (function) received',
		);
		badArgument = {};
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			'Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), \n{}\n (object) received',
		);
	});
	it('invalidates a bad command in a string of array', () => {
		badArgument = ['test'];
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			"Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), 'test' (string) received",
		);
		badArgument = ['--enable-media-stream', 'test'];
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			"Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), 'test' (string) received",
		);
	});
	let validArgument: Command | Command[];
	it('validates a valid command string or an array of valid commands', () => {
		validArgument = '--enable-media-stream';
		expect(() => {
			new CEFCommandLine(validArgument);
		}).not.toThrow();
		validArgument = ['--enable-media-stream', '--disable-pinch'];
		expect(() => {
			new CEFCommandLine(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		const commandLine = new CEFCommandLine(['--enable-media-stream']);
		expect(commandLine.xml()).toBe(
			'<CEFCommandLine>\n\t<Parameter>--enable-media-stream</Parameter>\n</CEFCommandLine>\n',
		);
	});
});
