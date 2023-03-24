import { VersionNumber } from '@src/lib/typesAndValidators';

export type VersionObject = {
	major: number;
	minor?: number;
	patch?: number;
	micro?: string;
};
export function getVersionObject(version: VersionNumber): VersionObject {
	if (typeof version === 'number') version = `${version}`;
	return {
		major: parseInt(version.split('.')[0]),
		minor:
			version.split('.')[1] === undefined
				? undefined
				: parseInt(version.split('.')[1]),
		patch:
			version.split('.')[2] === undefined
				? undefined
				: parseInt(version.split('.')[2]),
		micro: version.split('.')[3],
	};
}
