import { HostList, HostListArgument } from '@manifest/Host';
import type { HostEngine } from '@src/lib/enumsAndValidators';

describe('HostList', () => {
	it('Is defined', () => {
		expect(HostList).toBeDefined();
	});
	let incorrectParameters: any;
	it('Invalidates undefined argument', () => {
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostList must be provided as an instance or array of HostListArgument (type), undefined (undefined) received`,
		);
	});
	it('Invalidates an empty object argument', () => {
		incorrectParameters = {};
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostList[].host must be provided as a HostEngine(ENUM) key or value or the string 'ALL', undefined (undefined) received`,
		);
	});
	it('Invalidates invalid host value', () => {
		incorrectParameters = { host: 'my string' };
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostList[].host must be provided as a HostEngine(ENUM) key or value or the string 'ALL', 'my string' (string) received`,
		);
	});
	it('Invalidates missing version', () => {
		incorrectParameters.host = 'Illustrator';
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostList[].version must be provided as a RangedVersion or the string 'ALL', undefined (undefined) received`,
		);
	});
	it('Invalidates invalid version number', () => {
		incorrectParameters.version = 'Hello';
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostList[].version must be provided as a RangedVersion or the string 'ALL', 'Hello' (string) received`,
		);
	});
	it('Invalidates invalid debug port', () => {
		incorrectParameters.version = '88.2';
		incorrectParameters.debugPort = 'Hello';
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostList[].debugPort must be provided as a number or a string containing a number, 'Hello' (string) received`,
		);
	});

	let correctParameters: HostListArgument;
	it('Validates single correct Host argument', () => {
		correctParameters = { host: 'ILST', version: '22.2', debugPort: 5005 };
		expect(() => {
			new HostList(correctParameters);
		}).not.toThrow();
		correctParameters = { host: 'Flash Pro', version: 10 };
		expect(() => {
			new HostList(correctParameters);
		}).not.toThrow();
	});
	it('Validates array of correct Host arguments', () => {
		correctParameters = [
			{ host: 'Illustrator', version: '22.2', debugPort: 5005 },
			{ host: 'IDSN', version: 'All', debugPort: '5055' },
		];
		expect(() => {
			new HostList(correctParameters);
		}).not.toThrow();
	});
	it("Validates 'All' argument", () => {
		correctParameters = 'All';
		expect(() => {
			new HostList(correctParameters);
		}).not.toThrow();
		correctParameters = 'ALL';
		expect(() => {
			new HostList(correctParameters);
		}).not.toThrow();
		correctParameters = 'all';
		expect(() => {
			new HostList(correctParameters);
		}).not.toThrow();
	});
	it('Outputs XML with version in ExecutionEnvironment context', () => {
		let hostList = new HostList({
			host: 'Illustrator',
			version: '22.2',
			debugPort: 5005,
		});
		expect(hostList.xml(['ExecutionEnvironment'])).toBe(
			`<HostList>\n\t<Host Name="ILST" Version="22.2"/>\n</HostList>\n`,
		);
	});

	it('Outputs XML with name only in DispatchInfoList context', () => {
		let hostList = new HostList({
			host: 'Illustrator',
			version: '22.2',
			debugPort: 5005,
		});
		expect(hostList.xml(['DispatchInfoList'])).toBe(
			`<HostList>\n\t<Host Name="ILST"/>\n</HostList>\n`,
		);
	});
	it('Output XML with debug ports in its .debug context', () => {
		let hostList = new HostList({
			host: 'Illustrator',
			version: '22.2',
			debugPort: 5005,
		});
		expect(hostList.xml(['.debug', 'ExtensionList'])).toBe(
			`<HostList>\n\t<Host Name="ILST" Port="5005"/>\n</HostList>\n`,
		);
	});
});
