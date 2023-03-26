import { badValueError, GoodBadList } from '@src/lib/errorMessages';
import { SizesTypes, isSizesTypes } from '@src/lib/enumsAndValidators';
import { linkToDocs } from '@src/linkToDocs';
import { WidthHeight, isWidthHeight } from './WidthHeight';

export type Geometry = (
	| {
			[SizesTypes.size]: WidthHeight;
	  }
	| {
			[SizesTypes.screenPercentage]: WidthHeight;
	  }
) & {
	[key in SizesTypes]?: WidthHeight;
};
export const isGeometry = (
	received: any,
	parents: string[] = ['geometry'],
): received is Geometry => {
	let cumulatedErrors: string[] = [];
	const dispatchInfoParents = parents.slice(
		0,
		parents.indexOf('dispatchInfo') + 1,
	);
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array ||
		Object.keys(received).length === 0 ||
		(!Object.keys(received).includes('size') &&
			!Object.keys(received).includes('screenPercentage'))
	) {
		throw badValueError({
			propertyName: parents.join('.'),
			required: true,
			when: `${dispatchInfoParents.join(
				'.',
			)}.ui.type is 'Panel', 'ModalDialog' or 'Modeless'`,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'Geometry',
			)}`,
			received,
		});
	}

	let goodBadKeyList = new GoodBadList();

	for (const key of Object.keys(received)) {
		if (!isSizesTypes(key)) {
			goodBadKeyList.bad.push(key);
			continue;
		}
		goodBadKeyList.good.push(key);
	}
	if (goodBadKeyList.bad.length > 0) {
		throw badValueError({
			propertyName: parents.join('.'),
			required: true,
			when: `${dispatchInfoParents.join(
				'.',
			)}.ui.type is 'Panel', 'ModalDialog' or 'Modeless'`,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'Geometry',
			)}`,
			received: goodBadKeyList,
		});
	}

	if (Object.keys(received).includes('size')) {
		const { size } = received;
		try {
			isWidthHeight(size, [...parents, 'size']);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (Object.keys(received).includes('screenPercentage')) {
		const { screenPercentage } = received;
		try {
			isWidthHeight(screenPercentage, [...parents, 'screenPercentage']);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	const otherGeometryParameters = Object.keys(received).filter(
		(key) => key !== 'size' && key !== 'screenPercentage',
	);
	for (const geometryParameter of otherGeometryParameters) {
		try {
			isWidthHeight(received[geometryParameter], [
				...parents,
				geometryParameter,
			]);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
