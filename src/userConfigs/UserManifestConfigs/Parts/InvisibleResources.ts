import { badValueError } from '@src/lib/errorMessages';
import { RelativePath, isRelativePath } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';
import { BaseResources, isBaseResources } from './BaseResources';

export type InvisibleResources = {
	scriptPath: RelativePath;
};

export const isInvisibleResources = (
	received: BaseResources,
	parents: string[] = ['dispatchInfo'],
): received is InvisibleResources => {
	try {
		isBaseResources(received, [...parents]);
	} catch (error) {
		throw error;
	}
	parents.push('resources');
	const { scriptPath } = received;
	if (scriptPath === undefined) {
		throw badValueError({
			propertyName: [...parents, 'scriptPath'].join('.'),
			required: true,
			expectedPropertyType: `a ${linkToDocs(
				'general type',
				'RelativePath',
			)}`,
			received: scriptPath,
		});
	}
	return true;
};
