import { XMLElement } from './XMLElement';
import { RelativePath, isRelativePath } from './typesAndValidators';
import { IconType, isIconTypeKey, isIconTypeValue } from './enumsAndValidators';
import { badArgumentError } from './errorMessages';
import { type } from 'os';

export type IconsArgument = { [key in IconType]?: RelativePath };

export const isIconsArgument: (arg: any) => boolean = (arg): arg is IconsArgument => {
	throw new Error('isIconArgument to do');

	return false;
};
export class Icons extends XMLElement {
	constructor(icons: IconsArgument) {
		if (isIconsArgument(icons)) {
			let content: Icon[] = [];

			super({ name: 'Icons', content });
		}
	}
}
export class Icon extends XMLElement {
	constructor(relativePath: RelativePath, type: IconType) {
		if (!isRelativePath(relativePath))
			throw new Error(badArgumentError(`Icon's relative path`, 'string of type RelativePath', relativePath));
		if (type && isIconTypeValue(type)) type = type;
		else if (type && isIconTypeKey(type)) type = IconType[type];
		else
			throw new Error(
				badArgumentError(
					`Icon's type`,
					'IconType(enum) of a string containing IconType(enum) key or value',
					type,
				),
			);

		if (!relativePath) super({ name: 'Icon', attributes: { name: 'Type', value: type }, content: relativePath });
	}
}
