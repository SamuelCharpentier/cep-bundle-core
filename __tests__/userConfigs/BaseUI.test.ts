import { UIType } from '@src/lib/enumsAndValidators';
import { isBaseUI } from '@src/userConfigs/BaseUI';
import { getArgumentCases } from '@tests/argumentCases';

describe('isBaseUI', () => {
	it('is defined', () => {
		expect(isBaseUI).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when called with %p',
		(description, argument, errorMessage) => {
			expect(() => isBaseUI(argument)).toThrowError(
				`Validation Error: dispatchInfo.ui (required) must be provided as a union of a BaseUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseUI) and eighter a VisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleUI) or an InvisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleUI), ${errorMessage} received`,
			);
		},
	);
	test.each(standardThrowingArguments)(
		'it throws when called with an object containing type: %s',
		(description, type, errorMessage) => {
			expect(() => isBaseUI({ type })).toThrowError(
				`Validation Error: dispatchInfo.ui.type (optional) must be provided as a Command (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Command), ${errorMessage} received`,
			);
		},
	);
	const validUIType = Object.keys(UIType).filter((item) => {
		return isNaN(Number(item));
	});
	test.each(validUIType)(
		'returns true when called with an object containing type: %s',
		(type) => {
			expect(isBaseUI({ type })).toBe(true);
		},
	);
});
