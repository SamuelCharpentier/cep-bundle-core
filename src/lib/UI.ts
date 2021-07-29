import { XMLElement } from './XMLElement';
import { Type } from './UIType';
import { Menu } from './Menu';
import { Geometry } from './Geometry';
import { Icons } from './Icons';
export class UI extends XMLElement {
	constructor({ type, menu, geometry, icons }: { type?: Type; menu?: Menu; geometry?: Geometry; icons?: Icons }) {
		let content: XMLElement[] = [];
		if (type && type instanceof Type) content.push(type);
		if (menu && menu instanceof Menu) content.push(menu);
		if (geometry && geometry instanceof Geometry) content.push(geometry);
		if (icons && icons instanceof Icons) content.push(icons);
		super({ name: 'UI', content });
	}
}
