import { _BaseDispatchInfo, isBaseDispatchInfo } from './BaseDispatchInfo';
import { BaseResources } from './BaseResources';
import { isVisibleResources, VisibleResources } from './VisibleResources';
import { isVisibleUI, VisibleUI } from './VisibleUI';
import { isVisibleUIType } from './VisibleUIType';
import { warnIfOtherKeysPresent } from './warnIfOtherKeysPresent';

export interface VisibleDispatchInfo extends _BaseDispatchInfo {
	resources: VisibleResources & BaseResources;
	ui: VisibleUI;
}

export const isVisibleDispatchInfo = (
	received: _BaseDispatchInfo,
	parents: string[] = ['dispatchInfo'],
): received is VisibleDispatchInfo => {
	try {
		isBaseDispatchInfo(received, [...parents]);
	} catch (error) {
		throw error;
	}
	if (!isVisibleUIType(received.ui.type)) {
		return false;
	}
	const cumulatedErrors: string[] = [];
	try {
		isVisibleUI(received.ui, [...parents]);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isVisibleResources(received.resources, [...parents]);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
