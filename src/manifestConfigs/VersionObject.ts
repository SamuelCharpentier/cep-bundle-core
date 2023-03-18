import { VersionNumber } from '@src/lib/typesAndValidators';

export type VersionObject = {
	major: number;
	minor: number;
	patch: number;
	micro: number;
};
export function getVersionObject(version: VersionNumber): VersionObject {
	if (typeof version === 'number') version = `${version}`;
	return {
		major: parseInt(version.split('.')[0]),
		minor: parseInt(version.split('.')[1]),
		patch: parseInt(version.split('.')[2]),
		micro: parseInt(version.split('.')[3]),
	};
}
