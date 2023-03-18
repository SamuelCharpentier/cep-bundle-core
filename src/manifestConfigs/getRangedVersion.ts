import {
	RangedVersion,
	isAll,
	isRangedVersion,
} from '@src/lib/typesAndValidators';
import { HostInfo } from '@src/userConfigs/HostInfo';

export function getRangedVersion(host: HostInfo) {
	let version: RangedVersion;
	if (isAll(host.version)) {
		version = '[0, 99]';
	} else if (isRangedVersion(host.version)) {
		version = host.version;
	} else {
		version = '[0, 99]';
	}
	return version;
}
