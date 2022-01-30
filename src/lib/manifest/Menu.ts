import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';
import { Placement, isPlacement } from '../typesAndValidators';
import { badArgumentError, printVariableInError } from '../errorMessages';

export interface MenuArgument {
	menuName: string;
	placement?: Placement;
}

export function isMenuArgument(arg: any): arg is MenuArgument {
	if (arg !== undefined && typeof arg === 'object' && !(arg instanceof Array)) {
		if (typeof arg.menuName !== 'string')
			throw new Error(badArgumentError('menu.menuName', 'a string', arg.menuName));
		if (arg.placement && !isPlacement(arg.placement))
			throw new Error(badArgumentError('menu.placement (optional)', 'as a Placement (type)', arg.placement));
		return true;
	}
	throw new Error(badArgumentError('menu', 'as a MenuArgument (interface)', arg));
}
export class Menu extends XMLElement {
	constructor(menuArgument: MenuArgument) {
		if (isMenuArgument(menuArgument)) {
			const { menuName, placement } = menuArgument;
			let attributes: AttributeArgument | undefined = undefined;
			if (placement !== undefined) attributes = { name: 'Placement', value: placement };

			super({ name: 'Menu', attributes, content: menuName });
		}
	}
}
