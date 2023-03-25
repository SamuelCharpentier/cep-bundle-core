import { DeepPartial } from '@src/lib/deepPartial';
import { AllDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/AllDispatchInfo';
import {
	AllExtensions,
	isAllExtensions,
} from '@src/userConfigs/UserManifestConfigs/Parts/AllExtensions';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { HostList } from '@src/userConfigs/UserManifestConfigs/Parts/HostList';
import { getArgumentCases } from '@tests/argumentCases';
import { exampleUserManifestConfigs } from './userConfigs.example';
import { blendConfigs as blendConfigsImported } from './blendConfigs';

function blendConfigs(badConfigs: DeepPartial<_Extension>): _Extension {
	let validExtension: _Extension =
		exampleUserManifestConfigs.extensions as _Extension;
	const badObjectKeys = Object.keys(badConfigs);
	if (!badObjectKeys.includes('id')) badConfigs.id = validExtension.id;
	if (!badObjectKeys.includes('hostList'))
		badConfigs.hostList = validExtension.hostList;
	if (!badObjectKeys.includes('dispatchInfo'))
		badConfigs.dispatchInfo = validExtension.dispatchInfo;
	return blendConfigsImported({
		extensions: badConfigs,
	}).extensions as _Extension;
}

describe('isAllExtensions', () => {
	it('is defined', () => {
		expect(isAllExtensions).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases([
		'empty array',
		'empty object',
	]).bad;
	test.each(standardThrowingArguments)(
		'throw when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => isAllExtensions(badArgument)).toThrowError(
				`Validation Error: extensions (optional) must be provided as a AllExtensions (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllExtensions), ${errorMessage} received`,
			);
		},
	);

	it('passes an argument of type object or array to isExtension and accumulates the errors and let you know what item of the array the issue came from', () => {
		let badAllExtensions: AllExtensions = blendConfigs({
			id: false as unknown as string,
		});
		expect(() => isAllExtensions(badAllExtensions)).toThrowError(
			`Validation Error: extensions.id (required) must be provided as a string with length > 0, false (boolean) received`,
		);
		badAllExtensions = [
			badAllExtensions,
			blendConfigs({
				hostList: false as unknown as HostList,
			}),
			blendConfigs({
				dispatchInfo: false as unknown as AllDispatchInfo,
			}),
		];
		expect(() => isAllExtensions(badAllExtensions)).toThrowError(
			[
				`Validation Error: extensions[0].id (required) must be provided as a string with length > 0, false (boolean) received`,
				`Validation Error: extensions[1].hostList (required) must be provided as a HostList (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#HostList), false (boolean) received`,
				`Validation Error: extensions[2].dispatchInfo (required) must be provided as a AllDispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllDispatchInfo), false (boolean) received`,
			].join('\n\n'),
		);
	});
	it('returns true when given a valid AllExtension', () => {
		const goodExtension: AllExtensions =
			exampleUserManifestConfigs.extensions;
		expect(isAllExtensions(goodExtension)).toBeTruthy();
	});
});
