import {
	isVisibleDispatchInfo,
	VisibleDispatchInfo,
} from '@src/userConfigs/UserManifestConfigs/Parts/VisibleDispatchInfo';
import { UIType } from '@src/lib/enumsAndValidators';
import { getArgumentCases } from '@tests/argumentCases';
import { blendConfigs as blendConfigsImported } from '../../blendConfigs';
import { Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { DeepPartial } from '@src/lib/deepPartial';
import { InvisibleDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/InvisibleDispatchInfo';

const validVisibleDispatchInfo: VisibleDispatchInfo = {
	ui: { type: UIType.Panel, geometry: { size: { width: 100, height: 100 } } },
	resources: {
		htmlPath: './index.html',
	},
};

const validInvisibleDispatchInfo: InvisibleDispatchInfo = {
	ui: { type: 'Custom' },
	resources: { scriptPath: './scripts/main.jsx' },
};

function blendConfigs(
	receivedConfigs: DeepPartial<VisibleDispatchInfo>,
): VisibleDispatchInfo {
	let configs: DeepPartial<VisibleDispatchInfo> = { ...receivedConfigs };
	if (!Object.keys(receivedConfigs).includes('ui'))
		configs.ui = validVisibleDispatchInfo.ui;
	if (!Object.keys(receivedConfigs).includes('resources'))
		configs.resources = validVisibleDispatchInfo.resources;

	return (
		blendConfigsImported({ extensions: { dispatchInfo: configs } })
			.extensions as Extension
	).dispatchInfo as VisibleDispatchInfo;
}

describe('isVisibleDispatchInfo', () => {
	it('is defined', () => {
		expect(isVisibleDispatchInfo).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases(['empty object']).bad;
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, dispatchInfo, errorMessage) => {
			expect(() => isVisibleDispatchInfo(dispatchInfo)).toThrow(
				`Validation Error: dispatchInfo (required) must be provided as a DispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#DispatchInfo), ${errorMessage} received`,
			);
		},
	);
	const passingDownCases: [
		string,
		string,
		{
			good?: [string, VisibleDispatchInfo][];
			bad: [string, VisibleDispatchInfo, string][];
		},
	][] = [
		[
			'ui',
			'isVisibleUI',
			{
				bad: [
					[
						'ui missing Geometry',
						blendConfigs({
							ui: {
								type: UIType.Panel,
								// @ts-expect-error
								geometry: true,
							},
						}),
						"Validation Error: dispatchInfo.ui.geometry is required when dispatchInfo.ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a Geometry (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Geometry), true (boolean) received",
					],
					[
						'invalid menu',
						blendConfigs({
							ui: {
								type: UIType.Panel,
								// @ts-expect-error
								menu: true,
							},
						}),
						'Validation Error: dispatchInfo.ui.menu (optional) must be provided as a Menu (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Menu), true (boolean) received',
					],
				],
			},
		],
		[
			'resources',
			'isVisibleResources',
			{
				bad: [
					[
						'ressources without htmlPath',
						blendConfigs({
							resources: {
								cefParams: '--some-command',
								scriptPath: './scripts/script.jsx',
							},
						}),
						"Validation Error: dispatchInfo.resources.htmlPath is required when dispatchInfo.ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a relativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#relativePath), undefined (undefined) received",
					],
					[
						'an invalid htmlPath',
						blendConfigs({
							resources: {
								// @ts-expect-error
								htmlPath: 'c:/some/path/to/html.html',
							},
						}),
						"Validation Error: dispatchInfo.resources.htmlPath is required when dispatchInfo.ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a relativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#relativePath), 'c:/some/path/to/html.html' (string) received",
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
				expect(() => isVisibleDispatchInfo(dispatchInfo)).toThrow(
					errorMessage,
				);
			},
		);
	}
	it('return false when given an invisible DispatchInfo', () => {
		expect(isVisibleDispatchInfo(validInvisibleDispatchInfo)).toBe(false);
	});
	it('return true when given a visible DispatchInfo', () => {
		expect(isVisibleDispatchInfo(validVisibleDispatchInfo)).toBe(true);
	});
});
