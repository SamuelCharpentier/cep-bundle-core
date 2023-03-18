import {
	RangedVersion,
	VersionNumber,
	isVersionNumber,
} from '@src/lib/typesAndValidators';
import { VersionObject, getVersionObject } from './getVersionObject';

type RangedVersionObject = {
	minVersion: VersionObject;
	maxVersion: VersionObject;
};
export function getRangedVersionObject(
	rangedVersion: RangedVersion,
): RangedVersionObject {
	const [minVersion, maxVersion] = getVersionNumbersFromRange(rangedVersion);
	let minVersionObject = getVersionObject(minVersion);
	let maxVersionObject = getVersionObject(maxVersion);
	return {
		minVersion: minVersionObject,
		maxVersion: maxVersionObject,
	};
}

function getVersionNumbersFromRange(
	version: RangedVersion,
): [VersionNumber, VersionNumber] {
	if (isVersionNumber(version)) {
		return [version, version];
	}
	let bracketLessVersion = version.slice(1, -1);
	let [minVersion, maxVersion]: [VersionNumber, VersionNumber] =
		bracketLessVersion.split(',') as [VersionNumber, VersionNumber];
	return [minVersion, maxVersion];
}
