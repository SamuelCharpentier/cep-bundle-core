import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';
import { Extension, ExtensionArgument } from './Extension';
import { Resources, ResourcesArgument } from './Resources';
import { Lifecycle, LifecycleArgument } from './Lifecycle';
import { UI, UIArgument } from './UI';
import { ExtensionData } from './ExtensionData';
import { contextContainsAllOf } from './Context';
import { badArgumentError, printVariableInError } from '../errorMessages';
import { HostEngine, isHostEngine, isHostEngineValue, isHostEngineKey } from './enumsAndValidators';
export class DispatchInfoList extends XMLElement {
	constructor(extensions: ExtensionArgument[]) {
		extensions = !(extensions instanceof Array) ? [extensions] : extensions;
		let content: Extension[] = [];
		for (const extension of extensions) {
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
	host?: `${HostEngine}` | keyof typeof HostEngine;
};

const isDispatchInfoArgument: (arg: any) => boolean = (arg): arg is DispatchInfoArgument => {
	if (
		arg === undefined ||
		typeof arg !== 'object' ||
		(arg.resources === undefined &&
			arg.lifecycle === undefined &&
			arg.ui === undefined &&
			arg.extensionData === undefined)
	)
		throw new Error(badArgumentError('dispatchInfo', 'a DispatchInfoArgument (type)', arg));
	if (arg.host !== undefined && !isHostEngine(arg.host))
		throw new Error(badArgumentError('dispatchInfo.host', 'a HostEngine(ENUM) key or value', arg.host));
	return true;
};
export class DispatchInfo extends XMLElement {
	constructor(arg: DispatchInfoArgument) {
		if (isDispatchInfoArgument(arg)) {
			let { resources, lifecycle, ui, extensionData, host } = arg;
			let content: XMLElement[] = [];
			if (resources !== undefined) content.push(new Resources(resources));
			if (lifecycle !== undefined) content.push(new Lifecycle(lifecycle));
			if (ui !== undefined) content.push(new UI(ui));
			if (extensionData !== undefined) {
				extensionData = !(extensionData instanceof Array) ? [extensionData] : extensionData;
				for (const data of extensionData) {
					content.push(new ExtensionData(data));
				}
			}
			let attributes: AttributeArgument[] | undefined;
			if (host !== undefined) {
				if (isHostEngineValue(host)) attributes = [{ name: 'Host', value: host }];
				else if (isHostEngineKey(host)) attributes = [{ name: 'Host', value: HostEngine[host] }];
			}
			super({
				name: 'DispatchInfo',
				context: contextContainsAllOf('DispatchInfoList'),
				content,
				attributes,
			});
		}
	}
}
