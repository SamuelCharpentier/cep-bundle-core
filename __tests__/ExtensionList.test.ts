import { ExtensionList, ExtensionListArgument } from '@manifest/ExtensionList';

describe('Extension List', () => {
	it('Is defined', () => {
		expect(ExtensionList).toBeDefined();
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: extensions must be provided as an ExtensionArgument (type) or an array of ExtensionArgument, undefined (undefined) received',
		);
	});

	it('Invalidates non-ExtensionListArgument argument', () => {
		badArgument = 'hello';
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			"Validation Error: extensions must be provided as an ExtensionArgument (type) or an array of ExtensionArgument, 'hello' (string) received",
		);
		badArgument = 42;
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: extensions must be provided as an ExtensionArgument (type) or an array of ExtensionArgument, 42 (number) received',
		);
		badArgument = true;
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: extensions must be provided as an ExtensionArgument (type) or an array of ExtensionArgument, true (boolean) received',
		);
		badArgument = () => {};
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: extensions must be provided as an ExtensionArgument (type) or an array of ExtensionArgument, [Function] (function) received',
		);
	});
	it('Invalidates empty object', () => {
		badArgument = {};
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), \n{}\n (object) received',
		);
	});
	it('Invalidates an array of bad values', () => {
		badArgument = ['hello'];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			"Validation Error: every extensions must be provided as an ExtensionArgument (type), 'hello' (string) received",
		);
		badArgument = [42];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), 42 (number) received',
		);
		badArgument = [true];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), true (boolean) received',
		);
		badArgument = [() => {}];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: every extensions must be provided as an ExtensionArgument (type), [Function] (function) received',
		);
	});
	it('Invalidates bad extension value', () => {
		badArgument = { id: 42 };
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, 42 (number) received');
		badArgument = { id: true };
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, true (boolean) received');
		badArgument = { id: () => {} };
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, [Function] (function) received');
		badArgument = [
			{
				id: 42,
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, 42 (number) received');
		badArgument = [
			{
				id: true,
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, true (boolean) received');
		badArgument = [
			{
				id: {},
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, \n{}\n (object) received');
		badArgument = [
			{
				id: [],
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, \n[]\n (array) received');
		badArgument = [
			{
				id: () => {},
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, [Function] (function) received');
		badArgument = [
			{
				id: 'hello',
			},
			{
				id: 42,
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, 42 (number) received');
		badArgument = [
			{
				id: 'hello',
			},
			{
				id: true,
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, true (boolean) received');
		badArgument = [
			{
				id: 'hello',
			},
			{
				id: {},
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, \n{}\n (object) received');
		badArgument = [
			{
				id: 'hello',
			},
			{
				id: [],
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, \n[]\n (array) received');
		badArgument = [
			{
				id: 'hello',
			},
			{
				id: () => {},
			},
		];
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, [Function] (function) received');
		badArgument = {
			version: '45',
		};
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow('Validation Error: extension.id must be provided as a string, undefined (undefined) received');
		badArgument = {
			id: 'hello',
			version: true,
		};
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			'Validation Error: extension.version must be provided as a VersionNumber (type), true (boolean) received',
		);
		badArgument = {
			id: 'hello',
			hostList: ['hello'],
		};
		expect(() => {
			new ExtensionList(badArgument);
		}).toThrow(
			"Validation Error: hostList[].host must be provided as a HostEngine(ENUM) key or value or the string 'ALL', undefined (undefined) received",
		);
	});
	let validArgument: ExtensionListArgument;
	it('Validates any ExtensionListArgument', () => {
		validArgument = { id: 'hello', version: '2' };
		expect(() => {
			new ExtensionList(validArgument);
		}).not.toThrow();
		validArgument = [{ id: 'hello', version: '2.1' }];
		expect(() => {
			new ExtensionList(validArgument);
		}).not.toThrow();
		validArgument = [
			{ id: 'hello', version: '2.3.8' },
			{ id: 'hello', version: '2' },
		];
		expect(() => {
			new ExtensionList(validArgument);
		}).not.toThrow();
	});
	it('Generates xml', () => {
		validArgument = {
			id: 'my.extension',
			version: '0.0.1',
			hostList: [
				{ host: 'Illustrator', version: 'ALL', debugPort: '999' },
				{ host: 'InDesign', version: 12, debugPort: '998' },
			],
		};
		let extensionList = new ExtensionList(validArgument);
		let debugXML = extensionList.xml(['.debug']);
		expect(debugXML).not.toBe('');
		expect(typeof debugXML).toBe('string');
		expect(debugXML).toBe(`<ExtensionList>
	<Extension Id="my.extension">
		<HostList>
			<Host Name="ILST" Port="999"/>
			<Host Name="IDSN" Port="998"/>
		</HostList>
	</Extension>
</ExtensionList>
`);
		let manifestXML = extensionList.xml(['manifest.xml']);
		expect(manifestXML).not.toBe('');
		expect(typeof manifestXML).toBe('string');
		expect(manifestXML).toBe(`<ExtensionList>
	<Extension Id="my.extension" Version="0.0.1"/>
</ExtensionList>
`);
		validArgument = [
			{
				id: 'my.extension',
				version: '0.0.1',
				hostList: [
					{ host: 'Illustrator', version: 'ALL', debugPort: '999' },
					{ host: 'InDesign', version: 12, debugPort: '998' },
				],
			},
			{
				id: 'my.extension.other.extension',
				version: '0.0.1',
				hostList: [
					{ host: 'After Effects', version: 'ALL', debugPort: '997' },
					{ host: 'InDesign', version: 12, debugPort: '996' },
				],
			},
		];
		extensionList = new ExtensionList(validArgument);
		debugXML = extensionList.xml(['.debug']);
		expect(debugXML).not.toBe('');
		expect(typeof debugXML).toBe('string');
		expect(debugXML).toBe(`<ExtensionList>
	<Extension Id="my.extension">
		<HostList>
			<Host Name="ILST" Port="999"/>
			<Host Name="IDSN" Port="998"/>
		</HostList>
	</Extension>
	<Extension Id="my.extension.other.extension">
		<HostList>
			<Host Name="AEFT" Port="997"/>
			<Host Name="IDSN" Port="996"/>
		</HostList>
	</Extension>
</ExtensionList>
`);
		manifestXML = extensionList.xml(['manifest.xml']);
		expect(manifestXML).not.toBe('');
		expect(typeof manifestXML).toBe('string');
		expect(manifestXML).toBe(`<ExtensionList>
	<Extension Id="my.extension" Version="0.0.1"/>
	<Extension Id="my.extension.other.extension" Version="0.0.1"/>
</ExtensionList>
`);
	});
});
