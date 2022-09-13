import { badValueError } from '@src/lib/errorMessages';
import { Int, isInt } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type WidthHeight = {
	width: Int;
	height: Int;
};
export const isWidthHeight = (
	received: any,
	parents: string[] = [],
): received is WidthHeight => {
	let cumulatedErrors: string[] = [];
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		!Object.keys(received).includes('width') ||
		!Object.keys(received).includes('height')
	) {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'WidthHeight',
			)}`,
			received,
		});
	}
	if (!isInt(received.width)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'width'].join('.'),
				expectedPropertyType: `${linkToDocs('general type', 'Int')}`,
				received: received.width,
			}),
		);
	}
	if (!isInt(received.height)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'height'].join('.'),
				expectedPropertyType: `${linkToDocs('general type', 'Int')}`,
				received: received.height,
			}),
		);
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
