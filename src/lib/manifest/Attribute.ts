import { Context } from './Context';
import { badArgumentError } from '../errorMessages';

export interface AttributeArgument {
	name: string;
	value: string;
	context?: (parents: string[]) => boolean;
}

function isValidAttributeArgument(arg: any): arg is AttributeArgument {
	if (arg === undefined || typeof arg !== 'object')
		throw new Error(badArgumentError('Attribute', 'an AttributeArgument (type)', arg));
	if (arg.name === undefined || typeof arg.name !== 'string')
		throw new Error(badArgumentError('Attribute.name', 'a string', arg.name));
	if (arg.value === undefined || typeof arg.value !== 'string')
		throw new Error(badArgumentError('Attribute.value', 'a string', arg.value));
	if (arg.context !== undefined && typeof arg.context !== 'function')
		throw new Error(badArgumentError('Attribute.context', 'a function', arg.context));
	return true;
}

export class Attribute {
	readonly name: string;
	readonly value: string;
	readonly context?: (parents: Context[]) => boolean;
	constructor(arg: AttributeArgument) {
		this.name = '';
		this.value = '';
		if (isValidAttributeArgument(arg)) {
			this.name = arg.name;
			this.value = arg.value;
			this.context = arg.context;
		}
	}
}
