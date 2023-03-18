import {
	RangedVersion,
	VersionNumber,
	isVersionNumber,
} from '@src/lib/typesAndValidators';
import { getRangedVersionObject } from './getRangedVersionObject';
import {
	getMinVersionObject,
	getMaxVersionObject,
} from './getMinVersionObject';

export function CombineHostVersion(
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
	let minVersion: VersionNumber = `${minVersionObject.major}.${minVersionObject.minor}.${minVersionObject.patch}.${minVersionObject.micro}`;
	let maxVersion: VersionNumber = `${maxVersionObject.major}.${maxVersionObject.minor}.${maxVersionObject.patch}.${maxVersionObject.micro}`;
	combinedVersion = `[${minVersion},${maxVersion}]`;
	return combinedVersion;
}
