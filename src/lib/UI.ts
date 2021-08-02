import { XMLElement } from './XMLElement';
import { Type, TypeArgument, isTypeArgument } from './UIType';
import { Menu, MenuArgument, isMenuArgument } from './Menu';
import { Geometry, GeometryArgument, isGeometryArgument } from './Geometry';
import { Icons, IconsArgument, isIconsArgument } from './Icons';
import { isUITypeKey, isUITypeValue } from './enumsAndValidators';

export type UIArgument = {
	type?: TypeArgument;
	menu?: MenuArgument;
	geometry?: GeometryArgument;
	icons?: IconsArgument;
};

export const isUIArgument: (arg: any) => boolean = (argument): argument is UIArgument => {
	if ((typeof argument === 'object' && argument.type) || argument.menu || argument.geometry || argument.icons) {
		if (argument.type) isTypeArgument(argument.type);
		if (argument.menu) isMenuArgument(argument.menu);
		if (argument.geometry) isGeometryArgument(argument.geometry);
		if (argument.icons) isIconsArgument(argument.icons);
		return true;
	}
	throw new Error(`extension.dispatchInfo.ui could not be validated`);
	return false;
};
export class UI extends XMLElement {
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
