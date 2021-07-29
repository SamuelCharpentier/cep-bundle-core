import { XMLElement } from './XMLElement';
import { StringContent } from './StringContent';
export class SizeConstructor extends XMLElement {
	constructor({ name, width, height }: { name: string; width: `${number}` | number; height: `${number}` | number }) {
		let content: XMLElement[] = [];
		if ((width && !height) || (!width && height)) throw new Error(bothWidthAndHeightRequired(name, width, height));

		if (typeof width === 'number') width = `${width}`;
		if (typeof height === 'number') height = `${height}`;
		if (Number.isInteger(parseFloat(width))) content.push(new Width(width));
		else
			throw new Error(
				badArgumentError(
					`${name}'s width`,
					'a string containing an integer number or an integer number',
					width,
				),
			);

		if (Number.isInteger(parseFloat(height))) content.push(new Height(height));
		else
			throw new Error(
				badArgumentError(
					`${name}'s height`,
					'a string containing an integer number or an integer number',
					height,
				),
			);
		super({ name, content });
	}
}
export class ScreenPercentage extends SizeConstructor {
	constructor({ width, height }: { width: `${number}` | number; height: `${number}` | number }) {
		super({ name: 'ScreenPercentage', width, height });
	}
}
export class Size extends SizeConstructor {
	constructor({ width, height }: { width: `${number}` | number; height: `${number}` | number }) {
		super({ name: 'Size', width, height });
	}
}
export class MaxSize extends SizeConstructor {
	constructor({ width, height }: { width: `${number}` | number; height: `${number}` | number }) {
		super({ name: 'MaxSize', width, height });
	}
}
export class MinSize extends SizeConstructor {
	constructor({ width, height }: { width: `${number}` | number; height: `${number}` | number }) {
		super({ name: 'MinSize', width, height });
	}
}
export class Height extends XMLElement {
	constructor(height: `${number}`) {
		super({ name: 'Height', content: new StringContent({ value: height }) });
	}
}
export class Width extends XMLElement {
	constructor(width: `${number}`) {
		super({ name: 'Width', content: new StringContent({ value: width }) });
	}
}
