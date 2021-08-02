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
	}
	throw new Error(`isUIArgument to be done`);
	return false;
};
export class UI extends XMLElement {
	constructor({ type, menu, geometry, icons }: UIArgument) {
		let content: XMLElement[] = [];
		if (type && (isUITypeValue(type) || isUITypeKey(type))) content.push(new Type(type));
		if (menu && isMenuArgument(menu)) content.push(new Menu(menu));
		if (geometry && geometry instanceof Geometry) content.push(geometry);
		if (icons && icons instanceof Icons) content.push(icons);
		super({ name: 'UI', content });
	}
}
