import { Context } from './Context';

export class Attribute {
	readonly name: string;
	readonly value: string;
	readonly context?: (parents: Context[]) => boolean;
	constructor({ name, value, context }: { name: string; value: string; context?: (parents: Context[]) => boolean }) {
		this.name = name;
		this.value = value;
		this.context = context;
	}
}
