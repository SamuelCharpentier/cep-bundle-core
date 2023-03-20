import {
	RangedVersion,
	VersionNumber,
	isVersionNumber,
} from '@src/lib/typesAndValidators';
import { getRangedVersionObject } from './getRangedVersionObject';
import { getMinVersionObject } from './getMinVersionObject';
import { getMaxVersionObject } from './getMaxVersionObject';

export function combineHostVersion(
	version1: RangedVersion,
	version2: RangedVersion,
): RangedVersion {
	let combinedVersion: RangedVersion;
	if (isVersionNumber(version1)) version1 = `[${version1},${version1}]`;
	if (isVersionNumber(version2)) version2 = `[${version2},${version2}]`;
	let rangedVersion1Object = getRangedVersionObject(version1);
	let rangedVersion2Object = getRangedVersionObject(version2);
	let minVersionObject = getMinVersionObject(
		rangedVersion1Object.minVersion,
		rangedVersion2Object.minVersion,
	);
	let maxVersionObject = getMaxVersionObject(
		rangedVersion1Object.maxVersion,
		rangedVersion2Object.maxVersion,
	);
	let minVersion: VersionNumber =
		minVersionObject.micro !== undefined &&
		minVersionObject.micro !== '' &&
		minVersionObject.patch !== undefined &&
		minVersionObject.minor !== undefined
			? `${minVersionObject.major}.${minVersionObject.minor}.${minVersionObject.patch}.${minVersionObject.micro}`
			: minVersionObject.patch !== undefined &&
			  minVersionObject.minor !== undefined
			? `${minVersionObject.major}.${minVersionObject.minor}.${minVersionObject.patch}`
			: minVersionObject.minor !== undefined
			? `${minVersionObject.major}.${minVersionObject.minor}`
			: `${minVersionObject.major}`;
	let maxVersion: VersionNumber =
		maxVersionObject.micro !== undefined &&
		maxVersionObject.micro !== '' &&
		maxVersionObject.patch !== undefined &&
		maxVersionObject.minor !== undefined
			? `${maxVersionObject.major}.${maxVersionObject.minor}.${maxVersionObject.patch}.${maxVersionObject.micro}`
			: maxVersionObject.patch !== undefined &&
			  maxVersionObject.minor !== undefined
			? `${maxVersionObject.major}.${maxVersionObject.minor}.${maxVersionObject.patch}`
			: maxVersionObject.minor !== undefined
			? `${maxVersionObject.major}.${maxVersionObject.minor}`
			: `${maxVersionObject.major}`;
	combinedVersion = `[${minVersion},${maxVersion}]`;
	return combinedVersion;
}
