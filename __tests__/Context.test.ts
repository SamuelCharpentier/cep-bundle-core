import {
	isValidContext,
	contextContainsOneOf,
	contextContainsAllOf,
	contextContainsNoneOf,
	Context,
} from '@manifest/Context';
const validContextArray: any = [
	'.debug',
	'manifest.xml',
	'ExtensionManifest',
	'Author',
	'Contact',
	'HrefElement',
	'Legal',
	'Abstract',
	'ExtensionList',
	'Extension',
	'ExecutionEnvironment',
	'HostList',
	'Host',
	'LocaleList',
	'LocaleElement',
	'RequiredRuntimeList',
	'RequiredRuntime',
	'DispatchInfoList',
	'DispatchInfo',
	'DependencyList',
	'Dependency',
	'Resources',
	'MainPath',
	'ScriptPath',
	'CEFCommandLine',
	'Parameter',
	'Lifecycle',
	'AutoVisible',
	'StartOn',
	'Event',
	'UI',
	'Type',
	'Menu',
	'Geometry',
	'Icons',
	'ExtensionData',
];
let invalidContextArray: any = [
	'',
	'anything',
	45,
	true,
	[],
	['invalid context string'],
	{},
	{ context: 'Icons' },
	() => {},
	() => {
		return 'Icons';
	},
];
describe('isValidContext function', () => {
	it('returns true for valid contexts', () => {
		validContextArray.forEach((context: any) => {
			expect(isValidContext(context)).toBe(true);
		});
	});
	it('returns false for invalid contexts', () => {
		invalidContextArray.forEach((context: any) => {
			expect(isValidContext(context)).toBe(false);
		});
	});
});

describe('contextContainsOneOf function', () => {
	it('returns true for valid contexts', () => {
		validContextArray.forEach((context: any) => {
			expect(contextContainsOneOf(context)([context])).toEqual(true);
		});
	});
	it('returns false for invalid contexts', () => {
		invalidContextArray.forEach((context: any) => {
			expect(() => {
				contextContainsOneOf(context);
			}).toThrow();
		});
	});
	it('returns a function working as expected', () => {
		const context: Context = 'Icons';
		const contextArray: Context[] = [context];
		const badParentArgument: any = 42;
		expect(contextContainsOneOf(context)(contextArray)).toEqual(true);
		expect(contextContainsOneOf(context)([])).toEqual(false);
		expect(() => {
			contextContainsOneOf(context)(badParentArgument);
		}).toThrow('Validation Error: Context parent must be provided as array of strings, 42 (number) received');
	});
});

describe('contextContainsAllOf function', () => {
	it('returns true for valid contexts', () => {
		validContextArray.forEach((context: any) => {
			expect(contextContainsAllOf(context)([context])).toEqual(true);
		});
	});
	it('returns false for invalid contexts', () => {
		invalidContextArray.forEach((context: any) => {
			expect(() => {
				contextContainsAllOf(context);
			}).toThrow();
		});
	});
	it('returns a function working as expected', () => {
		const badParentArgument: any = 42;
		expect(contextContainsAllOf(validContextArray)([...validContextArray, 'SomeMoreExtraContext'])).toEqual(true);
		expect(contextContainsAllOf(['Icons', 'Abstract'])(['AutoVisible'])).toEqual(false);
		expect(contextContainsAllOf(['Icons', 'Abstract'])(['Icons'])).toEqual(false);
		expect(() => {
			contextContainsAllOf(['Icons', 'Abstract'])(badParentArgument);
		}).toThrow('Validation Error: Context parent must be provided as array of strings, 42 (number) received');
	});
});

describe('contextContainsNoneOf function', () => {
	it('returns true for valid contexts', () => {
		validContextArray.forEach((context: any) => {
			expect(contextContainsNoneOf(context)([context])).toEqual(false);
		});
	});
	it('returns false for invalid contexts', () => {
		invalidContextArray.forEach((context: any) => {
			expect(() => {
				contextContainsNoneOf(context);
			}).toThrow();
		});
	});
	it('returns a function working as expected', () => {
		const contextArray: Context[] = ['Icons', 'Abstract'];
		const badParentArgument: any = 42;
		expect(contextContainsNoneOf(contextArray)([...validContextArray, 'SomeMoreExtraContext'])).toEqual(false);
		expect(contextContainsNoneOf(['Icons', 'Abstract'])(['AutoVisible'])).toEqual(true);
		expect(contextContainsNoneOf(['Icons', 'Abstract'])(['Icons'])).toEqual(false);
		expect(() => {
			contextContainsNoneOf(['Icons', 'Abstract'])(badParentArgument);
		}).toThrow('Validation Error: Context parent must be provided as array of strings, 42 (number) received');
	});
});
