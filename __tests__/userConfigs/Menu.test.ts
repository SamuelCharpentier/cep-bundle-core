import { isMenu } from '@src/userConfigs/Menu';
import { getArgumentCases } from '@tests/argumentCases';

describe('isMenu', () => {
	it('is defined', () => {
		expect(isMenu).toBeDefined();
	});
	const standardThrowingArgumentCases = getArgumentCases();
	test.each(standardThrowingArgumentCases)(
		'throws when called with %s',
		(description, badArgument, errorMessage) => {
			expect(() => isMenu(badArgument)).toThrowError(
				`Validation Error: ui.menu (optional) must be provided as a Menu (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Menu), ${errorMessage} received`,
			);
		},
	);
	const menuNameCases = getArgumentCases(['string']);
	test.each(menuNameCases.bad)(
		'throws when menuName is %s',
		(description, menuName, errorMessage) => {
			expect(() => isMenu({ menuName })).toThrowError(
				`Validation Error: ui.menu.menuName (required) must be provided as a string, ${errorMessage} received`,
			);
		},
	);
	test.each(menuNameCases.good)(
		'returns true when menuName is %s',
		(description, menuName) => {
			expect(isMenu({ menuName })).toBe(true);
		},
	);
	const placementCases = getArgumentCases(['string', 'undefined']);
	test.each(placementCases.bad)(
		'throws when placement is %s',
		(description, placement, errorMessage) => {
			expect(() => isMenu({ menuName: 'test', placement })).toThrowError(
				`Validation Error: ui.menu.placement (optional) must be provided as a Placement (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Placement), ${errorMessage} received`,
			);
		},
	);
	test.each(placementCases.good)(
		'returns true when placement is %s',
		(description, placement) => {
			expect(isMenu({ menuName: 'test', placement })).toBe(true);
		},
	);
});
