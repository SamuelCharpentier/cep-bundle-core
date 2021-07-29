import { XMLElement } from './XMLElement';
import { Extension } from './Extension';
import { Resources } from './Resources';
import { Lifecycle } from './Lifecycle';
import { UI } from './UI';
import { ExtensionData } from './ExtensionData';
import { contextContainsAllOf } from './Context';
export class DispatchInfoList extends XMLElement {
	constructor(extensions: Extension | Extension[]) {
		if (extensions instanceof Extension) extensions = [extensions];
		if (!(extensions instanceof Array))
			throw new Error(
				badArgumentError(
					"Dispatch info list's extension",
					'instance of Extension or array or instances of Extension',
					extensions,
				),
			);
		super({ name: 'DispatchInfoList', content: extensions });
	}
}
export class DispatchInfo extends XMLElement {
	constructor({
		resources,
		lifecycle,
		ui,
		extensionData,
	}: {
		resources?: Resources;
		lifecycle?: Lifecycle;
		ui?: UI;
		extensionData?: ExtensionData | ExtensionData[];
	} = {}) {
		let content: XMLElement[] = [];
		if (resources !== undefined && resources instanceof Resources) content.push(resources);
		if (lifecycle !== undefined && lifecycle instanceof Lifecycle) content.push(lifecycle);
		if (ui !== undefined && ui instanceof UI) content.push(ui);
		if (extensionData !== undefined)
			if (extensionData instanceof ExtensionData) content.push(extensionData);
			else if (extensionData instanceof Array) content.push(...extensionData);
		super({ name: 'DispatchInfo', context: contextContainsAllOf('DispatchInfoList'), content });
	}
}
