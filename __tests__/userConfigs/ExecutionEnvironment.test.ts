import { DeepCollapse } from '@src/lib/DeepCollapse';
import { AdobeLocaleCodes } from '@src/lib/enumsAndValidators';
import {
	ExecutionEnvironment,
	isExecutionEnvironment,
} from '@src/userConfigs/ExecutionEnvironment';
import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';
import { getArgumentCases } from '@tests/argumentCases';
import { blendConfigs } from './blendConfigs';
import { exampleUserManifestConfigs } from './userConfigs.example';

describe('isExecutionEnvironment', () => {
	it('is defined', () => {
		expect(isExecutionEnvironment).toBeDefined();
	});
	const simpleBadExecutionEnvironmentCases = getArgumentCases([
		'undefined',
		'empty object',
	]).bad;

	test.each(simpleBadExecutionEnvironmentCases)(
		'throws when given %s',
		(description, argument, errorMessage) => {
			expect(() => isExecutionEnvironment(argument)).toThrowError(
				`Validation Error: executionEnvironment (required) must be provided as an ExecutionEnvironment (user manifest configs type) (`,
			);
		},
	);

	const localeListCases = getArgumentCases(['undefined'], {
		good: [
			['AdobeLocaleCodes.en_US', AdobeLocaleCodes.en_US, ''],
			['AdobeLocaleCodes.All', [AdobeLocaleCodes.All], ''],
			["keyof typeof AdobeLocaleCodes 'en_US'", 'en_US', ''],
			["keyof typeof AdobeLocaleCodes 'All'", 'All', ''],
		],
		bad: [['bad local code (typo)', 'en-US', "'en-US' (string)"]],
	});
	test.each(localeListCases.bad)(
		'throws when given %s',
		(description, argument, errorMessage) => {
			expect(() =>
				isExecutionEnvironment({ localeList: argument }),
			).toThrowError(
				`Validation Error: executionEnvironment.localeList (required) must be provided as an AdobeLocaleCodes or an array of AdobeLocaleCodes (manifest enum) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/manifest-enum.md#AdobeLocaleCodes), ${errorMessage} received`,
			);
		},
	);
	test.each(localeListCases.good)(
		'returns true when given %s',
		(description, goodArgument) => {
			expect(isExecutionEnvironment({ localeList: goodArgument })).toBe(
				true,
			);
		},
	);

	it('throws an error with a separate list of good and bad Locales ', () => {
		let configs: _UserManifestConfigs = blendConfigs({
			executionEnvironment: {
				localeList: [
					'en-US' as unknown as AdobeLocaleCodes, // bad value
					AdobeLocaleCodes.en_US,
				],
			},
		});
		expect(() =>
			isExecutionEnvironment(configs.executionEnvironment),
		).toThrow(
			`Validation Error: executionEnvironment.localeList (required) must be provided as an AdobeLocaleCodes or an array of AdobeLocaleCodes (manifest enum) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/manifest-enum.md#AdobeLocaleCodes), \nBad:\n\t❌ 'en-US' (string)\nGood:\n\t✅ 'en_US' (string)`,
		);
	});
});
