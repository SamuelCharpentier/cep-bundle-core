import { Context, ContextFilter } from './Context';

export type StringContentArgument = {
	value: string | number;
	context?: ContextFilter;
};

export class StringContent {
	readonly value: string;
	readonly context?: ContextFilter;
	constructor(arg: StringContentArgument | string | number) {
		let value: string | number;
		let context: ContextFilter | undefined;
		if (typeof arg === 'string' || typeof arg === 'number') value = arg;
		else {
			value = arg.value;
			context = arg.context;
		}
		this.value = value.toString();
		this.context = context;
	}
	xml(parents: Context[] = []): string {
		let xmlString = '';
		if (!!this.context) {
			if (this.context(parents)) xmlString = this.value;
		} else xmlString = this.value;
		return xmlString;
	}
}
