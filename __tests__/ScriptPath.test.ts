import { ScriptPath } from '@manifest/ScriptPath';
import { RelativePath } from '@src/lib/typesAndValidators';

describe('MainPath', () => {
	it('Is defined', () => {
		expect(ScriptPath).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new ScriptPath(badArgument);
		}).toThrow(
			'Validation Error: scriptPath must be provided as a RelativePath (type), undefined (undefined) received',
		);
	});
	it('Invalidates an argument other than a string', () => {
		badArgument = 42;
		expect(() => {
			new ScriptPath(badArgument);
		}).toThrow('Validation Error: scriptPath must be provided as a RelativePath (type), 42 (number) received');
		badArgument = ['hello'];
		expect(() => {
			new ScriptPath(badArgument);
		}).toThrow(
			'Validation Error: scriptPath must be provided as a RelativePath (type), \n["hello"]\n (array) received',
		);
		badArgument = () => {};
		expect(() => {
			new ScriptPath(badArgument);
		}).toThrow(
			'Validation Error: scriptPath must be provided as a RelativePath (type), [Function] (function) received',
		);
		badArgument = {};
		expect(() => {
			new ScriptPath(badArgument);
		}).toThrow('Validation Error: scriptPath must be provided as a RelativePath (type), \n{}\n (object) received');
	});
	it('Invalidates an empty string argument', () => {
		badArgument = '';
		expect(() => {
			new ScriptPath(badArgument);
		}).toThrow("Validation Error: scriptPath must be provided as a RelativePath (type), '' (string) received");
	});
	it("Invalidates a string that isn't a relative path", () => {
		badArgument = 'c:/main/index.html';
		expect(() => {
			new ScriptPath(badArgument);
		}).toThrow(
			"Validation Error: scriptPath must be provided as a RelativePath (type), 'c:/main/index.html' (string) received",
		);
	});
	let validArgument: RelativePath = './main/index.html';
	it('Validates a valid relative path', () => {
		expect(() => {
			new ScriptPath(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		let output: string = new ScriptPath(validArgument).xml();
		expect(output).toBe(`<ScriptPath>${validArgument}</ScriptPath>\n`);
	});
});
