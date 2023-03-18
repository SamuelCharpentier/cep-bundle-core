import { VersionObject } from './VersionObject';

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
	if (version1.minor !== version2.minor) {
		if (version1.minor < version2.minor) {
			return version1;
		} else if (version1.minor > version2.minor) {
			return version2;
		}
	}
	if (version1.patch !== version2.patch) {
		if (version1.patch < version2.patch) {
			return version1;
		} else if (version1.patch > version2.patch) {
			return version2;
		}
	}
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
export function getMaxVersionObject(
	version1: VersionObject,
	version2: VersionObject,
) {
	if (version1.major !== version2.major) {
		if (version1.major < version2.major) {
			return version2;
		}
		if (version1.major > version2.major) {
			return version1;
		}
	}
	if (version1.minor !== version2.minor) {
		if (version1.minor < version2.minor) {
			return version2;
		} else if (version1.minor > version2.minor) {
			return version1;
		}
	}
	if (version1.patch !== version2.patch) {
		if (version1.patch < version2.patch) {
			return version2;
		} else if (version1.patch > version2.patch) {
			return version1;
		}
	}
	if (version1.micro !== version2.micro) {
		if (version1.micro < version2.micro) {
			return version2;
		}
		if (version1.micro > version2.micro) {
			return version1;
		}
	}
	return version1;
}
