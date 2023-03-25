import { getExtensions } from '@src/userConfigs/ManifesConfigs/convertManifestConfigs/getExtensions';
import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';
import { ManifestConfigs } from '@src/userConfigs/ManifesConfigs/ManifestConfigs';
import { version } from 'yargs';
import { HostEngine } from '@src/lib/enumsAndValidators';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { AllDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/AllDispatchInfo';
import {
	VisibleDispatchInfo,
	isVisibleDispatchInfo,
} from '@src/userConfigs/UserManifestConfigs/Parts/VisibleDispatchInfo';

type Descriptor = string;
type ArgumentValue = _UserManifestConfigs['extensions'];
type ExpectedValue = ManifestConfigs['extensions'];

const dispatchInfo = {
	resources: {
		htmlPath: './index.html',
		scriptPath: './index.js',
	},
	ui: {
		type: 'Panel',
		geometry: {
			screenPercentage: {
				width: 0.5,
				height: 0.5,
			},
		},
	},
} as AllDispatchInfo;

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'a single extension',
		{
			id: 'test',
			version: '1.0.0',
			hostList: {
				host: 'Photoshop',
			},
			dispatchInfo,
		},
		[
			{
				id: 'test',
				version: '1.0.0',
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[0,999]',
						debugPort: 3001,
					},
				],
				dispatchInfo: [dispatchInfo as VisibleDispatchInfo],
			},
		],
	],
	[
		'multiple extensions',
		[
			{
				id: 'test',
				version: '1.0.0',
				hostList: {
					host: 'Photoshop',
				},
				dispatchInfo,
			},
			{
				id: 'test2',
				version: '1.0.0',
				hostList: {
					host: 'InDesign',
				},
				dispatchInfo,
			},
		],
		[
			{
				id: 'test',
				version: '1.0.0',
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[0,999]',
						debugPort: 3001,
					},
				],
				dispatchInfo: [dispatchInfo as VisibleDispatchInfo],
			},
			{
				id: 'test2',
				version: '1.0.0',
				hostList: [
					{
						host: HostEngine.InDesign,
						version: '[0,999]',
						debugPort: 3002,
					},
				],
				dispatchInfo: [dispatchInfo as VisibleDispatchInfo],
			},
		],
	],
];

describe('getExtensions', () => {
	it('is defined', () => {
		expect(getExtensions).toBeDefined();
	});
	test.each(cases)(
		'getExtensions returns %s given %s',
		(descriptor, arg, expected) => {
			expect(getExtensions(arg)).toEqual(expected);
		},
	);
});
