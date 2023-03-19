import { getMinVersionObject } from '@src/manifestConfigs/getMinVersionObject';
import { VersionObject } from '@src/manifestConfigs/getVersionObject';

type Descriptor = string;
type ArgumentValue = [VersionObject, VersionObject];
type ExpectedValue = VersionObject;

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'equal major versions, undefined minor, patch and micro',
		[
			{ major: 1, minor: undefined, patch: undefined, micro: undefined },
			{ major: 1, minor: undefined, patch: undefined, micro: undefined },
		],
		{ major: 1, minor: undefined, patch: undefined, micro: undefined },
	],
	[
		'equal major and minor versions, undefined patch and micro',
		[
			{ major: 1, minor: 1, patch: undefined, micro: undefined },
			{ major: 1, minor: 1, patch: undefined, micro: undefined },
		],
		{ major: 1, minor: 1, patch: undefined, micro: undefined },
	],
	[
		'equal major, minor, and patch versions, undefined micro',
		[
			{ major: 1, minor: 1, patch: 1, micro: undefined },
			{ major: 1, minor: 1, patch: 1, micro: undefined },
		],
		{ major: 1, minor: 1, patch: 1, micro: undefined },
	],
	[
		'equal major, minor, patch, and micro versions',
		[
			{ major: 1, minor: 1, patch: 1, micro: '1a' },
			{ major: 1, minor: 1, patch: 1, micro: '1a' },
		],
		{ major: 1, minor: 1, patch: 1, micro: '1a' },
	],
	[
		'a version with greater major',
		[
			{ major: 2, minor: undefined, patch: undefined, micro: undefined },
			{ major: 1, minor: undefined, patch: undefined, micro: undefined },
		],
		{ major: 1, minor: undefined, patch: undefined, micro: undefined },
	],
	[
		'a version with greater minor',
		[
			{ major: 1, minor: 2, patch: undefined, micro: undefined },
			{ major: 1, minor: 1, patch: undefined, micro: undefined },
		],
		{ major: 1, minor: 1, patch: undefined, micro: undefined },
	],
	[
		'a version with greater patch',
		[
			{ major: 1, minor: 1, patch: 2, micro: undefined },
			{ major: 1, minor: 1, patch: 1, micro: undefined },
		],
		{ major: 1, minor: 1, patch: 1, micro: undefined },
	],
	[
		'a version with greater micro',
		[
			{ major: 1, minor: 1, patch: 1, micro: '1b' },
			{ major: 1, minor: 1, patch: 1, micro: '1a' },
		],
		{ major: 1, minor: 1, patch: 1, micro: '1a' },
	],
	[
		'a version with undefined minor, the other with defined minor',
		[
			{ major: 1, minor: undefined, patch: undefined, micro: undefined },
			{ major: 1, minor: 0, patch: undefined, micro: undefined },
		],
		{ major: 1, minor: undefined, patch: undefined, micro: undefined },
	],
	[
		'a version with undefined patch, the other with defined patch',
		[
			{ major: 1, minor: 0, patch: undefined, micro: undefined },
			{ major: 1, minor: 0, patch: 0, micro: undefined },
		],
		{ major: 1, minor: 0, patch: undefined, micro: undefined },
	],
	[
		'a version with undefined micro, the other with defined micro',
		[
			{ major: 1, minor: 0, patch: 0, micro: undefined },
			{ major: 1, minor: 0, patch: 0, micro: '1a' },
		],
		{ major: 1, minor: 0, patch: 0, micro: undefined },
	],
];

describe('getMinVersionObject', () => {
	it('is Defined', () => {
		expect(getMinVersionObject).toBeDefined();
	});
	test.each(cases)(
		'getMinVersionObject returns smallest version given %s',
		(description, argumentValue, expectedValue) => {
			const [versionObject1, versionObject2] = argumentValue;
			expect(getMinVersionObject(versionObject1, versionObject2)).toEqual(
				expectedValue,
			);
			expect(getMinVersionObject(versionObject2, versionObject1)).toEqual(
				expectedValue,
			);
		},
	);
});
