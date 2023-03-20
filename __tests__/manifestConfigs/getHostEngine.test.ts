import { getHostEngine } from '@src/manifestConfigs/getHostEngine';
import { HostInfo } from '@src/userConfigs/HostInfo';
import { HostEngine } from '@src/lib/enumsAndValidators';

type Descriptor = string;
type ArgumentValue = HostInfo;
type ExpectedValue = HostEngine;

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'HostInfo with host as HostEngine',
		{
			host: HostEngine.Photoshop,
		},
		HostEngine.Photoshop,
	],
	[
		'HostInfo with host as HostEngine key',
		{
			host: 'Photoshop',
		},
		HostEngine.Photoshop,
	],
	[
		'HostInfo with host as HostEngine value',
		{
			host: 'PHXS',
		},
		HostEngine.Photoshop,
	],
];

describe('getHostEngine', () => {
	it('is defined', () => {
		expect(getHostEngine).toBeDefined();
	});
	test.each(cases)(
		'getHostEngine returns the HostEngine from %s',
		(descriptor, argumentValue, expectedValue) => {
			expect(getHostEngine(argumentValue)).toEqual(expectedValue);
		},
	);
});
