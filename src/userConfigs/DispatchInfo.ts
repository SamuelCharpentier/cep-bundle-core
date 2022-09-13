import { UIType } from '@src/lib/enumsAndValidators';
import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';
import { isBaseDispatchInfo, _BaseDispatchInfo } from './BaseDispatchInfo';
import {
	InvisibleDispatchInfo,
	isInvisibleDispatchInfo,
} from './InvisibleDispatchInfo';
import { isInvisibleUI } from './InvisibleUI';
import {
	VisibleDispatchInfo,
	isVisibleDispatchInfo,
} from './VisibleDispatchInfo';
import { isVisibleUIType } from './VisibleUIType';

export type DispatchInfo = _BaseDispatchInfo &
	(VisibleDispatchInfo | InvisibleDispatchInfo);

export function isDispatchInfo(
	received: any,
	parents: string[] = ['dispatchInfo'],
): received is DispatchInfo {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents].join('.'),
			required: true,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'DispatchInfo',
			)}`,
			received,
		});
	}
	try {
		isBaseDispatchInfo(received, [...parents]);
	} catch (error) {
		throw error;
	}

	if (isVisibleUIType(received.ui.type)) {
		try {
			isVisibleDispatchInfo(received, [...parents]);
		} catch (error) {
			throw error;
		}
		return true;
	}

	if (isInvisibleUI(received.ui)) {
		try {
			isInvisibleDispatchInfo(received, [...parents]);
		} catch (error) {
			throw error;
		}
		return true;
	}

	throw `${[...parents, 'ui', 'type'].join('.')}: '${
		received.ui.type
	}' is reserved for Adobe's internal usage. It is not supported by this tool. Please use 'Custom' instead for invisible extensions or eighter 'ModalDialog','Modeless' or 'Panel' for visible extensions.`;
}
