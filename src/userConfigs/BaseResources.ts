import { badValueError } from '@src/lib/errorMessages';
import {
	Command,
	isCommand,
	isRelativePath,
	RelativePath,
} from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type BaseResources = {
	scriptPath?: RelativePath;
	cefParams?: Command | Command[];
};
export const isBaseResources = (
	received: any,
	parents: string[] = ['dispatchInfo'],
	isVisible: boolean = true,
): received is BaseResources => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents, 'resources'].join('.'),
			required: true,
			expectedPropertyType: `a union of a ${linkToDocs(
				'user manifest configs type',
				'BaseResources',
			)} and eighter a ${linkToDocs(
				'user manifest configs type',
				'VisibleResources',
			)} or an ${linkToDocs(
				'user manifest configs type',
				'InvisibleResources',
			)}`,
			received,
		});
	}
	parents.push('resources');
	let cumulatedErrors: string[] = [];
	if (
		isVisible &&
		received.scriptPath !== undefined &&
		!isRelativePath(received.scriptPath)
	) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'scriptPath'].join('.'),
				required: 'contextually required',
				expectedPropertyType: `a ${linkToDocs(
					'general type',
					'RelativePath',
				)}`,
				received: received.scriptPath,
			}),
		);
	}
	if (received.cefParams !== undefined) {
		const cefParamsIsArray = received.cefParams instanceof Array;
		if (cefParamsIsArray && received.cefParams.length === 0) {
			cumulatedErrors.push(
				badValueError({
					propertyName: [...parents, 'cefParams'].join('.'),
					required: false,
					expectedPropertyType: `a Command or array of ${linkToDocs(
						'general type',
						'Command',
					)}`,
					received: received.cefParams,
				}),
			);
		}
		const cefParams = cefParamsIsArray
			? received.cefParams
			: [received.cefParams];
		for (const index in cefParams) {
			const param = cefParams[index];
			if (!isCommand(param))
				cumulatedErrors.push(
					badValueError({
						propertyName: [
							...parents,
							`cefParams${cefParamsIsArray ? `[${index}]` : ''}`,
						].join('.'),
						expectedPropertyType: `a Command or array of ${linkToDocs(
							'general type',
							'Command',
						)}`,
						received: param,
					}),
				);
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
