import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';
import { HostList, HostListArgument } from './Host';
import { DispatchInfo, DispatchInfoArgument } from './DispatchInfo';
import { DependencyList, DependencyListArgument } from './Dependency';
import { VersionNumber, isVersionNumber, isValidId } from '../typesAndValidators';
import { contextContainsAllOf, contextContainsNoneOf } from './Context';
import { badArgumentError } from '../errorMessages';
import type { Context } from './Context';

export type ExtensionArgument = {
	id: string;
	version?: VersionNumber;
	hostList?: HostListArgument;
	dispatchInfo?: DispatchInfoArgument | DispatchInfoArgument[];
	dependencyList?: DependencyListArgument;
};

const isExtensionArgument: (arg: any) => boolean = (arg): arg is ExtensionArgument => {
	if (arg === undefined || typeof arg !== 'object' || arg instanceof Array || Object.keys(arg).length < 1)
		throw new Error(badArgumentError('every extensions', 'an ExtensionArgument (type)', arg));
	if (arg.id === undefined || !isValidId(arg.id))
		throw new Error(badArgumentError('extensions[].id', 'a string', arg.id));
	if (arg.version && !isVersionNumber(arg.version))
		throw new Error(badArgumentError('extensions[].version', 'a VersionNumber (type)', arg.version));
	return true;
};
export class Extension extends XMLElement {
	constructor(arg: ExtensionArgument) {
		if (isExtensionArgument(arg)) {
			const { id, version } = arg;
			let attributes: AttributeArgument[] = [{ name: 'Id', value: id }];
			if (version)
				attributes.push({
					name: 'Version',
					value: version,
					context: (parents: Context[]) =>
						contextContainsAllOf('ExtensionList')(parents) && contextContainsNoneOf('.debug')(parents),
				});
			let { hostList, dispatchInfo, dependencyList } = arg;
			let content = [];
			if (hostList) {
				content.push(new HostList(hostList));
			}

			if (dispatchInfo !== undefined) {
				dispatchInfo = !(dispatchInfo instanceof Array) ? [dispatchInfo] : dispatchInfo;
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
}
