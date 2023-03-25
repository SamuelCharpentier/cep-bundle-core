import {
	isInvisibleDispatchInfo,
	InvisibleDispatchInfo,
} from '@src/userConfigs/UserManifestConfigs/Parts/InvisibleDispatchInfo';
import { blendConfigs as blendConfigsImported } from './blendConfigs';
import { exampleUserManifestConfigs } from './userConfigs.example';
import { DeepPartial } from '@src/lib/deepPartial';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { Cases, getArgumentCases } from '@tests/argumentCases';

const validInvisibleDispatchInfo: InvisibleDispatchInfo = {
	ui: { type: 'Custom' },
	resources: { scriptPath: './scripts/main.jsx' },
};
function blendConfigs(
	configs: DeepPartial<InvisibleDispatchInfo> & { [key: string]: any },
): InvisibleDispatchInfo {
	const configsObjectKeys = Object.keys(configs);
	if (!configsObjectKeys.includes('ui'))
		configs.ui = validInvisibleDispatchInfo.ui;
	if (!configsObjectKeys.includes('resources'))
		configs.resources = validInvisibleDispatchInfo.resources;
	return (
		blendConfigsImported({
			extensions: {
				...(exampleUserManifestConfigs.extensions as _Extension),
				dispatchInfo: configs,
			},
		}).extensions as _Extension
	).dispatchInfo as InvisibleDispatchInfo;
}

describe('isInvisibleDispatchInfo', () => {
	it('is defined', () => {
		expect(isInvisibleDispatchInfo).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases(['empty object']).bad;
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => {
				isInvisibleDispatchInfo(badArgument);
			}).toThrowError(
				`Validation Error: dispatchInfo (required) must be provided as a DispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#DispatchInfo), ${errorMessage} received`,
			);
		},
	);

	const dispatchInfoUIThrowingCases = getArgumentCases();
	test.each(dispatchInfoUIThrowingCases)(
		'returns false when ui is %s',
		(description, ui, errorMessage) => {
			expect(() => {
				isInvisibleDispatchInfo(blendConfigs({ ui }));
			}).toThrowError(
				`Validation Error: dispatchInfo.ui (required) must be provided as a union of a BaseUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseUI) and eighter a VisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleUI) or an InvisibleUI (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleUI), ${errorMessage} received`,
			);
		},
	);
	const dispatchInfoUICases: { good: Cases; bad: Cases } = {
		good: [['an object containing type: "Custom"', { type: 'Custom' }]],
		bad: [
			[
				'an object containing type: "Panel"',
				{ type: 'Panel' },
				'\n{\n\ttype: "Panel"\n}\n (undefined)',
			],
		],
	};
	test.each(dispatchInfoUICases.bad)(
		'return false when ui is %s',
		(description, ui, errorMessage) => {
			expect(
				isInvisibleDispatchInfo(blendConfigs({ ui })),
			).not.toBeTruthy();
		},
	);
	test.each(dispatchInfoUICases.good)(
		'returns true when ui is %s',
		(description, ui) => {
			expect(isInvisibleDispatchInfo(blendConfigs({ ui }))).toBeTruthy();
		},
	);
	const badResourcesScriptPathCases = getArgumentCases(['undefined']).bad;
	test.each(badResourcesScriptPathCases)(
		'throws when given %s as resources.scriptPath',
		(description, scriptPath, errorMessage) => {
			expect(() => {
				isInvisibleDispatchInfo(
					blendConfigs({ resources: { scriptPath } }),
				);
			}).toThrowError(
				`Validation Error: dispatchInfo.resources.scriptPath (optional or required depending on the context) must be provided as a RelativePath (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#RelativePath), ${errorMessage} received`,
			);
		},
	);
	const goodRessourcesScriptPathCases: [string, any][] = [
		['a RelativePath to a file at root', './file.any'],
		['a RelativePath to a file in a folder at root', './folder/file.any'],
	];
	test.each(goodRessourcesScriptPathCases)(
		'returns true when given %s  as resources.scriptPath',
		(description, scriptPath) => {
			expect(
				isInvisibleDispatchInfo(
					blendConfigs({ resources: { scriptPath } }),
				),
			);
		},
	);
	it('warns when useless keys are given', () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
		isInvisibleDispatchInfo({
			...validInvisibleDispatchInfo,
			// @ts-expect-error
			uselessskey: 'uselessvalue',
		});
		expect(warnSpy).toHaveBeenCalledWith(
			'The following keys will be ignored because they are not usefull for an invisible extension (dispatchInfo.ui.type:UIType.Custom):\ndispatchInfo.uselessskey is ignored',
		);
		warnSpy.mockReset();
		isInvisibleDispatchInfo({
			...validInvisibleDispatchInfo,
			// @ts-expect-error
			uselessskey: 'uselessvalue',
			uselessskey2: { uselesskey3: 'uselessvalue' },
		});
		expect(warnSpy).toHaveBeenCalledWith(
			'The following keys will be ignored because they are not usefull for an invisible extension (dispatchInfo.ui.type:UIType.Custom):\ndispatchInfo.uselessskey is ignored\ndispatchInfo.uselessskey2.uselesskey3 is ignored',
		);
	});
});
