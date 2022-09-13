import { getArgumentCases } from '@tests/argumentCases';

export const versionCases = getArgumentCases(['undefined', 'number'], {
	good: [
		['a single number string VersionNumber', '1', "'1' (string)"],
		['two number string VersionNumber', '1.0', '"1.0" (string)'],
		['three number string VersionNumber', '1.0.0', '"1.0.0" (string)'],
		[
			'three number and a letter string VersionNumber',
			'1.0.0.a',
			'"1.0.0.a" (string)',
		],
	],
});
