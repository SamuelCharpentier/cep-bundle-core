import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';
import { isBaseDispatchInfo, _BaseDispatchInfo } from './BaseDispatchInfo';
import { warnIfOtherKeysPresent } from './warnIfOtherKeysPresent';
import { InvisibleUI, isInvisibleUI } from './InvisibleUI';
import { InvisibleResources, isInvisibleResources } from './InvisibleResources';

export interface InvisibleDispatchInfo extends _BaseDispatchInfo {
	resources: InvisibleResources;
	ui: InvisibleUI;
}

export const isInvisibleDispatchInfo = (
	received: _BaseDispatchInfo,
	parents: string[] = ['dispatchInfo'],
): received is InvisibleDispatchInfo => {
	try {
		isBaseDispatchInfo(received, [...parents]);
	} catch (error) {
		throw error;
	}
	if (!isInvisibleUI(received.ui)) {
		return false;
	}
	const cumulatedErrors: string[] = [];
	try {
		isInvisibleResources(received.resources, [...parents]);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	const warnings: string[] = warnIfOtherKeysPresent(received, parents, {
		resources: {
			scriptPath: undefined,
		},
		ui: {
			type: undefined,
		},
	});
	if (warnings.length > 0) {
		console.warn(
			`The following keys will be ignored because they are not usefull for an invisible extension (${[
				...parents,
				'ui',
				'type',
			].join('.')}:UIType.Custom):\n` + warnings.join('\n'),
		);
	}
	return true;
};
