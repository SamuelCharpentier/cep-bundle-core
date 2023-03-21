import { getExecutionEnvironmentHostList } from '@src/manifestConfigs/getExecutionEnvironmentHostList';
import { ManifestConfigs } from '@src/manifestConfigs/convertToManifestConfigs';
import { HostEngine, UIType } from '@src/lib/enumsAndValidators';

type Descriptor = string;
type ArgumentValue = ManifestConfigs['extensions'];
type ExpectedValue = ManifestConfigs['executionEnvironment']['hostList'];
const dispatchInfo: ManifestConfigs['extensions'][0]['dispatchInfo'] = [
	{
		resources: {
			scriptPath: './index.jsx',
			htmlPath: './index.html',
		},
		ui: {
			type: UIType.Panel,
			geometry: {
				screenPercentage: {
					width: 0.5,
					height: 0.5,
				},
			},
		},
	},
];
const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'an array of one extension with one host',
		[
			{
				id: 'com.example.extension',
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[0,999]',
						debugPort: 3001,
					},
				],
				dispatchInfo,
			},
		],
		[
			{
				host: HostEngine.Photoshop,
				version: '[0,999]',
			},
		],
	],
	[
		'an array of one extension with two hosts',
		[
			{
				id: 'com.example.extension',
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[0,999]',
						debugPort: 3001,
					},
					{
						host: HostEngine.Illustrator,
						version: '[0,999]',
						debugPort: 3002,
					},
				],
				dispatchInfo,
			},
		],
		[
			{
				host: HostEngine.Photoshop,
				version: '[0,999]',
			},
			{
				host: HostEngine.Illustrator,
				version: '[0,999]',
			},
		],
	],
	[
		'an array of two extensions with one host each',
		[
			{
				id: 'com.example.extension',
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[0,999]',
						debugPort: 3001,
					},
				],
				dispatchInfo,
			},
			{
				id: 'com.example.extension',
				hostList: [
					{
						host: HostEngine.Illustrator,
						version: '[0,999]',
						debugPort: 3002,
					},
				],
				dispatchInfo,
			},
		],
		[
			{
				host: HostEngine.Photoshop,
				version: '[0,999]',
			},
			{
				host: HostEngine.Illustrator,
				version: '[0,999]',
			},
		],
	],
	[
		'an array of two extensions with the same host but different versions',
		[
			{
				id: 'com.example.extension',
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[16,17]',
						debugPort: 3001,
					},
				],
				dispatchInfo,
			},
			{
				id: 'com.example.extension',
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[18,19]',
						debugPort: 3002,
					},
				],
				dispatchInfo,
			},
		],
		[
			{
				host: HostEngine.Photoshop,
				version: '[16,19]',
			},
		],
	],
];

describe('getExecutionEnvironmentHostList', () => {
	it('is defined', () => {
		expect(getExecutionEnvironmentHostList).toBeDefined();
	});
	test.each(cases)('%s', (descriptor, argument, expected) => {
		expect(getExecutionEnvironmentHostList(argument)).toEqual(expected);
	});
});
