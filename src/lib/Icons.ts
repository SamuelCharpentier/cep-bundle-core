import { XMLElement } from './XMLElement';
import { RelativePath, isRelativePath } from './typesAndValidators';
import { IconType, isIconType } from './enumsAndValidators';
import { badArgumentError, printVariableInError } from './errorMessages';

export type IconsArgument = { [key in IconType]?: RelativePath };

export const isIconsArgument = <(arg: any) => arg is IconsArgument>((arg): arg is IconsArgument => {
	if (typeof arg === 'object') {
		if (arg instanceof Array)
			throw new Error(
				badArgumentError('extension.dispatchInfo.ui.geometry', 'an object of type IconsArgument', arg),
			);

		for (const iconType in arg) {
			if (!isIconType(iconType))
				throw new Error(
					badArgumentError('extension.dispatchInfo.ui.geometry[key]', 'as a IconType(enum)', iconType),
				);
			if (!isRelativePath(arg[iconType]))
				throw new Error(
					badArgumentError(
						`extension.dispatchInfo.ui.icons.${iconType}`,
						'as a relative path starting with a ./ to the icon resource ',
						arg[iconType],
					),
				);
		}
		return true;
	}
	throw new Error('extension.dispatchInfo.ui.geometry could not be validated' + printVariableInError(arg));

	return false;
});
export class Icons extends XMLElement {
	constructor(icons: IconsArgument) {
		if (isIconsArgument(icons)) {
			let content: Icon[] = [];
			for (const iconType in icons) {
				if (isIconType(iconType)) {
					let relativePath: RelativePath | undefined = icons[iconType];
					if (isRelativePath(relativePath)) content.push(new Icon({ type: iconType, relativePath }));
				}
			}

			super({ name: 'Icons', content });
		}
	}
}
class Icon extends XMLElement {
	constructor({ relativePath, type }: { relativePath: RelativePath; type: IconType }) {
		super({ name: 'Icon', attributes: { name: 'Type', value: type }, content: relativePath });
	}
}
