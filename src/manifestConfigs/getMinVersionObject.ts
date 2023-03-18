import { VersionObject } from './getVersionObject';

export function getMinVersionObject(
	version1: VersionObject,
	version2: VersionObject,
) {
	if (version1.major !== version2.major) {
		if (version1.major < version2.major) {
			return version1;
		}
		if (version1.major > version2.major) {
			return version2;
		}
	}

	if (version1.minor === undefined && version2.minor === undefined)
		return version1;
	if (version1.minor === undefined) return version2;
	if (version2.minor === undefined) return version1;

	if (version1.minor !== version2.minor) {
		if (version1.minor < version2.minor) {
			return version1;
		} else if (version1.minor > version2.minor) {
			return version2;
		}
	}

	if (version1.patch === undefined && version2.patch === undefined)
		return version1;
	if (version1.patch === undefined) return version2;
	if (version2.patch === undefined) return version1;

	if (version1.patch !== version2.patch) {
		if (version1.patch < version2.patch) {
			return version1;
		} else if (version1.patch > version2.patch) {
			return version2;
		}
	}

	if (version1.micro === undefined && version2.micro === undefined)
		return version1;
	if (version1.micro === undefined) return version2;
	if (version2.micro === undefined) return version1;

	if (version1.micro !== version2.micro) {
		if (version1.micro < version2.micro) {
			return version1;
		}
		if (version1.micro > version2.micro) {
			return version2;
		}
	}
	return version1;
}
