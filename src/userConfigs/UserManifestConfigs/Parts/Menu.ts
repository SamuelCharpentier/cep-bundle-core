import { badValueError } from '@src/lib/errorMessages';
import { Placement, isPlacement } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type Menu = {
	menuName: string;
	placement?: Placement;
};

export const isMenu = (
	received: any,
	parents: string[] = ['menu'],
): received is Menu => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'Menu',
			)}`,
			received,
		});
	}
	let cumulatedErrors: string[] = [];
	if (
		typeof received.menuName !== 'string' ||
		received.menuName.length === 0
	) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'menuName'].join('.'),
				required: true,
				expectedPropertyType: 'a string',
				received: received.menuName,
			}),
		);
	}
	if (received.placement !== undefined) {
		const placement = received.placement;
		if (!isPlacement(placement))
			cumulatedErrors.push(
				badValueError({
					propertyName: [...parents, `placement`].join('.'),
					expectedPropertyType: `a ${linkToDocs(
						'user manifest configs type',
						'Placement',
					)}`,
					received: placement,
				}),
			);
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
