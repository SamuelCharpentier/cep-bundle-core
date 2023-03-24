import { UIType } from '@src/lib/enumsAndValidators';
import { BaseUI, isBaseUI } from './BaseUI';

export type InvisibleUI = {
	type: UIType.Custom | `${UIType.Custom}`;
};

export const isInvisibleUI = (
	received: BaseUI & { [key: string]: any },
	parents: string[] = ['dispatchInfo'],
): received is InvisibleUI => {
	isBaseUI(received, parents);
	const { type } = received;
	if (type != 'Custom') {
		return false;
	}
	return true;
};
