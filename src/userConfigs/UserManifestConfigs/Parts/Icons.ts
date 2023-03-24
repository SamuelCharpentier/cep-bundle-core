import { IconType, isIconType } from '@src/lib/enumsAndValidators';
import { badValueError } from '@src/lib/errorMessages';
import { RelativePath, isRelativePath } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type Icons = {
	[key in keyof typeof IconType | IconType]?: RelativePath;
};

export const isIcons = (
	received: any,
	parents: string[] = ['ui'],
): received is Icons => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents, 'icons'].join('.'),
			when: `${parents.join(
				'.',
			)}.ui.type is 'Panel', 'ModalDialog' or 'Modeless'`,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'Icons',
			)}`,
			received,
		});
	}
	parents.push('icons');
	let cumulatedErrors: string[] = [];
	for (const iconType in received) {
		const path = received[iconType];
		if (!isIconType(iconType))
			cumulatedErrors.push(
				badValueError({
					propertyName: `${[...parents].join('.')} object key name`,
					required: true,
					expectedPropertyType: `a ${linkToDocs(
						'user manifest configs type',
						'IconType',
					)}`,
					received: iconType,
				}),
			);
		if (!isRelativePath(path))
			cumulatedErrors.push(
				badValueError({
					propertyName: [...parents, iconType].join('.'),
					expectedPropertyType: `a ${linkToDocs(
						'user manifest configs type',
						'RelativePath',
					)} to the icon file`,
					received: path,
				}),
			);
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
