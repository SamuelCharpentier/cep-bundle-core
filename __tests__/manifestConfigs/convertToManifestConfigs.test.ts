import {
	AdobeLocaleCodes,
	CEPVersion,
	HostEngine,
} from '@src/lib/enumsAndValidators';
import {
	ManifestConfigs,
	convertToManifestConfigs,
} from '@src/userConfigs/ManifesConfigs/ManifestConfigs';
import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';

type Descriptor = string;
type ArgumentValue = _UserManifestConfigs;
type ExpectedValue = ManifestConfigs;

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'a single extension',
		{
			extensionBundle: {
				id: 'test',
				version: '1.0.0',
				cepVersion: 'latest',
			},
			authorName: 'test',
			contact: 'test@test.ca',
			legal: 'https://test.ca',
			abstract: 'https://test.ca',
			executionEnvironment: {
				localeList: ['en_US', 'fr_CA'],
			},
			extensions: {
				id: 'test',
				version: '1.0.0',
				hostList: {
					host: 'Photoshop',
				},
				dispatchInfo: {
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
				},
			},
		},
		{
			extensionBundle: {
				id: 'test',
				version: '1.0.0',
				cepVersion: CEPVersion.latest,
			},
			authorName: 'test',
			contact: 'test@test.ca',
			legal: new URL('https://test.ca'),
			abstract: new URL('https://test.ca'),
			executionEnvironment: {
				CSXSVersion: CEPVersion.latest,
				localeList: [AdobeLocaleCodes.en_US, AdobeLocaleCodes.fr_CA],
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[0,999]',
					},
				],
			},
			extensions: [
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
					dispatchInfo: [
						{
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
						},
					],
				},
			],
		},
	],
	[
		'CEP version as value instead of key',
		{
			extensionBundle: {
				id: 'test',
				version: '1.0.0',
				cepVersion: '6.1',
			},
			authorName: 'test',
			contact: 'test@test.ca',
			legal: 'https://test.ca',
			abstract: 'https://test.ca',
			executionEnvironment: {
				localeList: ['en_US', 'fr_CA'],
			},
			extensions: {
				id: 'test',
				version: '1.0.0',
				hostList: {
					host: 'Photoshop',
				},
				dispatchInfo: {
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
				},
			},
		},
		{
			extensionBundle: {
				id: 'test',
				version: '1.0.0',
				cepVersion: CEPVersion['v6.1'],
			},
			authorName: 'test',
			contact: 'test@test.ca',
			legal: new URL('https://test.ca'),
			abstract: new URL('https://test.ca'),
			executionEnvironment: {
				CSXSVersion: CEPVersion['v6.1'],
				localeList: [AdobeLocaleCodes.en_US, AdobeLocaleCodes.fr_CA],
				hostList: [
					{
						host: HostEngine.Photoshop,
						version: '[0,999]',
					},
				],
			},
			extensions: [
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
					dispatchInfo: [
						{
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
						},
					],
				},
			],
		},
	],
];

describe('convertToManifestConfigs', () => {
	it('is defined', () => {
		expect(convertToManifestConfigs).toBeDefined();
	});

	test.each(cases)(
		'convertToManifestConfigs returns the correctly converted object given %s',
		(descriptor, argumentValue, expectedValue) => {
			expect(convertToManifestConfigs(argumentValue)).toEqual(
				expectedValue,
			);
		},
	);
});
