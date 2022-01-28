import { XMLElement, AttributeArgument } from './XMLElement';
import { HostList, HostListArgument } from './Host';
import { DispatchInfo, DispatchInfoArgument } from './DispatchInfo';
import { DependencyList, DependencyArgument } from './Dependency';
import { isVersionNumber, isValidId } from '../typesAndValidators';
import { contextContainsAllOf, contextContainsNoneOf } from './Context';
import { badArgumentError } from '../errorMessages';

export type ExtensionArgument = {
	id: string;
	version?: string;
	hostList?: HostListArgument;
	dispatchInfo?: DispatchInfoArgument | DispatchInfoArgument[];
	dependencyList?: DependencyArgument | DependencyArgument[];
};

const isExtensionArgument: (arg: any) => boolean = (arg): arg is ExtensionArgument => {
	if (arg === undefined || typeof arg !== 'object' || arg instanceof Array)
		throw new Error(badArgumentError('extension', 'an ExtensionArgument (type)', arg));
	if (arg.id === undefined) throw new Error(badArgumentError('extension', 'an ExtensionArgument (type)', arg));
	if (!isValidId(arg.id)) {
		throw new Error(badArgumentError('extension.id', 'a string', arg.id));
	}
	if (arg.version && !isVersionNumber(arg.version))
		throw new Error(badArgumentError('extension.version', 'a VersionNumber (type)', arg.version));
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
					context: (parents: string[]) =>
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

			if (dependencyList) new DependencyList(dependencyList);

			super({
				name: 'Extension',
				attributes: attributes,
				content,
			});
		}
	}
}
