import { XMLElement } from './XMLElement';
import { HostList } from './Host';
import { DispatchInfo } from './DispatchInfo';
import { DependencyList } from './Dependency';
import type { AttributeArgument } from './typesAndValidators';
import { contextContainsAllOf, contextContainsNoneOf } from './Context';
export class Extension extends XMLElement {
	constructor({
		id,
		version,
		hostList,
		dispatchInfo,
		dependencyList,
	}: {
		id: string;
		version?: string;
		hostList?: HostList;
		dispatchInfo?: DispatchInfo;
		dependencyList?: DependencyList;
	}) {
		let attributes: AttributeArgument[] = [];
		if (!id || typeof id !== 'string' || id.length <= 0)
			throw new Error(badArgumentError('Extension Id', 'string', id));
		else attributes.push({ name: 'Id', value: id });
		if (version) {
			if (typeof version !== 'string' || version?.length <= 0)
				throw new Error(badArgumentError('Extension Version (optional)', 'string', version));
			else
				attributes.push({
					name: 'Version',
					value: version,
					context: (parents: string[]) =>
						contextContainsAllOf('ExtensionList')(parents) && contextContainsNoneOf('.debug')(parents),
				});
		}
		let content = [];
		if (hostList)
			if (!(hostList instanceof HostList))
				throw new Error(badArgumentError("Extension's host list (optional)", 'HostList class', hostList));
			else content.push(hostList);

		if (dispatchInfo)
			if (!(dispatchInfo instanceof DispatchInfo))
				throw new Error(
					badArgumentError(
						"Extension's dispatch info (optional)",
						'instance of the class DispatchInfo',
						dispatchInfo,
					),
				);
			else content.push(dispatchInfo);

		if (dependencyList)
			if (!(dependencyList instanceof DependencyList))
				throw new Error(
					badArgumentError(
						"Extension's dependency list (optional)",
						'instance of the class DependencyList',
						dependencyList,
					),
				);
			else content.push(dependencyList);

		super({
			name: 'Extension',
			attributes: attributes,
			content,
		});
	}
}
