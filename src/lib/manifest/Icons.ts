import { XMLElement } from './XMLElement';
import { RelativePath, isRelativePath } from '../typesAndValidators';
import { IconType, isIconType } from '@src/lib/enumsAndValidators';
import { badArgumentError } from '../errorMessages';

export type IconsArgument = {
	[key in keyof typeof IconType | IconType]?: RelativePath;
};

const isIconsArgument = <(arg: any) => arg is IconsArgument>((
	arg,
): arg is IconsArgument => {
	if (
		arg === undefined ||
		typeof arg !== 'object' ||
		arg instanceof Array ||
		Object.keys(arg).length === 0
	)
		throw new Error(badArgumentError('Icon', 'IconsArgument (type)', arg));

	for (const iconType in arg) {
		if (!isIconType(iconType))
			throw new Error(
				badArgumentError('Each icon keys', 'IconType (enum)', iconType),
			);
		if (!isRelativePath(arg[iconType]))
			throw new Error(
				badArgumentError(
					`${iconType[0].toUpperCase()}${iconType.slice(
						1,
					)} icon path`,
					'a RelativePath (type)',
					arg[iconType],
				),
			);
	}
	return true;
});

/**
 *
 *
 * @export
 * @class Icons
 * @extends {XMLElement}
 */
export class Icons extends XMLElement {
	/**
	 * Creates an instance of Icons.
	 * @param {IconsArgument} icons
	 * @memberof Icons
	 */
	constructor(icons: IconsArgument) {
		if (isIconsArgument(icons)) {
			let content: Icon[] = [];
			for (const iconType in icons) {
				if (isIconType(iconType)) {
					let relativePath: RelativePath | undefined =
						icons[iconType];
					if (isRelativePath(relativePath))
						content.push(
							new Icon({ type: iconType, relativePath }),
						);
				}
			}

			super({ name: 'Icons', content });
		}
	}
}
class Icon extends XMLElement {
	constructor({
		relativePath,
		type,
	}: {
		relativePath: RelativePath;
		type: keyof typeof IconType | `${IconType}`;
	}) {
		super({
			name: 'Icon',
			attributes: {
				name: 'Type',
				value: type.charAt(0).toUpperCase() + type.slice(1),
			},
			content: relativePath,
		});
	}
}
