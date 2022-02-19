import { Context } from './Context';
import { badArgumentError } from '../errorMessages';

export interface AttributeArgument {
	name: string;
	value: string;
	context?: (parents: Context[]) => boolean;
}

function isValidAttributeArgument(arg: any): arg is AttributeArgument {
	if (arg === undefined || typeof arg !== 'object' || Array.isArray(arg) || Object.keys(arg).length < 2)
		throw new Error(badArgumentError('attribute', 'an AttributeArgument (type)', arg));
	if (arg.name === undefined || typeof arg.name !== 'string' || arg.name.length === 0)
		throw new Error(badArgumentError('attribute.name', 'a string', arg.name));
	if (arg.value === undefined || typeof arg.value !== 'string' || arg.value.length === 0)
		throw new Error(badArgumentError('attribute.value', 'a string', arg.value));
	if (arg.context !== undefined && (typeof arg.context !== 'function' || typeof arg.context([]) !== 'boolean'))
		throw new Error(
			badArgumentError('attribute.context (optional)', 'a function returning a boolean', arg.context),
		);
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
