import { getDispatchInfo } from '@src/manifestConfigs/getDispatchInfo';
import { AllDispatchInfo as UserAllDispatchInfo } from '@src/userConfigs/AllDispatchInfo';
import { ManifestConfigs } from '@src/manifestConfigs/convertToManifestConfigs';

type Descriptor = string;
type ArgumentValue = UserAllDispatchInfo;
type ExpectedValue = ManifestConfigs['extensions'][0]['dispatchInfo'];

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'a single dispatchInfo object',
		{
			resources: { scriptPath: './index.jsx', htmlPath: './index.html' },
			ui: {
				type: 'Panel',
				geometry: { screenPercentage: { width: 0.5, height: 0.5 } },
			},
		},
		[
			{
				resources: {
					scriptPath: './index.jsx',
					htmlPath: './index.html',
				},
				ui: {
					type: 'Panel',
					geometry: { screenPercentage: { width: 0.5, height: 0.5 } },
				},
			},
		],
	],
	[
		'an array of dispatchInfo objects',
		[
			{
				resources: {
					scriptPath: './index.jsx',
					htmlPath: './index.html',
				},
				ui: {
					type: 'Panel',
					geometry: { screenPercentage: { width: 0.5, height: 0.5 } },
				},
			},
			{
				resources: {
					scriptPath: './index2.jsx',
					htmlPath: './index2.html',
				},
				ui: {
					type: 'Panel',
					geometry: { screenPercentage: { width: 0.5, height: 0.5 } },
				},
			},
		],
		[
			{
				resources: {
					scriptPath: './index.jsx',
					htmlPath: './index.html',
				},
				ui: {
					type: 'Panel',
					geometry: { screenPercentage: { width: 0.5, height: 0.5 } },
				},
			},
			{
				resources: {
					scriptPath: './index2.jsx',
					htmlPath: './index2.html',
				},
				ui: {
					type: 'Panel',
					geometry: { screenPercentage: { width: 0.5, height: 0.5 } },
				},
			},
		],
	],
];

describe('getDispatchInfo', () => {
	it('is defined', () => {
		expect(getDispatchInfo).toBeDefined();
	});

	test.each(cases)('%s', (descriptor, argumentValue, expectedValue) => {
		expect(getDispatchInfo(argumentValue)).toEqual(expectedValue);
	});
});
