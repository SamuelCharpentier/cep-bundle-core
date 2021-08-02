import { XMLElement } from './XMLElement';
import { AttributeArgument, Placement, isPlacement } from './typesAndValidators';
import { badArgumentError, printVariableInError } from './errorMessages';

export type MenuArgument = { menuName: string; placement?: Placement };

export const isMenuArgument: (arg: any) => boolean = (arg) => {
	if (arg) {
		if (typeof arg.menuName !== 'string')
			throw new Error(badArgumentError('extension.dispatchInfo.ui.menu.menuName', 'a string', arg.menuName));
		if (arg.placement && !isPlacement(arg.placement)) throw new Error(badArgumentError('', '', arg.placement));
		return true;
	}
	throw new Error('extension.dispatchInfo.ui.menu could not be validated' + printVariableInError(arg));

	return false;
};
export class Menu extends XMLElement {
	constructor({ menuName, placement }: MenuArgument) {
		if (menuName && typeof menuName === 'string') {
			let attributes: AttributeArgument | undefined = undefined;
			if (placement)
				if (!isPlacement(placement))
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
