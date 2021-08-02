import { XMLElement } from './XMLElement';
import { RangedVersion, AttributeArgument, isRangedVersion } from './typesAndValidators';
import { contextContainsOneOf, contextContainsAllOf } from './Context';
import { HostEngine, isHostEngineKey, isHostEngineValue } from './enumsAndValidators';
import { badArgumentError } from './errorMessages';

export class HostList extends XMLElement {
	constructor(hosts: HostArgument | HostArgument[]) {
		let content: Host[] = [];
		if (!(hosts instanceof Array)) hosts = [hosts];

		for (const host of hosts) {
			if (isValidHostArgument(host)) content.push(new Host(host));
			else throw new Error(badArgumentError("Every hostList's hosts", 'HostArgument(type)', host));
		}

		super({
			name: 'HostList',
			content,
			context: contextContainsOneOf(['ExecutionEnvironment', 'DispatchInfoList', '.debug']),
		});
	}
}

export type HostArgument = {
	host: HostEngine | keyof typeof HostEngine;
	version: 'All' | 'ALL' | 'all' | RangedVersion;
	debugPort?: number;
};
export function isValidHostArgument(host: any) {
	return (
		typeof host === 'object' &&
		host !== null &&
		host.host &&
		host.version &&
		(isHostEngineValue(host.host) || isHostEngineKey(host.host)) &&
		(isRangedVersion(host.version) || (typeof host.version === 'string' && host.version.toUpperCase() === 'ALL')) &&
		(host.debugPort === undefined || (host.debugPort && typeof host.debugPort === 'number'))
	);
}
class Host extends XMLElement {
	constructor({ host, version, debugPort }: HostArgument) {
		let attribute = [];
		if (host && isHostEngineValue(host)) attribute.push({ name: 'Name', value: host });
		else if (host && isHostEngineKey(host)) attribute.push({ name: 'Name', value: HostEngine[host] });
		else
			throw new Error(
				badArgumentError(
					'Host Engine Name',
					'string containing a key of HostEngine (enum) or a value of HostEngine',
					host,
				),
			);

		let versionAttr: AttributeArgument = {
			name: 'Version',
			value: '',
			context: contextContainsAllOf('ExecutionEnvironment'),
		};
		if (version && isRangedVersion(version)) {
			versionAttr.value = version.toString();
		} else if (version && typeof version === 'string' && version.toUpperCase() === 'ALL') {
			versionAttr.value = '[0,99]';
		} else
			throw new Error(
				badArgumentError(
					'Host version',
					"string containing a version number, a version range ([1,13]) or the word 'ALL'",
					version,
				),
			);
		attribute.push(versionAttr);

		let debugPortAttribute: AttributeArgument = {
			name: 'Port',
			context: contextContainsAllOf(['.debug', 'ExtensionList']),
			value: '',
		};
		if (debugPort && typeof debugPort === 'number') debugPortAttribute.value = debugPort.toString();
		attribute.push(debugPortAttribute);

		super({ name: 'Host', attributes: attribute });
	}
}
