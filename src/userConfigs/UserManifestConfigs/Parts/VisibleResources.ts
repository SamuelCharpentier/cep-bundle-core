import { DeepPartial } from '@src/lib/deepPartial';
import { badValueError } from '@src/lib/errorMessages';
import { isRelativePath, RelativePath } from '@src/lib/typesAndValidators';
import { isObject } from '@src/lib/validators';
import { linkToDocs } from '@src/linkToDocs';
import { BaseResources, isBaseResources } from './BaseResources';

export type RelativePathToHTML = `${RelativePath}.html`;

export const isRelativePathToHTML = (
	value: any,
): value is RelativePathToHTML => {
	return isRelativePath(value) && value.endsWith('.html');
};

export interface VisibleResources extends BaseResources {
	htmlPath: RelativePathToHTML;
}

export const isVisibleResources = (
	received: BaseResources & { [key: string]: any },
	parents: string[] = ['dispatchInfo'],
): received is VisibleResources => {
	try {
		isBaseResources(received, [...parents]);
	} catch (error) {
		throw error;
	}
	const cumulatedErrors: string[] = [];
	const dispatchInfoParents = [...parents];
	parents.push('resources');

	const htmlPath = received.htmlPath;
	if (htmlPath === undefined || !isRelativePathToHTML(htmlPath)) {
		throw badValueError({
			propertyName: [...parents, 'htmlPath'].join('.'),
			required: true,
			when: `${dispatchInfoParents.join(
				'.',
			)}.ui.type is 'Panel', 'ModalDialog' or 'Modeless'`,
			expectedPropertyType: `a ${linkToDocs(
				'general type',
				'relativePath',
			)}`,
			received: htmlPath,
		});
	}

	return true;
};
