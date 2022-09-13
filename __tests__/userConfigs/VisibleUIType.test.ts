import { UIType } from '@src/lib/enumsAndValidators';
import { isVisibleUIType } from '@src/userConfigs/VisibleUIType';
import { Cases, getArgumentCases } from '@tests/argumentCases';

describe('isVisibleUIType', () => {
	it('is defined', () => {
		expect(isVisibleUIType).toBeDefined();
	});
	const typeCases = getArgumentCases([], {
		good: [
			['UIType.Panel', UIType.Panel],
			['UIType.Modeless', UIType.Modeless],
			['UIType.ModalDialog', UIType.ModalDialog],
		],
		bad: [
			['UIType.Custom', UIType.Custom],
			['UIType.Embedded', UIType.Embedded],
			['UIType.Dashboard', UIType.Dashboard],
		],
	});
	test.each(typeCases.good)(
		'returns true when called with %s',
		(description, type) => {
			expect(isVisibleUIType(type)).toBe(true);
		},
	);
	test.each(typeCases.bad)(
		'returns false when called with %s',
		(description, type) => {
			expect(isVisibleUIType(type)).toBe(false);
		},
	);
});
