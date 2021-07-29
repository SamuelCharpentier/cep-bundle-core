import { XMLElement } from './XMLElement';
import { UIType, isUITypeKey, isUITypeValue } from './enumsAndValidators';
export class Type extends XMLElement {
	constructor(type: UIType | keyof typeof UIType) {
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
