import { XMLElement } from './XMLElement';
import { badArgumentError, bothWidthAndHeightRequired, printVariableInError } from './errorMessages';
import { StringContent } from './StringContent';
import { SizesTypes, isSizesTypesKey, isSizesTypesValue } from './enumsAndValidators';

export type WidthHeight = { width: `${number}` | number; height: `${number}` | number };
export type GeometryArgument = { [key in SizesTypes]?: WidthHeight };

export const isGeometryArgument = <(arg: any) => arg is GeometryArgument>((arg) => {
	if (typeof arg === 'object') {
		for (const sizeType in arg) {
			if (!isSizesTypesValue(sizeType) || !isSizesTypesKey(sizeType))
				throw new Error(
					badArgumentError('extension.dispatchInfo.ui.geometry[key]', 'as a SizesTypes(enum)', sizeType),
				);

			let sizing = arg[sizeType];

			if (sizing && (sizing.width === undefined || !Number.isInteger(parseFloat(sizing.width.toString()))))
				throw new Error(
					badArgumentError(
						`extension.dispatchInfo.ui.geometry.${sizeType}.width`,
						'as a number or a string of a number',
						sizing.width,
					),
				);
			if (sizing && (sizing.height === undefined || !Number.isInteger(parseFloat(sizing.height.toString()))))
				throw new Error(
					badArgumentError(
						`extension.dispatchInfo.ui.geometry.${sizeType}.height`,
						'as a number or a string of a number',
						sizing.height,
					),
				);
		}
		return true;
	}
	throw new Error('extension.dispatchInfo.ui.geometry could not be validated' + printVariableInError(arg));

	return false;
});
export class Geometry extends XMLElement {
	constructor(geometry: GeometryArgument) {
		if (isGeometryArgument(geometry)) {
			let content: SizeConstructor[] = [];
			for (const sizeTypeName in geometry) {
				if (!isSizesTypesValue(sizeTypeName) || !isSizesTypesKey(sizeTypeName)) {
					throw new Error(
						badArgumentError(
							'extension.dispatchInfo.ui.geometry[key]',
							'as a SizesTypes(enum)',
							sizeTypeName,
						),
					);
				}
				let name: string = sizeTypeName;
				let sizing = geometry[sizeTypeName];
				if (sizing) {
					let width: `${number}` | number = sizing.width;
					let height: `${number}` | number = sizing.height;
					content.push(new SizeConstructor({ name, width, height }));
				}
			}

			super({ name: 'Geometry', content });
		}
	}
}

class SizeConstructor extends XMLElement {
	constructor({ name, width, height }: { name: string; width: `${number}` | number; height: `${number}` | number }) {
		let content: XMLElement[] = [];
		if (typeof width === 'number') width = `${width}`;
		if (typeof height === 'number') height = `${height}`;
		content.push(new Width(width));
		content.push(new Height(height));

		super({ name, content });
	}
}

class Height extends XMLElement {
	constructor(height: `${number}`) {
		super({ name: 'Height', content: new StringContent({ value: height }) });
	}
}
class Width extends XMLElement {
	constructor(width: `${number}`) {
		super({ name: 'Width', content: new StringContent({ value: width }) });
	}
}
