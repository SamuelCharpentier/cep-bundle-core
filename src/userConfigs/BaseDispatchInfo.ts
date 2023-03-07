import { DeepCollapse } from '@src/lib/DeepCollapse';
import { HostEngine, isHostEngine } from '@src/lib/enumsAndValidators';
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
	extensionData?: string | string[];
	host?: HostEngine;
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
	if (received.extensionData !== undefined) {
		const extensionDataIsArray = received.extensionData instanceof Array;
		const extensionData = extensionDataIsArray
			? received.extensionData
			: [received.extensionData];
		for (const index in extensionData) {
			const data = extensionData[index];
			if (typeof data !== 'string') {
				cumulatedErrors.push(
					badValueError({
						propertyName: [
							...parents,
							`extensionData${
								extensionDataIsArray ? `[${index}]` : ''
							}`,
						].join('.'),
						required: false,
						expectedPropertyType: extensionDataIsArray
							? 'a string'
							: 'a string or an array of strings',
						received: data,
					}),
				);
			}
		}
	}
	if (received.host !== undefined) {
		if (!isHostEngine(received.host)) {
			cumulatedErrors.push(
				badValueError({
					propertyName: [...parents, 'host'].join('.'),
					required: false,
					expectedPropertyType: `a ${linkToDocs(
						'user manifest configs type',
						'HostEngine',
					)}`,
					received: received.host,
				}),
			);
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
