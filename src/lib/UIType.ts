import { XMLElement } from './XMLElement';
import { UIType, isUIType } from './enumsAndValidators';
import { badArgumentError } from './errorMessages';

export type TypeArgument = UIType | keyof typeof UIType;

export const isTypeArgument: (value: any) => boolean = (value): value is TypeArgument => {
	if (value) {
		if (!isUIType(value))
			throw new Error(badArgumentError('extension.dispatchInfo.ui.type', 'a UIType(enum)', value));
		return true;
	}
	return false;
};
export class Type extends XMLElement {
	constructor(type: TypeArgument) {
		let content: string;
		if (type && isUIType(type)) content = type;
		else
			throw new Error(
				badArgumentError('Type only argument', 'string of a keyof typeof UIType(enum) or UIType(enum)', type),
			);

		super({ name: 'Type', content });
	}
}
