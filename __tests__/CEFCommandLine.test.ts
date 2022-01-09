import { CEFCommandLine } from '@manifest/CEFCommandLine';

describe('CEFCommandLine', () => {
	it('Is defined', () => {
		expect(CEFCommandLine).toBeDefined();
	});
	let badArgument: any;
	it('Invalidated undefined argument', () => {
		expect(() => {
			new CEFCommandLine(badArgument);
		}).toThrow(
			'Validation Error: cefParams must be provided as a Command (type) or an array of Commands (type), undefined (undefined) received',
		);
	});
	it('Invalidate invalid commands argument', () => {
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
	it('validates a valid command string or an array of valid commands', () => {
		badArgument = '--enable-media-stream';
		expect(() => {
			new CEFCommandLine(badArgument);
		}).not.toThrow();
		badArgument = ['--enable-media-stream', '--disable-pinch'];
		expect(() => {
			new CEFCommandLine(badArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		const commandLine = new CEFCommandLine(['--enable-media-stream']);
		expect(commandLine.xml()).toBe(
			'<CEFCommandLine>\n\t<Parameter>--enable-media-stream</Parameter>\n</CEFCommandLine>\n',
		);
	});
});
