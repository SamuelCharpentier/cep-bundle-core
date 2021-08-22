import { XMLElement } from './XMLElement';
import { Extension, ExtensionArgument, isExtensionArgument } from './Extension';
import { Resources, ResourcesArgument, isResourcesArgument } from './Resources';
import { Lifecycle, LifecycleArgument, isLifecycleArgument } from './Lifecycle';
import { UI, UIArgument, isUIArgument } from './UI';
import { ExtensionData } from './ExtensionData';
import { contextContainsAllOf } from './Context';
import { badArgumentError, printVariableInError } from '../errorMessages';
export class DispatchInfoList extends XMLElement {
	constructor(extensions: ExtensionArgument[]) {
		if (!(extensions instanceof Array)) extensions = [extensions];
		let content: Extension[] = [];
		for (const extension of extensions) {
			if (!isExtensionArgument(extension))
				throw new Error(
					badArgumentError(
						"DispatchInfoList's extension argument",
						'array of objects of type ExtensionArgument(type)',
						extension,
					),
				);
			content.push(new Extension(extension));
		}
		super({ name: 'DispatchInfoList', content });
	}
}

export type DispatchInfoArgument = {
	resources?: ResourcesArgument;
	lifecycle?: LifecycleArgument;
	ui?: UIArgument;
	extensionData?: string | string[];
};

export const isDispatchInfoArgument: (argument: any) => boolean = (argument): argument is DispatchInfoArgument => {
	if (
		argument &&
		typeof argument === 'object' &&
		(argument.resources || argument.lifecycle || argument.ui || argument.extensionData)
	) {
		if (argument.resources) isResourcesArgument(argument.resources);
		if (argument.lifecycle) isLifecycleArgument(argument.lifecycle);
		if (argument.ui) isUIArgument(argument.ui);
		if (argument.extensionData) {
			if (typeof argument.extensionData === 'string') argument.extensionData = [argument.extensionData];
			for (const data of argument.extensionData) {
				if (typeof data !== 'string')
					throw new Error(
						`extensions.dispatchInfo.extensionData should contain a string or an array of string, ${printVariableInError(
							argument.extensionData,
						)} received`,
					);
			}
		}
		return true;
	}
	throw new Error('extensions.dispatchInfo could not be validated, ' + printVariableInError(argument));

	return false;
};
export class DispatchInfo extends XMLElement {
	constructor({ resources, lifecycle, ui, extensionData }: DispatchInfoArgument) {
		let content: XMLElement[] = [];
		if (resources !== undefined && isResourcesArgument(resources)) content.push(new Resources(resources));
		if (lifecycle !== undefined && isLifecycleArgument(lifecycle)) content.push(new Lifecycle(lifecycle));
		if (ui !== undefined && isUIArgument(ui)) content.push(new UI(ui));
		if (extensionData !== undefined) {
			if (!(extensionData instanceof Array)) extensionData = [extensionData];
			for (const data of extensionData) {
				if (typeof data === 'string') content.push(new ExtensionData(data));
			}
		}
		super({ name: 'DispatchInfo', context: contextContainsAllOf('DispatchInfoList'), content });
	}
}
