import { DeepPartial } from '@src/lib/deepPartial';
import { UIType } from '@src/lib/enumsAndValidators';
import { Extension } from '@src/userConfigs/Extension';
import { VisibleDispatchInfo } from '@src/userConfigs/VisibleDispatchInfo';
import { isVisibleUI, VisibleUI } from '@src/userConfigs/VisibleUI';
import { getArgumentCases } from '@tests/argumentCases';
import { blendConfigs as blendConfigsImported } from './blendConfigs';

const validVisibleUI: VisibleUI = {
	type: UIType.Panel,
	geometry: { size: { width: 300, height: 300 } },
};

function blendConfigs(receivedConfigs: DeepPartial<VisibleUI>): VisibleUI {
	let configs: DeepPartial<VisibleUI> = { ...receivedConfigs };
	if (!Object.keys(receivedConfigs).includes('type'))
		configs.type = validVisibleUI.type;
	if (!Object.keys(receivedConfigs).includes('geometry'))
		configs.geometry = validVisibleUI.geometry;

	return (
		(
			blendConfigsImported({
				extensions: { dispatchInfo: { ui: configs } },
			}).extensions as Extension
		).dispatchInfo as VisibleDispatchInfo
	).ui as VisibleUI;
}

describe('isVisibleUI', () => {
	it('is defined', () => {
		expect(isVisibleUI).toBeDefined();
	});
	const standardThrowingArgumentCases = getArgumentCases();
	test.each(standardThrowingArgumentCases)(
		'throws when called with %s',
		(description, argument, errorMessage) => {
			expect(() => isVisibleUI(argument)).toThrowError(
				`Validation Error: dispatchInfo.ui (required) must be provided as a union of a BaseUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseUI) and eighter a VisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleUI) or an InvisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleUI), ${errorMessage} received`,
			);
		},
	);
	test.each(standardThrowingArgumentCases)(
		'it throws when called with an object containing type: %s',
		(description, argument, errorMessage) => {
			expect(() => isVisibleUI({ type: argument })).toThrowError(
				`Validation Error: dispatchInfo.ui.type (optional) must be provided as a Command (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Command), ${errorMessage}`,
			);
		},
	);
	const passingDownCases: [
		string,
		string,
		{
			good?: [string, VisibleUI][];
			bad: [string, VisibleUI, string][];
		},
	][] = [
		[
			'menu',
			'isMenu',
			{
				bad: [
					[
						'menu is null',
						blendConfigs({
							// @ts-expect-error
							menu: null,
						}),
						'Validation Error: ui.menu (optional) must be provided as a Menu (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Menu), null (null) received',
					],
				],
			},
		],
		[
			'icons',
			'isIcons',
			{
				bad: [
					[
						'icons as null',
						blendConfigs({
							// @ts-expect-error
							icons: null,
						}),
						"Validation Error: ui.icons is optional when ui.ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a Icons (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Icons), null (null) received",
					],
				],
			},
		],
		[
			'geometry',
			'isGeometry',
			{
				bad: [
					[
						'geometry as null',
						blendConfigs({
							// @ts-expect-error
							geometry: null,
						}),
						"Validation Error: ui.geometry is required when .ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a VisibleGeometry (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleGeometry), null (null) received",
					],
				],
			},
		],
	];
	for (const [
		keyName,
		validatiorFunctionName,
		{ good, bad },
	] of passingDownCases) {
		test.each(bad)(
			`passes ${keyName} to ${validatiorFunctionName} and it cumulates and throws its errors, calling with %s`,
			(description, dispatchInfo, errorMessage) => {
				expect(() => isVisibleUI(dispatchInfo)).toThrow(errorMessage);
			},
		);
	}
	it("returns false if given a type that's not a visible one", () => {
		expect(isVisibleUI({ type: UIType.Custom })).toBe(false);
	});
	it('returns true when given a valid VisibleUI', () => {
		expect(isVisibleUI(validVisibleUI)).toBe(true);
	});
});
