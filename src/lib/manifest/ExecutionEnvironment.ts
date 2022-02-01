import { XMLElement } from './XMLElement';
import { HostListArgument, HostList } from './Host';
import { LocaleList, LocaleListArgument } from './LocaleList';
import { badArgumentError } from '../errorMessages';
import { RequiredRuntimeList } from './Runtime';
import { RangedVersion } from '../typesAndValidators';

export type ExecutionEnvironmentArgument = {
	hostList?: HostListArgument;
	localeList?: LocaleListArgument;
	CSXSVersion?: RangedVersion;
};

export function isExecutionEnvironmentArgument(arg: any): arg is ExecutionEnvironmentArgument {
	if (arg === undefined || typeof arg !== 'object' || arg instanceof Array)
		throw new Error(badArgumentError('executionEnvironment', 'an ExecutionEnvironmentArgument (type)', arg));
	/* Is a container, no more validation necessary for now */
	return true;
}
export class ExecutionEnvironment extends XMLElement {
	constructor(arg: ExecutionEnvironmentArgument) {
		if (isExecutionEnvironmentArgument(arg)) {
			const { hostList, localeList, CSXSVersion } = arg;
			let content: XMLElement[] = [];
			if (hostList) content.push(new HostList(hostList));
			if (localeList) content.push(new LocaleList(localeList));
			if (CSXSVersion) content.push(new RequiredRuntimeList(CSXSVersion));
			super({ name: 'ExecutionEnvironment', content });
		}
	}
}
