import { isInvisibleResources } from '@src/userConfigs/InvisibleResources';
import { Cases, getArgumentCases } from '@tests/argumentCases';

describe('isInvisibleDispatchInfo', () => {
	it('is defined', () => {
		expect(isInvisibleResources).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => {
				isInvisibleResources(badArgument);
			}).toThrowError(
				`Validation Error: dispatchInfo.resources (required) must be provided as a union of a BaseResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseResources) and eighter a VisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleResources) or an InvisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleResources), ${errorMessage} received`,
			);
		},
	);
	const invalidBaseResourcesScriptPathCases = getArgumentCases([
		'string',
		'undefined',
	]).bad;
	test.each(invalidBaseResourcesScriptPathCases)(
		'throws when given %s as scriptPath',
		(description, badArgument, errorMessage) => {
			expect(() => {
				isInvisibleResources({
					scriptPath: badArgument,
				});
			}).toThrowError(
				`Validation Error: dispatchInfo.resources.scriptPath (optional or required depending on the context) must be provided as a RelativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#RelativePath), ${errorMessage} received`,
			);
		},
	);
	const invalidInvisibleResourcesScriptPathCases: Cases = [
		['undefined', undefined, 'undefined (undefined)'],
	];
	test.each(invalidInvisibleResourcesScriptPathCases)(
		'throws when given %s as scriptPath',
		(description, badArgument, errorMessage) => {
			expect(() => {
				isInvisibleResources({
					scriptPath: badArgument,
				});
			}).toThrowError(
				`Validation Error: dispatchInfo.resources.scriptPath (required) must be provided as a RelativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#RelativePath), ${errorMessage} received`,
			);
		},
	);
	const validScriptPathCases: Cases = [
		['a relative path', './path/to/script.jsx'],
	];
	test.each(validScriptPathCases)(
		'returns true when given %s as scriptPath',
		(description, goodArgument) => {
			expect(
				isInvisibleResources({
					scriptPath: goodArgument,
				}),
			).toBe(true);
		},
	);
});
