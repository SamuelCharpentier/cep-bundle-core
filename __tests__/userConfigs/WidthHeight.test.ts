import { isWidthHeight } from '@src/userConfigs/WidthHeight';
import { getArgumentCases } from '@tests/argumentCases';

describe('isWidthHeight', () => {
	it('is defined', () => {
		expect(isWidthHeight).toBeDefined();
	});
	const standtardThrowingArgumentCases = getArgumentCases([], {
		bad: [
			[
				'an boject with widht but not height',
				{ width: 500 },
				'\n{ "width": 500 }\n(object)',
			],
			[
				'an object with height but not width',
				{ height: 500 },
				'\n{ "height": 500 }\n(object)',
			],
		],
	}).bad;
	test.each(standtardThrowingArgumentCases)(
		'throws when called with %s',
		(description, argument, errorMessage) => {
			expect(() => isWidthHeight(argument)).toThrowError(
				`Validation Error:  (optional) must be provided as a WidthHeight (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#WidthHeight), ${errorMessage} received`,
			);
		},
	);
	const axisCases = getArgumentCases(['number'], {
		bad: [['a number that is not an integer', 500.5, '500.5 (number)']],
	});
	test.each(axisCases.bad)(
		'throws when called with a width that is %s',
		(description, argument, errorMessage) => {
			expect(() =>
				isWidthHeight({ width: argument, height: 500 }),
			).toThrowError(
				`Validation Error: width (optional) must be provided as Int (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Int), ${errorMessage} received`,
			);
		},
	);
	test.each(axisCases.good)(
		'does not throw when called with a width that is %s',
		(description, argument) => {
			expect(() =>
				isWidthHeight({ width: argument, height: 500 }),
			).not.toThrow();
		},
	);
	test.each(axisCases.bad)(
		'throws when called with a height that is %s',
		(description, argument, errorMessage) => {
			expect(() =>
				isWidthHeight({ width: 500, height: argument }),
			).toThrowError(
				`Validation Error: height (optional) must be provided as Int (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Int), ${errorMessage} received`,
			);
		},
	);
	test.each(axisCases.good)(
		'does not throw when called with a height that is %s',
		(description, argument) => {
			expect(() =>
				isWidthHeight({ width: 500, height: argument }),
			).not.toThrow();
		},
	);
	it('returns true when given a valid WidhtHeight', () => {
		expect(isWidthHeight({ width: 500, height: 500 })).toBe(true);
	});
});
