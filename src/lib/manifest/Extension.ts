import { XMLElement } from './XMLElement';
import { HostList, HostArgument, isHostArgument } from './Host';
import { DispatchInfo, DispatchInfoArgument, isDispatchInfoArgument } from './DispatchInfo';
import { DependencyList, DependencyArgument, isDependencyArgument } from './Dependency';
import { AttributeArgument, isVersionNumber, isValidId } from '../typesAndValidators';
import { contextContainsAllOf, contextContainsNoneOf } from './Context';
import { badArgumentError, printVariableInError } from '../errorMessages';

export type ExtensionArgument = {
	id: string;
	version?: string;
	hostList?: HostArgument | HostArgument[];
	dispatchInfo?: DispatchInfoArgument;
	dependencyList?: DependencyArgument | DependencyArgument[];
};

export const isExtensionArgument: (arg: any) => boolean = (argument): argument is ExtensionArgument => {
	if (argument && typeof argument === 'object' && !(argument instanceof Array)) {
		if (!isValidId(argument.id)) {
			throw new Error(
				`Extension id(required) should be a string, ${printVariableInError(
					argument.id,
				)} received.\nIt's advised to use a fully qualified id (com.companyName.bundleId.extensionId)`,
			);
		}
		if (argument.version) {
			if (isVersionNumber(argument.version)) return true;
			else
				throw new Error(
					`Extension's version(optional) should be of type VersionNumber(type),\n${printVariableInError(
						argument.version,
					)} received`,
				);
		}
		if (argument.hostList) {
			isHostArgument(argument.hostList);
		}
		if (argument.dispatchInfo) {
			isDispatchInfoArgument(argument.dispatchInfo);
		}
		if (argument.dependencyList) {
			isDependencyArgument(argument.dependencyList);
		}
		return true;
	}
	return false;
};
export class Extension extends XMLElement {
	constructor({ id, version, hostList, dispatchInfo, dependencyList }: any) {
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
		if (hostList) {
			if (!(hostList instanceof Array)) hostList = [hostList];
			for (const host of hostList) {
				if (!isHostArgument(host))
					throw new Error(badArgumentError("Extension's hostList (optional)", 'HostArgument type', host));
			}
			content.push(new HostList(hostList));
		}

		if (dispatchInfo)
			if (isDispatchInfoArgument(dispatchInfo)) content.push(new DispatchInfo(dispatchInfo));
			else
				throw new Error(
					badArgumentError(
						"Extension's dispatch info (optional)",
						'object of type DispatchInfoArgument(type)',
						dispatchInfo,
					),
				);

		if (dependencyList)
			if (!isDependencyArgument(dependencyList))
				throw new Error(
					badArgumentError(
						"Extension's dependency list (optional)",
						'instance of the class DependencyList',
						dependencyList,
					),
				);
			else content.push(new DependencyList(dependencyList));

		super({
			name: 'Extension',
			attributes: attributes,
			content,
		});
	}
}
