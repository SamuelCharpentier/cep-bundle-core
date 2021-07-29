export class StringContent {
	readonly value: string;
	readonly context?: (parents: string[]) => boolean;
	constructor({ value, context }: { value: string; context?: (parents: string[]) => boolean }) {
		this.value = value;
		this.context = context;
	}
	xml(parents: string[] = []): string {
		if (this.context) {
			if (this.context(parents)) return this.value;

			return '';
		} else return this.value;
	}
}
