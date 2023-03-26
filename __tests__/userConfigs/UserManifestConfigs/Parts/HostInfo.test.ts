import {
	HostInfo,
	isHostInfo,
} from '@src/userConfigs/UserManifestConfigs/Parts/HostInfo';
import { getArgumentCases } from '@tests/argumentCases';
import { exampleUserManifestConfigs } from '../../userConfigs.example';
import { blendConfigs as blendConfigsImported } from '../../blendConfigs';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { DeepPartial } from '@src/lib/deepPartial';
import { HostEngine } from '@src/lib/enumsAndValidators';
import { rangedVersionCases } from './../../rangedVersionCases';
import { Int, RangedVersion } from '@src/lib/typesAndValidators';

function blendConfigs(badConfigs: DeepPartial<HostInfo>): HostInfo {
	const badObjectKeys = Object.keys(badConfigs);
	if (!badObjectKeys.includes('host'))
		badConfigs.host = HostEngine.Illustrator;
	return (
		blendConfigsImported({
			extensions: {
				...(exampleUserManifestConfigs.extensions as _Extension),
				hostList: badConfigs,
			},
		}).extensions as _Extension
	).hostList as HostInfo;
}

describe('isHostInfo', () => {
	it('is defined', () => {
		expect(isHostInfo).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases(['empty object']).bad;
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() =>
				isHostInfo(badArgument, ['isHostInfo(', 'hostList']),
			).toThrowError(
				`Validation Error: isHostInfo(.hostList (required) must be provided as a HostInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#HostInfo), ${errorMessage} received`,
			);
		},
	);
	const hostCases = getArgumentCases([], {
		good: [
			['hostEngine (enum)', HostEngine.Illustrator],
			['hostEngine Key (string)', 'illustrator'],
			['hostEngine Token (string)', 'ILST'],
		],
	});
	test.each(hostCases.bad)(
		'throws when hostEngine is %s',
		(description, badArgument, errorMessage) => {
			expect(() =>
				isHostInfo(blendConfigs({ host: badArgument }), [
					'isHostInfo(',
					'hostList',
				]),
			).toThrowError(
				`Validation Error: isHostInfo(.hostList.host (required) must be provided as a HostEngine (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#HostEngine), ${errorMessage} received`,
			);
		},
	);
	const hostInfoVersionCases = getArgumentCases(['number', 'undefined'], {
		good: [['All (general type)', 'All'], ...rangedVersionCases],
	});
	test.each(hostInfoVersionCases.bad)(
		'throws when hostEngine.version is %s',
		(description, badArgument, errorMessage) => {
			expect(() =>
				isHostInfo(
					blendConfigs({ version: badArgument as RangedVersion }),
					['isHostInfo(', 'hostList'],
				),
			).toThrowError(
				`Validation Error: isHostInfo(.hostList.version (optional) must be provided as All (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#All) or a RangedVersion (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#RangedVersion), ${errorMessage} received`,
			);
		},
	);
	const hostInfoDebugPortCases = getArgumentCases(['number', 'undefined'], {
		good: [
			['four digit string', '9811'],
			['four digit number', 9811],
		],
		bad: [
			['float number string', '98.11', "'98.11' (string)"],
			['float number', 98.11, '98.11 (number)'],
		],
	});
	test.each(hostInfoDebugPortCases.bad)(
		'throws when hostEngine.debugPort is %s',
		(description, badArgument, errorMessage) => {
			console.log(errorMessage);
			expect(() =>
				isHostInfo(
					blendConfigs({
						debugPort: badArgument as Int,
					}),
					['isHostInfo(', 'hostList'],
				),
			).toThrowError(
				`Validation Error: isHostInfo(.hostList.debugPort (optional) must be provided as Int (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Int), ${errorMessage} received`,
			);
		},
	);
	test.each(hostInfoDebugPortCases.good)(
		'returns true when hostEngine.debugPort is %s',
		(description, goodArgument) => {
			expect(
				isHostInfo(
					blendConfigs({ debugPort: goodArgument as number }),
					['isHostInfo(', 'hostList'],
				),
			).toBeTruthy;
		},
	);
});
