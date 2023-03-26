import { IconType } from '@src/lib/enumsAndValidators';
import { isIcons } from '@src/userConfigs/UserManifestConfigs/Parts/Icons';
import { Cases, getArgumentCases } from '@tests/argumentCases';

describe('isIcons', () => {
	it('is defined', () => {
		expect(isIcons).toBeDefined();
	});
	const standardThrowingArgumentCases = getArgumentCases();
	test.each(standardThrowingArgumentCases)(
		'throws when called with %s',
		(description, badArgument, errorMessage) => {
			expect(() =>
				isIcons(badArgument, [
					'isIcons(',
					'dispatchInfo',
					'[0]',
					'icons',
				]),
			).toThrowError(
				`Validation Error: isIcons(.dispatchInfo.[0].icons is optional when isIcons(.dispatchInfo.ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a Icons (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Icons), ${errorMessage} received`,
			);
		},
	);
	const iconKeysCases: { good: Cases; bad: Cases } = {
		good: [
			['IconType.darkNormal', IconType.darkNormal],
			['IconType.darkRollOver', IconType.darkRollOver],
			['IconType.disabled', IconType.disabled],
			['IconType.normal]', IconType.normal],
			['IconType.rollOver', IconType.rollOver],
		],
		bad: [
			[
				'a string not containing an IconType',
				'ducks',
				"Validation Error: isIcons(.icons object key name (required) must be provided as a IconType (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#IconType), 'ducks' (string) received",
			],
		],
	};
	test.each(iconKeysCases.bad)(
		'throws when icons keys are %s',
		(description, iconKey, errorMessage) => {
			expect(() =>
				isIcons({ [iconKey]: `./icons/${iconKey}Icon.png` }, [
					'isIcons(',
					'icons',
				]),
			).toThrowError(errorMessage);
		},
	);
	test.each(iconKeysCases.good)(
		"it doesn't throw when icons keys are %s",
		(description, iconKey) => {
			expect(
				isIcons({ [iconKey]: `./icons/${iconKey}Icon.png` }, [
					'isIcons(',
					'icons',
				]),
			).toBe(true);
		},
	);
	const iconValuesCases = getArgumentCases([], {
		good: [
			[
				'a string containing a relative path to an icon file',
				'./icons/normalIcon.png',
			],
		],
	});
	test.each(iconValuesCases.good)(
		"it doesn't throw when valid IconType keys are paired with a value of %s",
		(description, iconValue) => {
			expect(
				isIcons({ [IconType.normal]: iconValue }, [
					'isIcons(',
					'icons',
				]),
			).toBe(true);
		},
	);
	test.each(iconValuesCases.bad)(
		'throws when valid IconType keys are paired with a value of %s',
		(description, iconValue, errorMessage) => {
			expect(() =>
				isIcons({ [IconType.normal]: iconValue }, [
					'isIcons(',
					'icons',
				]),
			).toThrowError(
				`Validation Error: isIcons(.icons.normal (optional) must be provided as a RelativePath (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#RelativePath) to the icon file, ${errorMessage}`,
			);
		},
	);
});
