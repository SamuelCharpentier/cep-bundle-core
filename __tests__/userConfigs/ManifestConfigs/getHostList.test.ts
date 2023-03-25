import { getHostList } from '@src/userConfigs/ManifesConfigs/convertManifestConfigs/getHostList';
import type { HostList as UserManifestHostList } from '@src/userConfigs/UserManifestConfigs/Parts/HostList';
import { ManifestConfigs } from '@src/userConfigs/ManifesConfigs/ManifestConfigs';
import { HostEngine } from '@src/lib/enumsAndValidators';

type Descriptor = string;
type ArgumentValue = UserManifestHostList;
type ExpectedValue = ManifestConfigs['extensions'][0]['hostList'];

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'All as a UserManifestHostList',
		'all',
		[
			{ host: HostEngine.Photoshop, version: '[0,999]', debugPort: 3001 },
			{ host: HostEngine.InDesign, version: '[0,999]', debugPort: 3002 },
			{ host: HostEngine.InCopy, version: '[0,999]', debugPort: 3003 },
			{
				host: HostEngine.Illustrator,
				version: '[0,999]',
				debugPort: 3004,
			},
			{
				host: HostEngine['Premiere Pro'],
				version: '[0,999]',
				debugPort: 3005,
			},
			{ host: HostEngine.Prelude, version: '[0,999]', debugPort: 3006 },
			{
				host: HostEngine['After Effects'],
				version: '[0,999]',
				debugPort: 3007,
			},
			{
				host: HostEngine['Animate (Flash Pro)'],
				version: '[0,999]',
				debugPort: 3008,
			},
			{ host: HostEngine.Audition, version: '[0,999]', debugPort: 3009 },
			{
				host: HostEngine.Dreamweaver,
				version: '[0,999]',
				debugPort: 3010,
			},
			{ host: HostEngine.Muse, version: '[0,999]', debugPort: 3011 },
			{ host: HostEngine.Bridge, version: '[0,999]', debugPort: 3012 },
		],
	],
	[
		'only hostEngine',
		{
			host: HostEngine.Photoshop,
		},
		[{ host: HostEngine.Photoshop, version: '[0,999]', debugPort: 3001 }],
	],
	[
		'only hostEngine and version',
		{
			host: HostEngine.Photoshop,
			version: '22',
		},
		[{ host: HostEngine.Photoshop, version: '22', debugPort: 3001 }],
	],
	[
		'only hostEngine and debugPort as number',
		{
			host: HostEngine.Photoshop,
			debugPort: 3000,
		},
		[{ host: HostEngine.Photoshop, version: '[0,999]', debugPort: 3000 }],
	],
	[
		'only hostEngine and debugPort as string',
		{
			host: HostEngine.Photoshop,
			debugPort: '3000',
		},
		[{ host: HostEngine.Photoshop, version: '[0,999]', debugPort: 3000 }],
	],
	[
		'hostEngine, version, and debugPort as number',
		{
			host: HostEngine.Photoshop,
			version: '22',
			debugPort: 3000,
		},
		[{ host: HostEngine.Photoshop, version: '22', debugPort: 3000 }],
	],
	[
		'an array of hosts',
		[
			{
				host: HostEngine.Photoshop,
				version: '22',
				debugPort: 3000,
			},
			{
				host: HostEngine.InDesign,
				version: '15',
			},
			{
				host: 'InCopy',
			},
		],
		[
			{ host: HostEngine.Photoshop, version: '22', debugPort: 3000 },
			{ host: HostEngine.InDesign, version: '15', debugPort: 3002 },
			{ host: HostEngine.InCopy, version: '[0,999]', debugPort: 3003 },
		],
	],
];

describe('getHostList', () => {
	it('is defined', () => {
		expect(getHostList).toBeDefined();
	});

	test.each(cases)(
		'get the correct localeList given %s',
		(descriptor, argumentValue, expectedValue) => {
			expect(getHostList(argumentValue)).toEqual(expectedValue);
		},
	);
});
