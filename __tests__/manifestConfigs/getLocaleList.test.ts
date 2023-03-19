import { getLocaleList } from '@src/manifestConfigs/getLocaleList';
import { AdobeLocaleCodes } from '@src/lib/enumsAndValidators';
import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs';

type Descriptor = string;
type ArgumentValue = _UserManifestConfigs['executionEnvironment'];
type ExpectedValue = AdobeLocaleCodes[];

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	['undefined', undefined, [AdobeLocaleCodes.All]],
	[
		'an array containing `All`',
		{ localeList: ['All'] },
		[AdobeLocaleCodes.All],
	],
	[
		'a string containing `all`',
		{ localeList: 'All' },
		[AdobeLocaleCodes.All],
	],
	['a single Locale', { localeList: 'en_US' }, [AdobeLocaleCodes.en_US]],
	[
		'an array with one locale',
		{ localeList: ['en_US'] },
		[AdobeLocaleCodes.en_US],
	],
	[
		'an array with multiple locales',
		{ localeList: ['en_US', 'fr_FR'] },
		[AdobeLocaleCodes.en_US, AdobeLocaleCodes.fr_FR],
	],
];

describe('getLocaleList', () => {
	it('is defined', () => {
		expect(getLocaleList).toBeDefined();
	});
	it.each(cases)(
		'get the correct localeList given %s',
		(descriptor, argumentValue, expectedValue) => {
			expect(getLocaleList(argumentValue)).toEqual(expectedValue);
		},
	);
});
