import { isDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/DispatchInfo';
import { DeepPartial } from '@src/lib/deepPartial';
import { isUIType, UIType } from '@src/lib/enumsAndValidators';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { Geometry } from '@src/userConfigs/UserManifestConfigs/Parts/Geometry';
import { InvisibleDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/InvisibleDispatchInfo';
import { VisibleDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/VisibleDispatchInfo';
import { getArgumentCases, Cases } from '@tests/argumentCases';
import { exampleUserManifestConfigs } from '../../userConfigs.example';
import { blendConfigs as blendConfigsImported } from '../../blendConfigs';
import { RelativePath } from '@src/lib/typesAndValidators';
import { BaseDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/BaseDispatchInfo';
import { RelativePathToHTML } from '@src/userConfigs/UserManifestConfigs/Parts/VisibleResources';

const validVisibleDispatchInfo: VisibleDispatchInfo = {
	...((exampleUserManifestConfigs.extensions as _Extension)
		.dispatchInfo as VisibleDispatchInfo),
};

const validInvisibleDispatchInfo: InvisibleDispatchInfo = {
	ui: { type: 'Custom' },
	resources: { scriptPath: './scripts/main.jsx' },
};
const validBaseDispatchInfo: BaseDispatchInfo = {
	resources: {},
	ui: {
		type: 'Embedded',
	},
};

const validVisibleGeometry: Geometry = (
	(exampleUserManifestConfigs.extensions as _Extension)
		.dispatchInfo as VisibleDispatchInfo
).ui.geometry;

function blendConfigs(
	configs: DeepPartial<
		VisibleDispatchInfo | InvisibleDispatchInfo | BaseDispatchInfo
	>,
): VisibleDispatchInfo | InvisibleDispatchInfo | BaseDispatchInfo {
	if (configs instanceof Array)
		throw new Error(
			'use simple objects to blend configs and use blended objects to build your array instead',
		);

	const objToBlendWith:
		| VisibleDispatchInfo
		| InvisibleDispatchInfo
		| BaseDispatchInfo = !isUIType(configs?.ui?.type)
		? validBaseDispatchInfo
		: configs?.ui?.type == UIType.Custom
		? validInvisibleDispatchInfo
		: validVisibleDispatchInfo;

	const configKeys = Object.keys(configs);
	const blendWithKeys = Object.keys(objToBlendWith);
	if (!configKeys.includes('ui')) configs.ui = objToBlendWith.ui;
	if (
		!configKeys.includes('resources') &&
		blendWithKeys.includes('resources')
	)
		configs.resources = objToBlendWith.resources;

	if (!isUIType(configs?.ui?.type)) {
		return (
			blendConfigsImported({
				// @ts-expect-error
				extensions: {
					dispatchInfo: configs,
				},
			}).extensions as _Extension
		).dispatchInfo as BaseDispatchInfo;
	}

	if (configs?.ui?.type == UIType.Custom) {
		return (
			blendConfigsImported({
				// @ts-expect-error
				extensions: {
					dispatchInfo: configs,
				},
			}).extensions as _Extension
		).dispatchInfo as InvisibleDispatchInfo;
	} else {
		return (
			blendConfigsImported({
				// @ts-expect-error
				extensions: {
					dispatchInfo: configs,
				},
			}).extensions as _Extension
		).dispatchInfo as VisibleDispatchInfo;
	}
}

describe('isDispatchInfo', () => {
	it('is defined', () => {
		expect(isDispatchInfo).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases();
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, dispatchInfo, errorMessage) => {
			expect(() => {
				isDispatchInfo(dispatchInfo);
			}).toThrowError(
				`Validation Error: dispatchInfo (required) must be provided as a DispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#DispatchInfo), ${errorMessage} received`,
			);
		},
	);
	const BadBaseDispatchInfo: Cases = [
		[
			'resources.scriptPath not as a RelativePath',
			blendConfigs({
				ui: { type: 'Custom' },
				resources: {
					scriptPath:
						'not a relative path' as unknown as RelativePath, // Will trigger a BaseDispatchInfo error
				},
			}),
			"Validation Error: dispatchInfo.resources.scriptPath (optional or required depending on the context) must be provided as a RelativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#RelativePath), 'not a relative path' (string) received",
		],
		[
			'ui.type not as a UIType',
			blendConfigs({
				ui: {
					type: 'Not a UIType' as unknown as UIType.Custom, // Will trigger a BaseDispatchInfo error
				},
			}),
			"Validation Error: dispatchInfo.ui.type (optional) must be provided as a Command (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Command), 'Not a UIType' (string) received",
		],
		[
			'lifecycle.startOn as not a StartEvent',
			blendConfigs({
				lifecycle: {
					startOn: false as unknown as string, // Will trigger a BaseDispatchInfo error
				},
			}),
			'Validation Error: dispatchInfo.lifecycle.startOn (optional) must be provided as a StartEvent or array of StartEvent (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#StartEvent), false (boolean) received',
		],
	];
	test.each(BadBaseDispatchInfo)(
		'throws when given %s',
		(description, dispatchInfo, errorMessage) => {
			expect(() => {
				isDispatchInfo(blendConfigs(dispatchInfo));
			}).toThrowError(errorMessage);
		},
	);
	const AdobesInternalTypesCases: Cases = [
		['Embedded', UIType.Embedded, 'Embedded'],
		['Dashboard', UIType.Dashboard, 'Dashboard'],
	];
	test.each(AdobesInternalTypesCases)(
		"throws when given '%s' (reserved Adobe's type) as ui.type",
		(description, uiType, errorMessage) => {
			expect(() => {
				isDispatchInfo(
					blendConfigs({
						ui: {
							type: uiType,
						},
					}),
				);
			}).toThrowError(
				`dispatchInfo.ui.type: '${errorMessage}' is reserved for Adobe's internal usage. It is not supported by this tool. Please use 'Custom' instead for invisible extensions or eighter 'ModalDialog','Modeless' or 'Panel' for visible extensions.`,
			);
		},
	);
	it('does not throw when given a valid VisibleDispatchInfo', () => {
		expect(() => {
			isDispatchInfo(validVisibleDispatchInfo);
		}).not.toThrowError();
	});
	it('does not throw when given a valid InvisibleDispatchInfo', () => {
		expect(() => {
			isDispatchInfo(validInvisibleDispatchInfo);
		}).not.toThrowError();
	});
	it('throws when given an invalid VisibleDispatchInfo', () => {
		expect(() => {
			isDispatchInfo(
				blendConfigs({
					ui: { type: UIType.ModalDialog },
					resources: {
						htmlPath: 'invalid' as unknown as RelativePathToHTML,
					},
				}),
			);
		}).toThrowError(
			"Validation Error: dispatchInfo.resources.htmlPath is required when dispatchInfo.ui.type is 'Panel', 'ModalDialog' or 'Modeless' and must be provided as a relativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#relativePath), 'invalid' (string) received",
		);
	});
	it('throws when given an invalid InvisibleDispatchInfo', () => {
		expect(() => {
			isDispatchInfo(
				blendConfigs({
					ui: { type: UIType.Custom },
					resources: {
						cefParams: '--invalid',
					},
				}),
			);
		}).toThrowError(
			'Validation Error: dispatchInfo.resources.scriptPath (required) must be provided as a RelativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#RelativePath), undefined (undefined) received',
		);
	});
});
