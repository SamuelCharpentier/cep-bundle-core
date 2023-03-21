import { getDebugPort } from '@src/manifestConfigs/getDebugPort';
import { HostInfo } from '@src/userConfigs/HostInfo';
import { defaultManifestConfigs } from '@src/manifestConfigs/defaultManifestConfigs';

type Descriptor = string;
type ArgumentValue = HostInfo;
type ExpectedValue = number;

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'only a host',
		{
			host: 'PHXS',
		},
		defaultManifestConfigs.debugPorts.Photoshop,
	],
	[
		'host and debugPort',
		{
			host: 'PHXS',
			debugPort: 1234,
		},
		1234,
	],
	[
		'host and debugPort as string',
		{
			host: 'PHXS',
			debugPort: '1234',
		},
		1234,
	],
	[
		'host and debugPort as string with leading zero',
		{
			host: 'PHXS',
			debugPort: '01234',
		},
		1234,
	],
];

describe('getDebugPort', () => {
	it('is defined', () => {
		expect(getDebugPort).toBeDefined();
	});
	test.each(cases)(
		'getDebugPort returns correct debug port given %s',
		(descriptor, argumentValue, expectedValue) => {
			expect(getDebugPort(argumentValue)).toEqual(expectedValue);
		},
	);
});
