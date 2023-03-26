import {
	BaseDispatchInfo,
	isBaseDispatchInfo,
	_BaseDispatchInfo,
} from '@src/userConfigs/UserManifestConfigs/Parts/BaseDispatchInfo';
import { blendConfigs as blendConfigsImported } from '../../blendConfigs';
import { exampleUserManifestConfigs } from '../../userConfigs.example';
import { DeepPartial } from '@src/lib/deepPartial';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { Cases, getArgumentCases } from '@tests/argumentCases';
import { HostEngine, UIType } from '@src/lib/enumsAndValidators';
import { BaseResources } from '@src/userConfigs/UserManifestConfigs/Parts/BaseResources';
import { Lifecycle } from '@src/userConfigs/UserManifestConfigs/Parts/Lifecycle';
import { InvisibleDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/InvisibleDispatchInfo';
import { VisibleDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/VisibleDispatchInfo';

const validInvisibleDispatchInfo: InvisibleDispatchInfo = {
	ui: { type: 'Custom' },
	resources: { scriptPath: './scripts/main.jsx' },
	extensionData: ['anything here', 'anything here too'],
};
const validBaseDispatchInfo: BaseDispatchInfo = {
	resources: {
		scriptPath: './scripts/main.jsx',
	},
	ui: {
		type: 'Embedded',
	},
	extensionData: 'anything here',
};

const validVisibleDispatchInfo: VisibleDispatchInfo = {
	...((exampleUserManifestConfigs.extensions as _Extension)
		.dispatchInfo as VisibleDispatchInfo),
};

function blendConfigs(
	configs: DeepPartial<_BaseDispatchInfo> & { [key: string]: any },
): _BaseDispatchInfo {
	const badObjectKeys = Object.keys(configs);
	if (!badObjectKeys.includes('resources'))
		configs.resources = validBaseDispatchInfo.resources;
	if (!badObjectKeys.includes('ui')) configs.ui = validBaseDispatchInfo.ui;
	return (
		blendConfigsImported({
			// @ts-expect-error
			extensions: {
				...(exampleUserManifestConfigs.extensions as _Extension),
				dispatchInfo: configs,
			},
		}).extensions as _Extension
	).dispatchInfo as _BaseDispatchInfo;
}

describe('isBaseDispatchInfo', () => {
	it('is defined', () => {
		expect(isBaseDispatchInfo).toBeDefined;
	});
	const standardThrowingArguments = getArgumentCases(['empty object']).bad;
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => isBaseDispatchInfo(badArgument)).toThrowError(
				`Validation Error: dispatchInfo (required) must be provided as a DispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#DispatchInfo), ${errorMessage} received`,
			);
		},
	);
	const allBaseDispatchInfoCases: {
		bad: [string, Partial<BaseDispatchInfo>, string][];
		good: [string, Partial<BaseDispatchInfo>][];
	} = {
		bad: [
			[
				'a BaseDispatchInfo with an invalid ui.type',
				{ ui: { type: 'invalid' as unknown as UIType } },
				"Validation Error: dispatchInfo.ui.type (optional) must be provided as a Command (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Command), 'invalid' (string) received",
			],
			[
				'a BaseDispatchInfo with an invalid resources',
				{
					resources: 'invalid' as unknown as BaseResources,
				},
				"Validation Error: dispatchInfo.resources (required) must be provided as a union of a BaseResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseResources) and eighter a VisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleResources) or an InvisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleResources), 'invalid' (string) received",
			],
			[
				'a BaseDispatchInfo with an invalid lifecycle',
				{
					lifecycle: 'invalid' as unknown as Lifecycle,
				},
				"Validation Error: dispatchInfo.lifecycle (optional) must be provided as a Lifecycle (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Lifecycle), 'invalid' (string) received",
			],
			[
				'a BaseDispatchInfo with a boolean extensionData',
				{
					extensionData: false as unknown as string[],
				},
				'Validation Error: dispatchInfo.extensionData (optional) must be provided as a string or an array of strings, false (boolean) received',
			],
			[
				'a BaseDispatchInfo with an object extensionData',
				{
					extensionData: { data: 'my data' } as unknown as string[],
				},
				'Validation Error: dispatchInfo.extensionData (optional) must be provided as a string or an array of strings, \n{ "data": "my data" }\n(object) received',
			],
			[
				'a BaseDispatchInfo with an array of objects extensionData',
				{
					extensionData: [
						{ data: 'my data' },
						{ data: 'my data' },
					] as unknown as string[],
				},
				'Validation Error: dispatchInfo.extensionData[0] (optional) must be provided as a string, \n{ "data": "my data" }\n(object) received\n\nValidation Error: dispatchInfo.extensionData[1] (optional) must be provided as a string, \n{ "data": "my data" }\n(object) received',
			],
			[
				'a BaseDispatchInfo with an invalid host',
				{
					host: 'invalid' as unknown as HostEngine,
				},
				"Validation Error: dispatchInfo.host (optional) must be provided as a HostEngine (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#HostEngine), 'invalid' (string) received",
			],
		],
		good: [
			['a valid BaseDispatchInfo', validBaseDispatchInfo],
			['a valid VisibleDispatchInfo', validVisibleDispatchInfo],
			['a valid InvisibleDispatchInfo', validInvisibleDispatchInfo],
			[
				'a valid BaseDispatchInfo with optional data',
				{
					...validBaseDispatchInfo,
					extensionData: ['my data'],
					host: HostEngine.Illustrator,
				},
			],
		],
	};
	test.each(allBaseDispatchInfoCases.bad)(
		'throws when given %s',
		(description, configs, errorMessage) => {
			expect(() => {
				isBaseDispatchInfo(blendConfigs(configs));
			}).toThrowError(errorMessage);
		},
	);

	test.each(allBaseDispatchInfoCases.good)(
		'returns true when given %s',
		(description, configs) => {
			expect(isBaseDispatchInfo(blendConfigs(configs))).toBeTruthy();
		},
	);
});
