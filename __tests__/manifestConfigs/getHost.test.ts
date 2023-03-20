import { HostList } from '@src/lib/manifest/Host';
import { HostInfo } from '@src/userConfigs/HostInfo';
import { getHost } from '@src/manifestConfigs/getHost';
import { HostEngine } from '@src/lib/enumsAndValidators';
import { ManifestConfigs } from '@src/manifestConfigs/convertToManifestConfigs';

type Descriptor = string;
type ArgumentValue = HostInfo;
type ExpectedValue = ManifestConfigs['executionEnvironment']['hostList'][0];

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'host: "PHXS"',
		{
			host: 'PHXS',
		},
		{
			host: HostEngine.Photoshop,
			version: '[0,999]',
			debugPort: 3001,
		},
	],
	[
		'host: "PHXS", version: "22.0.0"',
		{
			host: 'PHXS',
			version: '22.0.0',
		},
		{
			host: HostEngine.Photoshop,
			version: '22.0.0',
			debugPort: 3001,
		},
	],
	[
		'host: "PHXS", version: "[22,23]", debugPort: 5555',
		{
			host: 'PHXS',
			version: '[22,23]',
			debugPort: 5555,
		},
		{
			host: HostEngine.Photoshop,
			version: '[22,23]',
			debugPort: 5555,
		},
	],
	[
		'host: "PHXS", debugPort: 5555',
		{
			host: 'PHXS',
			debugPort: 5555,
		},
		{
			host: HostEngine.Photoshop,
			version: '[0,999]',
			debugPort: 5555,
		},
	],
];

describe('getHost', () => {
	it('is defined', () => {
		expect(getHost).toBeDefined();
	});
	test.each(cases)(
		'getHost returns a full Host from %s',
		(descriptor, argumentValue, expectedValue) => {
			expect(getHost(argumentValue)).toEqual(expectedValue);
		},
	);
});
