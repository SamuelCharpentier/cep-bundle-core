import { RequiredRuntimeList } from '@src/lib/manifest/Runtime';
import { RangedVersion } from '@src/lib/typesAndValidators';

describe('RequiredRuntimeList', () => {
	// it is defined
	it('is defined', () => {
		expect(RequiredRuntimeList).toBeDefined();
	});
	// it is a class
	it('is a class', () => {
		expect(RequiredRuntimeList).toBeInstanceOf(Function);
	});
	// it invalidates undefined argument
	let badArgument: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new RequiredRuntimeList(badArgument);
		}).toThrow(
			'Validation Error: CSXSVersion must be provided as a RangedVersion (type), undefined (undefined) received',
		);
	});
	// it invalidates bad arguments
	it('Invalidates bad arguments', () => {
		badArgument = {};
		expect(() => {
			new RequiredRuntimeList(badArgument);
		}).toThrow(
			'Validation Error: CSXSVersion must be provided as a RangedVersion (type), \n{}\n (object) received',
		);
		badArgument = [];
		expect(() => {
			new RequiredRuntimeList(badArgument);
		}).toThrow('Validation Error: CSXSVersion must be provided as a RangedVersion (type), \n[]\n (array) received');
		badArgument = 'string';
		expect(() => {
			new RequiredRuntimeList(badArgument);
		}).toThrow(
			"Validation Error: CSXSVersion must be provided as a RangedVersion (type), 'string' (string) received",
		);
	});
	// it validates good arguments
	let validArgument: RangedVersion;
	it('Validates good arguments', () => {
		validArgument = 9;
		expect(() => {
			new RequiredRuntimeList(validArgument);
		}).not.toThrow();
		validArgument = '[9, 10]';
		expect(() => {
			new RequiredRuntimeList(validArgument);
		}).not.toThrow();
		validArgument = '8.0';
		expect(() => {
			new RequiredRuntimeList(validArgument);
		}).not.toThrow();
	});
	// it generates xml
	it('Generates xml', () => {
		validArgument = '9.0';
		let requiredRuntimeList = new RequiredRuntimeList(validArgument);
		let debugXML = requiredRuntimeList.xml();
		expect(debugXML).not.toBe('');
		expect(typeof debugXML).toBe('string');
		expect(debugXML).toBe(`<RequiredRuntimeList>
	<RequiredRuntime Name="CSXS" Version="9.0"/>
</RequiredRuntimeList>
`);
		validArgument = '[9.0, 10.0]';
		requiredRuntimeList = new RequiredRuntimeList(validArgument);
		debugXML = requiredRuntimeList.xml();
		expect(debugXML).not.toBe('');
		expect(typeof debugXML).toBe('string');
		expect(debugXML).toBe(`<RequiredRuntimeList>
	<RequiredRuntime Name="CSXS" Version="[9.0, 10.0]"/>
</RequiredRuntimeList>
`);
		validArgument = 6;
		requiredRuntimeList = new RequiredRuntimeList(validArgument);
		debugXML = requiredRuntimeList.xml();
		expect(debugXML).not.toBe('');
		expect(typeof debugXML).toBe('string');
		expect(debugXML).toBe(`<RequiredRuntimeList>
	<RequiredRuntime Name="CSXS" Version="6.0"/>
</RequiredRuntimeList>
`);
	});
});
