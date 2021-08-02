import { XMLElement } from './XMLElement';
import { UIType, isUITypeKey, isUITypeValue } from './enumsAndValidators';
import { badArgumentError } from './errorMessages';

export type TypeArgument = UIType | keyof typeof UIType;

export const isTypeArgument: (value: any) => boolean = (value): value is TypeArgument => {
	if (value) {
		if (!isUITypeValue(value) || !isUITypeKey(value))
			throw new Error(badArgumentError('extension.dispatchInfo.ui.type', 'a UIType(enum)', value));
		return true;
	}
	return false;
};
export class Type extends XMLElement {
	constructor(type: TypeArgument) {
		let content: string;
		if (type && isUITypeValue(type)) content = type;
		else if (type && isUITypeKey(type)) content = UIType[type];
		else
			throw new Error(
				badArgumentError('Type only argument', 'string of a keyof typeof UIType(enum) or UIType(enum)', type),
			);

		super({ name: 'Type', content });
	}
}
