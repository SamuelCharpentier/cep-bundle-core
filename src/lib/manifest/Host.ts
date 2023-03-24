import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';
import {
	All,
	RangedVersion,
	isAll,
	isRangedVersion,
} from '../typesAndValidators';
import { contextContainsOneOf, contextContainsAllOf } from './Context';
import {
	HostEngine,
	isHostEngine,
	isHostEngineKey,
	isHostEngineValue,
} from '@src/lib/enumsAndValidators';
import { badArgumentError } from '../errorMessages';

export type HostListArgument = HostArgument | HostArgument[] | All;

function isValidHostListArgument(hostList: any): hostList is HostListArgument {
	if (
		(hostList !== undefined && typeof hostList === 'object') ||
		isAll(hostList)
	) {
		if (isAll(hostList)) return true;
		if (!(hostList instanceof Array)) hostList = [hostList];
		for (const host of hostList) {
			isHostArgument(host);
		}
		return true;
	}

	throw new Error(
		badArgumentError(
			'hostList',
			'an instance or array of HostListArgument (type)',
			hostList,
		),
	);
}

export class HostList extends XMLElement {
	/**
	 * Creates an instance of HostList.
	 *
	 * Extends **XMLElement**. Holds an array of **Host**.
	 *
	 * ```typescript
	 * type HostListArgument = HostArgument | HostArgument[] | All;
	 * ```
	 *
	 * ----
	 *
	 * ```typescript
	 * type All = 'All' | 'ALL' | 'all';
	 * ```
	 *
	 * ----
	 *
	 * ```typescript
	 * interface HostArgument {
	 * 		host: HostEngine | keyof typeof HostEngine;
	 * 		version: All | RangedVersion;
	 * 		debugPort?: number | \`${number}\`;
	 * }
	 * ```
	 *
	 * ----
	 *
	 * ```typescript
	 * enum HostEngine {
	 * 		'InCopy' = 'AICY',
	 * 		'InDesign' = 'IDSN',
	 * 		'Illustrator' = 'ILST',
	 * 		'Photoshop' = 'PHXS',
	 * 		'Prelude' = 'PRLD',
	 * 		'Premiere Pro' = 'PPRO',
	 * 		'Dreamweaver' = 'DRWV',
	 * 		'Flash Pro' = 'FLPR',
	 * 		'After Effects' = 'AEFT',
	 * }
	 * ```
	 *
	 * ----
	 *
	 * ```typescript
	 * type RangedVersion =
	 *  | number
	 *  | VersionNumber
	 *  | `${'[' | '('}${VersionNumber},${VersionNumber}${')' | ']'}`
	 * ```
	 * ----
	 *
	 *```typescript
	 * type VersionNumber =
	 * | `${number}`
	 * | `${number}.${number}`
	 * | `${number}.${number}.${number}`
	 * | `${number}.${number}.${number}.${number}`;
	 * ```
	 *
	 * @param  {HostListArgument} hostList
	 * @memberof HostList
	 */
	constructor(hostList: HostListArgument) {
		isValidHostListArgument(hostList);
		let content: Host[] = [];
		hostList = hostListIsAll(hostList)
			? getAllHosts()
			: !(hostList instanceof Array)
			? [hostList]
			: hostList;

		for (const host of hostList) {
			content.push(new Host(host));
		}

		super({
			name: 'HostList',
			content,
			context: contextContainsOneOf([
				'ExecutionEnvironment',
				'DispatchInfoList',
				'.debug',
			]),
		});
	}
}

interface HostArgument {
	host: `${HostEngine}` | keyof typeof HostEngine;
	version: All | RangedVersion;
	debugPort?: number | `${number}`;
}

function isHostArgument(host: any): host is HostArgument {
	if (!host.host || !isHostEngine(host.host))
		throw new Error(
			badArgumentError(
				`hostList[].host`,
				"a HostEngine(ENUM) key or value or the string 'ALL'",
				host.host,
			),
		);

	if (
		!host.version ||
		(!isRangedVersion(host.version) &&
			!(
				typeof host.version === 'string' &&
				host.version.toUpperCase() === 'ALL'
			))
	)
		throw new Error(
			badArgumentError(
				`hostList[].version`,
				"a RangedVersion or the string 'ALL'",
				host.version,
			),
		);

	if (host.debugPort)
		if (
			!(
				host.debugPort &&
				(typeof host.debugPort === 'number' ||
					(typeof host.debugPort === 'string' &&
						Number.isInteger(parseInt(host.debugPort))))
			)
		) {
			throw new Error(
				badArgumentError(
					'hostList[].debugPort',
					'a number or a string containing a number',
					host.debugPort,
				),
			);
		}
	return true;
}

class Host extends XMLElement {
	constructor({ host, version, debugPort }: HostArgument) {
		let attribute = [];
		if (host && isHostEngineValue(host))
			attribute.push({ name: 'Name', value: host });
		else if (host && isHostEngineKey(host))
			attribute.push({ name: 'Name', value: HostEngine[host] });

		let versionAttr: AttributeArgument = {
			name: 'Version',
			value: '',
			context: contextContainsAllOf('ExecutionEnvironment'),
		};
		if (version && isRangedVersion(version)) {
			versionAttr.value = version.toString();
		} else if (
			version &&
			typeof version === 'string' &&
			version.toUpperCase() === 'ALL'
		) {
			versionAttr.value = '[0,99]';
		}
		attribute.push(versionAttr);

		let debugPortAttribute: AttributeArgument = {
			name: 'Port',
			context: contextContainsAllOf(['.debug', 'ExtensionList']),
			value: '',
		};
		if (
			debugPort &&
			(typeof debugPort === 'number' || /^\d+$/.test(debugPort))
		) {
			debugPortAttribute.value = debugPort.toString();
			attribute.push(debugPortAttribute);
		}

		super({ name: 'Host', attributes: attribute });
	}
}
