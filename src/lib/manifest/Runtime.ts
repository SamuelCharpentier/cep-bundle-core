import { XMLElement } from './XMLElement';
import { RangedVersion, isRangedVersion, isVersionNumber } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

export class RequiredRuntimeList extends XMLElement {
	constructor(arg: RangedVersion) {
		if (isVersionNumber(arg))
			console.warn(
				'CSXSVersion was provided as a VersionNumber (type). Know CSXS could also be given as a RangedVersion (type).',
			);
		if (!isRangedVersion(arg)) throw new Error(badArgumentError('CSXSVersion', 'a RangedVersion (type)', arg));
		let content: RequiredRuntime = new RequiredRuntime(arg);
		super({ name: 'RequiredRuntimeList', content });
	}
}

function AddMinorZero(number: string): string {
	if (number.toString().split('.').length === 1) number = number.toString() + '.0';
	return number;
}

function formatRangedVersion(version: RangedVersion) {
	let formattedNumber: string;
	if (typeof version === 'string' && version.toString().includes('[') && version.toString().includes(']')) {
		let numberPieces: string[] = version.replace(/[\[\]']+/g, '').split(',');
		for (let i = 0; i < numberPieces.length; i++) {
			numberPieces[i] = AddMinorZero(numberPieces[i].trim());
		}
		return `[${numberPieces.join(', ')}]`;
	}
	return AddMinorZero(version.toString());
}
class RequiredRuntime extends XMLElement {
	constructor(version: RangedVersion) {
		super({
			name: 'RequiredRuntime',
			attributes: [
				{ name: 'Name', value: 'CSXS' },
				{ name: 'Version', value: formatRangedVersion(version) },
			],
		});
	}
}
