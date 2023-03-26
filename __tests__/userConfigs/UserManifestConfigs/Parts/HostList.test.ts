import {
	isHostList,
	HostList,
} from '@src/userConfigs/UserManifestConfigs/Parts/HostList';
import { getArgumentCases } from '@tests/argumentCases';
import { exampleUserManifestConfigs } from '../../userConfigs.example';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { HostInfo } from '@src/userConfigs/UserManifestConfigs/Parts/HostInfo';

describe('isHostList', () => {
	it('is defined', () => {
		expect(isHostList).toBeDefined();
	});
	const badArgumentsCases = getArgumentCases([
		'undefined',
		'empty object',
		'empty array',
	]).bad;
	test.each(badArgumentsCases)(
		'throw when given %s',
		(description, badArgument, errorMessage) => {
			expect(() =>
				isHostList(badArgument, ['isHostList(', 'hostList']),
			).toThrowError(
				`Validation Error: isHostList(.hostList (required) must be provided as a HostList (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#HostList), ${errorMessage} received`,
			);
		},
	);
	const goodhostListArgumentCases: [string, any][] = [
		[
			'a valid HostInfo',
			(exampleUserManifestConfigs.extensions as _Extension)
				.hostList as HostInfo,
		],
		[
			'an array of valid HostInfo',
			[
				(exampleUserManifestConfigs.extensions as _Extension)
					.hostList as HostInfo,
				(exampleUserManifestConfigs.extensions as _Extension)
					.hostList as HostInfo,
			],
		],
		['a valid All (general type)', 'All'],
	];
	test.each(goodhostListArgumentCases)(
		'returns true when given %s',
		(description, argumentValue) => {
			expect(isHostList(argumentValue)).toBeTruthy;
		},
	);
});
