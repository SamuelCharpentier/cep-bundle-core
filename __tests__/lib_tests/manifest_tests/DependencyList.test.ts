import { DependencyList, DependencyListArgument } from '@manifest/Dependency';

describe('DependencyList', () => {
	it('Is defined', () => {
		expect(DependencyList).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList must be provided as a DependencyArgument (type) or an array of DependencyArgument (type), undefined (undefined) received',
		);
	});
	it('Invalidates non-DependencyListArgument argument', () => {
		badArgument = 42;
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList must be provided as a DependencyArgument (type) or an array of DependencyArgument (type), 42 (number) received',
		);
		badArgument = ['hello'];
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			"Validation Error: every dependencyList elements must be provided as a DependencyArgument (type), 'hello' (string) received",
		);
		badArgument = true;
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList must be provided as a DependencyArgument (type) or an array of DependencyArgument (type), true (boolean) received',
		);
		badArgument = () => {};
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList must be provided as a DependencyArgument (type) or an array of DependencyArgument (type), [Function] (function) received',
		);
	});
	it('Invalidates an empty object argument', () => {
		badArgument = {};
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList[].id must be provided as a string, undefined (undefined) received',
		);
	});
	it('Invalidates bad dependency value', () => {
		badArgument = { id: 45 };
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList[].id must be provided as a string, 45 (number) received',
		);
		badArgument = { id: true };
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList[].id must be provided as a string, true (boolean) received',
		);
		badArgument = { id: () => {} };
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList[].id must be provided as a string, [Function] (function) received',
		);
		badArgument = { id: 'hello', version: 45 };
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList[].version (optional) must be provided as a VersionNumber (type), 45 (number) received',
		);
		badArgument = { id: 'hello', version: true };
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList[].version (optional) must be provided as a VersionNumber (type), true (boolean) received',
		);
		badArgument = { id: 'hello', version: () => {} };
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			'Validation Error: dependencyList[].version (optional) must be provided as a VersionNumber (type), [Function] (function) received',
		);
		badArgument = { id: 'hello', version: 'hello' };
		expect(() => {
			new DependencyList(badArgument);
		}).toThrow(
			"Validation Error: dependencyList[].version (optional) must be provided as a VersionNumber (type), 'hello' (string) received",
		);
	});
	let validArgument: DependencyListArgument;
	it('validates any DependencyListArgument', () => {
		validArgument = {
			id: 'com.depending.on.this.extension',
			version: '2.1',
		};
		expect(() => {
			new DependencyList(validArgument);
		}).not.toThrow();
		validArgument = [
			{
				id: 'com.depending.on.this.extension',
				version: '2.1',
			},
			{
				id: 'com.depending.on.this.extension.as.well',
				version: '5.4.0',
			},
		];
		expect(() => {
			new DependencyList(validArgument);
		}).not.toThrow();
	});
	it('Outputs XML in any context', () => {
		validArgument = {
			id: 'com.depending.on.this.extension',
			version: '2.1',
		};
		const dependencyList = new DependencyList(validArgument);
		expect(dependencyList.xml(['Extension'])).toBe(
			`<DependencyList>
	<Dependency Id="com.depending.on.this.extension" version="2.1"/>
</DependencyList>
`,
		);
		validArgument = [
			{
				id: 'com.depending.on.this.extension',
				version: '2.1',
			},
			{
				id: 'com.depending.on.this.extension.as.well',
				version: '5.4.0',
			},
		];
		const dispatchInfo2 = new DependencyList(validArgument);
		expect(dispatchInfo2.xml(['Extension'])).toBe(`<DependencyList>
	<Dependency Id="com.depending.on.this.extension" version="2.1"/>
	<Dependency Id="com.depending.on.this.extension.as.well" version="5.4.0"/>
</DependencyList>
`);
	});
});
