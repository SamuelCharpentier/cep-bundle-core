import { isGeometry } from '@src/userConfigs/Geometry';
import { Cases, getArgumentCases } from '@tests/argumentCases';

describe('isGeometry', () => {
	it('is defined', () => {
		expect(isGeometry).toBeDefined();
	});
	const standardThrowingArgumentCases = getArgumentCases();
	test.each(standardThrowingArgumentCases)(
		'throws when called with %s',
		(description, badArgument, errorMessage) => {
			expect(() => isGeometry(badArgument)).toThrowError(
				`Validation Error: ui.geometry is required when .ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a VisibleGeometry (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleGeometry), ${errorMessage} received`,
			);
		},
	);
	it('throws when called with an object without a size or screenPercentage WidthHeight', () => {
		expect(() =>
			isGeometry({ minSize: { width: 100, height: 100 } }),
		).toThrowError(
			`Validation Error: ui.geometry is required when .ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a VisibleGeometry (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleGeometry), \n{ "minSize": { "width": 100, "height": 100 } }\n(object) received`,
		);
	});
	const geometryKeyOfSizesTypesCases: { good: Cases; bad: Cases } = {
		good: [
			['size', 'size'],
			['screenPercentage', 'screenPercentage'],
		],
		bad: [
			['minSize', 'minSize'],
			['maxSize', 'maxSize'],
		],
	};
	test.each(geometryKeyOfSizesTypesCases.good)(
		'returns true when called with an object with %s: WidthHeight',
		(key, propertyName) => {
			expect(
				isGeometry({
					[key]: { width: 100, height: 100 },
				}),
			).toBe(true);
		},
	);
	test.each(geometryKeyOfSizesTypesCases.bad)(
		'throws when called with an object with only %s: WidthHeight',
		(description, key) => {
			expect(() =>
				isGeometry({
					[key]: { width: 100, height: 100 },
				}),
			).toThrowError(
				`Validation Error: ui.geometry is required when .ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a VisibleGeometry (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleGeometry), \n{ \"${key}\": { \"width\": 100, \"height\": 100 } }\n(object) received`,
			);
		},
	);
	test.each(standardThrowingArgumentCases)(
		'throws when called with an object with Size: %s or screenPercentage: %s',
		(description, badArgument, errorMessage) => {
			expect(() =>
				isGeometry({
					size: badArgument,
				}),
			).toThrowError(
				`Validation Error: ui.geometry.size (optional) must be provided as a WidthHeight (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#WidthHeight), ${errorMessage} received`,
			);
			expect(() =>
				isGeometry({
					screenPercentage: badArgument,
				}),
			).toThrowError(
				`Validation Error: ui.geometry.screenPercentage (optional) must be provided as a WidthHeight (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#WidthHeight), ${errorMessage} received`,
			);
		},
	);
	it('throws usefull error if given an object with size:WidthHeight and a key that is not a valid SizeType', () => {
		expect(() =>
			isGeometry({
				size: { width: 100, height: 100 },
				invalidKey: { width: 100, height: 100 },
			}),
		).toThrowError(
			"Validation Error: ui.geometry is required when .ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a VisibleGeometry (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleGeometry), \nBad:\n\t❌ 'invalidKey' (string)\nGood:\n\t✅ 'size' (string)",
		);
	});
	it('throws if given an object with size:WidthHeight and minSize of invalid WidthHeight', () => {
		expect(() =>
			isGeometry({
				size: { width: 100, height: 100 },
				minSize: { width: 100 },
			}),
		).toThrowError(
			`Validation Error: ui.geometry.minSize (optional) must be provided as a WidthHeight (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#WidthHeight), \n{ "width": 100 }\n(object) received`,
		);
	});
	it('throws if given an object with size:WidthHeight and maxSize of invalid WidthHeight', () => {
		expect(() =>
			isGeometry({
				size: { width: 100, height: 100 },
				maxSize: { width: 100 },
			}),
		).toThrowError(
			`Validation Error: ui.geometry.maxSize (optional) must be provided as a WidthHeight (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#WidthHeight), \n{ "width": 100 }\n(object) received`,
		);
	});
	it('throws if given an object with screenPercentage:WidthHeight and minSize of invalid WidthHeight', () => {
		expect(() =>
			isGeometry({
				screenPercentage: { width: 100, height: 100 },
				minSize: { width: 100 },
			}),
		).toThrowError(
			`Validation Error: ui.geometry.minSize (optional) must be provided as a WidthHeight (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#WidthHeight), \n{ "width": 100 }\n(object) received`,
		);
	});
	it('throws if given an object with screenPercentage:WidthHeight and maxSize of invalid WidthHeight', () => {
		expect(() =>
			isGeometry({
				screenPercentage: { width: 100, height: 100 },
				maxSize: { width: 100 },
			}),
		).toThrowError(
			`Validation Error: ui.geometry.maxSize (optional) must be provided as a WidthHeight (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#WidthHeight), \n{ "width": 100 }\n(object) received`,
		);
	});
});
