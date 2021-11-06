import { XMLElement } from './XMLElement';
import { Type, TypeArgument } from './UIType';
import { Menu, MenuArgument } from './Menu';
import { Geometry, GeometryArgument } from './Geometry';
import { Icons, IconsArgument } from './Icons';
import { badArgumentError } from '../errorMessages';

export interface UIArgument {
	type?: TypeArgument;
	menu?: MenuArgument;
	geometry?: GeometryArgument;
	icons?: IconsArgument;
}

export const isUIArgument: (arg: any) => boolean = (argument): argument is UIArgument => {
	if (
		typeof argument === 'object' &&
		(argument.type !== undefined ||
			argument.menu !== undefined ||
			argument.geometry !== undefined ||
			argument.icons !== undefined)
	) {
		return true;
	}
	throw new Error(badArgumentError('ui', 'UIArgument (interface)', argument));
};
/**
 *
 *
 * @export
 * @class UI
 * @extends {XMLElement}
 */
export class UI extends XMLElement {
	/**
	 * Creates an instance of UI.
	 * @param {UIArgument} uiConfig
	 * @memberof UI
	 */
	constructor(uiConfig: UIArgument) {
		let content: XMLElement[] = [];
		if (isUIArgument(uiConfig)) {
			let { type, menu, geometry, icons } = uiConfig;
			if (type) content.push(new Type(type));
			if (menu) content.push(new Menu(menu));
			if (geometry) content.push(new Geometry(geometry));
			if (icons) content.push(new Icons(icons));
			super({ name: 'UI', content });
		}
	}
}
