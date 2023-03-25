import { isBaseResources } from '@src/userConfigs/UserManifestConfigs/Parts/BaseResources';
import { getArgumentCases } from '@tests/argumentCases';

describe('isBaseResources', () => {
	it('is defined', () => {
		expect(isBaseResources).toBeDefined;
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => isBaseResources(badArgument)).toThrow(
				`Validation Error: dispatchInfo.resources (required) must be provided as a union of a BaseResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseResources) and eighter a VisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleResources) or an InvisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleResources), ${errorMessage} received`,
			);
		},
	);
	it("doesn't throw if there's at least one key in the given object", () => {
		expect(() => isBaseResources({ someKey: 'someData' })).not.toThrow();
	});
	const scriptPathCases = getArgumentCases(['undefined'], {
		good: [
			['a valid relative path', './some/path'],
			['a valid relative path that ends with .jsx', './some/path.jsx'],
		],
		bad: [
			'a fake relative path',
			'c:/some/path',
			"'c:/some/path' (string)",
		],
	});
	test.each(scriptPathCases.bad)(
		'throws when given %s as scriptPath',
		(description, badArgument, errorMessage) => {
			expect(() => isBaseResources({ scriptPath: badArgument })).toThrow(
				`Validation Error: dispatchInfo.resources.scriptPath (optional or required depending on the context) must be provided as a RelativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#RelativePath), ${errorMessage} received`,
			);
		},
	);
	test.each(scriptPathCases.good)(
		"doesn't throw when given %s as scriptPath",
		(description, goodArgument) => {
			expect(() =>
				isBaseResources({ scriptPath: goodArgument }),
			).not.toThrow();
		},
	);
	const cefParamsCases = getArgumentCases(['undefined'], {
		good: [
			['a valid Command', '--some-command'],
			[
				'an array of valid Commands',
				['--some-command', '--some-other-command'],
			],
		],
		bad: [['a fake Command', 'c:/some/path', "'c:/some/path' (string)"]],
	});
	test.each(cefParamsCases.bad)(
		'throws when given %s as cefParams',
		(description, badArgument, errorMessage) => {
			expect(() => isBaseResources({ cefParams: badArgument })).toThrow(
				`Validation Error: dispatchInfo.resources.cefParams (optional) must be provided as a Command or array of Command (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Command), ${errorMessage} received`,
			);
		},
	);
	const specialBadCefParamsCases: [string, any, string][] = [
		[
			'an array of numbers',
			[2, 4, 6],
			[
				'Validation Error: dispatchInfo.resources.cefParams[0] (optional) must be provided as a Command or array of Command (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Command), 2 (number) received',
				'Validation Error: dispatchInfo.resources.cefParams[1] (optional) must be provided as a Command or array of Command (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Command), 4 (number) received',
				'Validation Error: dispatchInfo.resources.cefParams[2] (optional) must be provided as a Command or array of Command (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Command), 6 (number) received',
			].join('\n\n'),
		],
		[
			'an array containing one bad Command',
			['--command1', true, '--command2'],
			'Validation Error: dispatchInfo.resources.cefParams[1] (optional) must be provided as a Command or array of Command (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Command), true (boolean) received',
		],
	];

	test.each(specialBadCefParamsCases)(
		'throws when given %s as cefParams',
		(description, badArgument, errorMessage) => {
			expect(() => isBaseResources({ cefParams: badArgument })).toThrow(
				errorMessage,
			);
		},
	);
	it('throws when given an array of bad Commands as cefParams and specify wich is erronous', () => {
		const badArgument = ['--some-command', 'c:/some/path'];
		expect(() => isBaseResources({ cefParams: badArgument })).toThrow(
			`Validation Error: dispatchInfo.resources.cefParams[1] (optional) must be provided as a Command or array of Command (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Command), 'c:/some/path' (string) received`,
		);
	});
	test.each(cefParamsCases.good)(
		"doesn't throw when given %s as cefParams",
		(description, goodArgument) => {
			expect(() =>
				isBaseResources({ cefParams: goodArgument }),
			).not.toThrow();
		},
	);
});
