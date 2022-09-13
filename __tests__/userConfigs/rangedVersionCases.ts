import { versionCases } from './versionCases';
import { RangedVersion } from '@src/lib/typesAndValidators';

export const rangedVersionCases: [string, RangedVersion][] =
	versionCases.good.map(([versionNumberDescription, versionNumberValue]) => {
		const caseDescription: string = versionNumberDescription.replace(
			'VersionNumber',
			'RangedNumber',
		);
		const caseValue: RangedVersion = `[${versionNumberValue},${versionNumberValue}]`;
		return [caseDescription, caseValue];
	});
