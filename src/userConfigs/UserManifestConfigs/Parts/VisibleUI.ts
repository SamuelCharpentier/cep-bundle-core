import { BaseUI, isBaseUI } from './BaseUI';
import { Geometry, isGeometry } from './Geometry';
import { Icons, isIcons } from './Icons';
import { Menu, isMenu } from './Menu';
import { isVisibleUIType, VisibleUIType } from './VisibleUIType';

export type VisibleUI = {
	type: VisibleUIType;
	menu?: Menu;
	icons?: Icons;
	geometry: Geometry;
};

export const isVisibleUI = (
	received: BaseUI & { [key: string]: any },
	parents: string[] = ['dispatchInfo'],
): received is VisibleUI => {
	try {
		isBaseUI(received, parents);
	} catch (error) {
		throw error;
	}

	const { type, menu, icons, geometry } = received;

	if (!isVisibleUIType(type)) {
		return false;
	}

	const cumulatedErrors: string[] = [];

	if (menu !== undefined) {
		try {
			isMenu(menu, [...parents, 'menu']);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}

	if (icons !== undefined) {
		try {
			isIcons(icons, [...parents, 'icons']);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}

	try {
		isGeometry(geometry, [...parents, 'geometry']);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
