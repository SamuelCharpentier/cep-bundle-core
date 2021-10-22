import { XMLElement } from './XMLElement';
import { UIType, isUIType } from './enumsAndValidators';
import { badArgumentError } from '../errorMessages';

export type TypeArgument = UIType | `${UIType}` | keyof typeof UIType;

export const isTypeArgument: (value: any) => boolean = (value): value is TypeArgument => {
	if (value !== undefined && isUIType(value)) {
		return true;
	}
	throw new Error(badArgumentError('Type', 'a UIType (enum), `${UIType}` or keyof typeof UIType', value));
};
export class Type extends XMLElement {
	constructor(type: TypeArgument) {
		if (isTypeArgument(type)) {
			super({ name: 'Type', content: type });
		}
	}
}
