import { UIType } from '@src/lib/enumsAndValidators';

export type VisibleUIType =
	| UIType.Panel
	| UIType.Modeless
	| UIType.ModalDialog
	| `${UIType.Panel}`
	| `${UIType.Modeless}`
	| `${UIType.ModalDialog}`;

export const isVisibleUIType = (received: any): received is VisibleUIType => {
	if (
		received != 'ModalDialog' &&
		received != 'Modeless' &&
		received != 'Panel'
	) {
		return false;
	}
	return true;
};
