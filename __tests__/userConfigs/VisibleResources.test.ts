import { isVisibleResources } from '@src/userConfigs/UserManifestConfigs/Parts/VisibleResources';
import { Cases, getArgumentCases } from '@tests/argumentCases';

describe('isVisibleResources', () => {
	it('is defined', () => {
		expect(isVisibleResources).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, resources, errorMessage) => {
			expect(() => isVisibleResources(resources)).toThrow(
				`Validation Error: dispatchInfo.resources (required) must be provided as a union of a BaseResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseResources) and eighter a VisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleResources) or an InvisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleResources), ${errorMessage} received`,
			);
		},
	);
	const resourcesCases: { good: Cases; bad: Cases } = {
		good: [
			['a ressource with a valid htmlPath', { htmlPath: './main.html' }],
		],
		bad: [
			[
				'a ressource with an invalid htmlPath',
				{ htmlPath: 'an invalid htmlPath' },
				"'an invalid htmlPath' (string)",
			],
		],
	};
	test.each(resourcesCases.bad)(
		'throws when given %s',
		(description, resources, errorMessage) => {
			expect(() => isVisibleResources(resources)).toThrow(
				`Validation Error: dispatchInfo.resources.htmlFileName is required when dispatchInfo.ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a relativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#relativePath), ${errorMessage} received`,
			);
		},
	);
	test.each(resourcesCases.good)(
		'returns true when given %s',
		(description, resources) => {
			expect(isVisibleResources(resources)).toBe(true);
		},
	);
});
