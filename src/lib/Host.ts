import { XMLElement } from './XMLElement';
import { RangedVersion, AttributeArgument, isRangedVersion } from './typesAndValidators';
import { contextContainsOneOf, contextContainsAllOf } from './Context';
import { HostEngine, isHostEngineKey, isHostEngineValue } from './enumsAndValidators';

export class HostList extends XMLElement {
	constructor(hosts: Host | Host[]) {
		super({
			name: 'HostList',
			content: hosts,
			context: contextContainsOneOf(['ExecutionEnvironment', 'DispatchInfoList', '.debug']),
		});
	}
}

export class Host extends XMLElement {
	constructor(
		hostName: HostEngine | keyof typeof HostEngine,
		version: 'All' | 'ALL' | 'all' | RangedVersion,
		debugLocalhostPort: number,
	) {
		let attribute = [];
		if (hostName && isHostEngineValue(hostName)) attribute.push({ name: 'Name', value: hostName });
		else if (hostName && isHostEngineKey(hostName)) attribute.push({ name: 'Name', value: HostEngine[hostName] });
		else
			throw new Error(
				badArgumentError(
					'Host Engine Name',
					'string containing a key of HostEngine (enum) or a value of HostEngine',
					hostName,
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
		if (debugLocalhostPort && typeof debugLocalhostPort === 'number')
			debugPortAttribute.value = debugLocalhostPort.toString();
		attribute.push(debugPortAttribute);

		super({ name: 'Host', attributes: attribute });
	}
}
