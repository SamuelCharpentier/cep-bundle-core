import { RangedVersion } from '@src/lib/typesAndValidators';
import { getRangedVersion } from '@src/manifestConfigs/getRangedVersion';
import { HostInfo } from '@src/userConfigs/HostInfo';

type Descriptor = string;
type ArgumentValue = HostInfo;
type ExpectedValue = RangedVersion;

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'a version number as version',
		{
			host: 'PHXS',
			version: '22.0.0',
		},
		'22.0.0',
	],
	[
		'a range of major versions as version',
		{
			host: 'PHXS',
			version: '[22.0.0,23.0.0]',
		},
		'[22.0.0,23.0.0]',
	],
	[
		'all as version',
		{
			host: 'PHXS',
			version: 'all',
		},
		'[0,999]',
	],
	[
		'no version',
		{
			host: 'PHXS',
		},
		'[0,999]',
	],
];

describe('getRangedVersion', () => {
	it('is Defined', () => {
		expect(getRangedVersion).toBeDefined();
	});
	test.each(cases)(
		'getRangedVersion given a hostIngo with %s',
		(description, argumentValue, expectedValue) => {
			expect(getRangedVersion(argumentValue)).toEqual(expectedValue);
		},
	);
});
