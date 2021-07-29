export class Attribute {
	readonly name: string;
	readonly value: string;
	readonly context?: (parents: string[]) => boolean;
	constructor({ name, value, context }: { name: string; value: string; context?: (parents: string[]) => boolean }) {
		this.name = name;
		this.value = value;
		this.context = context;
	}
}
