import { DeepCollapse } from '@src/lib/DeepCollapse';
import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';
import { BaseResources, isBaseResources } from './BaseResources';
import { BaseUI, isBaseUI } from './BaseUI';
import { isLifecycle, Lifecycle } from './Lifecycle';
import { isVisibleUIType } from './VisibleUIType';

export type _BaseDispatchInfo = {
	resources: BaseResources;
	ui: BaseUI;
	lifecycle?: Lifecycle;
};

export type BaseDispatchInfo = DeepCollapse<_BaseDispatchInfo>;

export const isBaseDispatchInfo = (
	received: any,
	parents: string[] = ['dispatchInfo'],
): received is _BaseDispatchInfo => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array
	) {
		throw badValueError({
			propertyName: parents.join('.'),
			required: true,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'DispatchInfo',
			)}`,
			received,
		});
	}
	let cumulatedErrors: string[] = [];
	const { resources, ui, lifecycle } = received;
	try {
		isBaseUI(ui, [...parents]);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		const isVisible = isVisibleUIType(ui?.type);
		isBaseResources(resources, [...parents], isVisible);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	if (lifecycle !== undefined) {
		try {
			isLifecycle(lifecycle, [...parents]);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
