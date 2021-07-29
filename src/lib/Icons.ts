import { XMLElement } from './XMLElement';
import { RelativePath, isRelativePath } from './typesAndValidators';
import { IconType, isIconTypeKey, isIconTypeValue } from './enumsAndValidators';
import { badArgumentError } from './errorMessages';
export class Icons extends XMLElement {
	constructor(icons: Icon[] | Icon) {
		if (icons instanceof Icon) icons = [icons];
		super({ name: 'Icons', content: icons });
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
