import { RangedVersion } from '@src/lib/typesAndValidators';
import { combineHostVersion } from '@src/manifestConfigs/combineHostVersion';

type Descriptor = string;
type ArgumentValue = [RangedVersion, RangedVersion];
type ExpectedValue = RangedVersion;

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	['two equal versions', ['[1.0.0,1.0.0]', '[1.0.0,1.0.0]'], '[1.0.0,1.0.0]'],
	[' the first version is a number', [1, '[1.0.0,1.0.0]'], '[1,1.0.0]'],
	[' the second version is a number', ['[1.0.0,1.0.0]', 1], '[1,1.0.0]'],
	[
		'two different ranges of major versions',
		['[10,12]', '[14,15]'],
		'[10,15]',
	],
	[
		'two different ranges of minor versions',
		['[10.1,10.2]', '[10.4,10.5]'],
		'[10.1,10.5]',
	],
	[
		'two different ranges of patch versions',
		['[10.1.1,10.1.2]', '[10.1.4,10.1.5]'],
		'[10.1.1,10.1.5]',
	],
	[
		'two different ranges of micro versions',
		['[10.1.1.1a,10.1.1.1b]', '[10.1.1.1c,10.1.1.1d]'],
		'[10.1.1.1a,10.1.1.1d]',
	],
];

describe('combineHostVersion', () => {
	it('is defined', () => {
		expect(combineHostVersion).toBeDefined();
	});

	test.each(cases)(
		'combineHostVersion returns a combined version given %s',
		(descriptor, [version1, version2], expected) => {
			expect(combineHostVersion(version1, version2)).toBe(expected);
		},
	);
});
