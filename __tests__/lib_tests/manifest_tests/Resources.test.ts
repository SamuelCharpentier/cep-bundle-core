import { Resources, ResourcesArgument } from '@manifest/Resources';

describe('Resources', () => {
	it('Is defined', () => {
		expect(Resources).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new Resources(badArgument);
		}).toThrow(
			'Validation Error: resources must be provided as ResourcesArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates non-ResourcesArgument argument', () => {
		badArgument = 42;
		expect(() => {
			new Resources(badArgument);
		}).toThrow(
			'Validation Error: resources must be provided as ResourcesArgument (type), 42 (number) received',
		);
		badArgument = {};
		expect(() => {
			new Resources(badArgument);
		}).toThrow(
			'Validation Error: resources must be provided as ResourcesArgument (type), \n{}\n(object) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new Resources(badArgument);
		}).toThrow(
			'Validation Error: resources must be provided as ResourcesArgument (type), \n["hello"]\n(array) received',
		);
		badArgument = true;
		expect(() => {
			new Resources(badArgument);
		}).toThrow(
			'Validation Error: resources must be provided as ResourcesArgument (type), true (boolean) received',
		);
		badArgument = () => {};
		expect(() => {
			new Resources(badArgument);
		}).toThrow(
			'Validation Error: resources must be provided as ResourcesArgument (type), badArgument() (function) received',
		);
	});
	let validArgument: ResourcesArgument;
	it('validates any ResourcesArgument', () => {
		validArgument = {
			mainPath: './main/index.html',
			scriptPath: './main/index.js',
			cefParams: ['--disable-gpu', '--disable-gpu-compositing'],
		};
		expect(() => {
			new Resources(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		validArgument = {
			mainPath: './main/index.html',
			scriptPath: './main/index.js',
			cefParams: ['--disable-gpu', '--disable-gpu-compositing'],
		};
		const resources = new Resources(validArgument);
		expect(resources.xml()).toBe(
			`<Resources>\n\t<MainPath>./main/index.html</MainPath>\n\t<ScriptPath>./main/index.js</ScriptPath>\n\t<CEFCommandLine>\n\t\t<Parameter>--disable-gpu</Parameter>\n\t\t<Parameter>--disable-gpu-compositing</Parameter>\n\t</CEFCommandLine>\n</Resources>\n`,
		);
	});
});
