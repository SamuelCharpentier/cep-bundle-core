import { XMLElement } from './XMLElement';
import { badArgumentError } from '../errorMessages';
import { StringContent } from './StringContent';
import { SizesTypes, isSizesTypes } from '@src/lib/enumsAndValidators';

export interface WidthHeight {
	width: `${number}` | number;
	height: `${number}` | number;
}

function isWidthHeight(
	size: any,
	sizeTypeName: SizesTypes,
): size is WidthHeight {
	if (size.width === undefined || size.height === undefined) {
		throw new Error(
			badArgumentError(
				`geometry.${sizeTypeName}`,
				'a WidthHeight (interface)',
				size,
			),
		);
	}
	if (!Number.isInteger(parseFloat(size.width.toString())))
		throw new Error(
			badArgumentError(
				`geometry.${sizeTypeName}.width`,
				'a number or a string of a number',
				size.width,
			),
		);
	if (!Number.isInteger(parseFloat(size.height.toString())))
		throw new Error(
			badArgumentError(
				`geometry.${sizeTypeName}.height`,
				'a number or a string of a number',
				size.height,
			),
		);

	return true;
}

export type GeometryArgument = { [key in SizesTypes]?: WidthHeight };

function isGeometryArgument(arg: any): arg is GeometryArgument {
	if (
		arg === undefined ||
		typeof arg !== 'object' ||
		arg instanceof Array ||
		Object.keys(arg).length === 0
	)
		throw new Error(
			badArgumentError('geometry', 'GeometryArgument (type)', arg),
		);

	for (const sizeTypeName in arg) {
		if (!isSizesTypes(sizeTypeName))
			throw new Error(
				badArgumentError(
					'Each geometry keys',
					'a SizesTypes (enum)',
					sizeTypeName,
				),
			);

		isWidthHeight(arg[sizeTypeName], sizeTypeName);
	}
	return true;
}
export class Geometry extends XMLElement {
	constructor(geometry: GeometryArgument) {
		if (isGeometryArgument(geometry)) {
			let content: SizeConstructor[] = [];
			for (const sizeTypeName in geometry) {
				if (isSizesTypes(sizeTypeName)) {
					let name: string = sizeTypeName;
					let size: undefined | WidthHeight = geometry[sizeTypeName];
					if (size) {
						let width: `${number}` = `${size.width}`;
						let height: `${number}` = `${size.height}`;
						content.push(
							new SizeConstructor({ name, width, height }),
						);
					}
				}
			}

			super({ name: 'Geometry', content });
		}
	}
}

class SizeConstructor extends XMLElement {
	constructor({
		name,
		width,
		height,
	}: {
		name: string;
		width: `${number}`;
		height: `${number}`;
	}) {
		let content: XMLElement[] = [];

		name = name.charAt(0).toUpperCase() + name.slice(1);
		content.push(new Width(width));
		content.push(new Height(height));

		super({ name, content });
	}
}

class Height extends XMLElement {
	constructor(height: `${number}`) {
		super({
			name: 'Height',
			content: new StringContent({ value: height }),
		});
	}
}
class Width extends XMLElement {
	constructor(width: `${number}`) {
		super({ name: 'Width', content: new StringContent({ value: width }) });
	}
}
