import {
	ExecutionEnvironment,
	ExecutionEnvironmentArgument,
} from '@manifest/ExecutionEnvironment';

describe('ExecutionEnvironment', () => {
	it('is defined', () => {
		expect(ExecutionEnvironment).toBeDefined();
	});
	it('is a class', () => {
		expect(ExecutionEnvironment).toBeInstanceOf(Function);
	});
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new ExecutionEnvironment(badArgument);
		}).toThrow(
			'Validation Error: executionEnvironment must be provided as an ExecutionEnvironmentArgument (type), undefined (undefined) received',
		);
	});
	// This element is a container element with no specific attributes, the items it contains should be validating their arguments.
	let validArgument: ExecutionEnvironmentArgument;
	it('Validates any ExtensionListArgument', () => {
		validArgument = {
			hostList: [{ host: 'InDesign', version: 'all' }],
		};
		expect(() => {
			new ExecutionEnvironment(validArgument);
		}).not.toThrow();
		validArgument = {
			hostList: [
				{ host: 'InDesign', version: '15.8' },
				{ host: 'Illustrator', version: '39.2' },
			],
		};
		expect(() => {
			new ExecutionEnvironment(validArgument);
		}).not.toThrow();
		validArgument = {
			hostList: { host: 'InDesign', version: 'all' },
			localeList: 'fr_CA',
		};
		expect(() => {
			new ExecutionEnvironment(validArgument);
		}).not.toThrow();
	});
	it('Generates xml', () => {
		validArgument = {
			hostList: [
				{ host: 'InDesign', version: 'all' },
				{ host: 'Illustrator', version: 'all' },
			],
			localeList: ['fr_CA', 'en_US', 'de_DE'],
		};
		let extensionList = new ExecutionEnvironment(validArgument);
		let xml = extensionList.xml();
		expect(xml).not.toBe('');
		expect(typeof xml).toBe('string');
		expect(xml).toBe(`<ExecutionEnvironment>
	<HostList>
		<Host Name="IDSN" Version="[0,99]"/>
		<Host Name="ILST" Version="[0,99]"/>
	</HostList>
	<LocaleList>
		<Locale Code="fr_CA"/>
		<Locale Code="en_US"/>
		<Locale Code="de_DE"/>
	</LocaleList>
</ExecutionEnvironment>
`);
		validArgument = {
			localeList: 'fr_CA',
		};
		xml = extensionList.xml();
		expect(xml).not.toBe('');
		expect(typeof xml).toBe('string');
		expect(xml).toBe(`<ExecutionEnvironment>
	<HostList>
		<Host Name="IDSN" Version="[0,99]"/>
		<Host Name="ILST" Version="[0,99]"/>
	</HostList>
	<LocaleList>
		<Locale Code="fr_CA"/>
		<Locale Code="en_US"/>
		<Locale Code="de_DE"/>
	</LocaleList>
</ExecutionEnvironment>
`);
		validArgument = {
			localeList: ['fr_CA', 'en_US'],
			CSXSVersion: '8.0',
		};
		extensionList = new ExecutionEnvironment(validArgument);
		xml = extensionList.xml();
		expect(xml).not.toBe('');
		expect(typeof xml).toBe('string');
		expect(xml).toBe(`<ExecutionEnvironment>
	<LocaleList>
		<Locale Code="fr_CA"/>
		<Locale Code="en_US"/>
	</LocaleList>
	<RequiredRuntimeList>
		<RequiredRuntime Name="CSXS" Version="8.0"/>
	</RequiredRuntimeList>
</ExecutionEnvironment>
`);
		validArgument = {
			hostList: { host: 'InDesign', version: 'all' },
			localeList: ['fr_CA', 'en_US'],
			CSXSVersion: '8.0',
		};
		extensionList = new ExecutionEnvironment(validArgument);
		xml = extensionList.xml();
		expect(xml).not.toBe('');
		expect(typeof xml).toBe('string');
		expect(xml).toBe(`<ExecutionEnvironment>
	<HostList>
		<Host Name="IDSN" Version="[0,99]"/>
	</HostList>
	<LocaleList>
		<Locale Code="fr_CA"/>
		<Locale Code="en_US"/>
	</LocaleList>
	<RequiredRuntimeList>
		<RequiredRuntime Name="CSXS" Version="8.0"/>
	</RequiredRuntimeList>
</ExecutionEnvironment>
`);
	});
});
