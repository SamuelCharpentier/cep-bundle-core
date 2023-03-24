import { RangedVersion } from '@src/lib/typesAndValidators';
import { getRangedVersionObject } from '@src/userConfigs/ManifesConfigs/convertManifestConfigs/getRangedVersionObject';
import { VersionObject } from '@src/userConfigs/ManifesConfigs/convertManifestConfigs/getVersionObject';

type Descriptor = string;
type ArgumentValue = RangedVersion;
type ExpectedValue = {
	minVersion: VersionObject;
	maxVersion: VersionObject;
};
const versionCases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'a number',
		1,
		{
			minVersion: {
				major: 1,
				minor: undefined,
				patch: undefined,
				micro: undefined,
			},
			maxVersion: {
				major: 1,
				minor: undefined,
				patch: undefined,
				micro: undefined,
			},
		},
	],
	[
		'a string with a single version value',
		'1.2.3',
		{
			minVersion: {
				major: 1,
				minor: 2,
				patch: 3,
				micro: undefined,
			},
			maxVersion: {
				major: 1,
				minor: 2,
				patch: 3,
				micro: undefined,
			},
		},
	],
	[
		'a range of major versions',
		'[1,2]',
		{
			minVersion: {
				major: 1,
				minor: undefined,
				patch: undefined,
				micro: undefined,
			},
			maxVersion: {
				major: 2,
				minor: undefined,
				patch: undefined,
				micro: undefined,
			},
		},
	],
	[
		'a range of major and minor versions',
		'[1.2,2.3]',
		{
			minVersion: {
				major: 1,
				minor: 2,
				patch: undefined,
				micro: undefined,
			},
			maxVersion: {
				major: 2,
				minor: 3,
				patch: undefined,
				micro: undefined,
			},
		},
	],
	[
		'a range of major, minor, and patch versions',
		'[1.2.3,2.3.4]',
		{
			minVersion: { major: 1, minor: 2, patch: 3, micro: undefined },
			maxVersion: { major: 2, minor: 3, patch: 4, micro: undefined },
		},
	],
	[
		'a range of major, minor, patch, and micro versions',
		'[1.2.3.4a,2.3.4.5b]',
		{
			minVersion: { major: 1, minor: 2, patch: 3, micro: '4a' },
			maxVersion: { major: 2, minor: 3, patch: 4, micro: '5b' },
		},
	],
	[
		'an inverted range',
		'[2.3.4.5b,1.2.3.4a]',
		{
			minVersion: { major: 1, minor: 2, patch: 3, micro: '4a' },
			maxVersion: { major: 2, minor: 3, patch: 4, micro: '5b' },
		},
	],
];

describe('getRangedVersionObject', function () {
	it('is Defined', () => {
		expect(getRangedVersionObject).toBeDefined();
	});
	test.each(versionCases)(
		'returns the correct object when given %s',
		(description, argumentValue, expectedValue) => {
			expect(getRangedVersionObject(argumentValue)).toEqual(
				expectedValue,
			);
		},
	);
});
