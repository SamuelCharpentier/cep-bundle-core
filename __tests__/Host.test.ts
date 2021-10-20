import { HostList, HostListArgument } from '@manifest/Host';
import type { HostEngine } from '@manifest/enumsAndValidators';

describe('HostList', () => {
	it('Validates its argument', () => {
		let incorrectParameters: any;
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostList must be provided as an instance or array of HostListArgument (type), undefined (undefined) received`,
		);
		incorrectParameters = {};
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostArgument.host must be provided as as a HostEngine(ENUM) key or value or the string 'ALL', undefined (undefined) received`,
		);
		incorrectParameters = { host: 'something' };
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostArgument.host must be provided as as a HostEngine(ENUM) key or value or the string 'ALL', 'something' (string) received`,
		);
		incorrectParameters.host = 'Illustrator';
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostArgument.version must be provided as as a RangedVersion or the string 'ALL', undefined (undefined) received`,
		);
		incorrectParameters.version = 'Hello';
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostArgument.version must be provided as as a RangedVersion or the string 'ALL', 'Hello' (string) received`,
		);
		incorrectParameters.version = '88.2';
		incorrectParameters.debugPort = 'Hello';
		expect(() => {
			new HostList(incorrectParameters);
		}).toThrow(
			`Validation Error: hostArgument.debugPort must be provided as a number or a string containing a number, 'Hello' (string) received`,
		);
		let correctParameters: HostListArgument = { host: 'Illustrator', version: '22.2', debugPort: 5005 };
		expect(() => {
			let hostList = new HostList(correctParameters);
			console.log(JSON.stringify(hostList));
			console.log(hostList.xml(['.debug', 'ExtensionList']));
		}).not.toThrow();
		correctParameters = [
			{ host: 'Illustrator', version: '22.2', debugPort: 5005 },
			{ host: 'InDesign', version: 'All', debugPort: '5055' },
		];
		expect(() => {
			let hostList = new HostList(correctParameters);
			console.log(JSON.stringify(hostList));
			console.log(hostList.xml(['.debug', 'ExtensionList']));
		}).not.toThrow();
		correctParameters = 'All';
		expect(() => {
			let hostList = new HostList(correctParameters);
			console.log(JSON.stringify(hostList));
			console.log(hostList.xml(['.debug', 'ExtensionList']));
		}).not.toThrow();
	});
});
