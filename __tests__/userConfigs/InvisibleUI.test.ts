import { UIType } from '@src/lib/enumsAndValidators';
import { isInvisibleUI } from '@src/userConfigs/InvisibleUI';
import { Cases, getArgumentCases } from '@tests/argumentCases';

describe('isInvisibleUI', () => {
	it('is defined', () => {
		expect(isInvisibleUI).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => {
				isInvisibleUI(badArgument);
			}).toThrowError(
				`Validation Error: dispatchInfo.ui (required) must be provided as a union of a BaseUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseUI) and eighter a VisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleUI) or an InvisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleUI), ${errorMessage} received`,
			);
		},
	);

	test.each(standardThrowingArguments)(
		'throws when given %s as type',
		(description, badArgument, errorMessage) => {
			expect(() => {
				isInvisibleUI({ type: badArgument });
			}).toThrowError(
				`Validation Error: dispatchInfo.ui.type (optional) must be provided as a Command (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Command), ${errorMessage} received`,
			);
		},
	);
	const typeCases: { good: Cases; bad: Cases } = {
		good: [['Custom', UIType.Custom]],
		bad: [
			['Dashboard', UIType.Dashboard],
			['Embedded', UIType.Embedded],
			['Panel', UIType.Panel],
			['ModalDialog', UIType.ModalDialog],
			['Modeless', UIType.Modeless],
		],
	};
	test.each(typeCases.bad)(
		'returns false when given %s as type',
		(description, badArgument) => {
			expect(isInvisibleUI({ type: badArgument })).toBe(false);
		},
	);
	test.each(typeCases.good)(
		'returns true when given %s as type',
		(description, goodArgument) => {
			expect(isInvisibleUI({ type: goodArgument })).toBe(true);
		},
	);
});
