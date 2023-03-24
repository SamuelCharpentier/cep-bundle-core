import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';
import { HostList, HostListArgument } from './Host';
import { DispatchInfo, DispatchInfoArgument } from './DispatchInfo';
import { DependencyList, DependencyListArgument } from './Dependency';
import { VersionNumber } from '../typesAndValidators';
import { contextContainsAllOf, contextContainsNoneOf } from './Context';
import type { Context } from './Context';

export type ExtensionArgument = {
	id: string;
	version?: VersionNumber;
	hostList?: HostListArgument;
	dispatchInfo?: DispatchInfoArgument | DispatchInfoArgument[];
	dependencyList?: DependencyListArgument;
};

export class Extension extends XMLElement {
	constructor(arg: ExtensionArgument) {
		const { id, version } = arg;
		let attributes: AttributeArgument[] = [{ name: 'Id', value: id }];
		if (version)
			attributes.push({
				name: 'Version',
				value: String(version),
				context: (parents: Context[]) =>
					contextContainsAllOf('ExtensionList')(parents) &&
					contextContainsNoneOf('.debug')(parents),
			});
		let { hostList, dispatchInfo, dependencyList } = arg;
		let content = [];
		if (hostList) {
			content.push(new HostList(hostList));
		}

		if (dispatchInfo !== undefined) {
			dispatchInfo = !(dispatchInfo instanceof Array)
				? [dispatchInfo]
				: dispatchInfo;
			for (let dispatchInfoArg of dispatchInfo) {
				content.push(new DispatchInfo(dispatchInfoArg));
			}
		}
		if (dependencyList) content.push(new DependencyList(dependencyList));

		super({
			name: 'Extension',
			attributes: attributes,
			content,
		});
	}
}
