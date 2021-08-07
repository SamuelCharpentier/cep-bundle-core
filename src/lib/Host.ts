import { XMLElement } from './XMLElement';
import { RangedVersion, AttributeArgument, isRangedVersion } from './typesAndValidators';
import { contextContainsOneOf, contextContainsAllOf } from './Context';
import { HostEngine, isHostEngine, isHostEngineKey, isHostEngineValue } from './enumsAndValidators';
import { badArgumentError, printVariableInError } from './errorMessages';

type All = 'All' | 'ALL' | 'all';
export type HostListArgument = HostArgument | HostArgument[] | All;

const hostListIsAll = (hostList: any): hostList is All =>
	typeof hostList === 'string' && hostList.toUpperCase() === 'ALL';

export function isValidHostListArgument(hostList: any): hostList is HostListArgument {
	if (hostList) {
		if (hostListIsAll(hostList)) return true;
		if (!(hostList instanceof Array)) hostList = [hostList];
		for (const host of hostList) {
			isHostArgument(host);
		}
		return true;
	}

	throw new Error('hostList could not validate ,' + printVariableInError(hostList));
}
export class HostList extends XMLElement {
	constructor(hostList: HostListArgument) {
		let content: Host[] = [];
		if (hostListIsAll(hostList)) {
			hostList = [];
			for (const host in HostEngine) {
				if (isHostEngine(host)) hostList.push({ host, version: 'All' });
			}
		}
		if (!(hostList instanceof Array)) hostList = [hostList];

		for (const host of hostList) {
			if (isHostArgument(host)) content.push(new Host(host));
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
	debugPort?: number | `${number}`;
};

export function isHostArgument(host: any): host is HostArgument {
	if (!host.host || !isHostEngineKey(host.host))
		throw new Error(badArgumentError(`host.version`, "as a RangedVersion or the string 'ALL'", host.host));

	if (
		!host.version ||
		(!isRangedVersion(host.version) && !(typeof host.version === 'string' && host.version.toUpperCase() === 'ALL'))
	)
		throw new Error(badArgumentError(`host.version`, "as a RangedVersion or the string 'ALL'", host.version));

	if (host.debugPort)
		if (
			!(
				host.debugPort &&
				(typeof host.debugPort === 'number' ||
					(typeof host.debugPort === 'string' && Number.isInteger(parseInt(host.debugPort))))
			)
		) {
			throw new Error(
				badArgumentError('host.debugPort', 'a number or a string containing a number', host.debugPort),
			);
		}
	return true;
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
