import { XMLElement } from './XMLElement';
import { AttributeArgument, Placement, isPlacement } from './typesAndValidators';
import { badArgumentError } from './errorMessages';
export class Menu extends XMLElement {
	constructor(menuName: string, placement?: Placement) {
		if (menuName && typeof menuName === 'string') {
			let attributes: AttributeArgument | undefined = undefined;
			if (placement)
				if (!isPlacement)
					throw new Error(
						badArgumentError(
							"Menu's placement(optional)",
							'Placement(type) or string containing a valid Placement(type)',
							placement,
						),
					);
				else attributes = { name: 'Placement', value: placement };

			super({ name: 'Menu', attributes, content: menuName });
		} else throw new Error(badArgumentError("Menu's name", 'string', menuName));
	}
}
