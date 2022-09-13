import { isUIType, UIType } from '@src/lib/enumsAndValidators';
import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';

export type BaseUI = {
	type: UIType | keyof typeof UIType;
};

export const isBaseUI = (
	received: any,
	parents: string[] = ['dispatchInfo'],
): received is BaseUI => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents, 'ui'].join('.'),
			required: true,
			expectedPropertyType: `a union of a ${linkToDocs(
				'user manifest configs type',
				'BaseUI',
			)} and eighter a ${linkToDocs(
				'user manifest configs type',
				'VisibleUI',
			)} or an ${linkToDocs(
				'user manifest configs type',
				'InvisibleUI',
			)}`,
			received,
		});
	}
	parents.push('ui');
	if (received.type === undefined || !isUIType(received.type)) {
		throw badValueError({
			propertyName: [...parents, `type`].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'Command',
			)}`,
			received: received.type,
		});
	}
	return true;
};
